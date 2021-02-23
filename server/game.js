const Player = require('./entities/living/player.js');
const log = require('./utils/logger/logger.js');

module.exports = class Game {
  constructor(canvasSizeX, canvasSizeY, targetedFPSRate) {
    this.size = {
      x : canvasSizeX,
      y : canvasSizeY
    };
    this.targetedFPSRate = targetedFPSRate;
    this.ENTITY_LIST = [];
    this.LOGGER = new Logger('game');
  }


  mainloop() {
    setInterval(() => {
      this.update();
      this.sendRenderPackage();
    }, 1000 / this.targetedFPSRate)
  }


  update() {
    for (let entity of this.ENTITY_LIST) {
      entity.update();
    }
  }


  sendRenderPackage() {
    let renderData = [];

    for(let entity of this.ENTITY_LIST) {
      renderData.push(entity.renderData())
    }
    for(let entity of this.ENTITY_LIST) {
      if(entity instanceof Player) {
      entity.socket.emit('renderData', renderData);
      }
    }
  }


  addEntity(entity) {
    this.ENTITY_LIST.push(entity);
    this.LOGGER.log(`Created a new entity (id: ${entity.id}) at x:${entity.x} y:${entity.y}`)
  }


  removeEntity(entity) {
    this.ENTITY_LIST.splice(this.ENTITY_LIST.indexOf(entity), 1);
  }

  getPlayerCount() {
    let playerCount = 0;
    for(let entity of this.ENTITY_LIST) {
      if(entity instanceof Player) playerCount++;
    }
    return playerCount;
  }
}
