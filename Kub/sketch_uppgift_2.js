
//Deklaration för texure som skapar den grafiska formen på boxarna

let r = 10;
let a = 0;
let c = 20;
let graphicart;

//Deklaration för boxens storlek
let boxsize = 60;


//Deklaration för slider och checkboxar
let xSlider;
let ySlider;
let zSlider;
let pointLightEnable = false;
let doubleRotationEnable = false;
let buildEnable = true;

//Deklaration för för färger som ändras efter varje mus klick
var bgColor;



//Här börjar Setup function där saker applicerars en gång när sidan laddas
function setup() {


//Canvas storlek där visas det som ritas i Setup och Draw
//600 * 600 är canvas storlek.
//WEBGL är system för att kunna se 3D objekt som Sphere, Box och Plane.
  canvas =createCanvas(600, 600, WEBGL);
  canvas.parent('sketch-holder');


//Variabel som innehåller random function som ändrar färger på RGB system
  bgColor = color( random(255), random(255), random(255) );

//Här skapas slider som används för att ändra och ge enkla funnktioner till det som ritas
//siffrorna här 80, 240, 80,20 visar olika värde...Första siffran det minsta värde som appliceras..
//den andra siffran är den maximala värde.. tredje är värdet som presenteras efter sidan laddas, medan den fjärde är hur mycket ska vädet ändras med sliden
// I det här fallet efter 80 blir värdet 100 eftersom ett 20 adderas.
// den andra gruppen av siffror 20,20, är för positioner x, y
  xSlider = createSlider(80, 240, 80,20);
  xSlider.position(20, 205);
  ySlider = createSlider(80, 240, 80,20);
  ySlider.position(20, 235);
  zSlider = createSlider(80, 240, 80,20);
  zSlider.position(20, 265);


  //Här har vi 3 checkboxar som innehåller ett namn i en text, ett boolean med samma värde
  //som finn i deklarationen i början och det är false, postioner x och y, och en changed function som ändras när man trycker på checkboxen

  //Första box
  pointLightCheck = createCheckbox(
      "Enable dark mode", false);
      pointLightCheck.position(20, 20);

// Change funktion
  pointLightCheck.changed(() => {
      pointLightEnable = !pointLightEnable;
    });



// Andra box
  doubleRotationCheck = createCheckbox(
      "Enable Full Rotation", false);
      doubleRotationCheck.position(20, 50);

// Change funktion
  doubleRotationCheck.changed(() => {
      doubleRotationEnable = !doubleRotationEnable;
    });



// tredje box
  buildCheck = createCheckbox(
      "Cube Mode/ X, Y, Z", true);
      buildCheck.position(20, 175);

// Change funktion
  buildCheck.changed(() => {
      buildEnable = !buildEnable;
    });



//En grafisk canvas som ska appliceras på boxarna med hjälp av texture funktion
  graphicart = createGraphics(600, 600);
}
//Här avslutas Setup och börjar Draw funktion




//Här börjar draw funktion

