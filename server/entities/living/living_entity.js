const Entity = require('../entity.js');
const Player = require('./player.js');
const Bullet = require('../bullets/bullet.js');
const AttackZone = require('../attack_zone/attack_zone.js');

module.exports = class LivingEntity extends Entity {
  constructor(game, boundX, boundY, x, y, hp, direction, id) {
    let realID = id || Math.random()*100000000;
    super(game, boundX, boundY, x, y, realID);

    this.maxHp = hp;
    this.hp = hp;
    this.direction = direction;
  }

  renderData() {
    return {
      id : this.id,
      x : this.x,
      y : this.y,
      boundX : this.boundX,
      boundY : this.boundY,
      direction : this.direction,
      hp : this.hp
    };
  }

  isColliding(entity) {
    if(entity instanceof Bullet && entity.creator.id === this.id) {
      return false;
    } else {
      return this.x <= entity.x + entity.boundX
          && entity.x <= this.x + this.boundX
          && this.y <= entity.y + entity.boundY
          && entity.y <= this.y + this.boundY;
    }
  }

  collideEntity(entity) {
    if((entity instanceof Bullet || entity instanceof AttackZone) && entity.creator.id != this.id) {
      this.hp -= entity.damage;
    }
  }
}
