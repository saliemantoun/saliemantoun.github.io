//En klass för en annan enemygrupp.
//den har några parameter
//Thissprite är är kopplad till creatsprite så att den kan skapas i setup eller draw och får sina parameter this.x och this.y från klasss


class Enemy2 {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.sprite = createSprite(this.x, this.y);
  }

//Här finns flera metoder för rörelse, men alla har samma villkor och tanker men positoner ändra några pixlar till höger eller till vänster.
//Y position äkas hela tiden när metoden aktiveras,men när den blir lika stor som height, nollan den tillbaka för att loopa om rörelse.
//Här fick jag anända attractionPoint metod för att göra att objekt ska lockas till spelare, genom att göra att den får sin attraktion från mouseX.
//Eftersom mouseX är x postionen till spelare.
  move1(){
    this.sprite.position.y = this.sprite.position.y +0.2;
    if (this.sprite.position.y > height) {
      this.sprite.position.y = 0;
    }
   this.sprite.limitSpeed (1)
   this.sprite.attractionPoint(2.5,mouseX,height);
  }

  move2(){
    this.sprite.position.y = this.sprite.position.y +0.2;
    if (this.sprite.position.y > height) {
      this.sprite.position.y = 0;
    }
    this.sprite.limitSpeed (1)
   this.sprite.attractionPoint(2.5,mouseX+50,height);
  }

  move3(){
    this.sprite.position.y = this.sprite.position.y +0.2;
    if (this.sprite.position.y > height) {
      this.sprite.position.y = 0;
    }
    this.sprite.limitSpeed (1)
   this.sprite.attractionPoint(2.5,mouseX-50,height);
  }
  move4(){
    this.sprite.position.y = this.sprite.position.y +0.2;
    if (this.sprite.position.y > height) {
      this.sprite.position.y = 0;
    }
    this.sprite.limitSpeed (1)
   this.sprite.attractionPoint(2.5,mouseX+100,height);
 }
}
