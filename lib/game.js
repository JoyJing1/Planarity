const Edge = require("./edge");
const Vertex = require("./vertex");
const Util = require("./util");

const Game = function (level = 1) {
  this.vertices = [];
  this.edges = [];

  this.buildGraph(level);
};

Game.DIM_X = 600;
Game.DIM_Y = 600;


Game.prototype.buildGraph = function (level) {
  let game = Game.LEVELS[level];

  for (let i = 0; i < game.vertices; i++) {
    let x = Math.cos(i * 2 * Math.PI / game.vertices) * 200 + 300;
    let y = Math.sin(i * 2 * Math.PI / game.vertices) * 200 + 300;

    this.vertices.push(new Vertex({ x: x, y: y }) );
  }

  game.edges.forEach ( vertices => {
    // debugger;
    let edge = new Edge({ vertex1: this.vertices[vertices[0]], vertex2: this.vertices[vertices[1]] });
    this.edges.push(edge);
  });

};





Game.LEVELS = [
  { vertices: 6,
    edges: [ [0,2], [0,4], [1,4], [1,5], [2,3], [2,4], [2,5], [3,5] ]
  }
];

module.exports = Game;
