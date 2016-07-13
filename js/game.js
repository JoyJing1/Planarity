const Edge = require("./edge");
const Vertex = require("./vertex");
const Util = require("./util");

const Game = function (level = 1) {
  this.vertices = [];
  this.edges = [];
  this.level = level;

  this.buildGraph(level);
};

Game.DIM_X = 800;
Game.DIM_Y = 800;

Game.prototype.buildGraph = function(level) {

  let game = Game.LEVELS[level];

  console.log(game);
  for (let j = 0; j < game.vertices; j++) {
    let x = Math.cos(j * 2 * Math.PI / game.vertices) * 300 + 400;
    let y = Math.sin(j * 2 * Math.PI / game.vertices) * 300 + 400;

    this.vertices.push(new Vertex({ x: x, y: y, index: j }) );
  }

  game.edges.forEach ( vertices => {
    let edge = new Edge({ vertex1: this.vertices[vertices[0]], vertex2: this.vertices[vertices[1]] });
    this.edges.push(edge);

    this.vertices[vertices[0]].edges.push(edge);
    this.vertices[vertices[1]].edges.push(edge);
  });

};

Game.prototype.generateGraph = function(level) {
  const n = level+3;
  let vertices = [];

  for(let i = 0; i < n; i++) {
    vertices.push(i);
  }

  let pairIndex = {};
  let k = 0;
  for(let i = 0; i <= n; i++) {
    for(let j = i+1; j<n; j++) {
      pairIndex[[i, j]] = k;
      k++;
    }
  }




};






Game.LEVELS = [
  { vertices: 6,
    edges: [ [0,2], [0,4], [1,4], [1,5], [2,3], [2,4], [2,5], [3,5] ]
  }
];

module.exports = Game;
