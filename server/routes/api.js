const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client({
 user: 'postgres',
 host: 'localhost',
 password: 'efrei',
 database: 'gorosa-trip'
})

client.connect()

const users = []

class Favoris {
  constructor () {
    this.voyages = []
  }
}


//login

router.post('/login', async (req, res) => {
  console.log('inside login api')
  const email = req.body.email
  const password = req.body.password

  const result = await client.query({
    text: "SELECT * FROM users WHERE email=$1",
    values: [email]
  })

  console.log(email)

  if (result.rows.length === 0) {
    res.status(401).json({ message: 'user doesnt exist' })
    return
  }

  const user = result.rows[0]

  if (await bcrypt.compare(password, user.password)) {
        // alors connecter l'utilisateur
        req.session.userId = user.id
        req.session.userN = user.name
        res.json({
          id: user.id,
          email: user.email,
          name: user.name
        })

  } else{
      res.status(401).json({message: 'wrong password'})
      return
  }

  console.log(user.email)
  console.log(user.id)
  console.log(user.name)
  
})


//register
router.post('/register', async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const name = req.body.name

  const result = await client.query({
    text: 'SELECT * FROM users WHERE email=$1',
    values: [email]
  })

  if (result.rows.length > 0) {
    res.status(401).json({
      message: 'user already exists'
    })
    return
  }
  const hash = await bcrypt.hash(password, 10)

  await client.query({
    text: `INSERT INTO users(email, password, name)
    VALUES ($1, $2, $3)
    `,
    values: [email, hash, name]
  })
  res.send('ok')
})


//for the isConnected
router.get('/me', async (req, res) => {  
  if (typeof req.session.userId === 'undefined') {
    res.status(401).json({ message: 'not connected' })
    return
  }

  const result = await client.query({
    text: 'SELECT id, email, name, tickets FROM users WHERE id=$1',
    values: [req.session.userId]
  })

  res.json(result.rows[0])
})

//PUT : to modify(update) the number of tickets
router.put('/me/:userId', async (req, res) => {
  
  const tickets = parseInt(req.body.tickets)
  const id = req.session.userId
  //const owner = req.session.userId

  if(tickets < 0) {
    res.status(400).json({message:"bad request, cannot change quantity to negative or zero values"})
    return
  }

  const result = await client.query({
    text: `UPDATE users
              SET tickets=$1
            WHERE id=$2
            `,
    values: [tickets,id]
    })

  res.send()
  console.log(result.rows)
})

router.route('/me/:userId')


//logout
router.get('/logout', (req, res) => {

    req.session.destroy()
    res.clearCookie('connect.sid')
    console.log("out")
    return res.json({ msg: 'logging you out' })

})




// FAVORIS


//we create a place of favoris for a user, if he doesn't has one
router.use((req, res, next) => {
  if (typeof req.session.favoris === 'undefined') {
    req.session.favoris = new Favoris()
  }
  next()
})


//GET : on récupère les éléments dans la database dans favoris pour les lire
router.get('/favoris', async (req, res) => {
  const result = await client.query({
    text: 'SELECT * FROM favoris WHERE owner=$1 ORDER BY id',
    values: [req.session.userId]
  })
  res.json(result.rows)
  console.log(result.rows)
})




//POST : we insert into the favorites
router.post('/favoris', async (req, res) => {
  const choosen = req.body.id
  const owner = req.session.userId
  const quantity = parseInt(req.body.quantity)

/*
  if(isNaN(quantity)||quantity <= 0) {
    res.status(400).json({message:"bad request, cannot choose NULL or negative quantities"})
    return
  }
  */
 const result = await client.query({
    text: `INSERT INTO favoris(owner,choosen,quantity) VALUES($1,$2,$3) RETURNING *`,
    values: [owner, choosen, quantity]
  })
  const id = result.rows[0].id

  res.json({
    id: id,
    owner: owner,
    choosen: choosen,
    quantity: quantity
  })

  console.log(result.rows)

})



router.route('/favoris/:favoriId')

