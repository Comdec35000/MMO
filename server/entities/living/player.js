const LivingEntity = require('./living_entity.js');
const SwordBaseAttack = require('../attack_zone/sword_basic.js');
const log = require('../../utils/logger/logger.js')

module.exports = class Player extends LivingEntity {
  constructor(game, x, y, hp, socket) {
    super(game, 20, 20, x, y, hp, 0, socket.id);
    this.socket = socket;

    this.keyState = {
      up : false,
      down : false,
      right : false,
      left : false,
      useMainItem : false,
      mouseAngle : 0
    }

    this.LOGGER = new Logger(`player id:${this.socket.id}`);
    this.LOGGER.log("Player created !");
  }
  update() {
    super.update();

    if(this.keyState.up && !this.keyState.down) {
      this.y -= 5;
    }
    if(!this.keyState.up && this.keyState.down) {
      this.y += 5;
    }
    if(this.keyState.left && !this.keyState.right) {
      this.x -= 5;
    }
    if(!this.keyState.left && this.keyState.right) {
      this.x += 5;
    }

    if(this.keyState.useMainItem) {
      this.useMainItem();
    }

    if(this.hp <= 0) {
      this.respawn()
    }

  }
  collideEntity(entity) {
    //if(entity instanceof Player) return this.collidePlayer();
    super.collideEntity(entity);
  }

  useMainItem() {
    this.game.addEntity(new SwordBaseAttack(this.game, this));
    this.keyState.useMainItem = false;
  }

  respawn() {
    this.x = Math.round(Math.random()*100);
    this.y = Math.round(Math.random()*100);
    this.hp = this.maxHp;
  }
}
