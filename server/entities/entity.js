
const log = require('../utils/logger/logger.js');

module.exports = class Entity {
  constructor(game, boundX, boundY, x, y, id) {
    this.game = game;
    this.boundX = boundX;
    this.boundY = boundY;
    this.x = x;
    this.y = y;
    this.id = id;

    this.LOGGER = new Logger(`Entity id:${this.id}`);
  }
  isColliding(entity) {
    return this.x <= entity.x + entity.boundX
        && entity.x <= this.x + this.boundX
        && this.y <= entity.y + entity.boundY
        && entity.y <= this.y + this.boundY;
  }
  async update() {
    for(let entity of this.game.ENTITY_LIST) {
      if(this.isColliding(entity) && entity != this) {
        await this.collideEntity(entity);
      }
    }
  }

  renderData() {
    return {
      id : this.id,
      x : this.x,
      y : this.y,
      boundX : this.boundX,
      boundY : this.boundY
    };
  }

  collideEntity(entity) {
    this.LOGGER.log(`collided an entity (id : ${entity.id})`)
  }

}