//PUT : to modify(update) the number of passengers
router.put('/favoris/:voyageId', async (req, res) => {
  
  const owner = req.session.userId
  const quantity = parseInt(req.body.quantity)
  const id = req.body.id

  if(quantity < 0) {
    res.status(400).json({message:"bad request, cannot change quantity to negative or zero values"})
    return
  }

  const result = await client.query({
    text: `UPDATE favoris
              SET quantity=$1
            WHERE owner=$2 AND choosen=$3
            `,
    values: [quantity,owner, id]
    })

  res.send()
  console.log(result.rows)
})


//GET : on récupère les éléments dans la database dans favoris pour les lire
router.get('/favorispayed', async (req, res) => {
  const result = await client.query({
    text: 'SELECT name, payed, choosen FROM favoris inner join users on favoris.owner = users.id where payed>0',
    values: []
  })
  res.json(result.rows)
  console.log(result.rows)
})

router.route('/favorispayed/:favoriId')

//PUT : payed = quantity
router.put('/favorispayed/:favorisId', async (req, res) => {
  const owner = req.session.userId
  const quantity = parseInt(req.body.quantity)
  const id = req.body.id
/*
  if(quantity < 0) {
    res.status(400).json({message:"bad request, cannot change quantity to negative or zero values"})
    return
  }
*/
  const result = await client.query({
    text: `UPDATE favoris
              SET payed=$1
            WHERE owner=$2 AND id=$3
            `,
    values: [quantity, owner, id]
    })

  res.send()
  console.log(result.rows)
})


// DELETE : delete a voyage put in favoris
router.delete('/favoris/:favoriCh', async (req, res) => {
  const favoriCh = req.params.favoriCh
  const id = req.session.userId

  req.favoriCh = favoriCh

  console.log('api delete : ',favoriCh, id)

  await client.query({
    text: 'DELETE FROM favoris WHERE owner=$1 AND choosen=$2',
    values: [id, favoriCh]
  })
  res.send("The trip is removed from your favorites")
  console.log("The trip is removed from your favorites")
})


// get placesleft
router.get('/placesleft', async (req, res) => {
  const result = await client.query({
    text: 'SELECT SUM(payed), choosen FROM favoris where payed>0 group by choosen',
    values: []
  })
  res.json(result.rows)
  console.log(result.rows)

})

router.route('/placesleft')


// VOYAGES

//GET : on récupère les éléments dans voyages dans la database pour les lire
router.get('/voyages', async (req, res) => {
  const result = await client.query({
    text: 'SELECT * FROM voyages ORDER BY id' 
  })
  res.json(result.rows)
  console.log(result.rows)
})

//POST : we insert into voyage
router.post('/voyage', async (req, res) => {
  const name = req.body.name
  const description = req.body.description
  const image = req.body.image
  const price = parseInt(req.body.price)
  const nb_places = parseInt(req.body.nb_places)

  if (typeof name !== 'string' || name === '' ||
      typeof description !== 'string' || description === '' ||
      typeof image !== 'string' || image === '' ||
      isNaN(price) || price <= 0) {
    res.status(400).json({ message: 'bad request' })
    return
  }

  const result = await client.query({
    text: `INSERT INTO voyages(name, description, image, price, nb_places)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    values: [name, description, image, price]
  })
  const id = result.rows[0].id

  res.json({
    id: id,
    name: name,
    description: description,
    image: image,
    price: price,
    nb_places: nb_places
  })

  
  console.log(result.rows)

})

//parse permit us to take the information we need : voyageId
async function parsevoyage (req, res, next) {
  const voyageId = req.params.voyageId

  console.log("parsevoyage", voyageId, req.voyageId)

  req.voyageId = voyageId

  const result = await client.query({
    text: 'SELECT * FROM voyages WHERE id=$1',
    values: [voyageId]
  })


  req.voyage = result.rows[0]
  next()
}

router.route('/voyages/:voyageId')

.get(parsevoyage, (req, res) => {

  res.json(req.voyage)
  
})


//  IDEAS

//GET : on récupère les éléments dans ideas dans la database pour les lire
router.get('/ideas', async (req, res) => {
  const result = await client.query({
    text: 'SELECT * FROM ideas ORDER BY id DESC'
  })
  res.json(result.rows)
  console.log(result.rows)
})


//POST : we insert into the database of ideas a new ideas that a user have written

router.post('/idea', async (req, res) => {
  const name = req.body.name
  const description = req.body.description
  const owner = req.session.userId
  const nom = req.session.userN
  const img = req.body.img

  console.log(req.body)
  console.log("nom", nom)

  if (typeof name !== 'string' || name === '' ||
      typeof description !== 'string' || description === '' ||
      typeof img !== 'string' || img === '') {
    res.status(400).json({ message: 'bad request' })
    return
  }

  const result = await client.query({
    text: `INSERT INTO ideas(name, description, owner, img, nom)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    values: [name, description, owner, img, nom]
  })
  const id = result.rows[0].id

  res.json({
    id: id,
    name: name,
    description: description,
    owner: owner,
    img: img,
    nom: nom
  })
  console.log(result.rows)
})


