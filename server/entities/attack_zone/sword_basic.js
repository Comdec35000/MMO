const AttackZone = require('./attack_zone.js');

module.exports = class SwordBaseAttack extends AttackZone {
  constructor(game, creator) {
    super(game, creator, 40, 20, -10, -20, 5, 10);
  }
}
