
//Deklarerar arrays och variabler för spelare, fiender, bilder, texter och skott
let myPlayers = [];
let spelare;

let enemyBoss = [];
let boss;

let bullets;
let bullets2;
let bulletsImg;
let bulletsImg2;

let enemies;
let enemies2;
let enemies3;
let enemy = [];
let enemy2 = [];
let enemy3 = [];

let enemiesImg;
let enemiesImg2;
let enemiesImg3;

let instructionImg1;
let instructionImg2;
let instructionImg3;
let instructionImg4;

let startImg;
let startImg2;
let startImg3;
let bossImg;

//Deklarerar 2 variabler för att ha en start sida och byta till spel sida
let player = true;
let game = false;

//Deklarerar en deimeter för hälsa nivå
let healthsize = 100;


//Deklarerar ljud filer, bgmusic och explosion, shoot, win och loose....etc
let bgmusic;
let shootsound;
let expsound;
let started;
let gameoverstart;
let winstart;
let reachsound
let winsound;
let loosesound;

//Här Deklareras spelares och enemyboss liv.
let playerlife = 300;
let bosslife = 1000;


//Deklarerar ett antal för fiender som finns i spelet, och lägger senare if-satser på det värdet när det ändras
let enemies1count = 73;
let enemies3count = 7;

//Deklarerar Score som ökas med hjälp av if-satser senare i koden
let score = 0;

//Preload funktion för att säkerställa att alla ljud och bild filer har laddats upp innan spelet börjar.

//ljudfiler
function preload() {
  bgmusic = loadSound('sounds/bgmusic.mp3');
  shootsound = loadSound('sounds/shoot.wav');
  expsound = loadSound('sounds/explosion.wav');
  reachsound = loadSound('sounds/reach.wav');
  winsound = loadSound('sounds/win.wav');
  loosesound = loadSound('sounds/loose.mp3');

//Bilder
  playerImg = loadImage('images/player.png');
  startImg = loadImage('images/space_dash_start.png');
  startImg2 = loadImage('images/space_rush_logo.png');
  startImg3 = loadImage('images/R_namn_startsida.png');
  bossImg = loadImage('images/boss.png');
  bulletsImg = loadImage('images/bullet.png');
  bulletsImg2 = loadImage('images/bullet.png');
  enemiesImg = loadImage('images/enemy.png');
  enemiesImg2 = loadImage('images/enemy2.png');
  enemiesImg3 = loadImage('images/enemy3.png');
  instructionImg1 = loadImage('images/mouse.png');
  instructionImg2 = loadImage('images/enter.png');
  instructionImg3 = loadImage('images/mouse2.png');
  instructionImg4 = loadImage('images/shift.png');
}


