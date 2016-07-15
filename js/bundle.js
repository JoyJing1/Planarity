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
	
	const Game = __webpack_require__(1)
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
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	const Constants = __webpack_require__(2)
	    , Edge = __webpack_require__(3)
	    , Graph = __webpack_require__(5)
	    , Util = __webpack_require__(4)
	    , Vertex = __webpack_require__(6);
	
	const Game = function (options) {
	  // this.vertices = [];
	  // this.edges = [];
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
	
	  // Pass in n instead of level
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


/***/ },
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	const Constants = __webpack_require__(2)
	    , Util = __webpack_require__(4);
	
	const Edge = function(options) {
	  this.vertex1 = options.vertex1;
	  this.vertex2 = options.vertex2;
	  this.idx = options.idx;
	};
	
	Edge.prototype.draw = function(ctx, edges) {
	  if (this.currentlyIntersecting(edges)) {
	    ctx.strokeStyle = Constants.LINE_INTERSECTING;
	    ctx.shadowColor = Constants.LINE_INTERSECTING;
	    ctx.lineWidth = 3;
	    ctx.beginPath();
	    ctx.moveTo(this.vertex1.x, this.vertex1.y);
	    ctx.lineTo(this.vertex2.x, this.vertex2.y);
	    ctx.stroke();
	
	  } else {
	    ctx.strokeStyle = Constants.BLACK;
	    ctx.lineWidth = 3;
	    ctx.beginPath();
	    ctx.moveTo(this.vertex1.x, this.vertex1.y);
	    ctx.lineTo(this.vertex2.x, this.vertex2.y);
	    ctx.stroke();
	  }
	};
	
	Edge.prototype.slope = function() {
	
	  if (this.vertex1.x === this.vertex2.x) {
	    return 100000;
	  } else if (this.vertex1.x < this.vertex2.x) {
	    return (this.vertex2.y - this.vertex1.y) / (this.vertex2.x - this.vertex1.x);
	  } else {
	    return (this.vertex1.y - this.vertex2.y) / (this.vertex1.x - this.vertex2.x);
	  }
	
	};
	
	Edge.prototype.xIntercept = function() {
	  if (this.isVertical()) {
	    return this.vertex1.x;
	  } else if (this.isHorizontal()) {
	    return 1000000;
	  } else {
	    return -this.yIntercept()/this.slope();
	  }
	};
	
	Edge.prototype.yIntercept = function() {
	  if (this.isVertical()) {
	    return 1000000;
	  } else if (this.isHorizontal()) {
	    return this.vertex1.y;
	  } else {
	    return this.vertex1.y - (this.slope()*this.vertex1.x);
	  }
	};
	
	Edge.prototype.shareVertex = function(edge) {
	  return (
	    this.vertex1 === edge.vertex1
	    || this.vertex1 === edge.vertex2
	    || this.vertex2 === edge.vertex1
	    || this.vertex2 === edge.vertex2
	  );
	};
	
	Edge.prototype.isVertical = function() {
	  return (Math.abs(this.vertex1.x - this.vertex2.x) < Constants.EPSILON);
	};
	
	Edge.prototype.isHorizontal = function() {
	  return (Math.abs(this.vertex1.y - this.vertex2.y) < Constants.EPSILON);
	};
	
	Edge.prototype.intersectsAtX = function(edge) {
	  return (edge.yIntercept() - this.yIntercept()) / (this.slope() - edge.slope());
	};
	
	Edge.prototype.xValue = function(y) {
	  return (y - this.yIntercept())/this.slope();
	};
	
	Edge.prototype.yValue = function(x) {
	  return (this.slope() * x) + this.yIntercept();
	};
	
	Edge.prototype.minX = function() {
	  return Math.min(this.vertex1.x, this.vertex2.x);
	};
	
	Edge.prototype.maxX = function() {
	  return Math.max(this.vertex1.x, this.vertex2.x);
	};
	
	Edge.prototype.minY = function() {
	  return Math.min(this.vertex1.y, this.vertex2.y);
	};
	
	Edge.prototype.maxY = function() {
	  return Math.max(this.vertex1.y, this.vertex2.y);
	};
	
	Edge.prototype.intersectsWith = function(edge) {
	  if (this === edge) {
	    return false;
	
	  } else if (this.vertex1 === edge.vertex1) {
	    let response = false;
	
	    let slope1 = Util.slope(this.vertex1, this.vertex2);
	    let slope2 = Util.slope(edge.vertex1, edge.vertex2);
	
	    if (slope1 === slope2) {
	      response = true;
	    }
	    return response;
	
	  } else if (this.vertex1 === edge.vertex2) {
	    let response = false;
	
	    let slope1 = Util.slope(this.vertex1, this.vertex2);
	    let slope2 = Util.slope(edge.vertex2, edge.vertex1);
	
	    if (slope1 === slope2) {
	      response = true;
	    }
	    return response;
	
	  } else if (this.vertex2 === edge.vertex1) {
	    let response = false;
	
	    let slope1 = Util.slope(this.vertex2, this.vertex1);
	    let slope2 = Util.slope(edge.vertex1, edge.vertex2);
	
	    if (slope1 === slope2) {
	      response = true;
	    }
	    return response;
	
	  } else if (this.vertex2 === edge.vertex2) {
	    let response = false;
	
	    let slope1 = Util.slope(this.vertex2, this.vertex1);
	    let slope2 = Util.slope(edge.vertex2, edge.vertex1);
	
	    if (slope1 === slope2) {
	      response = true;
	    }
	    return response;
	
	  } else if (this.isHorizontal()) {
	    let response = false;
	
	    if (edge.minY()+1 < this.vertex1.y && this.vertex1.y < edge.maxY()-1) {
	      if (edge.isVertical()) {
	        response = true;
	      } else {
	        let xValue = edge.xValue(this.vertex1.y);
	        if (this.minX()+1 < xValue && xValue < this.maxX()-1) {
	          response = true;
	        }
	      }
	    }
	    return response;
	
	  } else if (edge.isHorizontal()) {
	    let response = false;
	    if (this.minY()+1 < edge.vertex1.y && edge.vertex1.y < this.maxY()-1) {
	      if (this.isVertical()) {
	        response = true;
	      } else {
	        let xValue = this.xValue(edge.vertex1.y);
	        if (edge.minX()+1 < xValue && xValue < edge.maxX()-1) {
	          response = true;
	        }
	      }
	    }
	    return response;
	
	  } else if (this.isVertical()) {
	    let response = false;
	    if (edge.minX()+1 < this.vertex1.x && this.vertex1.x < edge.maxX()-1) {
	      if (edge.isHorizontal()) {
	        response = true;
	      } else {
	        let yValue = edge.yValue(this.vertex1.x);
	        if (this.minY()+1 < yValue && yValue < this.maxY()-1) {
	          response = true;
	        }
	      }
	    }
	    return response;
	
	  } else if (edge.isVertical()){
	    let response = false;
	
	    if (this.minX()+1 < edge.vertex1.x && edge.vertex1.x < this.maxX()-1) {
	      if (this.isHorizontal()) {
	        response = true;
	      } else {
	        let yValue = this.yValue(edge.vertex1.x);
	        if (edge.minY()+1 < yValue && yValue < edge.maxY()-1) {
	          response = true;
	        }
	      }
	    }
	    return response;
	
	  } else if (this.slope() === edge.slope()) {
	    return false;
	
	  } else {
	    const x = this.intersectsAtX(edge);
	    const y = this.yValue(x);
	
	    const xWithinRange = (this.minX()+1 < x && x < this.maxX()-1 && edge.minX()+1 < x && x < edge.maxX()-1);
	    const yWithinRange = (this.minY()+1 < y && y < this.maxY()-1 && edge.minY()+1 < y && y < edge.maxY()-1);
	
	    return xWithinRange && yWithinRange;
	  }
	};
	
	Edge.prototype.currentlyIntersecting = function(allEdges) {
	  let intersecting = false;
	
	  allEdges.forEach( edge => {
	    if (this.intersectsWith(edge)) {
	      intersecting = true;
	    }
	  });
	  return intersecting;
	};
	
	module.exports = Edge;


