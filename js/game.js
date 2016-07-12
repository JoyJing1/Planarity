const Edge = require("./edge");
const Vertex = require("./vertex");
const Util = require("./util");

const Game = function (level = 0) {
  this.vertices = [];
  this.edges = [];

  this.buildGraph(level);
};

Game.DIM_X = 800;
Game.DIM_Y = 800;

Game.prototype.buildGraph = function (level) {
  let game = Game.LEVELS[level];

  for (let i = 0; i < game.vertices; i++) {
    let x = Math.cos(i * 2 * Math.PI / game.vertices) * 300 + 400;
    let y = Math.sin(i * 2 * Math.PI / game.vertices) * 300 + 400;

    this.vertices.push(new Vertex({ x: x, y: y, index: i }) );
  }

  game.edges.forEach ( vertices => {
    let edge = new Edge({ vertex1: this.vertices[vertices[0]], vertex2: this.vertices[vertices[1]] });
    this.edges.push(edge);

    this.vertices[vertices[0]].edges.push(edge);
    this.vertices[vertices[1]].edges.push(edge);
  });

};





Game.LEVELS = [
  { vertices: 6,
    edges: [ [0,2], [0,4], [1,4], [1,5], [2,3], [2,4], [2,5], [3,5] ]
  }
];

module.exports = Game;