//Här börjar setup funktion
function setup() {

//Canvas skapas här
  let myCanvas = createCanvas(1000, 650);
  myCanvas.parent('sketch-holder');

//Tre variabler för att styra när ljud börjar och byts, då när vadret ändras till true spelas ljud fil för den.
  started = false;
  gameoverstart = false;
  winstart = false;

//För att gömma muspekare inne i canvas
  noCursor();

//Här ritas tre sprite grupper som används senare
  bullets = new Group();
  bullets2 = new Group();

// Ett grupp-objekt för player-variabler
  spelare = new Group();

//Första variabel i myPlayers array blir ett objekt från Player klass
  myPlayers[0] = new Player();
//Den får en bild, och möjligt att den rör sig, och sen lägger jag den till spelare grupper
  myPlayers[0].sprite.addImage(playerImg);
  myPlayers[0].immovable = true;
  myPlayers[0].sprite.addToGroup(spelare);

// Ett grupp-objekt för player-variabler
  boss = new Group();

//Första variabel i enemyboss array blir ett objekt från Player klass
  enemyBoss[0] = new Boss(300, 300);

//Första variabel i array blir ett objekt från Player klass
  enemyBoss[0].sprite.addImage(bossImg);
  enemyBoss[0].immovable = true;
  enemyBoss[0].sprite.addToGroup(boss);
//Gav den en specifik plats där den vistas i början av spelet att den inte syns...Men senare i spelet med hjälp av klass metoder dyker den upp i canvas och möter spelare
  enemyBoss[0].sprite.position.x = -70;
  enemyBoss[0].sprite.position.y = 70;

//Deklarerer tre variabler för 3 arrays loopar så att dem skapas och läggs till en specifik objekt-grupp
  let i = 0;
  let j = 0;
  let t = 0;

// Ett grupp-objekt för enemy-variabler
  enemies = new Group();

//En loop för att skapa flera objekt
//Fick göra de som rader och kolumner
//Här exempelvis här vi 12 objekt i fyra rader, alltså vi skapar 48 objekt
  for(let enemyr = 0; enemyr<12; enemyr++)
  for(let enemyc = 0; enemyc<4; enemyc++) {
//Här används variabler i loopen för och skapar positioner för objekten
    enemy[i] = new Enemy(20+84*enemyr,170+50*enemyc);
//De får en bild och möjlighet att röra sig om det finns någon metod eller funktion för det, Sen läggs till till enemies grupp
    enemy[i].sprite.addImage(enemiesImg);;
    enemy[i].sprite.addToGroup(enemies);
    enemy[i].sprite.immovable = true;
    i ++;
  }
// Ett grupp-objekt för enemy-variabler
  enemies2 = new Group();

//En loop för att skapa flera objekt
//Fick göra de som rader och kolumner
  for(let enemyr = 0; enemyr<9; enemyr++)
  for(let enemyc = 0; enemyc<2; enemyc++) {
    enemy2[j] = new Enemy2(180+80*enemyr,80+50*enemyc);
//De får en bild och möjlighet att röra sig om det finns någon metod eller funktion för det, Sen läggs till till enemies2 grupp
    enemy2[j].sprite.addImage(enemiesImg2);;
    enemy2[j].sprite.addToGroup(enemies2);
    enemy2[j].sprite.immovable = true;
    j ++;
  }
// Ett grupp-objekt för enemy-variabler
  enemies3 = new Group();

//En loop för att skapa flera objekt
//Fick göra de som rader och kolumner
  for(let enemyr = 0; enemyr<7; enemyr++)
  for(let enemyc = 0; enemyc<1; enemyc++) {
    enemy3[t] = new Enemy3(260+80*enemyr,30+50*enemyc);
    //De får en bild och möjlighet att röra sig om det finns någon metod eller funktion för det, Sen läggs till till enemies3 grupp
    enemy3[t].sprite.addImage(enemiesImg3);;
    enemy3[t].sprite.addToGroup(enemies3);
    enemy3[t].sprite.immovable = true;
    t ++;
  }
}


//Här avslutas setup funktion och börjar Draw funktion

