<template>
  <div>
      <title>Voyages - Gorosa mon amour</title>

        <div id="adminmode" v-if=" user.id == 1 && isConnected">
            Administrator Mode
            <br>
            <small>Les membres du Gouvernement peuvent également partir en voyage groupé..</small>
      </div>

      <h2 >― Voyages dans le Système de Mu Lyrae ―<br><div style="font-size: 15px;"><br>AN 600</div></h2>

      <div id="prez">Gorosa est située dans une galaxie assez proche de la Voie lactée : la galaxie du cigare. Il comprend de nombreuses étoiles et corps célestes, et parmi eux se trouve le système Mu Lyrae, l'étoile autour de laquelle gravite Gorosa et 4 autres planètes, nommées par nos scientifiques, où nous vous proposons de voyager ! Les voici, ci-dessous.
        <br> Vous pouvez réserver un voyage ici, la réservation sera stockée dans vos favoris. Vous confirmerez plus tard votre achat.
        <div  v-if="isConnected">
            Accédez à vos voyages favoris ici :  <button><router-link to='/favoris' id="favoris">Favoris</router-link></button>
            Veuillez actualiser la page pour mettre à jour la carte du ciel !<button onClick="window.location.reload()">Actualiser</button>
            <!--Nous utilisons ce bouton pour recharger la page car nous avions un problème : il fallait recharger la page pour afficher les bons voyages à l'intérieur après une connexion. Avant de choisir un voyage, il est conseillé de raffraichir la page-->
        </div>
        <div v-else>Pour pouvoir réserver un voyage, connectez-vous :<button><router-link to='/login'>Connexion</router-link></div></button>


      </div>

    <br><br>
<div id="essai">

<div id="systeme_solaire">
    <div id="radi">
        <div id="soleil" style="background-size: cover;" :style="{ backgroundImage: 'url(soleil.png)' }">
              </div>
    </div>
    
    <div id="salusasecundus" class="orbite">
        <div id="planete_salusasecundus">
          <div class="plane1" style="background-size: cover;" :style="{ backgroundImage: 'url(plane1.png)' }">
              </div>
        </div>
    </div>
    
    <div id="tapiwin" class="orbite">
        <div id="planete_tapiwin">
          <div class="plane4" style="background-size: cover;" :style="{ backgroundImage: 'url(plane4.png)' }">
              </div>
        </div>
    </div>
    
    <div id="gorosa" class="orbite">
        <div id="planete_gorosa">
          <div class="gorosa1" style="background-size: cover;" :style="{ backgroundImage: 'url(plane.png)' }">
              </div>
            <div id="lune" class="orbite">
                <div id="astre_lune">
                </div>
            </div>
        </div>
    </div>
    
    <div id="stultitia" class="orbite">
        <div id="planete_stultitia">
          <div class="plane5" style="background-size: cover;" :style="{ backgroundImage: 'url(plane5.png)' }">
              </div>
        </div>
    </div>
    
    <div id="lammamagnam" class="orbite">
        <div id="planete_lammamagnam">
          <div class="plane6" style="background-size: cover;" :style="{ backgroundImage: 'url(plane6.png)' }">
              </div>
        </div>
    </div>
    
</div>

