"use strict";

const Constants = require('../constants')
    , Edge = require("./edge")
    , Graph = require("./graph")
    , Util = require("./util")
    , Vertex = require("./vertex");

const Game = function (options) {
  this.level = options.level || 0;
  this.stage = options.stage || 0;
  this.moves = 0;

  this.setPlaySize();
  this.buildGraph();
  console.log("About to set vertex size");
  this.setVertexSize();
};

Game.prototype.setPlaySize = function() {
  const $board = $(".canvas-div");
  $board.width(Game.DIM_X).height(Game.DIM_Y);

  Game.leftOffset = (window.innerWidth - Game.DIM_X) / 2;
  $board.css( {left: Game.leftOffset} );
};

Game.prototype.setVertexSize = function() {
  console.log("inside Game.setVertexSize");
  Vertex.RADIUS = (Game.DIM_X / this.vertices.length / 10) + 5;

  let mq = window.matchMedia('all and (max-width: 700px)');
  if(mq.matches) {
    Vertex.RADIUS = Vertex.RADIUS * 1000;
    console.log("increased size of vertex based on media size");
    // the width of browser is more then 700px
  } else {
    // the width of browser is less then 700px
  }

  // if (isTouchDevice()) {
  // }
};

function isTouchDevice(){
	try {
		document.createEvent("TouchEvent");
    console.log("is touch device");
		return true;
	} catch(e) {
    console.log("is not a touch device");
		return false;
	}
}

Game.prototype.isPlanar = function() {
  let planar = true;

  this.edges.forEach( (edge1, i1) => {
    this.edges.forEach( (edge2, i2) => {
      if (i1 !== i2 && edge1.intersectsWith(edge2)) {
        planar = false;
      }
    });
  });

  return planar;
};

Game.prototype.buildGraph = function() {
  this.vertices = [];
  this.edges = [];
  const n = this.level + 4;

  const edgeCoords = Graph.generateEdges(n);
  let numVertices = (n * (n-1)/2);

  if (this.level > 0) {
    numVertices = (n * (n-1)/2) - (n-1) + this.stage + 1;
  }

  for (let j = 0; j < numVertices; j++) {

    const xOffset = Game.DIM_X/2;
    const yOffset = Game.DIM_Y/2;

    const xResize = Game.DIM_X*0.35;
    const yResize = Game.DIM_Y*0.35;

    const x = Math.cos(j * 2 * Math.PI / numVertices) * xResize + xOffset;
    const y = Math.sin(j * 2 * Math.PI / numVertices) * xResize + xOffset;

    this.vertices.push(new Vertex({ x: x, y: y, index: j }) );
  }

  let verticesReached = [];
  edgeCoords.forEach ( (edgeCoord, i) => {

    if (edgeCoord[0] < numVertices && edgeCoord[1] < numVertices) {
      const edge = new Edge({ vertex1: this.vertices[edgeCoord[0]],
                              vertex2: this.vertices[edgeCoord[1]],
                              idx: i });
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
      const edge = new Edge({ vertex1: this.vertices[i],
                              vertex2: this.vertices[v2],
                              idx: edges.length });
      this.edges.push(edge);

      this.vertices[i].edges.push(edge);
      this.vertices[v2].edges.push(edge);
    }
  }

  // If graph is already solved, generate new graph
  if (this.isPlanar()) {
    this.buildGraph();
  }

};

Game.prototype.dropVertices = function() {
  this.vertices.forEach( vertex => {
    vertex.selected = false;
    vertex.color = Constants.COLOR;
  });
};

module.exports = Game;