function draw() {
  background(33,23,40);


//If-sats för att ändra mellan två sidor, första sidan är start sida som innehåller texter, bilder och en animations loop
  if (game == false) {
    fill(40);
    rect(0,0,width,height);
    image(startImg2, 300, 100);
    image(startImg, 300, height/2-100);
    fill('white');
    textSize(40);
    text('Click anywhere to play!',300, height/2+110);
    image(startImg3, 300, height/2+150);
  }

//en loop för att skapa ett grafiskt uttryck för stjänor och rymd.
//olika positioner och storleker för ellipser med hjälp av random metod.
  if (game == true) {
    for(let i = 0; i < 30; i++) {
        let stardiameter = random(0.3, 1.8);
        let x = random(width);
        let y = random(height);
        noStroke();
        fill(255,255,255,400);
        ellipse(x, y, stardiameter, stardiameter);
    }

//Här görs metoder som finns i Enemy2 klass
//Metoden move för enemy[] array
    for (var i = 0; i < 48; i++) {
      enemy[i].move();
    };
//Här görs metoder för move i enemy2 klass med hjälp av if-satser...Jag gjorde att 65 är antalet på alla fiender i hela spelet,
//och den sifrra minskas senare med funktioner efter varje objekt som dör...
//När siffran minskas till ett visst nummer börjar några objekt från enemy2 röra sig, osv efter antalet.
//Fick plocka och välja dem från array och varibels siffra exempelvis enemy2[9]
//Alla if-satser ligger i varandra för att loopen ska gå genom alla if-satser inann den går vidare
    for (var j = 0; j < 18; j++) {
      if (enemies1count < 65) {
          enemy2[0].move1();
          enemy2[3].move2();
          if (enemies1count < 55) {
              enemy2[4].move3();
              enemy2[7].move4();
              if (enemies1count < 45) {
                enemy2[8].move3();
                enemy2[11].move4();
                if (enemies1count < 35) {
                  enemy2[12].move3();
                  enemy2[15].move4();
                  enemy2[16].move4();
                  if (enemies1count < 25) {
                    enemy2[1].move3();
                    enemy2[2].move4();
                    enemy2[5].move4();
                    if (enemies1count < 15) {
                      enemy2[6].move3();
                      enemy2[9].move4();
                      if (enemies1count < 10) {
                        enemy2[10].move3();
                        enemy2[13].move4();
                        if (enemies1count < 5) {
                          enemy2[14].move3();
                          enemy2[17].move4();
                        }
                      }
                    }
                  }
                }
             }
        }
      }

    };

//Här görs metoder som finns i Enemy3 klass
//Metoden move för enemy[] array
    for (var t = 0; t < 7; t++) {
      enemy3[t].move5();
//En lösning för att tabort skott som enemy skapar när de dör..
//Jag gjorde en tom if första att inget görs, sen om parameter i if inte finns skapas skotten
      if (enemy3[t].sprite.removed) {
      }else{
      enemy3[t].shoot();
      }
    };

//En funktion för spelares rörelse
    mousecontroll();

//Overlap funktion som finns i play biblioteket, den liknar collide..När spelares skott träffar fiender kallas en funktion explosion, explosion2 och explosion3.
     bullets.overlap(enemies, explosion);
     bullets.overlap(enemies2, explosion2);
     bullets.overlap(enemies3, explosion3);

//Här vi jag använda samma funktion (overlap) men via if sasen för att göra något som hälsa för spelare som minskas när
//spelare crockar med enemys eller när enemys bullets träffar spelare
//playerlifefun har ett värde som har deklarerats tidigare och minskas efter varje overlap med bullet2,enemies eller enemies2.
     if (myPlayers[0].sprite.overlap(bullets2)) {
       playerlifefun();
     };

     if (myPlayers[0].sprite.overlap(enemies)) {
       playerlifefun();
     }

     if (myPlayers[0].sprite.overlap(enemies2)) {
       playerlifefun();
     }
     if (myPlayers[0].sprite.overlap(enemies3)) {
       playerlifefun();
     }

//Här görs samma som spelares liv men med enemybossen
//enemylifefun här ett värde som minskas efter varje skott bossen får av spelare.
     if (enemyBoss[0].sprite.overlap(bullets)) {
       enemylifefun();
     }

//Här gör så att bossen får sina rörelser och dyker upp och möter spelare, som jag nämnde innan är bossen utan för canvas..
// men när antal enemies som spelet börjar med blir mindre än 1, alltså 0...börjar bossen animationer och metoder ske.
// och det är bl.a. skjutning (shoot, 1,2,3,4,5,6,7) och rörelser(move).
//Dessutom att bgmusik får en snabbare tempo för att få bättre upplevelse när det är fäligare mot bossen än små fiender
     if (enemies1count < 1) {
       bgmusic.rate(2);
       enemyBoss[0].move();
       if (enemyBoss[0].sprite.removed) {
       }else{
       enemyBoss[0].shoot();
       enemyBoss[0].shoot2();
       enemyBoss[0].shoot3();
       enemyBoss[0].shoot4();
       enemyBoss[0].shoot5();
       enemyBoss[0].shoot6();
       enemyBoss[0].shoot7();
       }
     }

//Här ritas alla Sprites från play biblioteket.
     drawSprites();

// Här visas den nederste delen av canvas, med score, instruktioner och hälsa
     stroke(0);
     strokeWeight(2);
     fill(105,105,105);
     rect(0,height-55,width,55);
     noStroke();
     fill(242);
     textSize(17);
     textStyle(BOLD)
     text('Your score is: '+ score , width - 480,height-20);
     text('Health ' , width - 180,height-30);

     textSize(15);
     fill('white');
     text('USE', 15,height-21);
     image(instructionImg3, 45, height-55);
     text('To move', 90,height-21);
     text('And', 175,height-21);
     image(instructionImg1, 199,height-55);
     text('Or', 243,height-21);
     image(instructionImg2, 270, height-49);
     text('Or', 320,height-21);
     image(instructionImg4, 350, height-49);
     text('To shoot', 400,height-21);

//Här ritas hälsa mätare för spelare, genom att rita två rect på samma positioner
//Den röda som är överst har ett värde för bredden som hämtas från plaerlife variabel..så att när playerlife blir mindre miskas bredden av rect.
// Alltså det visar som att blod blir mindre
     fill('white');
     rect(width - 310,height-23,300,15);
     fill('red');
     rect(width - 310,height-23,playerlife,15);
//Samma här med bossens blod, men något mer var att positioner på rects hämtas från bossens position, så att den följer bossen
     fill('white');
     rect(enemyBoss[0].sprite.position.x-50,enemyBoss[0].sprite.position.y-70,healthsize,15);
     fill('red');
     rect(enemyBoss[0].sprite.position.x-50,enemyBoss[0].sprite.position.y-70,bosslife/10,15);

//If-sats då om layerlife blir 0 ändra player till false..denna är kopplad till en funktion så att spelare inte kan stjuta längre.
//Sen visa en rect med texter att spelet är slut och score är så.
     if (playerlife == 0) {
       player = false;
       fill(169,169,169);
       rect(width/2-150, height/2-120, 300,200)
       textSize(40);
       fill('red');
       text('Game Over', width/2-105, height/2-15);
       textSize(20);
       fill('red');
       text('Your Score is: ' + score, width/2-85, height/2+15);
     }

//På samma sätt för bossen när bossenlife blir 0
//Visa texter och rect att spelar har vunnit.
     if (bosslife == 0) {
       fill(169,169,169);
       rect(width/2-150, height/2-120, 300,200)
       textSize(40);
       fill('blue');
       text('You Won', width/2-85, height/2-15);
       textSize(20);
       fill('blue');
       text('Your Score is: ' + score, width/2-75, height/2+15);
     }
  }

//Här gjordes en rec som border för hela canvas för att förbättra contrast i spelets
  noFill();
  stroke(240);
  strokeWeight(3)
  rect(1,0,width-3, height-3)
}