<div id="info">
    <p id="toto">― Planètes ―</p>

    <article v-for="voyage in voyages" :key="voyage.id">
          <div v-if="voyage.id == 1">
                  
              <div id="info_lammamagnam" class="titre_info" @mouseover="lammamagnamain()" @mouseleave="lammamagnamout()">{{ voyage.name }} - {{ voyage.price }}$<br></div>
              <div id="cadre_lammamagnam">{{ voyage.description }}</div>

          </div>

          <div v-if="voyage.id == 2">
              <div id="info_salusasecundus" class="titre_info" @mouseover="salusasecundusin()" @mouseleave="salusasecundusout()">{{ voyage.name }} - {{ voyage.price }}$<br></div>
              <div id="cadre_salusasecundus">{{ voyage.description }}</div>
          </div>
          <div v-if="voyage.id == 3">

            <div id="info_tapiwin" class="titre_info"  @mouseover="tapiwinin()" @mouseleave="tapiwinout()">{{ voyage.name }} - {{ voyage.price }}$<br></div>
            <div id="cadre_tapiwin">{{ voyage.description }}</div>
          </div>
          
          <div v-if="voyage.id == 4">

            <div id="info_stultitia" class="titre_info"  @mouseover="stultitiain()" @mouseleave="stultitiaout()">{{ voyage.name }} - {{ voyage.price }}$<br></div>
            <div id="cadre_stultitia">{{ voyage.description }}</div>
          </div>


        <div id="btnplanet" v-if="isConnected">

            <div v-if="Object.keys(favoris).length==0">

                <article v-for="place in placesleft" v-if="place.choosen==voyage.id">
                    <div v-if="voyage.nb_places <= place.sum">
                        <div :style="{ textTransform: 'uppercase', textAlign: 'center', color: 'tomato' }">
                            COMPLET
                        </div>
                    </div>
                    <div v-else>
                        <div id="btnplanet">
                            <button @click="addToPanier(voyage.id)">Choisir</button>
                        </div>
                    </div>
                </article>

            </div>


            <div v-else-if="favoris.find(voyages => { if (voyages.choosen == voyage.id) { return true } })" >
                <p :style="{ textTransform: 'uppercase', textAlign: 'center', color: 'tomato' }">Choisi</p>
            </div>

            <div v-else-if="favoris.find(voyages => { if (voyages.choosen != voyage.id) { return true } })">

                <article v-for="place in placesleft" v-if="place.choosen==voyage.id">
                    <div v-if="voyage.nb_places <= place.sum">
                        <div :style="{ textTransform: 'uppercase', textAlign: 'center', color: 'tomato' }">
                            COMPLET
                        </div>
                    </div>
                    <div v-else>
                        <div id="btnplanet">
                            <button @click="addToPanier(voyage.id)">Choisir</button>
                        </div>
                    </div>
                </article>
                  
            </div>
              
        </div>
          
    </article>
</div>
</div>
    <div id="prez"> 
    
        Plus en détails :
        <br>
    </div>
     <article v-for="voyage in voyages" :key="voyage.id">

                <article id="boom">

                    <div id="book1">
                        <div class="voyage-img">
                      <div :style="{ backgroundImage: 'url(' + voyage.image + ')' }">
                      </div>
                    </div>
                        <br>
                    </div>
                    <div id="dos">
                        <h3>{{ voyage.name }}</h3>
                        <p id="rere">― Info ―</p>
                        <p id="res"> {{ voyage.price }}$ par passager, le nombre de place se choisit lors de la réservation.<br>
                            {{ voyage.description }}
                            <br>
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
                            
                            <br>Le nombre de place total est {{ voyage.nb_places }}.
                            
                            <br>
                            <article v-for="place in placesleft" v-if="place.choosen==voyage.id">
                                        places restantes : {{voyage.nb_places - place.sum}}
                                </article>
                            <div id="btnplanet" v-if="isConnected">

                                <div v-if="Object.keys(favoris).length==0">

                                    <article v-for="place in placesleft" v-if="place.choosen==voyage.id">
                                        <div v-if="voyage.nb_places <= place.sum">
                                            <div :style="{ textTransform: 'uppercase', textAlign: 'center', color: 'tomato' }">
                                                COMPLET
                                            </div>
                                        </div>
                                        <div v-else>
                                            <div id="btnplanet">
                                                <button @click="addToPanier(voyage.id)">Choisir</button>
                                            </div>
                                        </div>
                                    </article>

                                </div>


                                <div v-else-if="favoris.find(voyages => { if (voyages.choosen == voyage.id) { return true } })" >
                                    <p :style="{ textTransform: 'uppercase', textAlign: 'center', color: 'tomato' }">Choisi</p>
                                </div>

                                <div v-else-if="favoris.find(voyages => { if (voyages.choosen != voyage.id) { return true } })">

                                    <article v-for="place in placesleft" v-if="place.choosen==voyage.id">
                                        <div v-if="voyage.nb_places <= place.sum">
                                            <div :style="{ textTransform: 'uppercase', textAlign: 'center', color: 'tomato' }">
                                                COMPLET
                                            </div>
                                        </div>
                                        <div v-else>
                                            <div id="btnplanet">
                                                <button @click="addToPanier(voyage.id)">Choisir</button>
                                            </div>
                                        </div>
                                    </article>
                                    
                                </div>
                                
                            </div>
                        </p>
                        <br>
                    </div>
                </article>
                <br><br>
        </article>


<br><br><br><br><br>





  </div>
</template>

