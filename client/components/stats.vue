<template>
    <div>
        <title>Administrateur - Gorosa mon amour</title>

        <div id="prez" >
        <h2>Statistiques et organisations des voyages</h2>

        </div>
        <div id="adminmode" v-if=" user.id == 1 && isConnected">
            Administrator Mode
      </div>
      <br><br><br>
        <div class="choice" v-if=" user.id == 1 && isConnected">
            <div class="container">
           <article v-for="voyage in voyages" :key="voyage.id" class="card">

                    <div class="voyage-img">
                        <div :style="{ backgroundImage: 'url(' + voyage.image + ')' }">
                        </div>
                    </div>
                        
                        <div class="content">
                            <div>
                                <h3>{{voyage.name}}</h3>
                                <div style="padding-left: 50px;">
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
                                    <br>
                                    Nombre de places : {{voyage.nb_places}}
                                    <br>
                                    <article v-for="place in placesleft" v-if="place.choosen==voyage.id">

                                        <div v-if="voyage.nb_places > place.sum">
                                            Places restantes : {{voyage.nb_places - place.sum}}
                                        </div>
                                        <div v-else>
                                            COMPLET
                                        </div>
                                    </article>
                                    <br>
                                    - Passagers -
                                    <br><br>
                                </div>
                                <div id="scroll">
                                    <article v-for="fpayed in favorispayed" v-if="fpayed.choosen==voyage.id">
                                        {{fpayed.name}} : {{fpayed.payed}}  places <br>
                                    </article>
                                </div>
                            </div>
                        </div>
            </article>
            </div>
        </div>
        <div v-else id="prez">
          Vous n'avez pas accès à cette page.
      </div>
    </div>
</template>



<script>

module.exports = {  
    props: {
        voyages: { type: Array, default: [] },
        favoris : {},
        favorispayed:{},
        placesleft: {},
        isConnected: false,
        user:{}
    },
    data () {
        return{
            src: 'plane6.png',
            src1: 'plane1.png',
            src2: 'plane4.png',
            src3: 'plane5.png'
        }
    v}
}



</script>
<style scoped>

    #scroll{
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        scroll-snap-align: start;
        flex-shrink: 0;
        width: 300px;
        height: 85px;
        border-radius: 10px;
        transform-origin: center center;
        transform: scale(1);
        transition: transform 0.5s;
        position: relative;
        font-size: 100%;
    }
    .voyage-img {
        flex: 1;
        margin-top: 80px;
    }

    .voyage-img div {
        width: 100px;
        height: 100px;
        background-size: cover;
        margin-left: 7%;
    }
    .choice{
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
        min-height:50vh;
        background-image: url("fond51.jpg");
        margin-bottom: 100px;
        margin-left: 217px;
        margin-right: 247px;
        background-size: 1100px 800px;
    }
    .container{
        position: relative;
        width: 1000px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin:20px;
    } 
    .container .card{
        position: relative;
        height: 296px;
        background: rgb(0,0,0,0.800);
        display: flex;
        width: 45%;
        margin: 32px 25px;
        background-image: url("ciel.png");
    }

    .container .card .imgBx{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background: rgb(0,0,0,0.7);
        z-index:1;
        display:flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        transition: 0.5s ease-in-out;
    }
    .container .card:hover .imgBx{
        width: 150px;
        height:150px;
        left: -75px;
        top: calc(50% - 75px);
        transition: 0.5s ease-in-out;
    }
    .container .card .imgBx:before{
        content: attr(data-text);
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align:center;
        font-style: 6em;
        font-weight: 700px;
    }
    .container .card .imgBx img{
        max-width: 293px;
        transition:0.5s ease-in-out;
    }
    .container .card:hover .imgBx img{
        max-width: 150px;
    }
    .container .card .content{
        position: absolute;
        right:0;
        width: calc(100% - 75px);
        height: 100%;
        padding: 7px 20px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    h3{
        text-transform: uppercase;
        margin-bottom: 5px;
        font-size: 24px;
        font-weight: normal;
        text-align: center;
        margin: 0px;
    }

    .content div{
        padding-left: 30px;
        text-align: justify;
    }
    .content div p{
        font-family: calibri;
    }
    @media screen and (max-width:900px){
        .container{
            display: block !important;
        }
        .card{
            width: 100% !important;
        }
    }


</style>