//mousePressed funktion när man trycker på start sidan ändras värdet på started och slider byter från start till spel, samt börjar bgmusik spelas.
function mousePressed(){
  if(!started){
  // Spela ljudet, sänk ljudet och loopa iställer för att bara spela det...
  //eftersom spelet kan ta mer än musikens speltid..så jag ville att den spelas om när den tar slut
  bgmusic.setVolume(0.05);
  bgmusic.loop();

  // Sätt started och soundOn till true.
  started=true;
}
//Det börjar också shootsound ljud att möjliggöras efter mousepressed
  shootsound.setVolume(0.08);
  shootsound.play();
// Här precis är det jag menar med att byta från start till spel
  game = true;

//En till if-sats  för att skapa bullet, alltså skott efter varje gång man trycker på musknapp.
//Skotten eller bullet skapas från sprite som gjordes i setup funktion och objekt från Bullets klass
//Start postionern hämtas från myPlayers[0] positioner, så att skotten skapas där spelaren finns.
//Bullets här en -90 vinkel för att dem ska skjuta upp mot fiender
  if (player == true) {
    var bullet = createSprite(myPlayers[0].sprite.position.x,myPlayers[0].sprite.position.y);
    bullet.addImage(bulletsImg);
    bullet.setSpeed(10,-90);
    bullet.life = 100;
    bullets.add(bullet);
  }
}