<script>
module.exports = {
  props: {
    voyages: { type: Array, default: [] },
    favoris: {},
    placesleft: {},
    isConnected: false,
    user: {}
  },
  data () {
    return {
      editingvoyage: {
        id: -1,
        name: '',
        description: '',
        image: '',
        price: 0
      }
    }
  },
  methods: {
    addToPanier(voyageId){
      this.$emit('add-to-panier', voyageId)
      this.$router.go()
    },
    salusasecundusin: function(){
        document.getElementById('salusasecundus').style.border='1px solid tomato';
        document.getElementById('salusasecundus').style.transition= '0.5s';

    },
    salusasecundusout: function(){
        document.getElementById('salusasecundus').style.border='1px solid rgba(95, 56, 56, 0.527)';
        document.getElementById('salusasecundus').style.transition= '0.5s';
    },
    tapiwinin: function(){
        document.getElementById('tapiwin').style.border='1px solid tomato';
        document.getElementById('tapiwin').style.transition= '0.5s';

    },
    tapiwinout: function(){
        document.getElementById('tapiwin').style.border='1px solid rgba(95, 56, 56, 0.527)';
        document.getElementById('tapiwin').style.transition= '0.5s';
    },
    stultitiain: function(){
        document.getElementById('stultitia').style.border='1px solid tomato';
        document.getElementById('stultitia').style.transition= '0.5s';

    },
    stultitiaout: function(){
        document.getElementById('stultitia').style.border='1px solid rgba(95, 56, 56, 0.527)';
        document.getElementById('stultitia').style.transition= '0.5s';
    },

    lammamagnamain: function(){
        document.getElementById('lammamagnam').style.border='1px solid tomato';
        document.getElementById('lammamagnam').style.transition= '0.5s';

    },
    lammamagnamout: function(){
        document.getElementById('lammamagnam').style.border='1px solid rgba(95, 56, 56, 0.527)';
        document.getElementById('lammamagnam').style.transition= '0.5s';
    }
  }
}


</script>

<style scoped>
.in{
  border: 1px solid tomato;
  transition: 0.5s;
}

.out{
    border: '1px solid rgba(95, 56, 56, 0.527)';
    transition: 0.5s;
}


#btnplanet{
  display: contents;
      margin-left: auto;
}
button{
  height: 31px;
}

#artvoy{
  width: 80%;
    margin: auto;
    text-align: justify;

}
.voyage-img {
  flex: 1;
  margin: auto;
}

.voyage-img div {
  width: 100px;
  height: 100px;
  background-size: cover;
      margin: auto;
}

.voyage-content {
  flex: 3;
      background-color: rgba(0, 0, 0, 0.493);
    margin-bottom: 10px;
    padding: 15px;
}

.voyage-title {
  display: flex;
  justify-content: space-between;
}

textarea {
  width: 100%;
}




#info{
    padding-top: 50px;
    margin-left: 20%;
}

#essai{
    background-image: url("ciel.png");
    background-color: rgb(2, 8, 13,0.500);
    background-position: top;
    padding-top: 46px;
    padding-left: 17px;
    padding-bottom: 92px;
    margin: auto;
    display: flex;
    z-index: 4;
}
#systeme_solaire{
    width: 824px;
    height: 618px;
    padding-top: 100px;
    padding-left: 60px;
}

.orbite{
	position: absolute;
	border-radius: 50%;
	border: 1px solid rgba(95, 56, 56, 0.527);
    transition: 0.5s;
    z-index: 0;
}

#soleil {
    position: absolute;
    height: 270px;
    width: 270px;
    border-radius: 50%;
    margin-top: 82px;
    margin-left: 134px;
    transition: 0.5s;
}

#radi{
    position: absolute;
    height: 270px;
    width: 270px;
    border-radius: 50%;
    margin-top: 82px;
    margin-left: 134px;
    transition: 0.5s;
}

#salusasecundus{
    position: absolute;
    width: 300px;
    height: 300px;
    margin-top: 149.5px;
    margin-left: 250.5px;
}

#planete_salusasecundus{
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;

    -webkit-animation: orbite_salusasecundus 5.8s linear infinite;
	animation: orbite_salusasecundus 5.8s linear infinite;
    margin-top: 145px;
    margin-left: 144px;
}

.plane1{

    border-radius: 50%;

    position: absolute;
    width: 40px;
    height: 40px;
    margin-top: -6.5px;
    margin-left: 33.5px;
}

    @-webkit-keyframes orbite_salusasecundus {
        from { -webkit-transform: rotate(180deg) translateY(-75px);}
        to { -webkit-transform: rotate(-180deg) translateY(-75px);}
    }

    @keyframes orbite_salusasecundus {
        from { transform: rotate(180deg) translateY(-150px);}
        to { transform: rotate(-180deg) translateY(-150px);}
    }

    @-moz-keyframes orbite_salusasecundus {
        from { -moz-transform: rotate(180deg) translateY(-75px);}
        to { -moz-transform: rotate(-180deg) translateY(-75px);}
    }