async function parseidea (req, res, next) {
  const ideaId = parseInt(req.params.ideaId)

  if (isNaN(ideaId)) {
    res.status(400).json({ message: 'ideaId should be a number' })
    return
  }

  req.ideaId = ideaId
  
  const result = await client.query({
    text: 'SELECT * FROM ideas WHERE id=$1',
    values: [ideaId]
  })

  if (!result.rows.length) {
    res.status(404).json({ message: 'idea ' + ideaId + ' does not exist' })
    return
  }

  req.idea = result.rows[0]
  next()
}

router.route('/idea/:ideaId')

.get(parseidea, (req, res) => {
  // req.idea existe grâce au middleware parseidea
  res.json(req.idea)
})


.put(parseidea, async(req, res) => {
  const name = req.body.name
  const description = req.body.description
  const id = req.ideaId
  const img = req.body.img


    await client.query({
      text: `UPDATE ideas
              SET name=$1,
              description=$2,
              img=$3
            WHERE id=$4
            `,
      values: [name, description, img, id]
    })

  res.send()
})

.delete(parseidea, async (req, res) => {
  await client.query({
    text: 'DELETE FROM ideas WHERE id=$1',
    values: [req.ideaId]
  })
  res.send()
})





// HOMEADM

//GET : on récupère les éléments dans homeadm dans la database pour les lire

router.get('/homeadm', async (req, res) => {
  const result = await client.query({
    text: 'SELECT * FROM homeadm ORDER BY id' 
  })
  res.json(result.rows)
})


//POST : we insert into the database of homeadm a new ideas that the administrator have overwritten

router.post('/homead', async (req, res) => {
  const title = req.body.title
  const descri = req.body.descri
  const image = req.body.image
  const admin = req.session.userId

  if (typeof title !== 'string' || title === '' ||
      typeof descri !== 'string' || descri === '' ||
      typeof image !== 'string' || image === '') {
    res.status(400).json({ message: 'post homead bad request' })
    return
  }

  const result = await client.query({
    text: `INSERT INTO homeadm(descri, image, title, admin)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    values: [descri, image, title, admin]
  })
  const id = result.rows[0].id

  res.json({
    id: id,
    title: title,
    descri: descri,
    admin: admin,
    image: image
  })
})


async function parsehomead (req, res, next) {
  const homeadId = parseInt(req.params.homeadId)
  console.log("début parsehome api")

  req.homeadId = homeadId
  
  const result = await client.query({
    text: 'SELECT * FROM homeadm WHERE id=$1',
    values: [homeadId]
  })

  req.homead = result.rows[0]
  next()
}

router.route('/homead/:homeadId')

.get(parsehomead, (req, res) => {
  // req.homead existe grâce au middleware parsehomead
  res.json(req.homead)
})

.put(parsehomead, async(req, res) => {
  const title = req.body.title
  const descri = req.body.descri
  const id = req.homeadId
  const image = req.body.image

    await client.query({
      text: `UPDATE homeadm
              SET title=$1,
              descri=$2,
              image=$3
            WHERE id=$4
            `,
      values: [title, descri, image, id]
    })
  res.send()
})


module.exports = router