//En funktion för att spela bgmusik
function bgmusicplay(){
  bgmusic.play();
}

//Alternativ för hur man kan stjuta...Tanken var att i fall användare använder musplatta och inte en riktig datorsmus, då blir det möjligt att använda ENTER knapp.
//Shift knappen kan även användas för att stjuta för användare som är vänsterhand
function keyPressed(){
  if (player == true) {
    if (keyCode === ENTER || keyCode === SHIFT) {
      var bullet = createSprite(myPlayers[0].sprite.position.x,myPlayers[0].sprite.position.y);
      bullet.addImage(bulletsImg);
      bullet.setSpeed(10,-90);
      bullet.life = 100;
      bullets.add(bullet);
      shootsound.play();
      }
  }
}


//Funktionen som kallades tidigare när bullet träffar enemy2
//resultatet är att enemy och bullet tas bort.
//Ett ljud spelas som explostionsljud
//enemies1count minskas med ett.
//Score ökas med ett.
function explosion(bullet, enemy) {
  enemy.remove();
  bullet.remove();
  expsound.setVolume(0.08);
  expsound.play();
  enemies1count = enemies1count - 1 ;
  score += 1;
  //spriteB.score++;
}

//Samma här men något annat har gjorts..
//Vile ha länge liv för enemy två, alltså att den behöver två skott för att dö...
//Då gjorde jag att enemy2 ändrar grupp till enemy1 när den får ett skott..så att nästa
//gång när den får ett till skott får den samma reultat som enemy 1 får, alltså att den dör med ett skott
function explosion2(bullet, enemy2){
  enemy2.addToGroup(enemies);
  bullet.remove();
  reachsound.setVolume(0.08);
  reachsound.play();
  score += 3;
}

//Samma här men att enemy3 ändrar grupp till enemy2 som vidare ändras till enemy 1...Alltså enemy tre behöver 3 skot för att den ska dö.
function explosion3(bullet, enemy3){
  enemy3.addToGroup(enemies2);
  bullet.remove();
  reachsound.setVolume(0.08);
  reachsound.play();
  score += 5;
}


//En funktion för spelares liv..Den miskas med en när den kallas ...och när den blir 0 visas gameoverstart.
//gameoverstart har tidigare difinierats, men får en if-sats här att bgmusic pausas, och ett loosesound spelas.
function playerlifefun(){
  playerlife -= 1;
  if (playerlife < 1) {
    playerlife = 0;
    if(!gameoverstart){
    // Spela ljudet
    bgmusic.pause();
    loosesound.setVolume(0.05);
    loosesound.play();

    // Sätt started och soundOn till true.
    gameoverstart=true;
  }
  }
}


//en funktion för att miska bossens liv när metoden kallas, samt ökas score med ett.
//När bossensliv blir 0, tas bossen bort och winstart aktiveras, så att bgmusic pausas och winsound spelas
function enemylifefun(){
  bosslife -= 1;
  score += 1;
  if (bosslife < 1) {
    enemyBoss[0].sprite.remove();
    healthsize = 0;
    bosslife = 0;
    if(!winstart){
    // Spela ljudet
    bgmusic.pause();
    winsound.setVolume(0.05);
    winsound.play();

    // Sätt started och soundOn till true.
    winstart=true;
  }
  }

//Här har vi positoner som spelare objekt får ...X tas från mouseX och ligger i en constrain mellan 25 och width-25 så att spelare inte åker utanför anvas.
//samma gäller för Y. att den inte ökar högre än en viss nivå eller under canvas.
}
function mousecontroll(){
  myPlayers[0].sprite.position.x = constrain(mouseX, 25, width-25);
  myPlayers[0].sprite.position.y = constrain(mouseY, height - 400, height - 85 );
}