#tapiwin{
    position: absolute;
    width: 350px;
    height: 350px;
    margin-top: 126px;
    margin-left: 225px;
}

#planete_tapiwin{
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    -webkit-animation: orbite_tapiwin 7.2s linear infinite;
	animation: orbite_tapiwin 7.2s linear infinite;
    margin-top: 170px;
    margin-left: 170px;
}

.plane4{

border-radius: 50%;

position: absolute;
width: 55px;
height: 55px;
margin-top: -14px;
margin-left: 33.5px;
}

    @-webkit-keyframes orbite_tapiwin {
        from { -webkit-transform: rotate(180deg) translateY(-100px);}
        to { -webkit-transform: rotate(-180deg) translateY(-100px);}
    }

    @keyframes orbite_tapiwin {
        from { transform: rotate(180deg) translateY(-180px);}
        to { transform: rotate(-180deg) translateY(-180px);}
    }

    @-moz-keyframes orbite_tapiwin {
        from { -moz-transform: rotate(180deg) translateY(-100px);}
        to { -moz-transform: rotate(-180deg) translateY(-100px);}
    }

#gorosa{
    position: absolute;
    width: 450px;
    height: 450px;
    margin-top: 75px;
    margin-left: 175px;
}

#planete_gorosa{
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    -webkit-animation: orbite_gorosa 12s linear infinite;
	animation: orbite_gorosa 12s linear infinite;
    margin-top: 220px;
    margin-left: 220px;
}

.gorosa1{

border-radius: 50%;

position: absolute;
width: 70px;
height: 70px;
margin-top: -25px;
margin-left: 33.5px;
}

    @-webkit-keyframes orbite_gorosa {
        from { -webkit-transform: rotate(180deg) translateY(-125px);}
        to { -webkit-transform: rotate(-180deg) translateY(-125px);}
    }

    @keyframes orbite_gorosa {
        from { transform: rotate(180deg) translateY(-228px);}
        to { transform: rotate(-180deg) translateY(-228px);}
    }

    @-moz-keyframes orbite_gorosa {
        from { -moz-transform: rotate(180deg) translateY(-125px);}
        to { -moz-transform: rotate(-180deg) translateY(-125px);}
    }


#lune{
    position: absolute;
    width: 80px;
    height: 80px;
    margin-top: -27px;
    margin-left: 28px;
}

#astre_lune{
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: rgb(209, 209, 209);
    -webkit-animation: orbite_lune 1s linear infinite;
	animation: orbite_lune 1s linear infinite;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.4);
    margin-top: 39px;
    margin-left: 38px;
}

    @-webkit-keyframes orbite_lune {
        from { -webkit-transform: rotate(-180deg) translateY(-11px);}
        to { -webkit-transform: rotate(180deg) translateY(-11px);}
    }

    @keyframes orbite_lune {
        from { transform: rotate(-180deg) translateY(40px);}
        to { transform: rotate(180deg) translateY(40px);}
    }

    @-moz-keyframes orbite_lune {
        from { -moz-transform: rotate(-180deg) translateY(-11px);}
        to { -moz-transform: rotate(180deg) translateY(-11px);}
    }


#stultitia{
    position: absolute;
    width: 600px;
    height: 600px;
    margin-top: 0px;
    margin-left: 100px;
    z-index: 3;
}

#planete_stultitia{
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    -webkit-animation: orbite_stultitia 22.5s linear infinite;
	animation: orbite_stultitia 22.5s linear infinite;
    margin-top: 296px;
    margin-left: 294px;
}

.plane5{

border-radius: 50%;
box-shadow: inset 0 3px 1px rgba(0, 0, 0, 0.4);

position: absolute;
width: 40px;
height: 40px;
}

    @-webkit-keyframes orbite_stultitia {
        from { -webkit-transform: rotate(180deg) translateY(-150px);}
        to { -webkit-transform: rotate(-180deg) translateY(-150px);}
    }

    @keyframes orbite_stultitia {
        from { transform: rotate(180deg) translateY(-320px);}
        to { transform: rotate(-180deg) translateY(-320px);}
    }

    @-moz-keyframes orbite_stultitia {
        from { -moz-transform: rotate(180deg) translateY(-150px);}
        to { -moz-transform: rotate(-180deg) translateY(-150px);}
    }

