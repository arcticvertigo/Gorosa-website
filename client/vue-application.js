const Home = window.httpVueLoader('./components/Home.vue')
const Citoyen = window.httpVueLoader('./components/citoyen.vue')
const Voyages = window.httpVueLoader('./components/voyages.vue')
const Favoris = window.httpVueLoader('./components/Favoris.vue')
const News = window.httpVueLoader('./components/news.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Stats = window.httpVueLoader('./components/stats.vue')
const Account = window.httpVueLoader('./components/account.vue')


const routes = [
  { path: '/', component: Home },
  { path: '/citoyen', component: Citoyen },
  { path: '/voyages', component: Voyages },
  { path: '/favoris', component: Favoris },
  { path: '/news', component: News },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/stats', component: Stats },
  { path: '/account', component: Account }
]

const router = new VueRouter({
  routes
})

Vue.component("modal", {
  template: "#modal-template"
});

var app = new Vue({
  router,
  el: '#app',
  data: {
    voyages: [],
    favoris: {
      voyages: []
    },
    favorispayed: [],
    placesleft: [],
    homeadm: [],
    ideas:[],
    user: {},
    isConnected: false,
    showModal: false,
    ok: Boolean
  },
  async mounted () {
    const res1 = await axios.get('/api/voyages')
    this.voyages = res1.data
    const res = await axios.get('/api/ideas')
    this.ideas = res.data
    const res5 = await axios.get('/api/favoris')
    this.favoris = res5.data
    const res4 = await axios.get('/api/homeadm')
    this.homeadm = res4.data
    const res51 = await axios.get('/api/favorispayed')
    this.favorispayed = res51.data
    const res52 = await axios.get('/api/placesleft')
    this.placesleft = res52.data
    try {
      const res3 = await axios.get('/api/me')
      this.user = res3.data
      this.isConnected = true
    } catch (err) {
      if (err.response?.status === 401) {
        this.isConnected = false
      } else {
        console.log('error', err)
      }
    }
  },
  methods: {
    async updatehomead (newhomead) {
      await axios.put('/api/homead/' + newhomead.id, newhomead)
      const homead = this.homeadm.find(a => a.id === newhomead.id)
      homead.title = newhomead.title
      homead.descri = newhomead.descri
      homead.image = newhomead.image
    },
    async addidea (idea) {
      console.log(idea)
      await axios.post('/api/idea', idea)
    },
    async updateidea (newidea) {
      await axios.put('/api/idea/' + newidea.id, newidea)
      const idea = this.ideas.find(a => a.id === newidea.id)
      idea.name = newidea.name
      idea.description = newidea.description
      idea.img = newidea.img
    },
    async deleteidea (ideaId) {
      await axios.delete('/api/idea/' + ideaId)
      const index = this.ideas.findIndex(a => a.id === ideaId)
      this.ideas.splice(index, 1)
    },
    async login (user) {
      const res = await axios.post('/api/login', user)
      this.user = res.data
      this.isConnected = true
      this.$router.push({path: '/'})
      
    },
    async updatetickets (user) {
      console.log("ticketin", user.tickets)
      await axios.put('/api/me/'+user.id, user)
      console.log("ticketout", user.tickets)
      this.$router.go()
    },
    async logout (user) {
      await axios.get('/api/logout', user)
      this.isConnected = false
      this.$router.push('/')
    },
    async addToPanier(voyageId){
      var voyage = {id:voyageId,quantity:1}
      await axios.post('/api/favoris', voyage)
      this.$router.go()
      
    },
    async deletevoyage (favori) {
      await axios.delete('/api/favoris/'+ favori.choosen, favori)
      const index = this.voyages.findIndex(a => a.id === voyageId)
      this.voyages.splice(index, 1)
      
    },
    async sendEditQuantity(voyage){
      await axios.put('/api/favoris/'+ voyage.id, voyage)
    },
    async sendPayement(favori){
      console.log("invue", favori)
      await axios.put('/api/favorispayed/'+ favori.id, favori)
      console.log("outvue")
    }
  }
})
