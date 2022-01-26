//Ett klass som fick grunden alltså 10 % av den från shiffmans tutorial, och resten är egna kodar
// för att nå de önskade resultater


//Har skapat ett klass med sin stuktur
//x,y är positioner
//pushpower är stykan som objektet får för att y värde ska ökas för att objektet ska hoppa upp
//dirpower likna pushpower men den ändrar x värde istället för y
//Medan pushpower värdet ökas behövde jag något som kan stoppa denna ökningen så att grodan dras tillbaka, och därför gjordes gravity argument
//this.d är för objekt diameter
//ceiling värde är 0 här, men den ändras när grodan dör och hjälper pushpower för att grodan ska försvinna helt.
class Animal {
  constructor() {
    this.x = 80;
    this.y = 0;
    this.pushpower = 0;
    this.dirpower = 7;
    this.gravity = 3;
    this.d = 50;
    this.ceiling = 0;
  }

// en funktion för att objektet ska hoppar
//den är uppdelade till två deklarera

//första delen gör att grodan inte kan hoppa när som helst, utan den kan hoppa när dens positon är mer än 100
//Med tanken med att botten i canvas har den höga värdet alltså 400 och den blir mindre när man går upp
  jumping() {
    if (this.y > 100) {
      this.pushpower = -35;
    }
  }

//den andra delen är för att grodan ska hoppa och dras tillbaka efter en viss höjd
//y positon värde ökas kontinuerlig med pushpower som har ett -35 värde i början men ökas från garvity värde som är 3,
//Y värdet ändras hela tiden med hjälp av constrain funktion som gör att grodan ska befinna sig mellan ceiling och Blockzone
//I hela denhär delen använde vi oss om kopplingen mellan pushpower och gravity som ändras ständigt för skapa denna rörelse upp och ner, desutom använde vi oss
//av constrain för att kunna begränsa denn rörelse
  move() {
    this.y += this.pushpower;
    this.pushpower += this.gravity;
    this.y = constrain(this.y, this.ceiling,blockzone );
  }

//två funktioner för grodan ska kunna gå till höger och vänster genom att använda dirpower för att x position ska bli mindre eller större
//på if-satser gjordes så att när grodan får 0 som x position när den översitger canvas width, och samma
//händer att den får width värde för sin x när den passerar 0 position i x
//Målet är tydligt här, dvs. för at kunna röra på grodan mer fritt på ett sätt som liknar att den går förbi vägen och kommer från den andra
  move2(){
    this.x = this.x + this.dirpower;
    if (this.x > width) {
      this.x = 0;
    }
  }

  move3(){
    this.x = this.x - this.dirpower;
    if (this.x < 0) {
      this.x = width;
    }
  }

//Här en display funktion för att visa objektet som en bild , dvs. en groda.
  display() {
    image(animalImage, this.x, this.y, this.d, this.d);
  }
}
