const Edge = require("./edge");
const Vertex = require("./vertex");
const Util = require("./util");
const Graph = require("./graph");
const Constants = require('../constants');

const Game = function (options) {
  this.vertices = [];
  this.edges = [];
  this.level = options.level || 0;
  this.stage = options.stage || 0;
  this.moves = 0;

  this.setPlaySize();
  this.buildGraph();
  this.setVertexSize();
};

Game.prototype.setPlaySize = function() {
  const $board = $(".canvas-div");
  $board.width(Game.DIM_X).height(Game.DIM_Y);

  Game.leftOffset = (window.innerWidth - Game.DIM_X) / 2;
  $board.css( {left: Game.leftOffset} );
};


Game.prototype.setVertexSize = function() {
  Vertex.RADIUS = (Game.DIM_X / this.vertices.length / 10) + 5;
};

Game.prototype.buildGraph = function() {

  let edgeCoords = Graph.generateEdges(this.level);
  let n = this.level + 4;
  let numVertices = (n * (n-1)/2);
  // console.log(numVertices);

  if (this.level > 0) {
    numVertices = (n * (n-1)/2) - (n-1) + this.stage + 1;
    // console.log(numVertices);
  }


  for (let j = 0; j < numVertices; j++) {

    let xOffset = Game.DIM_X/2;
    let yOffset = Game.DIM_Y/2;

    let xResize = Game.DIM_X*0.35;
    let yResize = Game.DIM_Y*0.35;

    let x = Math.cos(j * 2 * Math.PI / numVertices) * xResize + xOffset;
    let y = Math.sin(j * 2 * Math.PI / numVertices) * xResize + xOffset;

    this.vertices.push(new Vertex({ x: x, y: y, index: j }) );
  }

  let verticesReached = [];
  edgeCoords.forEach ( edgeCoord => {

    if (edgeCoord[0] < numVertices && edgeCoord[1] < numVertices) {
      const edge = new Edge({ vertex1: this.vertices[edgeCoord[0]], vertex2: this.vertices[edgeCoord[1]] });
      this.edges.push(edge);

      this.vertices[edgeCoord[0]].edges.push(edge);
      this.vertices[edgeCoord[1]].edges.push(edge);

      verticesReached.push(edgeCoord[0]);
      verticesReached.push(edgeCoord[1]);
    }
  });

  for (let i = 0; i < numVertices; i++) {
    if (!verticesReached.includes(i)) {
      let v2 = 0;
      if (i === v2) { v2 += 1; }
      const edge = new Edge({ vertex1: this.vertices[i], vertex2: this.vertices[v2] });

      this.edges.push(edge);

      this.vertices[i].edges.push(edge);
      this.vertices[v2].edges.push(edge);
    }
  }

};

Game.prototype.dropVertices = function() {
  this.vertices.forEach( vertex => {
    vertex.selected = false;
    vertex.color = Constants.COLOR;
  });
};

//
// Game.prototype.levelUp = function() {
//   this.stage += 1;
//   this.moves = 0;
//   console.log(`increment up this.stage --> ${this.stage}`);
//   if (this.stage >= this.level + 3) {
//     console.log(`increment up this.level --> ${this.level}`);
//     this.level += 1;
//     this.stage = 0;
//   }
// };
//
// Game.prototype.levelDown = function() {
//   this.stage -= 1;
//   this.moves = 0;
//   console.log(`increment up this.stage --> ${this.stage}`);
//   if (this.stage < 0) {
//     console.log(`increment up this.level --> ${this.level}`);
//     this.level -= 1;
//     this.stage = this.level + 3;
//   }
// };


module.exports = Game;
