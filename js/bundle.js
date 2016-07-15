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

	"use strict";
	
	const Game = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./game\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	    , GameView = __webpack_require__(7);
	
	document.addEventListener("DOMContentLoaded", function(){
	  const canvasEl = document.getElementsByTagName("canvas")[0];
	
	  if (window.innerHeight < window.innerWidth) {
	    Game.DIM_X = window.innerHeight * 0.8;
	    Game.DIM_Y = window.innerHeight * 0.8;
	  } else {
	    Game.DIM_X = window.innerWidth;
	    Game.DIM_Y = window.innerWidth;
	  }
	
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	
	  const ctx = canvasEl.getContext("2d");
	  const rootEl = $('.planary-root');
	
	  new GameView(ctx, rootEl, {level: 0, stage: 0});
	});


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
		COLOR: "#2794EB",
	  COLOR_SELECTED: "#47D6B6",
	  COLOR_NEIGHBOR: "#4531B1",
	  BLACK: "#000000",
	  WHITE: "#FFFFFF",
	  LINE_SELECTED: "#6150C1",
	  LINE_INTERSECTING: "#FF9090",
		RADIUS: 15,
	  EPSILON: 0.00001
	};


/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	const Util = {
	  slope(vertex1, vertex2) {
	    return (vertex2.y - vertex1.y) / (vertex2.x - vertex1.x);
	  },
	
	  xIntercept(vertex, slope) {
	    return vertex.y - (slope * vertex.x);
	  },
	
	  // yIntercept(vertex, slope) {
	  //   return vertex.y - (slope * vertex.x);
	  // },
	
	  dist(vertex1, vertex2) {
	    return Math.sqrt(
	      Math.pow(vertex1.x - vertex2.x, 2)
	        + Math.pow(vertex1.y - vertex2.y, 2)
	    );
	  },
	
	  distFromMouse(vertex, currentMousePos) {
	    const vertexRadius = 12.5;
	
	    return Math.sqrt(
	      Math.pow(vertex.x + vertexRadius - currentMousePos.x, 2) + Math.pow(vertex.y + vertexRadius - currentMousePos.y, 2)
	    );
	  }
	
	};
	
	module.exports = Util;


