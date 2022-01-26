// Deklarerar en mängd variabler
let songDuration, pausedTime, SoundOn, jump2, started, dying, percentPlayed, translateX, deadmusic, bgHue, xForImage, level, rawLevel, moon, moon2, smoothFactor, amplitude, translateValue, size, sun, frog2, mySound, myFont1, myFont2, myFont3, myFont4, theKim, bgRGB;

// Deklarerar och ger variabler värde.
let angle = 0;
let sum =1;


//Deklarerar en variabel för spel musikens speltid
let thisTime;


//En array som skapar olika y position senare
let waves = [];

//Deklarerar en variabel för ett objekt, objekt bild
let animal;
let animalImage;

//Deklarerar flera variablar för blocken som grodan hoppar på i spelet.
//Har gjot de som globala för att kunna ändra i dem senare i koden utan för där de står lokalt
let blockzone = 350;
let blocky1 = 240;
let blocky2 = 220;
let blocky3 = 200;
let blocky4 = 180;
let blocky5 = 160;
let blocky11 = 280;
let blocky22 = 240;
let blocky33 = 270;
let blocky44 = 240;
let blocky55 = 210;

//Fortsätter deklarera blocken variablers x och y positioner, och diameter. dvs storleker...Samma syfte med att ha de globala och inte lokala
let y1 = 240;
let y2 = 240;
let y3 = 240;
let y4 = 240;
let y5 = 240;
let x1 = 20;
let x2 = 230;
let x3 = 470;
let x4 = 700;
let x5 = 895;
let diameter1 = 85;
let diameter2 = 30;

//Declarerar variabler med start värde för poäng och hälsa för grodan
let health = 200;
let health2 = 0;
let scoring = 0;

//En array som ändrar färg med hjälp av random funktion senare på lava längst ner i canvas.
let colors = [
      [207,16,32],
      [255,69,0],
      [255,127,80],
      [255,165,0],
      [255,215,0],
      [255,140,0],
  ];

// Preloada ljudfil, bild(er) och typsnitt
//har lagt mer ljud filer och bilder som kommer att ändras beroende på det som händer i spelet.
function preload(){
  mySound = loadSound('assets/bensound-energy.mp3');
  jump2 = loadSound('assets/jump.mp3');
  deadmusic = loadSound('assets/coffin_song.mp3');


  //mySound = loadSound('assets/2_kindsa_love.mp3');
  myFont1 = loadFont('assets/Amatic-Bold.ttf');
  myFont2 = loadFont('assets/coiny-regular.ttf');
  myFont3 = loadFont('assets/gorillaz_1.ttf');
  myFont4 = loadFont('assets/UnifrakturMaguntia20.ttf');

  frog2 = loadImage('assets/frog2.png');
  moon2 = loadImage('assets/moon2.png');
  animalImage = loadImage('assets/frog.png');
  sun = loadImage('assets/sun.svg');
  moon = loadImage('assets/moon.png');

}

function setup(){
  canvas = createCanvas(1000, 400);
  canvas.parent('sketch-holder');

//har kallar jag efter ett objekt frång klass Animal, och kallar objektet för animal
  animal = new Animal();

  // Om ljudfilen är laddad;
  // ta reda på hur långt ljudet är och sätt volymen till 1 (alltså max, skalan går från 0 till 1).
  if(mySound.isLoaded()){
    songDuration = floor(mySound.duration());
    mySound.setVolume(0.07);

    // Sätt booleska variabler till false
    started = false;
    soundOn = false;

    // Här känns det logiskt att starta ljudet men eftersom flera webbläsare
    // inte tillåter automatisk uppspelning utan någon användarinteraktion behövs en
    // funktion som startar ljudet när användare klickar, se funktionen mousePressed() längre ned.
  }

  // Sätt utjämningsfaktor till 0.2, används i funktionen getVolume()
  smoothFactor = 0.2;

  // Skapa objekt för amplitud, används i funktionen getVolume() för att ta reda på volym-värde
  amplitude = new p5.Amplitude();

  // Sätt ett värde för att anpassa rotation till ljudets längd.
  translateValue = ((songDuration/25)/360);
}


