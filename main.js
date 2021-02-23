
const targetedFPSRate = 40;

const config = require('./server_config.json');

const Player = require('./server/entities/living/player.js');
const Game = require('./server/game.js');


//Logger instance
const log = require('./server/utils/logger/logger.js');
const LOGGER = new Logger("server");

/*
 * ====================================
 *
 * HTTP Server Creation
 *
 * ====================================
*/
const express = require('express');
const app = express();
const serv = require('http').Server(app);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));
serv.listen(config.port);

LOGGER.log("Server Up !");

/*
 * ====================================
 *
 * Game
 *
 * ====================================
*/

const GAME = new Game(config.screenWidth, config.screenHeight, config.targetedFPSRate);

/*
 * ====================================
 *
 * Sockets
 *
 * ====================================
*/

const io = require('socket.io')(serv, {});
io.on('connection', async socket => {
  socket.id = Math.round(Math.random()*1000000);

  let player = new Player(GAME, Math.round(Math.random()*100), Math.round(Math.random()*100), 100, socket);

  if(!GAME.ENTITY_LIST[player.id]) {
    GAME.addEntity(player)
  } else {
    return socket.emit('connectionError');
  }

  socket.emit("serverUP", player.id);

  socket.on('disconnect', () => {
    GAME.removeEntity(player);
    LOGGER.log(`Socket n° ${player.id} disconnected`);
    LOGGER.log("Current Palyer count : " + GAME.getPlayerCount());
  });

  LOGGER.log("Socket connection detected, ID : " + socket.id);
  LOGGER.log("Current Player count : " + GAME.getPlayerCount());

  socket.on('keyPress', data => {
    if(data.inputID == 'up') {
      player.keyState.up = data.state;
      player.direction = 0;
    }
    if(data.inputID == 'down') {
      player.keyState.down = data.state;
      player.direction = 3;
    }
    if(data.inputID == 'right') {
      player.keyState.right = data.state;
      player.direction = 1;
    }
    if(data.inputID == 'left') {
      player.keyState.left = data.state;
      player.direction = 2;
    }
    if(data.inputID == 'useMainItem') {
      player.keyState.useMainItem = data.state;
    }
    if(data.inputID == 'mouseAngle') {
      player.keyState.mouseAngle = data.state;
    }
  })
});

/*
 * ====================================
 *
 * Main Loop
 *
 * ====================================
*/

GAME.mainloop();
