//En klass för de gula fiender
//den har några parameter
//Thissprite är är kopplad till creatsprite så att den kan skapas i setup eller draw och får sina parameter this.x och this.y från klasss


class Enemy {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.sprite = createSprite(this.x, this.y);
    this.dir = 2;
  }

//Denna klass här en enda metod som är en rörelse
//rörelse är byggd på två nivåer:
//Den första är att objekts x position ökas hela tiden, men när den blir mer än width, nollas den. så att rörelse loppas kontinuerligt
//Den andra nivå gäller y postion som ökas och minskas med hjälp av this.dir värde...med if-sastsen frå den en begränsning för hur hög och låg ska objekt ska kunna röra sig.
  move(){
    this.sprite.position.x = this.sprite.position.x + 5;
    if (this.sprite.position.x > width) {
      this.sprite.position.x = 0;
    }

    if (this.sprite.position.y > 400) {
      this.dir = -1;
    }else if (this.sprite.position.y < 60) {
      this.dir = 1;
    }
    this.sprite.position.y = this.sprite.position.y + this.dir;
  }
}