function draw(){
//Här sätter jag värde på thisTime variabel...Värdet tas från musikens speltid som på går och appliceras i bakgrunds
//färger med lite matematiska uträkningar för kunna nå en spesifik färg mellan vit, grå till svart för att visa att det blir mörkare.
//Här fick jag utnyttja att currentTime räkning pågår hela tiden så länge musiken är på..Siffran som jag får fortsätter jobbet själv som en for loop.
  thisTime = mySound.currentTime();
  background(255-thisTime*5,255-thisTime*5,255-thisTime*5);


//Här har vi två variablar ..
//första har ett värde från ljudets Amplitude som definieras senare
//Sundiameter är en variabel som ändrar storlek på solen genom att få ett värde som mappas med det som tas från oundwave, alltså från Amplitude.
//Vidare skapara jag en grund för en for loop som gör en ständig skapning av ett värde som ändras hela tiden beroende på hur hög musiken är, alltså Amplitude.
  let soundwave = amplitude.getLevel();
  let sundiameter = map(soundwave, 0, 0.13, 90, 100);
  waves.push(soundwave);



//Här skapas en form via en for loop som får sin kontinuerlig loopning  från waves.length, dvs. från det som gjordes innan.
//värden som görs mappas igen i en array som skapar Y position för former som gör efter.
//Grund ide fick jag från Shiffmans tutorial men ändrade ganska mycket för att få spesifika resultat.
//Syftet med de vågor som skapar är för att rita något som liknar byggnade eller berger i mitten i bakgrunden, för att skapa lite rörelse med hjälp av ljud.
  beginShape();
  stroke(0+thisTime*5,0+thisTime*5,0+thisTime*5);
  fill(0+thisTime*5,0+thisTime*5,0+thisTime*5);
  for (var i = 0; i < waves.length; i++) {
    let y = map(waves[i], 0, 0.09, 300, 100);

//Här ritas former i loopen
//några + och - för få bättre resultat för det som ritas
    point(i-3, y-3);
    point(i-4, y-4);
    point(i-5, y-5);
    point(i+3, y+3);
    point(i+4, y+4);
    point(i+5, y+5);
    rect(i,y,2,y)
  }
  endShape();

//Här ritas månen och solen.
//solen får sin y position att ändras med hjälp av thisTime variabel som har skapats tidigare, och det är * 60 för att får snabbare tempo
//medan gjorde att månen är * 10 för långsammare tempo .....Här utnyttjar jag currenttime för musiken för att göra att solen och månen får en loop som pågår.
//sundiameter är en varjabel som får sitt värde från amplitude senare så att solen blir större och mindre .
  image(sun,width-thisTime*60,10, sundiameter, sundiameter);
  image(moon, 1200-thisTime*10, 10, 90, 90);


//Här ritas några block som grodan kan hoppa på
//de får sin y position med hjälp av map funktion som får sitt grund värde från sounwave, dvs. från amplitude värde.
//blocky häar jag deklarerat tidigare, men kommer att ändras senare när grodan dör .
// y får sit slut värde från block och inte direkt från map funktionen för att kunna skapa möjligheter för ändringar senare.
  let block1 = map(soundwave, 0, 0.03, blocky1, blocky11);
  y1 = block1;

  let block2 = map(soundwave, 0, 0.1, blocky2, blocky22);
  y2 = block2;

  let block3 = map(soundwave, 0, 0.03, blocky3, blocky33);
  y3 = block3;

  let block4 = map(soundwave, 0, 0.23, blocky4, blocky44);
  y4 = block4;

  let block5 = map(soundwave, 0, 0.02, blocky5, blocky55);
  y5 = block5;

//Här ritas några rect och de blocken som får sina färg från bgRGB varjabel som får sitt värde via floor och map funktioner som får sitt grund värde från level..alltså ljudet nivå
// jag har använt varjiablar för storleker för att kunna använda det vid ändringar
  fill(bgRGB*20,100,100);
  rect(x1, y1,diameter1,diameter2);

  fill(100,bgRGB*20,100);
  rect(x2, y2,diameter1,diameter2);

  fill(100,100,bgRGB*20);
  rect(x3, y3,diameter1,diameter2);

  fill(bgRGB*20,50,100);
  rect(x4, y4,diameter1,diameter2);

  fill(bgRGB*20,150,10);
  rect(x5, y5,diameter1,diameter2);

  fill(0,0,255-thisTime*2);
  rect(0,300,width,100);

  fill('green');
  rect(0,390,width,10);


//Här har vi en liknande loop som förra, men med några ändringar för att skapa något som liknar lavor
  beginShape();
  noStroke();
  fill(random(colors));
  for (var i = 0; i < waves.length; i++) {
    let y = map(waves[i], 0, 0.09, 400, 395);
    rect(i,y,20,y);
    ellipse(i+2,y+12, 7,5);
    ellipse(i+6,y+13, 8,6);
    ellipse(i+8,y+17, 9,4);
    ellipse(i+3,y+16, 7,5);
    ellipse(i+12,y+11, 10,6);
    ellipse(i,y, 10,3);
  }
  endShape();

//Här görs en if sats för kunna bestämma hur ritningen ska ske, genom att
//skapa en start punkt som specifierar det som hämtas från waves och definiera den efter, denna process gör att den grafiska ritningen går upp och ner.
  if (waves.length > width) {
    waves.splice (0, 1);
  }

//Här visas objektet som har skapats från Animal klass i setup, och dens move funktion
  animal.display();
  animal.move();

//Har hämtas också två andra funktioner för objektet men används direkt med if-sats som skapar rörelse till höger oc vänster med hjälp av knappar
//Fick använda keyIsPressed istället för keyPressed för att den ger
//kontinuerlig rörelse för grodan, medan keyPressed sker en gång efter varje klick sen stannar grodan.
  if (keyIsDown(LEFT_ARROW)) {
    animal.move3();
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      animal.move2();
    }

  // Hämta utjämnat värde för volym.
  level = getVolume();

  // Sätt ett RGB-nyans-värde relativt till volymvärde.
  bgRGB = floor(map(level, 0, 1, 0, 800));

// Om ljudet spelas
  if(mySound.isPlaying()){

    // Ta reda på hur stor procent av ljudet som spelats
    // med hjälp av 'aktuell spelad tid' och total tidslängd av ljudet.
    // Mappa om till en skala mellan 0 och 100 (alltså procent).
    percentPlayed=map(mySound.currentTime(), 0, songDuration, 0, 100);

    // Öka värde i angle med värde relativt till ljudets längd
    angle+=translateValue;

    // Sätt storleksvärde relativt till volymvärde.
    // Tänk på att level (alltså volymen) här är något värde mellan 0 och 1
    size = map(level, 0, 1, 0, 140);
    mySound.rate(1);
  }

  else{
    // Om percentPlayed är NaN (Not a Number), alltså om variabeln är tom
    // eller innehåller något annat än ett numeriskt värde;
    // Visa start-text. Detta blir bara sant innan ljudet startats för första gången.
    //Här fick jag lägga mer texter för bl.a. intruktioner och andra detlajer
    if(isNaN(percentPlayed)){
      textFont(myFont1);
      textAlign(CENTER);
      textSize(30);
      fill(0,0,100);
      text("Jump  through  the  RIGHT  wall  will  give  you  +1   POINT", width/2, height/2-70);
      text("Use --ARROWS-- to move and jump", width/2, height/2-100);
      text("FLOOR IS LAVA ", width/2, height/2-140);
    //Här ändras färg och storlek på sista texten för att skapa bättre kontrast och fokus på texten
      textSize(40);
      fill('red');
      text("Click to start", width/2, height/2-30);
    }
  }

  // Ändra värde translateX bara om procentvärdet är större än noll
  if(percentPlayed > 0){
    translateX = map(percentPlayed, 0, 100, 0, width);
  }


  // Om spelad procent av ljudets längd är mer än 10 och mindre än 30...
  if(percentPlayed > 10 && percentPlayed <30){
    textFont(myFont1);
    textSize(52);
    fill(0, 0, 100, 70);
    text("en tiondel av musiken spelad", width/2,height-40);
  }

  if(percentPlayed > 30 && percentPlayed <60){
    textFont(myFont2);
    textSize(42);
      fill(0, 0, 70, 70);
    text("30% of song played", width/2,height-40);
  }

  if(percentPlayed > 60 && percentPlayed <80){
    textFont(myFont3);
    textSize(52);
      fill(0, 0, 110, 70);
    text("60 percent of song played", width/2,height-40);
  }

  if(percentPlayed > 80 && percentPlayed <100){
    textFont(myFont4);
    textSize(62);
      fill(0, 0, 80, 70);
    text("Eighty percent played", width/2,height-40);
  }

  // Två html-element påverkas av innehållet i variabeln 'percentPlayed'. Titta i index.htm för att hitta elementen.
  // Experimentera gärna med att låta andra html-element förändras mha av (varierande) värden från sketchen.

  //Text som visar hur mycket % av ljudet har spelats
  //ändring för element i html sidan, som är en bild som får gå från vänster till höger genom att ökar margin från sidan på den.
  document.getElementById('procent-visare').innerHTML = floor(percentPlayed) + '% av ljudfil spelad...';
  document.getElementById('frogs').style.margin = (size/20) + 'em auto 0 ' + percentPlayed + '%';
  // if-satser nedan hämtar information från elemtet i index som har benämningen
  //#frogs och roterar 6 grader upp och sen roterar tilbaka till orginal
  //rotationen beroende på hur många procent av songen som spelats.
  //rotationerna börjar när låten spelats 19% och slutar efter 38%.
  if(percentPlayed > 19 && percentPlayed <20){
    document.getElementById('frogs').style.transform = 'rotate(-6' + 'deg)';
  }

  if(percentPlayed > 20 && percentPlayed <22){
    document.getElementById('frogs').style.transform = 'rotate(0' + 'deg)';
  }

  if(percentPlayed > 22 && percentPlayed <23){
    document.getElementById('frogs').style.transform = 'rotate(-6' + 'deg)';
  }

  if(percentPlayed > 23 && percentPlayed <25){
    document.getElementById('frogs').style.transform = 'rotate(0' + 'deg)';
  }

  if(percentPlayed > 25 && percentPlayed <26){
    document.getElementById('frogs').style.transform = 'rotate(-6' + 'deg)';
  }

  if(percentPlayed > 26 && percentPlayed <28){
    document.getElementById('frogs').style.transform = 'rotate(0' + 'deg)';
  }

  if(percentPlayed > 28 && percentPlayed <29){
    document.getElementById('frogs').style.transform = 'rotate(-6' + 'deg)';
  }

  if(percentPlayed > 29 && percentPlayed <31){
    document.getElementById('frogs').style.transform = 'rotate(0' + 'deg)';
  }

  if(percentPlayed > 31 && percentPlayed <32){
    document.getElementById('frogs').style.transform = 'rotate(-6' + 'deg)';
  }

  if(percentPlayed > 32 && percentPlayed <34){
    document.getElementById('frogs').style.transform = 'rotate(0' + 'deg)';
  }

  if(percentPlayed > 34 && percentPlayed <35){
    document.getElementById('frogs').style.transform = 'rotate(-6' + 'deg)';
  }

  if(percentPlayed > 35 && percentPlayed <37){
    document.getElementById('frogs').style.transform = 'rotate(0' + 'deg)';
  }

  if(percentPlayed > 37 && percentPlayed <38){
    document.getElementById('frogs').style.transform = 'rotate(-6' + 'deg)';
  }

  if(percentPlayed > 38 && percentPlayed <100){
    document.getElementById('frogs').style.transform = 'rotate(0' + 'deg)';
  }
  // här slutar if-satserna för #frogs.



//Här skapas ochdefiniera kollission ändringar som händer när grodan hoppar på blocken
//Fick använda mig av distans funktion och lite + och - för siffror för hitta ungefär rätt distans.
//x och y är blockens x och y, medan animal.x och animal.y är för grodan
//Blockzone är canvas botten som har gravitation för att grodan ska tillbaka till botten efter den hoppar, med gravitation får grodan en y position som den får i slutet av varje rörelse, men jag ändrade blockzone värde i if satsen
//  när distans mellan grodan och ett block blir mindre än 75 får grodan en ny blockzone värde dvs. y värde
// vidare gjorde jag lite detlajer som ändrar musik rym och hastighet på vissa block när distans mellan grodan och detta block blir mindre än 75.
//Denna kopplingen mellan musik rytm är kopplad till y postioner som blocken fick tidigare från amplitude..
//Rytm och hastighet påverker amplitude och level för musiken, vilket skapar ändrign för y postioner för blocken.
//Som slut resultat skapar jag svårare utmaning för användare i spelet på vissa block.
let d2 = dist(x1+15,y1,animal.x,animal.y);
if (d2 < 75){
blockzone = y1-40;
mySound.rate(2);
}else {
  blockzone = 350;
}

let d3 = dist(x2+15,y2,animal.x,animal.y);
if (d3 < 75){

blockzone = y2-40;
mySound.rate(0.7);
}

let d4 = dist(x3+15,y3,animal.x,animal.y);
if (d4 < 75){
blockzone = y3-40;
}


let d5 = dist(x4+15,y4,animal.x,animal.y);
if (d5 < 75){
mySound.rate(2);
blockzone = y4-40;
}

let d6 = dist(x5+15,y5,animal.x,animal.y);
if (d6 < 75){
mySound.rate(4);
blockzone = y5-40;
}

//if-sats för att göra att hälsa ska minskas när grodan står på botten
if (animal.y > 348){
health = health - 1;
}

//if-sats när hälsa är 0, får grodan en ny y position med hjälp av animal.ceiling.
//gravity försvinner för grodan så att den inte ska fastna i botten
//push power är styrka som skapar jump funktionr för grodan den får ett bestämt minus värde istället för ett vädre som ändras hela tiden i Animal klass
//målet här att grodan ska tappa gravitation och flyga upp till himlen och försvinna
// moon och grodan får andra bilder och utseende.
//Musiken som spelas från början minskas så mycket att den inte hörs istället för att den pausas, eftersom månen får sin placering av mySound, och om vi pausar mySound försvinner månen
//Sen kallas dead funktion som spelar musik och ändrar blockens positioner, men det kommer att detaljeras senare
if (health == 0){
 animal.ceiling = -90;
 animal.gravity = 0;
 animal.pushpower = -1;
 moon = loadImage('assets/moon2.png');
 animalImage = loadImage('assets/frog2.png');
 animal.d = 90;
 mySound.setVolume(0.0001);
 dead();
}

//En text som visas när animal.y blir mindre än 0 , alltså när grodan försvinner
if (animal.y < 0) {
  push();
    textSize(40);
    textFont(myFont2);
    stroke('white');
    strokeWeight(5);
    fill(0,0,100);
    text('Game over!     Press Reset to try again!', width/2, height/2-50);
  pop();
}

//If-sats som gör att man får m+ poäng när grodan går eller hoppar förbi canvasens width så att den passerar 0 inne i x position
if (animal.x == 0) {
  scoring = scoring + 1;
}
//Här gjorde jag så att man inte ska fuska och hoppa fram och tillbaka mellan kanterna för att få poäng
//...jag gjorde att om grodan går från 0 x postiotion till width x position från ett fel håll, miskas poängen.
if (animal.x == width) {
  scoring = scoring - 1;
}

//En text som visas ner i den vänstra hörnan för att visa poän och hälsa
push();
textFont(myFont1);
textSize(35);
fill('255')
text('Health ' + health + ' %',60,340);
text('Score: ' + scoring,52,375)
pop();
}


