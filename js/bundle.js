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
	const GameView = __webpack_require__(6);
	
	document.addEventListener("DOMContentLoaded", function(){
	  console.log("DOMContentLoaded");
	
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
	
	  // console.log('created ctx & game in planary.js');
	  // console.log(ctx);
	
	  new GameView(ctx, rootEl, 0);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Edge = __webpack_require__(2);
	const Vertex = __webpack_require__(4);
	const Util = __webpack_require__(3);
	const Graph = __webpack_require__(5);
	const Constants = __webpack_require__(7);
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const Constants = __webpack_require__(7);
	
	const Edge = function(options) {
	  this.vertex1 = options.vertex1;
	  this.vertex2 = options.vertex2;
	};
	
	Edge.prototype.draw = function(ctx, edges) {
	  // console.log(edges);
	    if (this.currentlyIntersecting(edges)) {
	      // console.log("Edge is currently intersecting");
	      ctx.strokeStyle = Constants.LINE_INTERSECTING;
	      ctx.beginPath();
	      ctx.moveTo(this.vertex1.x, this.vertex1.y);
	      ctx.lineTo(this.vertex2.x, this.vertex2.y);
	      ctx.stroke();
	
	    } else {
	      // console.log("Edge is not currently intersecting");
	      ctx.strokeStyle = Constants.BLACK;
	      ctx.beginPath();
	      ctx.moveTo(this.vertex1.x, this.vertex1.y);
	      ctx.lineTo(this.vertex2.x, this.vertex2.y);
	      ctx.stroke();
	    }
	};
	
	Edge.prototype.slope = function() {
	  return Util.slope(this.vertex1, this.vertex2);
	};
	
	Edge.prototype.xIntercept = function() {
	  if (this.isVertical()) {
	    return this.vertex1.x;
	  } else {
	    return Util.xIntercept(this.vertex1, this.slope());
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
	  return (Math.abs(this.vertex1.x - this.vertex2.x) < 1);
	};
	
	Edge.prototype.isHorizontal = function() {
	  return (Math.abs(this.vertex1.y - this.vertex2.y) < 1);
	};
	
	Edge.prototype.intersectsAtX = function(edge) {
	  return (edge.xIntercept() - this.xIntercept()) / (this.slope() - edge.slope());
	};
	
	Edge.prototype.intersectsWith = function(edge) {
	
	  if (this.isHorizontal()) {
	    let y = this.vertex1.y;
	    let minY = Math.min(edge.vertex1.y, edge.vertex2.y) + 1;
	    let maxY = Math.max(edge.vertex1.y, edge.vertex2.y) - 1;
	    return (minY < y && y < maxY);
	
	  } else if (edge.isHorizontal()) {
	    let y = edge.vertex1.y;
	    let minY = Math.min(this.vertex1.y, this.vertex2.y) + 1;
	    let maxY = Math.max(this.vertex1.y, this.vertex2.y) - 1;
	    return (minY < y && y < maxY);
	
	  } else if (this.isVertical()) {
	    let x = this.vertex1.x;
	    const minX = Math.min(edge.vertex1.x, edge.vertex2.x) + 1;
	    const maxX = Math.max(edge.vertex1.x, edge.vertex2.x) - 1;
	    return (minX < x && x < maxX);
	
	  } else if (edge.isVertical()){
	    let x = edge.vertex1.x;
	    const minX = Math.min(this.vertex1.x, this.vertex2.x) + 1;
	    const maxX = Math.max(this.vertex1.x, this.vertex2.x) - 1;
	    return (minX < x && x < maxX);
	
	  } else {
	    let x = this.intersectsAtX(edge);
	
	    const firstMin = Math.min(this.vertex1.x, this.vertex2.x);
	    const firstMax = Math.max(this.vertex1.x, this.vertex2.x);
	
	    const secondMin = Math.min(edge.vertex1.x, edge.vertex2.x);
	    const secondMax = Math.max(edge.vertex1.x, edge.vertex2.x);
	
	    const onFirst = (firstMin < x && x < firstMax);
	    const onSecond = (secondMin < x && x < secondMax);
	
	    return (onFirst && onSecond && !this.shareVertex(edge));
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
/* 3 */
/***/ function(module, exports) {

	const Util = {
	  slope(vertex1, vertex2) {
	    return (vertex2.y - vertex1.y) / (vertex2.x - vertex1.x);
	  },
	
	  xIntercept(vertex, slope) {
	    return vertex.y - (slope * vertex.x);
	  },
	
	  dist(vertex1, vertex2) {
	    return Math.sqrt(
	      Math.pow(vertex1.x - vertex2.x, 2)
	        + Math.pow(vertex1.y - vertex2.y, 2)
	    );
	  },
	
	  angle(vertex1, vertex2) {
	    const diffY = vertex2.y - vertex1.y;
	    const diffX = vertex2.x - vertex1.x;
	    const radians = Math.atan( diffY / diffX );
	    return radians;
	    // return radians / 2 / Math.PI * 360;
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Constants = __webpack_require__(7);
	
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
	  ctx.beginPath();
	  ctx.arc(this.x, this.y, Vertex.RADIUS, 0, 2 * Math.PI);
	  ctx.fill();
	};
	
	module.exports = Vertex;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Edge = __webpack_require__(2);
	const Vertex = __webpack_require__(4);
	const Util = __webpack_require__(3);
	
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
	      if (!slopes.includes(slope)) {
	        let line = new Edge({ vertex1: v1, vertex2: v2});
	        // lines.push({v1: v1, v2: v2, slope: slope});
	        lines.push(line);
	      }
	    }
	    // Check that this is generating liens correctly
	    return lines;
	  },
	
	  generateEdges(level) {
	    const n = level+4;
	
	    // Build pairIndex hash from { [pair]: indexOfVertex }
	    let pairIndex = this.pairIndex(n);
	
	    // Generate n * (n-1)/2 random lines of differing slope
	    const lines = this.generateLines(n);
	
	    // For each line, find the intersection of point
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

	const Util = __webpack_require__(3);
	const Game = __webpack_require__(1);
	const Constants = __webpack_require__(7);
	const Vertex = __webpack_require__(4);
	
	const GameView = function (ctx, root, level=1) {
	  this.ctx = ctx;
	  this.root = root;
	  this.currentMousePos = { x: -1, y: -1 };
	  this.level = level;
	
	  this.renderButtons();
	  this.bindButtonEvents();
	  this.playLevel(this.level);
	
	  // this.refreshIntervalId = setInterval( () => {
	  //   this.follow(this.game, this.currentMousePos);
	  //   this.renderGraph();
	  // }, 50);
	};
	
	GameView.prototype.playLevel = function() {
	  this.game = new Game(this.level);
	  // console.log(this.game);
	  // console.log(this);
	  // console.log("GameView.playLevel");
	
	  this.renderGraph();
	  this.renderModal();
	  this.bindGraphEvents();
	  // console.log("after this.bindGraphEvents in GameView()");
	
	
	  this.refreshIntervalId = setInterval( () => {
	    this.follow(this.game, this.currentMousePos);
	    this.renderGraph(); // COMMENT BACK IN
	    // this.checkPlanarity();
	
	  }, 1);
	};
	
	GameView.prototype.renderModal = function() {
	  console.log("GameView.renderModal()");
	  // let $modal = {};
	
	  const prevModals = document.getElementsByClassName("modal");
	
	    if (prevModals.length > 0) {
	      const $modal = $(prevModals[0]);
	
	    } else {
	      const $modal = $("<div>").addClass("modal")
	                    .addClass("win-modal")
	                    .css( {display: "none"} );
	
	      const $modalContent = $("<div>").addClass("modal-content");
	      const $text = $("<h2>").text("Congratulations, you made the graph planar!");
	
	      $modalContent.append($text);
	      $modal.append($modalContent);
	
	      const $nextButton = $("<a>").text("Next Level")
	                          .addClass("button")
	                          .addClass("next-level-modal");
	
	      $modalContent.append($nextButton);
	
	      $nextButton.on("click", event => {
	        this.level += 1;
	        clearInterval(this.refreshIntervalId);
	        $modal.css({display: "none"});
	        this.playLevel();
	      });
	
	      this.root.append($modal);
	    }
	
	  };
	
	GameView.prototype.renderButtons = function() {
	
	  // const $button1 = $("<a class='planar-check button'>Is Planar?</a>");
	  const $button2 = $("<img class='previous-level button' src='./images/arrow.png'></img>");
	  const $button3 = $("<img class='next-level button' src='./images/arrow.png'></img>");
	
	  const $canvasDiv = $(".canvas-div");
	
	  // $canvasDiv.append($button1);
	  $canvasDiv.append($button2);
	  $canvasDiv.append($button3);
	};
	
	GameView.prototype.checkPlanarity = function() {
	  // $(".planar-check").on("click", event => {
	  let planar = true;
	  const game = this.game;
	
	  game.edges.forEach( (edge1, i1) => {
	    game.edges.forEach( (edge2, i2) => {
	      if (i1 !== i2 && edge1.intersectsWith(edge2)) {
	        planar = false;
	      }
	    });
	  });
	
	  console.log(`final: ${planar}`);
	
	  if (planar) {
	    // console.log("Yay, you made a planar graph!!");
	    // this.game.dropVertices();
	    const $modal = $(".modal");
	    $modal.css({display: "block"});
	  } else {
	    // console.log("The graph's not planar quite yet");
	  }
	
	};
	
	GameView.prototype.bindButtonEvents = function() {
	
	  $(".previous-level").on("click", event => {
	    if (this.level > 0) {
	      this.level -= 1;
	      this.playLevel(this.level);
	    }
	  });
	
	  $(".next-level").on("click", event => {
	    this.level += 1;
	    this.playLevel(this.level);
	  });
	
	};
	
	
	GameView.prototype.renderGraph = function() {
	  this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	
	  this.game.edges.forEach( (edge, i) => {
	    // console.log(`Checking edge ${i}`);
	    edge.draw(this.ctx, this.game.edges);
	  });
	
	  this.game.vertices.forEach( (vertex, i) => {
	    vertex.draw(this.ctx);
	  });
	
	};
	
	GameView.prototype.bindGraphEvents = function() {
	  // console.log("GameView.bindGraphEvents() in game_view.js");
	
	  $("canvas").on("mousedown", event => {
	    // this.offset = (0, 0);
	    let vertexSelected = false;
	    // console.log(`Mouse Pos: (${this.currentMousePos.x}, ${this.currentMousePos.y})`);
	    // console.log(`Mouse Pos: (${event.pageX}, ${event.pageY})`);
	    console.log(`Vertex Radius: ${Vertex.RADIUS}`);
	    let withinVertex = 30;
	    if (Vertex.RADIUS > 7) {
	      withinVertex += (Vertex.RADIUS - 7);
	    }
	
	    console.log(`withinVertex = ${withinVertex}`);
	
	    this.game.vertices.forEach( vertex => {
	      const dist = Util.distFromMouse(vertex, this.currentMousePos);
	      // console.log(`(${vertex.x}, ${vertex.y})`);
	      console.log(dist);
	
	      if (dist < withinVertex && !vertexSelected) {
	        vertex.selected = true;
	        vertex.color = Constants.COLOR_SELECTED;
	        vertexSelected = true;
	      }
	    });
	
	  });
	
	  $("canvas").on("mouseup", event => {
	    // console.log("mouseup on canvas callback");
	    this.game.dropVertices();
	    this.checkPlanarity();
	  });
	
	  $(document).mousemove( event => {
	    // console.log(this.currentMousePos);
	    // console.log(`Mouse Pos: (${event.pageX}, ${event.pageY})`);
	    // Dynamically adjust to fit canvas size
	    const yAdjust = -40;
	    const xAdjust = 0;
	
	    this.currentMousePos.x = event.pageX + xAdjust - Game.leftOffset;
	    this.currentMousePos.y = event.pageY + yAdjust;
	  });
	
	};
	
	GameView.prototype.follow = function(game, currentMousePos) {
	  game.vertices.forEach( vertex => {
	    if (vertex.selected) {
	      vertex.x = currentMousePos.x;
	      vertex.y = currentMousePos.y;
	    }
	  });
	
	};
	
	module.exports = GameView;


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = {
		COLOR: "#2794EB",
	  COLOR_SELECTED: "#47D6B6",
	  BLACK: "#000000",
	  LINE_SELECTED: "#6150C1",
	  LINE_INTERSECTING: "#FF9090",
		RADIUS: 15
	};


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map