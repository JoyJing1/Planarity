const Edge = require("./edge");
const Vertex = require("./vertex");
const Util = require("./util");
const Graph = require("./graph");

const Game = function (level = 1) {
  this.vertices = [];
  this.edges = [];
  this.level = level;

  this.buildGraph(level);
};

// Game.DIM_X = window.innerWidth;
// Game.DIM_Y = window.innerHeight;

Game.DIM_X = 800;
Game.DIM_Y = 800;

Game.prototype.buildGraph = function(level) {

  let edges = Graph.generateEdges(level);
  let n = level+3;
  let numVertices = n * (n-1)/2;

  for (let j = 0; j < numVertices; j++) {
    // debugger;
    let x = Math.cos(j * 2 * Math.PI / numVertices) * 300 + 400;
    let y = Math.sin(j * 2 * Math.PI / numVertices) * 300 + 400;

    // let x = Math.cos(j * 2 * Math.PI / numVertices) * (Game.DIM_X*0.35) + (Game.DIM_X/2);
    // let y = Math.sin(j * 2 * Math.PI / numVertices) * (Game.DIM_Y*0.35) + (Game.DIM_Y/2);

    this.vertices.push(new Vertex({ x: x, y: y, index: j }) );
  }

  edges.forEach ( vertices => {
    let edge = new Edge({ vertex1: this.vertices[vertices[0]], vertex2: this.vertices[vertices[1]] });
    this.edges.push(edge);

    this.vertices[vertices[0]].edges.push(edge);
    this.vertices[vertices[1]].edges.push(edge);
  });

};

module.exports = Game;