/***/ },
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	const Edge = __webpack_require__(3)
	    , Util = __webpack_require__(4)
	    , Vertex = __webpack_require__(6);
	
	const Graph = {
	
	  pairIndex(n) {
	    let pairIndex = {};
	
	    let vertexIdx = 0;
	    for (let i = 0; i <= n; i++) {
	      for (let j = i+1; j<n; j++) {
	        pairIndex[`${i},${j}`] = vertexIdx;
	        vertexIdx++;
	      }
	    }
	
	    return pairIndex;
	  },
	
	  generateLines(n) {
	    let lines = [];
	    let slopes = [];
	
	    while (lines.length < n) {
	      let v1 = new Vertex( { x: Math.random(), y: Math.random() });
	      let v2 = new Vertex( { x: Math.random(), y: Math.random() });
	
	      let slope = Util.slope(v1, v2);
	      // let inverseSlope = Util.slope(v2, v1);
	      if (!slopes.includes(slope)) {
	        let line = new Edge({ vertex1: v1, vertex2: v2, idx: lines.length});
	        lines.push(line);
	      }
	    }
	    return lines;
	  },
	
	  generateEdges(n) {
	    // Build pairIndex hash from { [pair]: indexOfVertex }
	    let pairIndex = this.pairIndex(n);
	
	    // Generate n * (n-1)/2 random lines of differing slope
	    const lines = this.generateLines(n);
	
	    // For each line, find the intersection points
	    // of that line with all other lines
	    let edges = [];
	    lines.forEach( (line1, i1) => {
	      let intersections = [];
	
	      lines.forEach( (line2, i2) => {
	        if (i1 !== i2) {
	          let intersection = line1.intersectsAtX(line2);
	          intersections.push( { x: intersection, lineIdx: i2 } );
	        }
	
	      });
	
	      // Order lines by intersection point's X coord
	      intersections.sort( (intersect1, intersect2) => {
	        return intersect1.x - intersect2.x;
	      });
	
	      // For each pair of neighboring intersections
	      // create a new edge between them
	      for (let i = 0; i < intersections.length-1; i++) {
	        let l1 = intersections[i];
	        let l2 = intersections[i+1];
	
	        let indices1 = [i1, l1.lineIdx];
	        let indices2 = [i1, l2.lineIdx];
	
	        indices1.sort( (a, b) => a-b  );
	        indices2.sort( (a, b) => a-b  );
	
	        let v1 = pairIndex[indices1];
	        let v2 = pairIndex[indices2];
	
	        edges.push([v1, v2]);
	      }
	
	    });
	
	    return edges;
	  }
	
	};
	
	module.exports = Graph;


