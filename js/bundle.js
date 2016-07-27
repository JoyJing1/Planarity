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
	
	var Game = __webpack_require__(1),
	    GameView = __webpack_require__(7);
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvasEl = document.getElementsByTagName("canvas")[0];
	
	  if (window.innerHeight < window.innerWidth) {
	    Game.DIM_X = window.innerHeight * 0.8;
	    Game.DIM_Y = window.innerHeight * 0.8;
	  } else {
	    Game.DIM_X = window.innerWidth;
	    Game.DIM_Y = window.innerWidth;
	  }
	
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	
	  var ctx = canvasEl.getContext("2d");
	  var rootEl = $('.planary-root');
	
	  new GameView(ctx, rootEl, { level: 0, stage: 0 });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Constants = __webpack_require__(2),
	    Edge = __webpack_require__(3),
	    Graph = __webpack_require__(5),
	    Util = __webpack_require__(4),
	    Vertex = __webpack_require__(6);
	
	var Game = function Game(options) {
	  this.level = options.level || 0;
	  this.stage = options.stage || 0;
	  this.moves = 0;
	
	  this.setPlaySize();
	  this.buildGraph();
	  this.setVertexSize();
	};
	
	Game.prototype.setPlaySize = function () {
	  var $board = $(".canvas-div");
	  $board.width(Game.DIM_X).height(Game.DIM_Y);
	
	  Game.leftOffset = (window.innerWidth - Game.DIM_X) / 2;
	  $board.css({ left: Game.leftOffset });
	};
	
	Game.prototype.setVertexSize = function () {
	  Vertex.RADIUS = Game.DIM_X / this.vertices.length / 10 + 5;
	};
	
	Game.prototype.isPlanar = function () {
	  var _this = this;
	
	  var planar = true;
	
	  this.edges.forEach(function (edge1, i1) {
	    _this.edges.forEach(function (edge2, i2) {
	      if (i1 !== i2 && edge1.intersectsWith(edge2)) {
	        planar = false;
	      }
	    });
	  });
	
	  return planar;
	};
	
	Game.prototype.buildGraph = function () {
	  var _this2 = this;
	
	  this.vertices = [];
	  this.edges = [];
	  var n = this.level + 4;
	
	  var edgeCoords = Graph.generateEdges(n);
	  var numVertices = n * (n - 1) / 2;
	
	  if (this.level > 0) {
	    numVertices = n * (n - 1) / 2 - (n - 1) + this.stage + 1;
	  }
	
	  for (var j = 0; j < numVertices; j++) {
	
	    var xOffset = Game.DIM_X / 2;
	    var yOffset = Game.DIM_Y / 2;
	
	    var xResize = Game.DIM_X * 0.35;
	    var yResize = Game.DIM_Y * 0.35;
	
	    var x = Math.cos(j * 2 * Math.PI / numVertices) * xResize + xOffset;
	    var y = Math.sin(j * 2 * Math.PI / numVertices) * xResize + xOffset;
	
	    this.vertices.push(new Vertex({ x: x, y: y, index: j }));
	  }
	
	  var verticesReached = [];
	  edgeCoords.forEach(function (edgeCoord, i) {
	
	    if (edgeCoord[0] < numVertices && edgeCoord[1] < numVertices) {
	      var edge = new Edge({ vertex1: _this2.vertices[edgeCoord[0]],
	        vertex2: _this2.vertices[edgeCoord[1]],
	        idx: i });
	      _this2.edges.push(edge);
	
	      _this2.vertices[edgeCoord[0]].edges.push(edge);
	      _this2.vertices[edgeCoord[1]].edges.push(edge);
	
	      verticesReached.push(edgeCoord[0]);
	      verticesReached.push(edgeCoord[1]);
	    }
	  });
	
	  for (var i = 0; i < numVertices; i++) {
	    if (!verticesReached.includes(i)) {
	      var v2 = 0;
	      if (i === v2) {
	        v2 += 1;
	      }
	      var edge = new Edge({ vertex1: this.vertices[i],
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
	
	Game.prototype.dropVertices = function () {
	  this.vertices.forEach(function (vertex) {
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
	  COLOR: "#046FD8",
	  COLOR_SELECTED: "#47D6B6",
	  COLOR_NEIGHBOR: "#4531B1",
	  BLACK: "#000000",
	  WHITE: "#FFFFFF",
	  LINE_FREE: "#6AF794",
	  LINE_INTERSECTING: "#FF9090",
	  RADIUS: 15,
	  EPSILON: 0.00001
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Constants = __webpack_require__(2),
	    Util = __webpack_require__(4);
	
	var Edge = function Edge(options) {
	  this.vertex1 = options.vertex1;
	  this.vertex2 = options.vertex2;
	  this.idx = options.idx;
	};
	
	Edge.prototype.draw = function (ctx, edges) {
	  if (this.currentlyIntersecting(edges)) {
	    ctx.strokeStyle = Constants.LINE_INTERSECTING;
	    ctx.shadowColor = Constants.LINE_INTERSECTING;
	    ctx.lineWidth = 5;
	    ctx.shadowBlur = 10;
	    ctx.beginPath();
	    ctx.moveTo(this.vertex1.x, this.vertex1.y);
	    ctx.lineTo(this.vertex2.x, this.vertex2.y);
	    ctx.stroke();
	  } else {
	    ctx.strokeStyle = Constants.BLACK;
	    ctx.shadowColor = Constants.LINE_FREE;
	    ctx.lineWidth = 5;
	    ctx.shadowBlur = 15;
	    ctx.beginPath();
	    ctx.moveTo(this.vertex1.x, this.vertex1.y);
	    ctx.lineTo(this.vertex2.x, this.vertex2.y);
	    ctx.stroke();
	  }
	};
	
	Edge.prototype.slope = function () {
	
	  if (this.vertex1.x === this.vertex2.x) {
	    return 100000;
	  } else if (this.vertex1.x < this.vertex2.x) {
	    return (this.vertex2.y - this.vertex1.y) / (this.vertex2.x - this.vertex1.x);
	  } else {
	    return (this.vertex1.y - this.vertex2.y) / (this.vertex1.x - this.vertex2.x);
	  }
	};
	
	Edge.prototype.xIntercept = function () {
	  if (this.isVertical()) {
	    return this.vertex1.x;
	  } else if (this.isHorizontal()) {
	    return 1000000;
	  } else {
	    return -this.yIntercept() / this.slope();
	  }
	};
	
	Edge.prototype.yIntercept = function () {
	  if (this.isVertical()) {
	    return 1000000;
	  } else if (this.isHorizontal()) {
	    return this.vertex1.y;
	  } else {
	    return this.vertex1.y - this.slope() * this.vertex1.x;
	  }
	};
	
	Edge.prototype.shareVertex = function (edge) {
	  return this.vertex1 === edge.vertex1 || this.vertex1 === edge.vertex2 || this.vertex2 === edge.vertex1 || this.vertex2 === edge.vertex2;
	};
	
	Edge.prototype.isVertical = function () {
	  return Math.abs(this.vertex1.x - this.vertex2.x) < Constants.EPSILON;
	};
	
	Edge.prototype.isHorizontal = function () {
	  return Math.abs(this.vertex1.y - this.vertex2.y) < Constants.EPSILON;
	};
	
	Edge.prototype.intersectsAtX = function (edge) {
	  return (edge.yIntercept() - this.yIntercept()) / (this.slope() - edge.slope());
	};
	
	Edge.prototype.xValue = function (y) {
	  return (y - this.yIntercept()) / this.slope();
	};
	
	Edge.prototype.yValue = function (x) {
	  return this.slope() * x + this.yIntercept();
	};
	
	Edge.prototype.minX = function () {
	  return Math.min(this.vertex1.x, this.vertex2.x);
	};
	
	Edge.prototype.maxX = function () {
	  return Math.max(this.vertex1.x, this.vertex2.x);
	};
	
	Edge.prototype.minY = function () {
	  return Math.min(this.vertex1.y, this.vertex2.y);
	};
	
	Edge.prototype.maxY = function () {
	  return Math.max(this.vertex1.y, this.vertex2.y);
	};
	
	Edge.prototype.intersectsWith = function (edge) {
	  // If edges are the same
	  if (this === edge) {
	    return false;
	
	    // If edges share a vertex
	  } else if (this.vertex1 === edge.vertex1) {
	    var response = false;
	
	    var slope1 = Util.slope(this.vertex1, this.vertex2);
	    var slope2 = Util.slope(edge.vertex1, edge.vertex2);
	
	    if (slope1 === slope2) {
	      response = true;
	    }
	    return response;
	  } else if (this.vertex1 === edge.vertex2) {
	    var _response = false;
	
	    var _slope = Util.slope(this.vertex1, this.vertex2);
	    var _slope2 = Util.slope(edge.vertex2, edge.vertex1);
	
	    if (_slope === _slope2) {
	      _response = true;
	    }
	    return _response;
	  } else if (this.vertex2 === edge.vertex1) {
	    var _response2 = false;
	
	    var _slope3 = Util.slope(this.vertex2, this.vertex1);
	    var _slope4 = Util.slope(edge.vertex1, edge.vertex2);
	
	    if (_slope3 === _slope4) {
	      _response2 = true;
	    }
	    return _response2;
	  } else if (this.vertex2 === edge.vertex2) {
	    var _response3 = false;
	
	    var _slope5 = Util.slope(this.vertex2, this.vertex1);
	    var _slope6 = Util.slope(edge.vertex2, edge.vertex1);
	
	    if (_slope5 === _slope6) {
	      _response3 = true;
	    }
	    return _response3;
	
	    // If one of the edges is horizontal
	  } else if (this.isHorizontal()) {
	    var _response4 = false;
	
	    if (edge.minY() + 1 < this.vertex1.y && this.vertex1.y < edge.maxY() - 1) {
	      if (edge.isVertical()) {
	        _response4 = true;
	      } else {
	        var xValue = edge.xValue(this.vertex1.y);
	        if (this.minX() + 1 < xValue && xValue < this.maxX() - 1) {
	          _response4 = true;
	        }
	      }
	    }
	    return _response4;
	  } else if (edge.isHorizontal()) {
	    var _response5 = false;
	    if (this.minY() + 1 < edge.vertex1.y && edge.vertex1.y < this.maxY() - 1) {
	      if (this.isVertical()) {
	        _response5 = true;
	      } else {
	        var _xValue = this.xValue(edge.vertex1.y);
	        if (edge.minX() + 1 < _xValue && _xValue < edge.maxX() - 1) {
	          _response5 = true;
	        }
	      }
	    }
	    return _response5;
	
	    // If one of the edges is vertical
	  } else if (this.isVertical()) {
	    var _response6 = false;
	    if (edge.minX() + 1 < this.vertex1.x && this.vertex1.x < edge.maxX() - 1) {
	      if (edge.isHorizontal()) {
	        _response6 = true;
	      } else {
	        var yValue = edge.yValue(this.vertex1.x);
	        if (this.minY() + 1 < yValue && yValue < this.maxY() - 1) {
	          _response6 = true;
	        }
	      }
	    }
	    return _response6;
	  } else if (edge.isVertical()) {
	    var _response7 = false;
	
	    if (this.minX() + 1 < edge.vertex1.x && edge.vertex1.x < this.maxX() - 1) {
	      if (this.isHorizontal()) {
	        _response7 = true;
	      } else {
	        var _yValue = this.yValue(edge.vertex1.x);
	        if (edge.minY() + 1 < _yValue && _yValue < edge.maxY() - 1) {
	          _response7 = true;
	        }
	      }
	    }
	    return _response7;
	
	    // If edges are parallel
	  } else if (this.slope() === edge.slope()) {
	    return false;
	
	    // If edges are both diagonal and do not share a vertex
	  } else {
	    var x = this.intersectsAtX(edge);
	    var y = this.yValue(x);
	
	    var xWithinRange = this.minX() + 1 < x && x < this.maxX() - 1 && edge.minX() + 1 < x && x < edge.maxX() - 1;
	    var yWithinRange = this.minY() + 1 < y && y < this.maxY() - 1 && edge.minY() + 1 < y && y < edge.maxY() - 1;
	
	    return xWithinRange && yWithinRange;
	  }
	};
	
	Edge.prototype.currentlyIntersecting = function (allEdges) {
	  var _this = this;
	
	  var intersecting = false;
	
	  allEdges.forEach(function (edge) {
	    if (_this.intersectsWith(edge)) {
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
	
	var Util = {
	  slope: function slope(vertex1, vertex2) {
	    return (vertex2.y - vertex1.y) / (vertex2.x - vertex1.x);
	  },
	  distFromMouse: function distFromMouse(vertex, currentMousePos) {
	    var vertexRadius = 12.5;
	
	    return Math.sqrt(Math.pow(vertex.x + vertexRadius - currentMousePos.x, 2) + Math.pow(vertex.y + vertexRadius - currentMousePos.y, 2));
	  }
	};
	
	module.exports = Util;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Edge = __webpack_require__(3),
	    Util = __webpack_require__(4),
	    Vertex = __webpack_require__(6);
	
	var Graph = {
	  pairIndex: function pairIndex(n) {
	    var pairIndex = {};
	
	    var vertexIdx = 0;
	    for (var i = 0; i <= n; i++) {
	      for (var j = i + 1; j < n; j++) {
	        pairIndex[i + "," + j] = vertexIdx;
	        vertexIdx++;
	      }
	    }
	
	    return pairIndex;
	  },
	  generateLines: function generateLines(n) {
	    var lines = [];
	    var slopes = [];
	
	    while (lines.length < n) {
	      var v1 = new Vertex({ x: Math.random(), y: Math.random() });
	      var v2 = new Vertex({ x: Math.random(), y: Math.random() });
	
	      var slope = Util.slope(v1, v2);
	      // let inverseSlope = Util.slope(v2, v1);
	      if (!slopes.includes(slope)) {
	        var line = new Edge({ vertex1: v1, vertex2: v2, idx: lines.length });
	        lines.push(line);
	      }
	    }
	    return lines;
	  },
	  generateEdges: function generateEdges(n) {
	    // Build pairIndex hash from { [pair]: indexOfVertex }
	    var pairIndex = this.pairIndex(n);
	
	    // Generate n * (n-1)/2 random lines of differing slope
	    var lines = this.generateLines(n);
	
	    // For each line, find the intersection points
	    // of that line with all other lines
	    var edges = [];
	    lines.forEach(function (line1, i1) {
	      var intersections = [];
	
	      lines.forEach(function (line2, i2) {
	        if (i1 !== i2) {
	          var intersection = line1.intersectsAtX(line2);
	          intersections.push({ x: intersection, lineIdx: i2 });
	        }
	      });
	
	      // Order lines by intersection point's X coord
	      intersections.sort(function (intersect1, intersect2) {
	        return intersect1.x - intersect2.x;
	      });
	
	      // For each pair of neighboring intersections
	      // create a new edge between them
	      for (var i = 0; i < intersections.length - 1; i++) {
	        var l1 = intersections[i];
	        var l2 = intersections[i + 1];
	
	        var indices1 = [i1, l1.lineIdx];
	        var indices2 = [i1, l2.lineIdx];
	
	        indices1.sort(function (a, b) {
	          return a - b;
	        });
	        indices2.sort(function (a, b) {
	          return a - b;
	        });
	
	        var v1 = pairIndex[indices1];
	        var v2 = pairIndex[indices2];
	
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
	
	var Constants = __webpack_require__(2);
	
	var Vertex = function Vertex(options) {
	  this.index = options.index;
	  this.x = options.x;
	  this.y = options.y;
	  this.color = Constants.COLOR;
	  this.radius = Constants.RADIUS;
	  this.edges = [];
	  this.selected = false;
	};
	
	Vertex.prototype.pos = function () {
	  return [this.x, this.y];
	};
	
	Vertex.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;
	  ctx.shadowColor = this.color;
	  ctx.shadowBlur = 10;
	  ctx.beginPath();
	  ctx.arc(this.x, this.y, Vertex.RADIUS, 0, 2 * Math.PI);
	  ctx.fill();
	};
	
	Vertex.prototype.neighbors = function () {
	  var _this = this;
	
	  var neighbors = [];
	
	  this.edges.forEach(function (edge) {
	    if (edge.vertex1 === _this) {
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
	
	var Constants = __webpack_require__(2),
	    Game = __webpack_require__(1),
	    Util = __webpack_require__(4),
	    Vertex = __webpack_require__(6);
	
	var GameView = function GameView(ctx, root, options) {
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
	
	GameView.prototype.playLevel = function () {
	  this.game = new Game({ level: this.level, stage: this.stage });
	
	  this.renderGraph();
	  this.renderModal();
	
	  var that = this;
	  function playGame() {
	    that.follow(that.game, that.currentMousePos);
	    that.renderGraph();
	    requestAnimationFrame(playGame);
	  }
	  requestAnimationFrame(playGame);
	};
	
	GameView.prototype.levelUp = function () {
	  this.stage += 1;
	  this.game.moves = 0;
	  if (this.stage > 0) {
	    $(".description").css({ display: "none" });
	  }
	
	  if (this.level === 0 || this.stage >= this.level + 3) {
	    this.level += 1;
	    this.stage = 0;
	  }
	};
	
	GameView.prototype.levelDown = function () {
	  this.stage -= 1;
	  this.game.moves = 0;
	  if (this.stage < 0) {
	    this.level -= 1;
	    this.stage = this.level + 3;
	  }
	};
	
	GameView.prototype.renderRules = function () {
	  var _this = this;
	
	  var prevRules = document.getElementsByClassName("rules");
	
	  if (prevRules.length > 0) {
	    var $rulesModal = $(prevRules[0]);
	    $rulesModal.css({ display: "block" });
	  } else {
	    (function () {
	      var $rulesModal = $("<div>").addClass("modal").addClass("rules").css({ display: "block" });
	      var $rulesContent = $("<div>").addClass("modal-content");
	      var $rules = $("<p>").text("Can you detangle the web? Move the nodes around until none of the lines intersect.");
	
	      var $definitions = $("<p class='definitions'>A <a href='https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)'>graph</a> is a collection of nodes and edges.</br>A graph is <a href='https://en.wikipedia.org/wiki/Planar_graph'>planar</a> when it has no intersecting edges.</p>");
	
	      // .addClass("definitions").text("A <a>graph</a> is a collection of nodes and vertices. A graph is <a>planar</a> when it has no intersecting lines.");
	
	      $rulesContent.append($rules);
	      $rulesModal.append($rulesContent);
	
	      var $playButton = $("<a>").text("Play").addClass("button").addClass("play");
	
	      $rulesContent.append($playButton);
	      $rulesContent.append($definitions);
	
	      $playButton.on("touchstart click", function (event) {
	        $rulesModal.css({ display: "none" });
	      });
	
	      $rulesModal.on("touchstart click", function (event) {
	        $rulesModal.css({ display: "none" });
	      });
	
	      _this.root.append($rulesModal);
	    })();
	  }
	};
	
	GameView.prototype.renderModal = function () {
	  var _this2 = this;
	
	  var prevModals = document.getElementsByClassName("win-modal");
	
	  if (prevModals.length > 0) {
	    var $modal = $(prevModals[0]);
	  } else {
	    (function () {
	      var $modal = $("<div>").addClass("modal").addClass("win-modal").css({ display: "none" });
	
	      var $modalContent = $("<div>").addClass("modal-content").addClass("win-modal-content");
	      var $congrats = $("<h2>").text("Congratulations, the graph is planar!");
	
	      var $stats = $("<p>").addClass("stats");
	      var $level = $("<div>").addClass("results level");
	      var $stage = $("<div>").addClass("results stage");
	      var $moves = $("<div>").addClass("results moves");
	
	      $stats.append($level);
	      $stats.append($stage);
	      $stats.append($moves);
	
	      $modalContent.append($congrats);
	      $modalContent.append($stats);
	      $modal.append($modalContent);
	
	      var $nextButton = $("<a>").text("Next Level").addClass("button").addClass("next-level-modal");
	
	      $modalContent.append($nextButton);
	
	      $nextButton.on("touchstart click", function (event) {
	        event.stopPropagation();
	        event.preventDefault();
	
	        _this2.levelUp();
	        $modal.css({ display: "none" });
	        cancelAnimationFrame(_this2.refreshIntervalId);
	        _this2.playLevel();
	      });
	
	      $modal.on("touchstart click", function (event) {
	        event.stopPropagation();
	        event.preventDefault();
	
	        _this2.levelUp();
	        $modal.css({ display: "none" });
	        cancelAnimationFrame(_this2.refreshIntervalId);
	        _this2.playLevel();
	      });
	
	      _this2.root.append($modal);
	    })();
	  }
	};
	
	GameView.prototype.renderButtons = function () {
	
	  var $button2 = $("<div>").addClass("button").addClass("nav").addClass("previous-level");
	  var $button3 = $("<div>").addClass("button").addClass("nav").addClass("next-level");
	  var $github = $("<a href=\"https://github.com/JoyJing1/Planarity\" target=\"_blank\"><div class=\"button github\"/></a>");
	
	  var $buttonRules = $("<a>").addClass("button").addClass("show-rules").text("Rules");
	  var $canvasDiv = $(".canvas-div");
	
	  $canvasDiv.append($button2);
	  $canvasDiv.append($button3);
	  $canvasDiv.append($github);
	  $canvasDiv.append($buttonRules);
	};
	
	GameView.prototype.checkPlanarity = function () {
	  if (this.game.isPlanar()) {
	    var $winModal = $(".win-modal");
	
	    var $stats = $("<p>");
	    var $level = $(".level").empty().append("Level: <span>" + (this.level + 1) + "</span>");
	    var $stage = $(".stage").empty().append("Stage: <span>" + (this.stage + 1) + "</span>");
	    var $moves = $(".moves").empty().append("Moves: <span>" + this.game.moves + "</span>");
	
	    $winModal.css({ display: "block" });
	  }
	};
	
	GameView.prototype.bindButtonEvents = function () {
	  var _this3 = this;
	
	  $(".previous-level").off("touchstart");
	  $(".previous-level").off("click");
	  $(".previous-level").on("click touchstart", function (event) {
	    event.stopPropagation();
	    event.preventDefault();
	
	    if (_this3.level > 0) {
	      _this3.levelDown();
	      _this3.playLevel(_this3.level);
	    }
	  });
	
	  $(".next-level").off("touchstart");
	  $(".next-level").off("click");
	  $(".next-level").on("click touchstart", function (event) {
	    event.stopPropagation();
	    event.preventDefault();
	
	    _this3.levelUp();
	    _this3.playLevel(_this3.level);
	  });
	
	  $(".show-rules").off("touchstart");
	  $(".show-rules").off("click");
	  $(".show-rules").on("click touchstart", function (event) {
	    event.stopPropagation();
	    event.preventDefault();
	
	    $(".rules").css({ display: "block" });
	  });
	};
	
	GameView.prototype.renderGraph = function () {
	  var _this4 = this;
	
	  this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	
	  this.game.edges.forEach(function (edge, i) {
	    edge.draw(_this4.ctx, _this4.game.edges);
	  });
	
	  this.game.vertices.forEach(function (vertex, i) {
	    vertex.draw(_this4.ctx);
	  });
	};
	
	GameView.prototype.bindGraphEvents = function () {
	  var _this5 = this;
	
	  $("canvas").off("mousedown");
	  $("canvas").off("touchstart");
	  $("canvas").on("mousedown touchstart", function (event) {
	    event.stopPropagation();
	    event.preventDefault();
	
	    var vertexSelected = false;
	    var withinVertex = 30;
	
	    if (Vertex.RADIUS > 7) {
	      withinVertex += Vertex.RADIUS - 7;
	    }
	
	    if (event.originalEvent.targetTouches) {
	      var touch = event.originalEvent.targetTouches[0];
	      if (touch) {
	        var yAdjust = -203;
	        var xAdjust = 0;
	
	        _this5.currentMousePos.x = touch.pageX + xAdjust - Game.leftOffset;
	        _this5.currentMousePos.y = touch.pageY + yAdjust;
	      }
	    }
	
	    _this5.game.vertices.forEach(function (vertex) {
	      var dist = Util.distFromMouse(vertex, _this5.currentMousePos);
	
	      if (dist < withinVertex && !vertexSelected) {
	        _this5.game.moves += 1;
	
	        vertex.selected = true;
	        vertex.color = Constants.COLOR_SELECTED;
	        vertexSelected = true;
	
	        vertex.neighbors().forEach(function (neighbor) {
	          neighbor.color = Constants.COLOR_NEIGHBOR;
	        });
	      }
	    });
	  });
	
	  $(document).off("mouseup");
	  $(document).off("touchend");
	  $(document).on("mouseup touchend", function (event) {
	    event.stopPropagation();
	    event.preventDefault();
	
	    _this5.game.dropVertices();
	    _this5.checkPlanarity();
	  });
	
	  $(document).off("mousemove");
	  $(document).mousemove(function (event) {
	    event.stopPropagation();
	    event.preventDefault();
	
	    var yAdjust = -70;
	    var xAdjust = 0;
	
	    _this5.currentMousePos.x = event.pageX + xAdjust - Game.leftOffset;
	    _this5.currentMousePos.y = event.pageY + yAdjust;
	  });
	
	  $(document).off("touchmove");
	  $(document).on("touchmove", function (event) {
	    event.stopPropagation();
	    event.preventDefault();
	    var touch = event.originalEvent.targetTouches[0];
	
	    if (touch) {
	      var yAdjust = -167;
	      var xAdjust = 0;
	
	      _this5.currentMousePos.x = touch.pageX + xAdjust - Game.leftOffset;
	      _this5.currentMousePos.y = touch.pageY + yAdjust;
	    }
	  });
	};
	
	GameView.prototype.follow = function (game, currentMousePos) {
	  game.vertices.forEach(function (vertex) {
	    if (vertex.selected) {
	      var newX = Math.min(Math.max(currentMousePos.x, Vertex.RADIUS), Game.DIM_X - Vertex.RADIUS);
	      var newY = Math.min(Math.max(currentMousePos.y, Vertex.RADIUS), Game.DIM_Y - Vertex.RADIUS);
	
	      vertex.x = newX;
	      vertex.y = newY;
	    }
	  });
	};
	
	module.exports = GameView;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map