<template>
    <div>
        <head>
            <title>Accueil - Gorosa mon amour</title>
        </head>

        <h2>― Accueil ―</h2>
        
        <div id="adminmode" v-if=" user.id == 1 && isConnected">
            Administrator Mode
        </div>

        <!-- Grace au v-for de vue.js, on parcours les éléments de la table homeadm de notre base de données, qui conient les deux paragraphes de cette pages. --> 
        <article id="artidea" v-for="homead in homeadm" :key="homead.id">

            <div class="idea-content" v-if="editinghomead.id !== homead.id">

                <div id="presentation" :style="{ backgroundImage: 'url(' + homead.image + ')' }">

                    <!-- Ainsi, quand un administrateur membre du Gouvernement est connecté, il a la possibilité de changer le titre, le texte et l'image du paragraphe en cliquant simplement dessus,
                        grâce à la methode html 'contenteditable' qui permet de modifier le texte en cliquant dessus et à la methode 'edithomeadm' qui enregistre les changements dans la BDD (reliée à la BDD grâce à une API put).
                        Grâce au v-bind de vue.js, quand on passe la souris au dessus du texte modifiable il y a écrit "Cliquer pour modifier" -->
                    <div v-if=" user.id == 1 && isConnected" v-bind:title="souris">
                        <div @click="edithomead(homead)" :style="{ cursor: 'pointer' }" contenteditable="true" id="titles">{{ homead.title }}</div>
                    </div>
                    <div v-else>
                        <div id="titles">{{ homead.title }}</div>
                    </div>

                    <div v-if=" user.id == 1 && isConnected" v-bind:title="souris" :style="{ cursor: 'pointer' }">
                        <p @click="edithomead(homead)" contenteditable="true" :style="{ textIndent: '3em' }" >{{ homead.descri }}</p>
                    </div>
                    <div v-else>
                        <p :style="{ textIndent: '3em' }" >{{ homead.descri }}</p>
                    </div>

                    <div v-if="homead.id == 2">
                        <button><router-link to='/news' id="news">A propos</router-link></button>

                    </div>
                   
                    <div v-if="homead.id == 1">
                        <button><router-link to='/voyages' id="voyages">Voyages</router-link></button>

                        <div>
                            <p :style="{ textIndent: '3em' }">Rendez-vous sur l'espace citoyen ici : </p>
                        </div>
                        
                        <button><router-link to='/citoyen' id="citoyen">Refléxions citoyennes</router-link></button>


                    </div>
                    
                </div>
          </div>

          <div class="idea-content" v-else>
                <div id="presentation" :style="{ backgroundImage: 'url(' + homead.image + ')' }">

                <div id="titles"><input type="text" v-model="editinghomead.title"></div>
                            
                <textarea  :style="{ textIndent: '3em' }" v-model="editinghomead.descri"></textarea>
                        
                
                <input :style="{ textIndent: '3em'}" type="text" v-model="editinghomead.image" placeholder="Change our image">

                <div id="bou">
                    <button class="adminbtn" @click="sendEdithomead()">Propose</button>
                    <button class="adminbtn" @click="abortEdithomead()">Cancel</button>
                </div>

                </div>
            
          </div>

        </article>

        <article>

            <div v-if="isConnected">
                <h2>Ayez un avant goût de vos rêves avant qu'ils ne deviennent réalité</h2>
            </div>
            <div v-else id="prez">
                        
                Vous n'êtes pas connecté !
                <br><br>
                <div class="connex"><router-link to='/login'>Connexion</router-link></div>
                <br>
                <p style="font-family: calibri;"> Avez-vous un compte pour pouvoir profiter de toutes les fonctionalités du site de l'agence spatiale Gorosienne ? Si ce n'est pas le cas, inscrivez-vous pour pouvoir profiter des voyages que nous proposons à nos citoyens !
                <br> 
               </p>
                <br>

                <div class="connex"><router-link to='/register'>Inscription</router-link></div>

            </div>

        </article>
    </div>
</template>


<script>

module.exports = {
    
    props: {
        homeadm: { type: Array, default: [] },
        isConnected: false,
        user: {}
    },
    data () {
    return {
        souris: 'Cliquer pour modifier',
        editinghomead: {
            id: -1,
            title: '',
            descri: '',
            image:''
        }
    }
    },

  methods: {
    edithomead (homead) {
      this.editinghomead.id = homead.id
      this.editinghomead.title = homead.title
      this.editinghomead.descri = homead.descri
      this.editinghomead.image = homead.image
    },
    sendEdithomead () {
      this.$emit('update-homead', this.editinghomead)
      this.abortEdithomead()
      console.log("fin home")
    },
    abortEdithomead () {
      this.editinghomead = {
        id: -1,
        title: '',
        descri: '',
        image:''
      }
    }
  }
}

</script>
<style scoped>
#bou{
  display: flex;
}

.connex{
    border: 2px groove;
    padding: 6px;
    float: none;
    width: fit-content;
    display: block;
    margin: auto;
}
.connex:hover{
    background-color: rgba(0, 0, 0, 0.493);
    cursor: pointer;
}
#presentation{
    text-indent: -3em;
    margin: 80px 100px 53px;
    padding: 89px;
    background-position-y: top;
    padding-left: 300px;
    background-position-x: left;
    background-repeat: no-repeat;
    background-blend-mode: hue;
    background-size: contain;
    background-color: rgba(0, 0, 0, 0.370);
    text-align: justify;
    line-height: 30px;
    font-family: calibri;
    font-size: 20px;
    font-variant: small-caps;
    font-weight: 500;
    text-shadow: black 1px 0px 4px;
}

@media screen and (max-width:900px){
    #presentation{
        margin-left: 0px !important;
        margin-right: 0px !important;
        padding: 50px !important;
    }
}
#titles{
    text-align: center;
    padding-bottom: 50px;
    font-size: 23px;
    font-family: 'bc-alphapipe', sans-serif;
}
#titles input{
    background-color: rgb(0,0,0,0);
    color: white;
    font-family: 'bc-alphapipe', sans-serif;
    text-align: center;
    border: none;
    font-size: 23px;
    padding: 0px;
    margin: 0px;
}
input, textarea{
    background-color: rgb(0,0,0,0);
    color: white;
    font-family: 'bc-alphapipe', sans-serif;
    text-align: center;
    border: none;
    font-size: 20px;
    padding: 0px;
    margin: 0px;
    text-align: justify;
    line-height: 30px;
    font-family: calibri;
    font-size: 20px;
    font-variant: small-caps;
    font-weight: 500;
    text-shadow: black 1px 0px 4px;
}
textarea{
    width: 100%;
    height: 220px;
    margin-block-start: 1em;
    margin-block-end: 1em;
    resize: none;
}

</style>
