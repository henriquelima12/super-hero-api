const token = "10207244891555840";
const urlBase = "https://superheroapi.com/api.php/" + token;
var vetorAtributos = [ ];
var vetorHerois = [ ];
var heroiMaisForte = null;
var maisForte = 0;
var contador = 0;

window.onload = function(){
    getJSON(urlBase + "/" + randomHero(), showCard);
    getJSON(urlBase + "/" + randomHero(), showCard);
    getJSON(urlBase + "/" + randomHero(), showCard);


    // var superHero1, superHero2, superHero3;
    // var superHeroes  = [superHero1, superHero2, superHero3];

}

function randomHero () {
    var hero = Math.floor(Math.random() * 731 + 1);
    return hero;
}

function comparaAtributos() {

  for ( var i = 0 ; i <3 ; i++) {
    if (vetorAtributos[i] >= maisForte)
    {
      maisForte = vetorAtributos [i];
      heroiMaisForte = vetorHerois[i];
    }
  }
}

function showCard(data){
    var img = data.image.url;


    // ATRIBUTOS


    var inteligencia = parseInt(data.powerstats.intelligence);
    var forca = parseInt(data.powerstats.strength);
    var velocidade = parseInt(data.powerstats.speed);
    var resistencia = parseInt(data.powerstats.durability);
    var poder = parseInt(data.powerstats.power);
    var combate = parseInt(data.powerstats.combat);


    var card = "<article>";
    card += "<img src='" + img + "'/>";
    card += "<h1>" + data.name + "</h1>";


    card += "<div>Intelligence:<br>";
    card += "<div class='intelligence' style='width:"+inteligencia+"%'></div>";
    card += "</div>";

    card += "<div>Strength:<br>";
    card += "<div class='strength' style='width:"+forca+"%'></div>";
    card += "</div>";

    card += "<div>Speed:<br>";
    card += "<div class='speed' style='width:"+velocidade+"%'></div>";
    card += "</div>";

    card += "<div>Durability:<br>";
    card += "<div class='duralibity' style='width:"+resistencia+"%'></div>";
    card += "</div>";

    card += "<div>Power:<br>";
    card += "<div class='power' style='width:"+poder+"%'></div>";
    card += "</div>";

    card += "<div>Combat:<br>";
    card += "<div class='combat' style='width:"+combate+"%'></div>";
    card += "</div>";

    card += "</article>";

    document.body.innerHTML += card;

    vetorAtributos.push(inteligencia+forca+velocidade+resistencia+poder+combate);
    vetorHerois.push(data.name);
    console.log(vetorAtributos);
    console.log(vetorHerois);

    comparaAtributos();
    contador +=1;

    // faz a comparacao entre os atributos e exibe depois da terceira rodada
    if (contador == 3){
      var resultado = "<br><br><br><article><h1> O heroi mais forte é o "+heroiMaisForte+" e ele tem "+maisForte+" pontos!! </h1> </article>";
      document.body.innerHTML+=resultado;
    }

}



function getJSON(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.onload = function(){
        if (xhr.status === 200){
            console.log("Dados recebidos com sucesso!");
            callback(xhr.response);
        } else {
            console.warn("Problemas ao conectar com a API: " + xhr.status);
        }
    }
    xhr.send();
}
