<template>
  <div>
      <head>
        <title>Account - Gorosa mon amour</title>
      </head>
      <h2>― Account ―</h2>

      <div id="adminmode" v-if=" user.id == 1 && isConnected">
            Administrator Mode
      </div>

      <div v-if="isConnected">

      <div id="prez">
          
        Veuillez raffraichir la page pour mettre à jour votre compte<button onClick="window.location.reload()">Actualiser</button>
      </div>
              <h3>
              Username : {{ user.name }}
              <br>
              <br>
              Tickets : {{user.tickets}}
              <br>
              <br>
              Email : {{user.email}}
              </h3>
              <h2>An 600 - Voyages réservés :</h2>
              <div id="descvoy">
                Le lancement des vaisseaux s'effectuent à la tour centrale.
                </div>

              <div class="idea-title">


              <article v-for="favori in favoris" :key="favori.id">

                  <article class='element' v-for="voyage in voyages" :key="voyage.id" v-if="voyage.id==favori.choosen && favori.quantity == favori.payed">

                    <div class="voyage-img">
                      <div :style="{ backgroundImage: 'url(' + voyage.image + ')' }">
                      </div>
                    </div>

                    <div class="voyage-content">
                      <div class="voyage-title">
                        <h2 :style="{backgroundColor: 'rgba(0, 0, 0, 0.493)'}">{{ voyage.name }}<br> {{favori.quantity}} places</h2>
                        
                        <div v-if="voyage.id==1">
                            Dates du voyage : 5 ventôse - 6 floréal
                            </div>
                            <div v-if="voyage.id==2">
                            Dates du voyage : 13 prairial - 18 thermidor
                            </div>
                            <div v-if="voyage.id==3">
                            Dates du voyage : 26 frimaire - 30 pluviôse
                            </div>
                            <div v-if="voyage.id==4">
                            Dates du voyage : 7 vendémiaire - 12 frimaire
                        </div>
                        
                        
                        <p>{{ voyage.description }}</p>

                      </div>

                    </div>


                  </article>
              </article>
            </div>
        <br><br><br>
      </div>
      <div v-else id="prez">
          Vous devez vous connecter pour accéder à cette page ! <button><router-link to='/login'>Connexion</router-link></button>
      </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    voyages: { type: Array, default: [] },
    favoris : {},
    isConnected: false,
    user:{}
  },
  data () {
    return {}
  }
}
</script>

<style scoped>

.element{
    padding: 30px;
    flex: 1;

}

.voyage-img {
    flex: 1;
}

.voyage-img div {
    width: 100px;
    height: 100px;
    background-size: cover;
    margin-left: 7%;
    align-content: center;
    display: inline-flex;
}

button{
    font-family: bc-alphapipe, sans-serif;
    font-weight: normal;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    margin: 10px auto 20px;
    display: block;
    border-radius: 30px;
    background-color: rgba(0, 0, 0, 0.506);
    padding-left: 15px;
    padding-right: 15px;
    border: groove;
    text-decoration: none;
    color: white;
    text-align: center;
}
button:hover{
    cursor: pointer;
    transition: 0.3s;
    color: rgba(31, 31, 31, 0.900);
    border-color: white;
    background-color: rgba(255, 255, 255, 0.753);
    box-shadow: 0 0 2px rgba(31, 31, 31, 0.753);
}

h2{
    font-size: 23px;
    font-weight: normal;
    text-align: center;
    text-transform: uppercase;
    color: white;
    word-spacing: 15px;
    letter-spacing: 9px;
    text-shadow: 2px 2px 3px black;
    margin-top: 30px;
    margin-bottom: 30px;
}

h3{
      font-size: 15px;
      font-weight: normal;
      text-align: left;
      color: white;
      word-spacing: 15px;
      letter-spacing: 5px;
      text-shadow: black 2px 2px 3px;
      padding-top: 29px;
      padding-left: 30px;
}


#descvoy{
      text-align: center;
    padding: 10px;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
    background-color: rgba(0, 0, 0, 0.493);
    color: white;
    margin-bottom: 60px;
    margin-top: 0px;

    color: #F2F2F2;
    padding-bottom: 10px;
    line-height: 150%;
    font-size: 18px;
}

.idea-title {
    justify-content: space-between;
    text-align: center;
    margin: auto;
    display: block;
    background-color: rgba(0, 0, 0, 0.494);
    background-image: url("ciel.png");
    position: relative;
    display: flex;
    flex: 1;
}

@media screen and (max-width:600px){
  
  #prez{
    margin: 0px;
  }
}

</style>

