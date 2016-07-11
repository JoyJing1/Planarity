/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(5);
	
	document.addEventListener("DOMContentLoaded", function(){
	  const canvasEl = document.getElementsByTagName("canvas")[0];
	  // canvasEl.width = Game.DIM_X;
	  // canvasEl.height = Game.DIM_Y;
	  //
	  // const ctx = canvasEl.getContext("2d");
	  const rootEl = $('.planary-root');
	  const game = new Game(0);
	  console.log('created ctx & game in planary.js');
	  // console.log(ctx);
	  console.log(game);
	  // debugger;
	  new GameView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Edge = __webpack_require__(2);
	const Vertex = __webpack_require__(4);
	const Util = __webpack_require__(3);
	
	const Game = function (level = 0) {
	  this.vertices = [];
	  this.edges = [];
	
	  this.buildGraph(level);
	};
	
	Game.DIM_X = 600;
	Game.DIM_Y = 600;
	
	
	Game.prototype.buildGraph = function (level) {
	  let game = Game.LEVELS[level];
	
	  for (let i = 0; i < game.vertices; i++) {
	    let x = Math.cos(i * 2 * Math.PI / game.vertices) * 300 + 400;
	    let y = Math.sin(i * 2 * Math.PI / game.vertices) * 300 + 400;
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	
	const Edge = function (options) {
	  this.vertex1 = options.vertex1;
	  this.vertex2 = options.vertex2;
	};
	
	Edge.prototype.draw = function (ctx) {
	  ctx.beginPath();
	  ctx.moveTo(this.vertex1.x, this.vertex1.y);
	  ctx.lineTo(this.vertex2.x, this.vertex2.y);
	  ctx.stroke();
	};
	
	Edge.prototype.intersectsWith = function (edge) {
	  const x = (edge.xIntercept - this.xIntercept) / (this.slope - edge.slope);
	
	  let min = Math.min(this.x, edge.x);
	  let max = Math.max(this.x, edge.x);
	
	  return (min <= x && x <= max );
	};
	
	module.exports = Edge;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const Util = {
	  slope (pos1, pos2) {
	    return (pos2[1] - pos1[1]) / (pos2[0] - pos1[0]);
	  },
	
	  xIntercept (pos, slope) {
	    return pos[1] - (slope * pos[0]);
	  }
	
	};
	
	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const DEFAULTS = {
		COLOR: "#2794EB",
		RADIUS: 15
	};
	
	const Vertex = function(options) {
	  this.x = options.x;
	  this.y = options.y;
	  this.color = DEFAULTS.COLOR;
	  this.radius = DEFAULTS.RADIUS;
	};
	
	Vertex.prototype.pos = function() {
	  return [this.x, this.y];
	};
	
	Vertex.prototype.draw = function(ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();
	  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
	  ctx.fill();
	};
	
	module.exports = Vertex;


/***/ },
/* 5 */
/***/ function(module, exports) {

	const GameView = function (game, root) {
	  // this.ctx = ctx;
	  this.game = game;
	  this.root = root;
	
	  this.render();
	  // Add click handlers
	};
	
	GameView.prototype.render = function() {
	  // this.game.edges.forEach( edge => {
	  //   edge.draw(this.ctx);
	  // });
	
	  this.game.vertices.forEach( (vertex, i) => {
	    // vertex.draw(this.ctx);
	    const $vertex = $("<div>").addClass("vertex")
	                    .draggable()
	                    .css({ 'top': vertex.y-250, 'left': vertex.x })
	                    .attr("data-pos", [vertex.x, vertex.y]);
	
	    // $vertex.draggable();
	    // .draggable()
	    // debugger;
	
	    this.root.append($vertex);
	
	
	
	  });
	
	};
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map