/***/ },
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	const Constants = __webpack_require__(2);
	
	const Vertex = function(options) {
	  this.index = options.index;
	  this.x = options.x;
	  this.y = options.y;
	  this.color = Constants.COLOR;
	  this.radius = Constants.RADIUS;
	  this.edges = [];
	  this.selected = false;
	};
	
	Vertex.prototype.pos = function() {
	  return [this.x, this.y];
	};
	
	Vertex.prototype.draw = function(ctx) {
	  ctx.fillStyle = this.color;
	  ctx.shadowBlur = 10;
	  ctx.shadowColor = this.color;
	  ctx.beginPath();
	  ctx.arc(this.x, this.y, Vertex.RADIUS, 0, 2 * Math.PI);
	  ctx.fill();
	};
	
	Vertex.prototype.neighbors = function() {
	  let neighbors = [];
	
	  this.edges.forEach( edge => {
	    if (edge.vertex1 === this) {
	      neighbors.push(edge.vertex2);
	    } else {
	      neighbors.push(edge.vertex1);
	    }
	  });
	  return neighbors;
	};
	
	module.exports = Vertex;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	const Constants = __webpack_require__(2)
	    , Game = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./game\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	    , Util = __webpack_require__(4)
	    , Vertex = __webpack_require__(6);
	
	const GameView = function (ctx, root, options) {
	  this.ctx = ctx;
	  this.root = root;
	  this.currentMousePos = { x: -1, y: -1 };
	  this.level = options.level || 0;
	  this.stage = options.stage || 0;
	
	  this.renderButtons();
	  this.bindButtonEvents();
	  this.bindGraphEvents();
	  this.renderRules();
	  this.playLevel(this.level); // Move to renderRules callback?
	};
	
	GameView.prototype.playLevel = function() {
	  this.game = new Game({level: this.level, stage: this.stage});
	
	  this.renderGraph();
	  this.renderModal();
	
	  let that = this;
	  function playGame() {
	    that.follow(that.game, that.currentMousePos);
	    that.renderGraph();
	    requestAnimationFrame(playGame);
	  }
	  requestAnimationFrame(playGame);
	};
	
	GameView.prototype.levelUp = function() {
	  this.stage += 1;
	  this.game.moves = 0;
	
	  if (this.stage > 0) {
	    $(".description").css( {display: "none"} );
	  }
	
	  if (this.level === 0 || this.stage >= this.level + 3) {
	    this.level += 1;
	    this.stage = 0;
	  }
	};
	
	GameView.prototype.levelDown = function() {
	  this.stage -= 1;
	  this.game.moves = 0;
	  if (this.stage < 0) {
	    this.level -= 1;
	    this.stage = this.level + 3;
	  }
	};
	
	GameView.prototype.renderRules = function() {
	  const prevRules = document.getElementsByClassName("rules");
	
	  if (prevRules.length > 0) {
	    const $rulesModal = $(prevRules[0]);
	    $rulesModal.css({display: "block"});
	  } else {
	    const $rulesModal = $("<div>").addClass("modal")
	                        .addClass("rules")
	                        .css({display: "block"});
	    const $rulesContent = $("<div>").addClass("modal-content");
	    const $rules = $("<p>").text("Can you detangle the web? Move the nodes around until none of the lines intersect.");
	
	    $rulesContent.append($rules);
	    $rulesModal.append($rulesContent);
	
	    const $playButton = $("<a>").text("Play")
	                        .addClass("button")
	                        .addClass("play");
	
	    $rulesContent.append($playButton);
	
	    $playButton.on("click tap", event => {
	      $rulesModal.css( {display: "none"} );
	    });
	
	    this.root.append($rulesModal);
	  }
	
	};
	
	GameView.prototype.renderModal = function() {
	  const prevModals = document.getElementsByClassName("win-modal");
	
	  if (prevModals.length > 0) {
	    const $modal = $(prevModals[0]);
	
	  } else {
	    const $modal = $("<div>").addClass("modal")
	                  .addClass("win-modal")
	                  .css( {display: "none"} );
	
	    const $modalContent = $("<div>").addClass("modal-content");
	    const $congrats = $("<h2>").text("Congratulations, the graph is planar!");
	
	    const $stats = $("<p>");
	    const $level = $("<div>").addClass("results level");
	    const $stage = $("<div>").addClass("results stage");
	    const $moves = $("<div>").addClass("results moves");
	
	    $stats.append($level);
	    $stats.append($stage);
	    $stats.append($moves);
	
	    $modalContent.append($congrats);
	    $modalContent.append($stats);
	    $modal.append($modalContent);
	
	    const $nextButton = $("<a>").text("Next Level")
	                        .addClass("button")
	                        .addClass("next-level-modal");
	
	    $modalContent.append($nextButton);
	
	    $nextButton.on("click tap", event => {
	      event.stopPropagation();
	      event.preventDefault();
	
	      this.levelUp();
	      $modal.css({display: "none"});
	      cancelAnimationFrame(this.refreshIntervalId);
	      this.playLevel();
	    });
	
	    this.root.append($modal);
	  }
	
	};
	
	GameView.prototype.renderButtons = function() {
	
	  const $button2 = $("<div>").addClass("buton").addClass("nav").addClass("previous-level");
	  const $button3 = $("<div>").addClass("buton").addClass("nav").addClass("next-level");
	  const $github = $(`<a href="https://github.com/joyjing1"><div class="button github"/></a>`);
	
	  const $buttonRules = $("<a>").addClass("button")
	                        .addClass("show-rules")
	                        .text("Rules");
	  const $canvasDiv = $(".canvas-div");
	
	  $canvasDiv.append($button2);
	  $canvasDiv.append($button3);
	  $canvasDiv.append($github);
	  $canvasDiv.append($buttonRules);
	};
	
	GameView.prototype.checkPlanarity = function() {
	  if (this.game.isPlanar()) {
	    const $winModal = $(".win-modal");
	
	    const $stats = $("<p>");
	    const $level = $(".level").empty().append(`Level: <span>${this.level+1}</span>`);
	    const $stage = $(".stage").empty().append(`Stage: <span>${this.stage+1}</span>`);
	    const $moves = $(".moves").empty().append(`Moves: <span>${this.game.moves}</span>`);
	
	    $winModal.css({display: "block"});
	  }
	};
	
	GameView.prototype.bindButtonEvents = function() {
	
	  $(".previous-level").on("click tap", event => {
	    event.stopPropagation();
	    event.preventDefault();
	
	    if (this.level > 0) {
	      this.levelDown();
	      this.playLevel(this.level);
	    }
	  });
	
	  $(".next-level").on("click tap", event => {
	    event.stopPropagation();
	    event.preventDefault();
	
	    this.levelUp();
	    this.playLevel(this.level);
	  });
	
	  $(".show-rules").on("click tap", event => {
	    event.stopPropagation();
	    event.preventDefault();
	
	    $(".rules").css( {display: "block"} );
	  });
	
	};
	
	
	GameView.prototype.renderGraph = function() {
	  this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	
	  this.game.edges.forEach( (edge, i) => {
	    edge.draw(this.ctx, this.game.edges);
	  });
	
	  this.game.vertices.forEach( (vertex, i) => {
	    vertex.draw(this.ctx);
	  });
	
	};
	
	GameView.prototype.bindGraphEvents = function() {
	
	  $("canvas").on("mousedown", event => {
	    event.stopPropagation();
	    event.preventDefault();
	
	    let vertexSelected = false;
	    let withinVertex = 30;
	
	    if (Vertex.RADIUS > 7) {
	      withinVertex += (Vertex.RADIUS - 7);
	    }
	
	    this.game.vertices.forEach( vertex => {
	      const dist = Util.distFromMouse(vertex, this.currentMousePos);
	
	      if (dist < withinVertex && !vertexSelected) {
	        this.game.moves += 1;
	
	        vertex.selected = true;
	        vertex.color = Constants.COLOR_SELECTED;
	        vertexSelected = true;
	
	        vertex.neighbors().forEach(neighbor => {
	          neighbor.color = Constants.COLOR_NEIGHBOR;
	        });
	      }
	    });
	
	  });
	
	  $(document).on("mouseup", event => {
	    event.stopPropagation();
	    event.preventDefault();
	
	    this.game.dropVertices();
	    this.checkPlanarity();
	  });
	
	  $(document).mousemove( event => {
	    event.stopPropagation();
	    event.preventDefault();
	
	    const yAdjust = -40;
	    const xAdjust = 0;
	
	    this.currentMousePos.x = event.pageX + xAdjust - Game.leftOffset;
	    this.currentMousePos.y = event.pageY + yAdjust;
	  });
	
	};
	
	GameView.prototype.follow = function(game, currentMousePos) {
	  game.vertices.forEach( vertex => {
	    if (vertex.selected) {
	      let newX = Math.min(Math.max(currentMousePos.x, Vertex.RADIUS), Game.DIM_X-Vertex.RADIUS);
	      let newY = Math.min(Math.max(currentMousePos.y, Vertex.RADIUS), Game.DIM_Y-Vertex.RADIUS);
	
	      vertex.x = newX;
	      vertex.y = newY;
	    }
	  });
	
	};
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map