/***/ },
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
	    , Game = __webpack_require__(1)
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
	  this.playLevel(this.level);
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
	
	    $playButton.on("touchstart click", event => {
	      console.log("touchstart/clicked on $playButton");
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
	
	    const $modalContent = $("<div>").addClass("modal-content").addClass("win-modal-content");
	    const $congrats = $("<h2>").text("Congratulations, the graph is planar!");
	
	    const $stats = $("<p>").addClass("stats");
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
	
	    $nextButton.on("touchstart click", event => {
	      event.stopPropagation();
	      event.preventDefault();
	      console.log("touchstart/clicked on $nextButton");
	
	      this.levelUp();
	      $modal.css({display: "none"});
	      cancelAnimationFrame(this.refreshIntervalId);
	      this.playLevel();
	    });
	
	    this.root.append($modal);
	  }
	
	};
	
	GameView.prototype.renderButtons = function() {
	
	  const $button2 = $("<div>").addClass("button").addClass("nav").addClass("previous-level");
	  const $button3 = $("<div>").addClass("button").addClass("nav").addClass("next-level");
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
	
	  // $("previous-level").off("touchstart");
	  // $("previous-level").off("click");
	  console.log("binding previous-level-button action");
	  $(".previous-level").on("click touchstart", event => {
	    event.stopPropagation();
	    event.preventDefault();
	    console.log("touchstart/clicked on previous-level button");
	
	    if (this.level > 0) {
	      this.levelDown();
	      this.playLevel(this.level);
	    }
	  });
	
	  // $("next-level").off("touchstart");
	  // $("next-level").off("click");
	  console.log("binding next-level-button action");
	  $(".next-level").on("click touchstart", event => {
	    event.stopPropagation();
	    event.preventDefault();
	    console.log("touchstart/clicked on next-level button");
	
	    this.levelUp();
	    this.playLevel(this.level);
	  });
	
	  // $("show-rules").off("touchstart");
	  // $("show-rules").off("click");
	  console.log("binding show-rules-button action");
	  $(".show-rules").on("click touchstart", event => {
	    event.stopPropagation();
	    event.preventDefault();
	    console.log("touchstart/clicked on show-rules button");
	
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
	
	  $("canvas").off("mousedown");
	  $("canvas").off("touchstart");
	  $("canvas").on("mousedown touchstart", event => {
	    event.stopPropagation();
	    event.preventDefault();
	    console.log("touchstart/mousedown on canvas button");
	    console.log(this.currentMousePos);
	
	    let vertexSelected = false;
	    let withinVertex = 30;
	
	    if (Vertex.RADIUS > 7) {
	      withinVertex += (Vertex.RADIUS - 7);
	    }
	
	    if (event.originalEvent.targetTouches) {
	      let touch = event.originalEvent.targetTouches[0];
	      if (touch) {
	        const yAdjust = -40;
	        const xAdjust = 0;
	
	        this.currentMousePos.x = touch.pageX + xAdjust - Game.leftOffset;
	        this.currentMousePos.y = touch.pageY + yAdjust;
	      }
	    }
	
	    this.game.vertices.forEach( vertex => {
	      const dist = Util.distFromMouse(vertex, this.currentMousePos);
	      // console.log(`(${vertex.x}, ${vertex.y})`);
	      console.log(dist);
	
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
	
	  // $(document).off("mouseup");
	  // $(document).off("touchend");
	
	  $(document).on("mouseup touchend", event => {
	    event.stopPropagation();
	    event.preventDefault();
	    console.log("touchend/mouseup on document button");
	
	    this.game.dropVertices();
	    this.checkPlanarity();
	  });
	
	  // $(document).off("mousemove");
	  $(document).mousemove( event => {
	    event.stopPropagation();
	    event.preventDefault();
	
	    const yAdjust = -40;
	    const xAdjust = 0;
	
	    this.currentMousePos.x = event.pageX + xAdjust - Game.leftOffset;
	    this.currentMousePos.y = event.pageY + yAdjust;
	  });
	
	  // $(document).off("touchmove");
	  $(document).on("touchmove", event => {
	    event.stopPropagation();
	    event.preventDefault();
	    // console.log(event);
	    // console.log(event.originalEvent);
	    // console.log(event.originalEvent.targetTouches[0]);
	    // console.log(event.originalEvent.targetTouches[0].pageX);
	    // console.log(event.originalEvent.targetTouches[0].pageY);
	    // debugger;
	    let touch = event.originalEvent.targetTouches[0];
	    // console.log(touch);
	
	    if (touch) {
	      const yAdjust = -40;
	      const xAdjust = 0;
	
	      this.currentMousePos.x = touch.pageX + xAdjust - Game.leftOffset;
	      this.currentMousePos.y = touch.pageY + yAdjust;
	      console.log(this.currentMousePos);
	    }
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