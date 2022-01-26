//En klass för en annan enemygrupp.
//den har några parameter
//Thissprite är är kopplad till creatsprite så att den kan skapas i setup eller draw och får sina parameter this.x och this.y från klass


//En variabel som deklareras här
let bullet2;

class Enemy3 {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.sprite = createSprite(this.x, this.y);
    this.dir = 2;
  }
//Move metod för rörelse
//Inget speciellt...En if-sats som hanterar det som skrivs under det..Där det står att x postion ökas med this.dir hela tiden
//I if-satsen begränsas rörelser så att this.dir blir -2 istället för +2 när x positonern blir när kanten osv.
  move5(){
    if (this.sprite.position.x > width-100) {
      this.dir = -2;
    }else if (this.sprite.position.x < 100) {
      this.dir = 2;
    }
    this.sprite.position.x = this.sprite.position.x + this.dir;
  }

//Shoot metod för stjutning
//Shoot funktion så att skott skapas på olika sätt och har en 90 vinkel där de stjuter mot spelare
//skott skaps i enemy3 x och y positioner
//Alla skott skapas från buller2 som skapas i sketchs setup i bullets2 grupp
//De får en bild som är bulletsImg2
  shoot(){
    if (this.sprite.position.x == myPlayers[0].sprite.position.x) {
      bullet2 = createSprite(this.sprite.position.x,this.sprite.position.y);
      bullet2.addImage(bulletsImg2);
      bullet2.setSpeed(7,90);
      bullet2.life = 100;
      bullets2.add(bullet2);
    }
  }
}
