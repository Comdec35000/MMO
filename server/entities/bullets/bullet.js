const Entity = require('../entity.js');

module.exports  = class Bullet extends Entity {
  constructor(game, creator, boundX, boundY, x, y, angle, velocity, lifetime, damage) {
    super(game, boundX, boundY, x, y, Math.random());
    this.angle = angle;
    this.baseSpeed = velocity;
    this.lifetime = lifetime;
    this.creator = creator;
    this.damage = damage;
  }
  isColliding(entity) {
    if(entity == this.creator || entity instanceof Bullet) {
      return false;
    } else {
      return this.x <= entity.x + entity.boundX
          && entity.x <= this.x + this.boundX
          && this.y <= entity.y + entity.boundY
          && entity.y <= this.y + this.boundY;
    }
  }
  update() {
    super.update();

    if(this.lifetime <= 0) return this.game.removeEntity(this);

    this.x += (Math.cos(this.angle*Math.PI/180) * this.baseSpeed);
    this.y += (Math.sin(this.angle*Math.PI/180) * this.baseSpeed);

    this.lifetime--
  }
  collideEntity(entity) {
    this.lifetime = 1;
  }
}
