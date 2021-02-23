const Bullet = require('./bullet.js');

module.exports = class FireBall extends Bullet {
  constructor(game, creator, x, y, angle) {
    super(game, creator, 10, 10, x, y, angle, 20, 20, 20);
  }
}
