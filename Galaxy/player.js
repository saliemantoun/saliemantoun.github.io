//En klass för spelare
//den har några parameter
//Thissprite är är kopplad till creatsprite så att den kan skapas i setup eller draw och får sina parameter this.x och this.y från klasss

class Player {
  constructor(_x, _y, _d) {
    this.x = _x;
    this.y = _y;
    this.d = _d;
    this.sprite = createSprite(this.x, this.y)
  }
}
