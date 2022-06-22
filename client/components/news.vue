<template>
    <div>
        <title>A propos - Gorosa mon amour</title>

        <div id="adminmode" v-if=" user.id == 1 && isConnected">
            Administrator Mode
        </div>
        <br><br>
        <h2>L'incoyable aventure Gorosa <br>A la découverte de Mu Lyrae</h2>
        <div id="prez" >
                Il y a près de 600 ans, nos ancêtres terriens arrivaient sur Gorosa<br><br>
                <img width="170px" class="src" :src="gorosa"  alt="eho"><br><br>
                Gorosa fait 50.000 km de diamètre et est à l'image de notre planète originaire la Terre, membre du Système Solaire et située dans la voie Lactée, dans le sens où sa température y est supportable et son atmosphère est constituée d'un oxygène à peine-plus dense que le nôtre. 
                Les océans y sont oranges, certainement dû à la légère différence des éléments terriens, rendant le ciel et beaucoup d'autres choses orange également. Elle possède 2 ceintures d'astéroïdes qui maintiennent la gravité et permettent l'apparition d'îles folttant dans le ciel.
                
        </div>
        <div class="choice">
            <div class="container">
                <div class="card">
                    <div class="imgBx" data-text="">
                        <div>
                            <img width="500px" class="src" :src="src"  alt="eho">
                        </div>
                    </div>
                    <div class="content">
                        <div>
                            <h3>Une épopée spatiale</h3>
                            <p>Nous devons notre lumineusement vie Gorosesque à nos ailleux, qui ont quitté la terre par millions à bord d'un gigantesque vaisseau préhistorique : Magna Puppi. 10 milles étaient navigateurs, agronomes, médecins, défenseurs, s'occupant d'acheminer 11 millions d'êtres humains en hibernation vers une terre nouvelle.
                            <br>Après 15 millions d'années de voyage galactic à alterner les caisseaux de criogénisation et à se nourrir d'aliments étranges florissant dans trois grandes serres amazoniennes, Gorosa est atteinte. 
                            </p>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="imgBx" data-text="">
                        <div>
                            <img width="500px" class="src1" :src="src1" alt="eho">
                        </div>
                    </div>
                    <div class="content">
                        <div>
                            <h3>Le Gouvernement Comuniste de Gorosa</h3>
                            <p>
                                Une dizaine d'années après notre installation sur Gorosa, philosophes et originaux de toute sortent se penchèrent sur la réponse à la question de la meilleure vie universelle. 
                                <br>Après de grandes séances de refléxions méditatives, ils mirent l'accent sur l'éducation, instaurèrent le Gouvernement Communiste de Gorosa et enfermèrent toutes les personnes en quête de reconnaissance politique.
                            </p>
                            </div>
                    </div>
                </div>
                <div class="card">
                    <div class="imgBx" data-text="">
                        <div>
                            <img width="500px" class="src2" :src="src2" alt="eho">
                        </div>
                    </div>
                    <div class="content">
                        <div>
                            <h3>La Grande Dépression</h3>
                            <p>
                                Il y a une centaine d'années, Gorosa se fait percuter par un astéroïde, qui relâche des gazs aliens toxiques. Ces gazs se répandent sur l'ensemble de la planète et font tomber les gens en depression. 
                                <br>Des grandes campagnes anti-depressives sont alors lancées par le Gouvernement. Des activités et des divertissements sont organisés et permettent au peuple de se remettre sur les rails du train du bonheur.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="imgBx" data-text="">
                        <div>
                            <img width="300px" class="src3" :src="src3" alt="eho">
                        </div>
                    </div>
                    <div class="content">
                        <div>
                            <h3>L'Agence Spatiale Gorosienne</h3>
                            <p>
                                L'Agence Spatiale Gorosienne est créée par le Gouvernement Comuniste de Gorosa après que la Grande Depression ait été évincée. Les voyages inter-planétaires avaient débutés durant cette période, et leur immense succès implique leur persistance. 
                                <br>Chaque année, des expéditions sont organisées pour permettre à un nombre de citoyens de partir à la découverte d'une des quatre planètes voisines de Gorosa. 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    </div>
</template>



<script>

module.exports = {
    props: {
        isConnected: false,
        user: {}
    },
    data () {
        return{
            gorosa: 'plane.png',
            src: 'anc.jpg',
            src1: 'comu.jpg',
            src2: 'depr.jpg',
            src3: 'ppl.jpg'
        }
    }
}



</script>
<style scoped>

    .choice{
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
        min-height:50vh;
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
        
        background-image: url("ciel.png");
        display: flex;
        width: 45%;
        margin: 30px 0;
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
        padding: 20px;
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