//Dead funktion som appliceras när grodan dör och försvinner.
//Här spelas en ny musiken
//Blocken får nya värde som skapare en andra rörelse med musiken
function dead(){
  deadmusic.play();
  blocky1 = 150;
  blocky2 = 150;
  blocky3 = 150;
  blocky4 = 110;
  blocky5 = 150;
  blocky11 = 165;
  blocky22 = 165;
  blocky33 = 165;
  blocky44 = 185;
  blocky55 = 165;
}

// Funktion som används för att starta/pausa ljudet vid musklick.
function mousePressed(){
  // Om ljudet inte är startat (started = false).
  // Här innebär att om started=false, har användaren INTE har startat ljudet genom att klicka FÖRSTA gången.
  // När användaren gjort detta (started=true) ska alla efterkommande musklick istället hantera start/paus-funktionalitet.
  // Detta eftersom vissa webbläsare inte tillåter automatisk (icke användar-initierad) uppspelning av t.ex. ljud.
  if(!started){
    // Spela ljudet
    mySound.play();

    // Sätt started och soundOn till true.
    started=true;
    soundOn=true;
  }

  // Annars - om ljudet är startat (started = true)
  else{
    // Om ljudet är på (soundOn = true)
    if(soundOn){
      // Pausa ljudet och sätt soundOn till false.
      mySound.pause();
      soundOn = false;
    }
    // annars (soundOn = false).
    else{
      // Spela ljudet och sätt soundOn till true.
      mySound.play();
      soundOn=true;
    }
  }
}

// Funkton som returnerar ett utjämnat volymvärde för att åstadkomma 'mjukare' animering av objekt.
function getVolume(){
  rawLevel = amplitude.getLevel();
  sum += (rawLevel-sum) * smoothFactor;
  return sum;
}


//Här har vi en keypressed funktion som applicerar två funktionerna
//Den första är att grodan ska hoppa och är detaljerad i Animal klass
//Den andra är för att spela en ljudeffekt
function keyPressed() {
 if (keyCode == UP_ARROW) {
    animal.jumping();
    jump2.play();
  }
}
