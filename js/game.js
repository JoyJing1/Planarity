const Edge = require("./edge");
const Vertex = require("./vertex");
const Util = require("./util");
const Graph = require("./graph");
const Constants = require('../constants');

const Game = function (level = 0) {
  this.vertices = [];
  this.edges = [];
  this.level = level;

  this.setPlaySize();
  this.buildGraph(level);
  this.setVertexSize();
};

Game.prototype.setPlaySize = function() {
  const $board = $(".canvas-div");
  $board.width(Game.DIM_X).height(Game.DIM_Y);

  Game.leftOffset = (window.innerWidth - Game.DIM_X) / 2;
  $board.css( {left: Game.leftOffset} );
};

Game.prototype.setVertexSize = function() {
  // console.log(Game.DIM_X);
  // console.log(this.level);
  // console.log(this.vertices.length);

  Vertex.RADIUS = (Game.DIM_X / this.vertices.length / 10) + 5;
};

Game.prototype.buildGraph = function(level) {

  let edges = Graph.generateEdges(level);
  let n = level+4;
  let numVertices = n * (n-1)/2;

  for (let j = 0; j < numVertices; j++) {

    let xOffset = Game.DIM_X/2;
    let yOffset = Game.DIM_Y/2;

    let xResize = Game.DIM_X*0.35;
    let yResize = Game.DIM_Y*0.35;

    let x = Math.cos(j * 2 * Math.PI / numVertices) * xResize + xOffset;
    let y = Math.sin(j * 2 * Math.PI / numVertices) * xResize + xOffset;

    this.vertices.push(new Vertex({ x: x, y: y, index: j }) );
  }

  edges.forEach ( vertices => {
    let edge = new Edge({ vertex1: this.vertices[vertices[0]], vertex2: this.vertices[vertices[1]] });
    this.edges.push(edge);

    this.vertices[vertices[0]].edges.push(edge);
    this.vertices[vertices[1]].edges.push(edge);
  });

};

Game.prototype.dropVertices = function() {
  // console.log("Game.dropVertices() in game.js");
  this.vertices.forEach( vertex => {
    vertex.selected = false;
    vertex.color = Constants.COLOR;
  });
};

module.exports = Game;
