//En klass för ett fiende, bossens
//den har några parameter
//Thissprite är är kopplad till creatsprite så att den kan skapas i setup eller draw och får sina parameter this.x och this.y från klasss

class Boss {
  constructor(_x, _y, _d) {
    this.x = _x;
    this.y = _y;
    this.d = _d;
    this.sprite = createSprite(this.x, this.y);
    this.dir = 2;
  }
//Move metod att den sprite rör sig från vänster till vänster.
//den börjar från vänster och x positonen ökas tills den blir nära den högra kanterna
//Då med else if får denna ökningen på x värdet minskas istället så att sprite öker från höger till vänster istället osv.
  move(){
    if (this.sprite.position.x > width-100) {
      this.dir = -2;
    }else if (this.sprite.position.x < 100) {
      this.dir = 2;
    }
    this.sprite.position.x = this.sprite.position.x + this.dir;
  }

//Shoot funktion så att skott skapas på olika sätt och har olika vinklar där de siktar på
//Alla skott börjar från bossens x och y positioner och skapas olika mellan shoot1-7
//Alla skott skapas från buller2 som skapas i sketchs setup i bullets2 grupp
//De får en bild som är bulletsImg2

//Shoot1 har random vinkel för skott och börjar när bossen och spelare har olika postioner
  shoot(){
    if (this.sprite.position.x > myPlayers[0].sprite.position.x) {
      bullet2 = createSprite(this.sprite.position.x,this.sprite.position.y);
      bullet2.addImage(bulletsImg2);
      bullet2.setSpeed(5,random(200,-100));
      bullet2.life = 130;
      bullets2.add(bullet2);
    }
  }

//Här är det tvärtom När spelare och bossen har samma x positon, skapas Skotten
//Skillnaden mellan shoot2, 3,4,5,6, och 7 är lite ändring för vinkel bara, men de ritas på samma sätt och här samma vilkorer
  shoot2(){
    if (this.sprite.position.x == myPlayers[0].sprite.position.x) {
      bullet2 = createSprite(this.sprite.position.x,this.sprite.position.y);
      bullet2.addImage(bulletsImg2);
      bullet2.setSpeed(10,80);
      bullet2.life = 100;
      bullets2.add(bullet2);
    }
}
    shoot3(){
      if (this.sprite.position.x == myPlayers[0].sprite.position.x) {
        bullet2 = createSprite(this.sprite.position.x,this.sprite.position.y);
        bullet2.addImage(bulletsImg2);
        bullet2.setSpeed(10,90);
        bullet2.life = 100;
        bullets2.add(bullet2);
      }
    }
    shoot4(){
      if (this.sprite.position.x == myPlayers[0].sprite.position.x) {
        bullet2 = createSprite(this.sprite.position.x,this.sprite.position.y);
        bullet2.addImage(bulletsImg2);
        bullet2.setSpeed(10,100);
        bullet2.life = 100;
        bullets2.add(bullet2);
      }
    }
    shoot5(){
      if (this.sprite.position.x == myPlayers[0].sprite.position.x) {
        bullet2 = createSprite(this.sprite.position.x,this.sprite.position.y);
        bullet2.addImage(bulletsImg2);
        bullet2.setSpeed(10,95);
        bullet2.life = 100;
        bullets2.add(bullet2);
      }
    }
    shoot6(){
      if (this.sprite.position.x == myPlayers[0].sprite.position.x) {
        bullet2 = createSprite(this.sprite.position.x,this.sprite.position.y);
        bullet2.addImage(bulletsImg2);
        bullet2.setSpeed(10,85);
        bullet2.life = 100;
        bullets2.add(bullet2);
      }
    }
    shoot7(){
      if (this.sprite.position.x == myPlayers[0].sprite.position.x) {
        bullet2 = createSprite(this.sprite.position.x,this.sprite.position.y);
        bullet2.addImage(bulletsImg2);
        bullet2.setSpeed(10,75);
        bullet2.life = 100;
        bullets2.add(bullet2);
      }
    }
}
