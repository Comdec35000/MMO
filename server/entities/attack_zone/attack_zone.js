const Entity = require('../entity.js');

module.exports = class AttackZone extends Entity {
  constructor(game, creator, boundX, boundY, distX, distY, lifetime, damage) {

    super(game, boundX, boundY, creator.x + distX, creator.y + distY, Math.random());

    this.creator = creator;
    this.lifetime = lifetime;
    this.damage = damage;
    this.distX = distX;
    this.distY = distY;
    this.baseBoundX = boundX;
    this.baseBoundY = boundY;
  }

  update() {
    super.update();

    if(this.lifetime <= 0) {
      this.game.removeEntity(this);
    }


    if(this.creator.direction === 0) {
      this.boundX = this.baseBoundX;
      this.boundY = this.baseBoundY;
      this.x = this.creator.x + this.distX;
      this.y = this.creator.y + this.distY;
    } else if (this.creator.direction === 1) {
      this.boundX = this.baseBoundY;
      this.boundY = this.baseBoundX;
      this.x = this.creator.x - this.distY;
      this.y = this.creator.y + this.distX;
    } else if (this.creator.direction === 2) {
      this.boundX = this.baseBoundY;
      this.boundY = this.baseBoundX;
      this.x = this.creator.x + this.distY;
      this.y = this.creator.y + this.distX;
    } else if (this.creator.direction === 3) {
      this.boundX = this.baseBoundX;
      this.boundY = this.baseBoundY;
      this.x = this.creator.x + this.distX;
      this.y = this.creator.y - this.distY;
    }

    this.lifetime--
  }

  isColliding(entity) {
    if(entity == this.creator || entity instanceof AttackZone) {
      return false;
    } else {
      return this.x <= entity.x + entity.boundX
          && entity.x <= this.x + this.boundX
          && this.y <= entity.y + entity.boundY
          && entity.y <= this.y + this.boundY;
    }
  }
}
