const Asteroid = require("./asteroid");
const Bullet = require("./bullet");
const Ship = require("./ship");
const Util = require("./util");

function Game() {
  this.asteroids = [];
  this.bullets = [];
  this.ships = [];

  this.addAsteroids();
}

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 32;
Game.NUM_ASTEROIDS = 10;

Game.prototype.add = function add(object) {
  if (object instanceof Asteroid) {
    this.asteroids.push(object);
  } else if (object instanceof Bullet) {
    this.bullets.push(object);
  } else if (object instanceof Ship) {
    this.ships.push(object);
  } else {
    throw new Error("unknown type of object");
  }
};

Game.prototype.addAsteroids = function addAsteroids() {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.add(new Asteroid({ game: this }));
  }
};

Game.prototype.addShip = function addShip() {
  const ship = new Ship({
    pos: this.randomPosition(),
    game: this
  });

  this.add(ship);

  return ship;
};

Game.prototype.allObjects = function allObjects() {
  return [].concat(this.ships, this.asteroids, this.bullets);
};

Game.prototype.checkCollisions = function checkCollisions() {
  const allObjects = this.allObjects();
  for (let i = 0; i < allObjects.length; i++) {
    for (let j = 0; j < allObjects.length; j++) {
      const obj1 = allObjects[i];
      const obj2 = allObjects[j];

      if (obj1.isCollidedWith(obj2)) {
        const collision = obj1.collideWith(obj2);
        if (collision) return;
      }
    }
  }
};



module.exports = Game;
