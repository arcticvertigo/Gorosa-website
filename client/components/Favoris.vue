<template>
  <div>
    <title>Favoris - Gorosa mon amour</title>
    <h2>― Favoris ―<br><div style="font-size: 15px;"><br>AN 600</div></h2>

      <div id="adminmode" v-if=" user.id == 1 && isConnected">
            Administrator Mode
            <br>
            <small>Les membres du Gouvernement peuvent également partir en voyage groupé...</small>
      </div>
    <div v-if="isConnected"> 
    <div id="prez">

            Vous disposez actuellement de {{user.tickets}} tickets.


            <br><br>Veuillez raffraichir la page pour mettre à jour vos favoris<button onClick="window.location.reload()">Actualiser</button>
            <!--We use this onclick to reload the page because we had a problem : the page had to be reload to display the right voyages inside after a login.-->
    
    </div>
    <article v-for="favori in favoris" :key="favori.id">
      <article v-for="voyage in voyages" :key="voyage.id" v-if="voyage.id==favori.choosen && favori.quantity != favori.payed">
      <article v-for="place in placesleft" v-if="place.choosen==voyage.id">
                                       
                                
        <div class="voyage-img">
          <div :style="{ backgroundImage: 'url(' + voyage.image + ')' }">
          </div>
        </div>

        <div class="voyage-content">
            <div class="voyage-title">
                <h2 :style="{backgroundColor: 'rgba(0, 0, 0, 0.493)'}">{{ voyage.name }} - {{ voyage.price }}T <br>Passagers : {{favori.quantity}}  </h2>
                  <div id="descvoy">{{ voyage.description }}
                <br>
                  <div v-if="voyage.nb_places > place.sum">
                      Nombre de places restantes sur {{voyage.nb_places}} : {{voyage.nb_places - place.sum}}
                  </div>
                  <div v-else>
                      Complet
                  </div>

            </div>

            <div v-if="editingQuantity.id === voyage.id">
                <div  id="descvoy">
                    <input type="number" v-model="editingQuantity.quantity">
                </div>
                <!--<button @click="editQuantity(voyage)">OK</button>-->

                <div :style="{textAlign: 'center'}" v-if="voyage.nb_places - place.sum >= editingQuantity.quantity && ok">
                    
                    <button @click="sendEditQuantity()">Valider</button>
                    <button @click="abortEditQuantity()">Quitter</button>
                </div>

            </div>
            <div v-else>
                <button @click="editQuantity(voyage)">Modifier le nombre de passagers</button>
            </div>   
              
            <button @click="deletevoyage(favori)">Supprimer le voyage</button>

        </div>

        
        
            <div v-if="voyage.nb_places >= place.sum">
              <div v-if="user.tickets >= voyage.price * favori.quantity">
                  <button @click="sendPayement(favori, voyage, user)" :style="{ textTransform: 'uppercase'}">Reserver</button>
              </div>
              <div v-else id="descvoy">
                  Vous n'avez pas assez de tickets. Attendez l'an prochain.
              </div>
            </div>

        </article>
      </article>
    </article>
    </div>
    <div v-else id="prez">
          Vous devez vous connecter pour accéder à cette page ! <button><router-link to='/login'>Connexion</router-link></button>
    </div>
    <br><br><br>
  <div>
</template>


<script>

module.exports = {
  props: {
    voyages: { type: Array, default: [] },
    favoris : {},
    placesleft: {},
    isConnected: false,
    user:{},
    ok: false
  },
  data () {
    return {
      editingQuantity:{
        id : -1,
        quantity : 0
      },
      editingUser:{
        id : -1,
        tickets: 0
      }
    }
  },
  methods: {
    sendPayement(favori, voyage, user){
      user.tickets = user.tickets - voyage.price * favori.quantity
      console.log("favuepayein")
      this.$emit('send-payement',favori)
      this.$emit('update-tickets',user)
      this.$router.go()
      console.log("favuepayeout")
      console.log(favori)
      console.log(user)
    },
    editQuantity(voyage){
      this.editingQuantity.id = voyage.id
      this.ok=true
    },
    sendEditQuantity(){
      this.$emit('send-edit-quantity',this.editingQuantity)
      this.ok=false
      this.abortEditQuantity()
      this.$router.go()
    },
    abortEditQuantity(){
      this.editingQuantity={
        id:-1,
        quantity:0
      }
    },
    deletevoyage(favori) {
      this.$emit('delete-voyage', favori)
      this.$router.push('/favoris')
    }

  }
}


</script>
<style scoped>
#reserve p{
    margin-block-start: 0px;
    margin-block-end: 0px;
}
#reserve{
    margin-right: auto;
    margin-left: auto;
    font-size: 17px;
    color: white;
    text-align: center;
    display: block;
    background: rgb(212, 0, 0);
    text-transform: uppercase;
    padding: 13px;
    padding-left: 200px;
    padding-right: 200px;
    text-shadow: 2px 2px 2px black;
}
@media screen and (max-width:750px){
  #reserve{
      padding: 30px !important;
  }
    
}
h2{
    padding: 20px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
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


.voyage-img {
  flex: 1;
  margin-top: 80px;
}

.voyage-img div {
  width: 100px;
  height: 100px;
  background-size: cover;
  margin: auto;
}

.voyage-content {
  flex: 3;
}

.voyage-title {
  justify-content: space-between;

}
</style>
