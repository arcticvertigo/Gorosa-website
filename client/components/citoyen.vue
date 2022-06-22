<template>
  <div>
      <head>
        <title>Réflexions citoyennes - Gorosa mon amour</title>
      </head>
      <h2>― Réflexions citoyennes ―</h2>

      <div id="adminmode" v-if=" user.id == 1 && isConnected">
            Administrator Mode
      </div>

      <div v-if="isConnected">  
        <div id="prez">
                Ici, vous pouvez très chers citoyens exposer les retours de vos excursions, vos méditations pré-excursion ou toute autre idée épatante. Une image représentative est cependant nécessaire ! 
                <br>
                L'Agence Spatiale se permettra de retirer les commentaires incorrects ou malvenus.
        </div>
        <form @submit.prevent="addidea">
          <h4>Réflexion transcendentale</h4>
          <input type="text" v-model="newidea.name" placeholder="Titre" required>
          <textarea style="margin: 10px; font-family: bc-alphapipe, sans-serif;" type="text" v-model="newidea.description" placeholder="Méditation" required></textarea>
          <input type="text" v-model="newidea.img" placeholder="Lien vers votre image" required>
          <button style="margin: 10px" type="submit">Poster</button>
        </form>

        <article id="artidea" v-for="idea in ideas" :key="idea.id">
          
              
          <div class="idea-content" v-if="editingidea.id !== idea.id">

            <div class="idea-img">
                <div :style="{ backgroundImage: 'url(' + idea.img + ')' }">
                </div>
            </div>
            
            <div class="idea-title">
              <h3>{{ idea.name }}</h3>
              
            </div>
            <p>{{ idea.description }}</p>
            <p style="padding-top:0px; padding-bottom:10px; font-family: bc-alphapipe, sans-serif;"> Par {{ idea.nom }}</p>

              <div id="bou" v-if="user.id == idea.owner || user.id == 1">
                <button @click="deleteidea(idea.id)">Supprimer</button>
                <button @click="editidea(idea)">Modifier</button>
              </div>
          </div>
          <div class="idea-content" v-else>
            <div class="idea-title">
              <h3><input type="text" v-model="editingidea.name"></h3>
              <p><textarea style="width: 100%; font-family: bc-alphapipe, sans-serif;" v-model="editingidea.description"></textarea></p>
              <input type="text" v-model="editingidea.img" placeholder="Lien vers votre image">
              <div id="bou">
                <button @click="sendEditidea()">Poster</button>
                <button @click="abortEditidea()">Annuler</button>
              </div>
            </div>
            
          </div>
          
        </article>
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
    ideas: { type: Array, default: [] },
    user:{},
    isConnected: false
  },
  data () {
    return {
      newidea: {
        name: '',
        description: '',
        img:''
      },
      editingidea: {
        id: -1,
        name: '',
        description: '',
        img:''
      }
    }
  },
  methods: {
    addidea () {
      this.$emit('add-idea', this.newidea)
      this.newidea.name = ""
      this.newidea.description = ""
      this.newidea.img = ""
      this.$router.go()  
    },
    deleteidea (ideaId) {
      this.$emit('delete-idea', ideaId)
    },
    editidea (idea) {
      this.editingidea.id = idea.id
      this.editingidea.name = idea.name
      this.editingidea.description = idea.description
      this.editingidea.img = idea.img
      
    },
    sendEditidea () {
      this.$emit('update-idea', this.editingidea)
      this.abortEditidea()
    },
    abortEditidea () {
      this.editingidea = {
        id: -1,
        name: '',
        description: '',
        img:''
      }
    }
  }
}
</script>

<style scoped>

input{
  text-align: center;
  margin: 10px; 
  font-family: bc-alphapipe, sans-serif;
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
h4{
    font-size: 20px;
    font-weight: normal;
    text-align: center;
    text-transform: uppercase;
    color: white;
    word-spacing: 15px;
    letter-spacing: 9px;
    text-shadow: 2px 2px 3px black;
   margin: 0px;
}
h3{
    font-size: 20px;
    font-weight: normal;
    text-align: center;
    text-transform: uppercase;
    color: white;
    word-spacing: 15px;
    letter-spacing: 9px;
    text-shadow: 2px 2px 3px black;
    margin: 0px;
    padding-top: 73px;
}


#artidea{
    width: 80%;
    margin: auto;
    text-align: justify;

}

#bou{
  display: flex;
  background-color: rgba(0, 0, 0, 0.494);
}

.idea-content {
    flex: 3;
    margin-bottom: 15px;
    padding: 15px;
    text-align: justify;
    padding-right: 50px;
    padding-left: 50px;
    clear: both;
}

.idea-title {
    justify-content: space-between;
    text-align: center;
    margin: auto;
    display: block;
    background-color: rgba(0, 0, 0, 0.494);
}

.idea-img {
    width: 100%;
    height: 140px;
}

.idea-img div {
    width: 50%;
    height: 360px;
    margin: auto;
    background-size: cover;
}

form{
    text-align: center;
    width: 60%;
    margin: auto;
    margin-bottom: 0px;
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.223);
    padding: 30px;
}
.idea-content p{
    background-color: rgba(0, 0, 0, 0.494);
    margin: 0px;
    padding: 50px;
    font-family: calibri;
    line-height: 165%;
    
}

@media screen and (max-width:900px){
  .idea-img div {
    width: 80% !important;
    height: 360px !important;
  }
  form{
        width: auto !important;
    margin-top: 20px !important;
    margin-bottom: 20px !important;
  }
  #artidea{
        width: auto !important;
  }
}

@media screen and (max-width:600px){
  .idea-img div {
      width: 100% !important;
      height: 360px !important;
  }
  #prez{
    margin: 0px;
  }
  .idea-content{
    padding: 0px !important;
  }
  #artidea{
    margin-bottom: 50px !important;
  }
}

</style>

