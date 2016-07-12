const Edge = require("./edge");
const Vertex = require("./vertex");
const Util = require("./util");
const Graphs6 = require("../graphs/graphs6");
const Graphs7 = require("../graphs/graphs7");
const Graphs8 = require("../graphs/graphs8");
const Graphs9 = require("../graphs/graphs9");
const Graphs10 = require("../graphs/graphs10");
const Graphs14 = require("../graphs/graphs14_short");
const Graphs18 = require("../graphs/graphs18_short");

// const graphs6 = require("../graphs/graphs6.txt");

const Game = function (level = 1) {
  this.vertices = [];
  this.edges = [];
  this.level = level;

  // this.buildTree(this.level);
  // this.pullGraph();
  // this.pullTrees(); // Only want to pull once, in GameView?
  this.buildGraph(level);
};

Game.DIM_X = 800;
Game.DIM_Y = 800;

Game.prototype.buildGraph = function(level) {
  let game = Game.LEVELS[level];

  // this.getTree(level);
  this.buildTree(level);

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

Game.prototype.buildTree = function(level) {

};

// Game.prototype.pullTrees = function() {
//   var request = new XMLHttpRequest();
//
//   // debugger;
//   request.open('GET', 'file:///C:/Users/joy/AA_CodePractice/AppAcademy/Projects/JSGame/Planary/graphs/graphs7.txt');
//   request.onreadystatechange = function() {
//
//       if (request.readyState === 4) {
//           var textfileContent = request.responseText;
//           console.log(textfileContent);
//           // debugger;
//           // continue your program flow here
//       }
//   };
//   request.send();
// };

// Game.prototype.getTree = function(level) {
//   const numVertices = Game.LEVELS[level];
//   const filename = `../trees/graphs${numVertices}.txt`;
//   const scriptId = `graphs${numVertices}`;
//
//   let graphs = document.getElementById(scriptId);
//
//   debugger;



  // debugger;

  // Util.readTextFile(filename);
// readTextFile("file:///C:/your/path/to/file.txt");

// };

Game.LEVELS = { 1: Graphs6,
                2: Graphs7,
                3: Graphs8,
                4: Graphs9,
                5: Graphs10,
                6: Graphs11,
                7: Graphs12,
                8: Graphs13,
                9: Graphs14,
                10: Graphs18
              };

// graphs6_qq7lrp.txt
// graphs7_q9c1qi.txt
// graphs8_iyozp5.txt
// graphs9_l240bn.txt
// graphs10_yw3jxf.txt
// graphs11_tnr3rg.txt
// graphs12_ijjzzo.txt
// graphs13_ehtitr.txt
// graphs14_short_enydqt.txt
// graphs18_short_vsoajo.txt

// Game.LEVELS = [
//   { vertices: 6,
//     edges: [ [0,2], [0,4], [1,4], [1,5], [2,3], [2,4], [2,5], [3,5] ]
//   }
// ];

module.exports = Game;
