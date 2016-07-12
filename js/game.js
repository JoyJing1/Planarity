const Edge = require("./edge");
const Vertex = require("./vertex");
const Util = require("./util");

// const graphs6 = require("../graphs/graphs6.txt");

const Game = function (level = 1) {
  this.vertices = [];
  this.edges = [];

  this.buildGraph(level);
};

Game.DIM_X = 800;
Game.DIM_Y = 800;

Game.prototype.buildGraph = function(level) {
  let game = Game.LEVELS[level];

  this.getTree(level);

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

Game.prototype.getTree = function(level) {
  const numVertices = Game.LEVELS[level];
  // const filename = `../trees/graphs${numVertices}.txt`;
  const filename = `graphs${numVertices}`;



  debugger;

  Util.readTextFile(filename);
// readTextFile("file:///C:/your/path/to/file.txt");

};

Game.LEVELS = { 1: 6,
                2: 7,
                3: 8,
                4: 9,
                5: 10,
                6: 11,
                7: 12,
                8: 13,
                9: 14,
                10: 18
              };


// Game.LEVELS = [
//   { vertices: 6,
//     edges: [ [0,2], [0,4], [1,4], [1,5], [2,3], [2,4], [2,5], [3,5] ]
//   }
// ];

module.exports = Game;