function draw() {

//En funktion för att kunna ändra Kamera view och se objekt som ritas från alla håll, sidor , avstånd och nära håll.
  orbitControl();

//Background funktion som ändrar sin färg med bgcolor variabel som får sina färger med hjälp av random funktion på RGB färger
  background(bgColor);

//En lokal deklaration för pointLight funktion som göra att muspekaren blir som en lampa och lyser på objekt när den kommer nära dem.
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;

//push och pop för att begränsa och spara alla egenskaper på bara det här objektet som finns i mellan.
  push();

//En matematisk uträkning som vi fick använda från nätet för en cirkle diameter och
//räknas och den resulteras i två variabler x och y...Här ser vi också r och c variabler som har fasta värden i deklaration, och den kan ändras för att få andra grafiska resultat.
//Den matematisk uträkning används för att kunna rita texture som finns i den grafiska variabeln på en en rundig form som börjar från mitten.
//Man kan ändra den här räkingen med en liknande som räknar diameter för en fyrakantigs form för att ritningen blir som en fyrakant.
  let x = r + c * sin(a);
  let y = r + c * cos(a);

//Lite egenskaper för den grafiska texture med runda formen
//den får sina färger och stroke av bgcolor som har definierats tidigar
//Den runda formen ritas av ellipser, me man kan ändra den så att den ritas av t.ex. rect eller line istället.
  graphicart.fill(bgColor);
  graphicart.stroke(bgColor);
  graphicart.ellipse(x + 300, y + 300, 50, 50);

//Matte räkningen som har definierats tidigare får en ökning på båda variabler, siffrorna här kan ändras för att få det önskade resultat.
  c += 1.09;
  a += 0.8;
  pop();


//Här skapas variabler som ta värden från sliders som har skapatas i setup funktionen.
  let xval = xSlider.value();
  let yval = ySlider.value();
  let zval = zSlider.value();


//En if-sats som är kopplad till en checkbox som gör att innehållet appliceras när man checkar boxens.
//Här finns det en loop som innehåller en nested loop som också innehåller en till nested loop...
//Förts loopen är för X, alltså för bredden, medan den andra är Y för höjden, båda två skapar en loop som ritar ett innehåll som beskrivs senare.
//Den tredje loopen är Z, dvs. för djupet...Speciellt när vi syftar på att rita mer rader bakom den raden som skapas med X och Y variabler.
//xval här kontrolleras av slider som visas tidigare...Den är för att kunna bestämma själv hur många objekt på varje rad, med tanken med
// att varje rad innebär här bredden X, höjden Y och djupet Z
  if(buildEnable){
      for (let x = -80; x <= 100; x += xval) {
          for (let y = -80; y <= 100; y += yval) {
            for (let z = -80; z <= 100; z += zval) {

//Alla loopar skapr det som finns mellan push och pop.
//Texture är för att sträcka den grafiska ritning som gjordes tidigare på boxshapes
//Här används translate för att göra postioner, eftersom vi har 3D objekt som har endas en paramater som bestämmer storlek.
//if-satsen här är kopplad till en checkbox för att applicera light funktion som bärs på musens pekare.
//Boxshape är ett objekt som difinieras tidigare jag valde att göra den som en funktion och seperat objekt för att kunna nå en
// rotation för boxarna som delar, eftersom om jag använder rotation här får jag råtation för hela loopen som en hel.
              push();

              texture(graphicart);
              translate(x, y, z);
              if (pointLightEnable){
                pointLight(135, 206, 235, locX, locY, 80);
              }
              boxshape();

              pop();
            }
          }
        }

// Om if värdet som kopplad till boxen inte görs då appliseras den här loopen
//Här finns det samma loopar men utan Z loopen, med lite positionoch storlek ändringar
// för att kunna sprida objekten på hela skärmen utan att ha någon annan objekt rad bakom-
  }else{
    for (let x = -243; x <= 262; x += 97) {
      for (let y = -180; y <= 280; y += 120) {
          push();
          texture(graphicart);
          translate(x, y);

          if (pointLightEnable){
            pointLight(135, 206, 235, locX, locY, 50);
          }
          boxshape();
          pop();
      }
    }
  }
}


//Här visar funktionen för objektet som skapas och kallas i loopen...
//let x och ry r för rotationen som görs med muspekarens rörelse i canvas.
//Rotation har två sätt, första är bara mot ett håll, medan den andra som
//appliceras med checkboxen här för alla håll så att användare kan manipulera rotationen på alla håll.
//PI är ett matematiskt värde som står för en cirkels omkrets och dess diameter...
//cos och sin är trigonometriska funktioner i det matte och används i för att räkna trianglars viklar och sidor-
//uträkningen här fick vi ta från nätet från ett xample som visar rotationen på ett objekt...Men vi fick ändra lite i den för att når det önskade resultat.
function boxshape(){

  let rx = map(mouseX, 0, width, -PI ,PI);
  let ry = map(mouseY, 0, height, -PI, PI);
  push();
  rotateY(rx);
  if (doubleRotationEnable){
    rotate(-ry+0.2, [cos(rx), 0, sin(rx)]);
  }
  box(boxsize);
  pop();
}

//En mousePressed funktion för att ändra värden på bgColor(RGB färger) när man klickar på muspekaren på webbplatsen.
function mousePressed(){
	bgColor = color( random(255), random(255), random(255) );
}