#lammamagnam{
    position: absolute;
    width: 750px;
    height: 750px;
    margin-top: -82px;
    margin-left: 24px;
}

#planete_lammamagnam{
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    -webkit-animation: orbite_lammamagnam 130.3s linear infinite;
	animation: orbite_lammamagnam 130.3s linear infinite;
    margin-top: 369px;
    margin-left: 370px;
}
.plane6{

border-radius: 50%;
box-shadow: inset 0 3px 1px rgba(0, 0, 0, 0.4);

position: absolute;
width: 45px;
height: 45px;
margin-top: -16px;
margin-left: 33.5px;
}

    @-webkit-keyframes orbite_lammamagnam {
        from { -webkit-transform: rotate(180deg) translateY(-175px);}
        to { -webkit-transform: rotate(-180deg) translateY(-175px);}
    }

    @keyframes orbite_lammamagnam {
        from { transform: rotate(180deg) translateY(370px);}
        to { transform: rotate(-180deg) translateY(370px);}
    }

    @-moz-keyframes orbite_lammamagnam {
        from { -moz-transform: rotate(180deg) translateY(-175px);}
        to { -moz-transform: rotate(-180deg) translateY(-175px);}
    }


.titre_info, #toto{
    position: relative;
    cursor: default;
    font-size: 24px;
    color: whitesmoke;
    transition: 0.5s;
    text-align: center;
    text-decoration: none;
}

.titre_info:hover{
    color: tomato;
    font-size: 25px;
    transition: 0.5s;
}

#info_salusasecundus{
    margin-top: 10%;
    
}
#info_tapiwin{
    margin-top: 10%;
}
#info_gorosa{
    margin-top: 10%;
}
#info_stultitia{
    margin-top: 10%;
}
#info_lammamagnam{
    margin-top: 10%;
}
#info_soleil{
    margin-top: 10%;
}
#info_lune{
    margin-top: 10%;
}

#cadre_salusasecundus, #cadre_tapiwin, #cadre_gorosa, #cadre_stultitia, #cadre_lammamagnam, #cadre_soleil, #cadre_lune{
    position: absolute;
    width:400px;
    margin-left: -60%;
    margin-top: -10%;
    padding:10px;
    background-color: rgba(0, 0, 0, 0.521);
    border: 1px solid tomato;
    border-radius: 3px;
    color:rgb(253, 166, 151);
    font-size:20px;
    transition: all 0.4s;
    opacity: 0;
    text-align: justify;
}


#info_salusasecundus:hover ~ #cadre_salusasecundus, #info_tapiwin:hover ~ #cadre_tapiwin, #info_gorosa:hover ~ #cadre_gorosa, #info_stultitia:hover ~ #cadre_stultitia, #info_lammamagnam:hover ~ #cadre_lammamagnam, #info_soleil:hover ~ #cadre_soleil, #info_lune:hover ~ #cadre_lune{
    opacity: 1;
    margin-left: -60%;
    transition: all 0.4s;
    z-index: 2;
}



h3{
    font-size: 20px;
    font-weight: 500; 
}
h2{
    font-size: 20px;
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

 #boom{
        width: 60%;
        padding: 30px;
        margin: auto;
        margin-top: 0px;
    }
#dos{
    background-image: url("ciel.png");
    background-color: rgba(0, 0, 0, 0.493);
    color: white;
    top: 50%;
    width: 80%;
    text-align: center;
    padding: 10px;
    margin: auto;  
}
#phi{
    width: 60%;
    padding: 30px;
    
    font-size: 14px;
    margin: auto;
    margin-top: 0px;
}
    
#rere{
    text-transform: uppercase;
    font-weight: normal;
    font-size: 18px;
}
    #res{
    background-color: rgba(0, 0, 0, 0.494);
    padding: 15px;
    margin-block-start: 0px;
    text-align: justify;
    font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
    line-height: 30px;
    font-size: 19px;
    text-shadow: black 1px 0px 4px;
}
#book1{
    margin: auto;
}
#book1 img{
        margin: auto;
display: block;
}
    
@media screen and (max-width:900px){

    #boom, #monphi, #phi{
        text-align: center;
        width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
        flex-direction: column;
        margin: auto !important;
        font-size: 2vw;
    }

    #monphi{
        display: block;
    }
    #boom p, #phi p{
        margin-left: 10px;
        margin-right: 10px;
    }

    #boom img, #phi img{
        max-width: 90%;
    }

}

@media screen and (max-width:600px){

    #res{
        font-size: 13px;
    }
}


</style>

