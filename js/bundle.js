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
	  const canvasEl = document.getElementsByTagName("canvas")[0];
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	
	  const ctx = canvasEl.getContext("2d");
	  const rootEl = $('.planary-root');
	
	  console.log('created ctx & game in planary.js');
	  console.log(ctx);
	
	  new GameView(ctx, rootEl, 1);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Edge = __webpack_require__(2);
	const Vertex = __webpack_require__(4);
	const Util = __webpack_require__(3);
	const Graph = __webpack_require__(5);
	
	const Game = function (level = 1) {
	  this.vertices = [];
	  this.edges = [];
	  this.level = level;
	
	  this.buildGraph(level);
	};
	
	Game.DIM_X = 800;
	Game.DIM_Y = 800;
	
	Game.prototype.buildGraph = function(level) {
	
	  let edges = Graph.generateEdges(level);
	  let n = level+3;
	  let numVertices = n * (n-1)/2;
	
	  for (let j = 0; j < numVertices; j++) {
	    let x = Math.cos(j * 2 * Math.PI / numVertices) * 300 + 400;
	    let y = Math.sin(j * 2 * Math.PI / numVertices) * 300 + 400;
	
	    this.vertices.push(new Vertex({ x: x, y: y, index: j }) );
	  }
	
	  edges.forEach ( vertices => {
	    let edge = new Edge({ vertex1: this.vertices[vertices[0]], vertex2: this.vertices[vertices[1]] });
	    this.edges.push(edge);
	
	    this.vertices[vertices[0]].edges.push(edge);
	    this.vertices[vertices[1]].edges.push(edge);
	  });
	
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Util = window.Util = __webpack_require__(3);
	
	const Edge = function(options) {
	  this.vertex1 = options.vertex1;
	  this.vertex2 = options.vertex2;
	};
	
	Edge.prototype.draw = function(ctx) {
	  ctx.beginPath();
	  ctx.moveTo(this.vertex1.x, this.vertex1.y);
	  ctx.lineTo(this.vertex2.x, this.vertex2.y);
	  // ctx.moveTo(this.vertex1.y, this.vertex1.x);
	  // ctx.lineTo(this.vertex2.y, this.vertex2.x);
	  ctx.stroke();
	};
	
	Edge.prototype.slope = function() {
	  return Util.slope(this.vertex1, this.vertex2);
	};
	
	Edge.prototype.xIntercept = function() {
	  // debugger;
	  return Util.xIntercept(this.vertex1, this.slope());
	};
	
	// Edge.prototype.equals = function(edge) {
	//   return this.vertex1 === edge.vertex1 && this.vertex2 === edge.vertex2;
	// };
	
	Edge.prototype.shareVertex = function(edge) {
	  return (
	    this.vertex1 === edge.vertex1
	    || this.vertex1 === edge.vertex2
	    || this.vertex2 === edge.vertex1
	    || this.vertex2 === edge.vertex2
	  );
	};
	
	Edge.prototype.intersectsAtX = function(edge) {
	  return (edge.xIntercept() - this.xIntercept()) / (this.slope() - edge.slope());
	}
	
	Edge.prototype.intersectsWith = function(edge) {
	  const x = this.intersectsAtX(edge);
	
	  const firstMin = Math.min(this.vertex1.x, this.vertex2.x);
	  const firstMax = Math.max(this.vertex1.x, this.vertex2.x);
	
	  const secondMin = Math.min(edge.vertex1.x, edge.vertex2.x);
	  const secondMax = Math.max(edge.vertex1.x, edge.vertex2.x);
	
	  const onFirst = (firstMin < x && x < firstMax);
	  const onSecond = (secondMin < x && x < secondMax);
	
	  // debugger;
	
	  return (onFirst && onSecond && !this.shareVertex(edge));
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
	
	  distFromMouse(vertex, event) {
	    const vertexRadius = 12.5;
	
	    return Math.sqrt(
	      Math.pow(vertex.x + vertexRadius - event.pageX, 2) + Math.pow(vertex.y + vertexRadius - event.pageY, 2)
	    );
	  },
	
	  readTextFile(file) {
	    var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", file, false);
	    rawFile.onreadystatechange = function () {
	      if(rawFile.readyState === 4) {
	        if(rawFile.status === 200 || rawFile.status === 0) {
	          const allText = rawFile.responseText;
	
	          // Check allText - pulling file contents?
	          debugger;
	        }
	      }
	    };
	    rawFile.send(null);
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
	  this.index = options.index;
	  this.x = options.x;
	  this.y = options.y;
	  this.color = DEFAULTS.COLOR;
	  this.radius = DEFAULTS.RADIUS;
	  this.edges = [];
	  this.selected = false;
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
	    const n = level+3;
	
	    // Build pairIndex hash
	    let pairIndex = this.pairIndex(n);
	
	    // Generate n non-parallel lines
	    const lines = this.generateLines(n);
	
	    // For each line, order the other lines
	    // by the location of their intersections
	    // with the current line
	
	    let edges = [];
	    lines.forEach( (line1, i1) => {
	      let intersections = [];
	      // let lineHash = {};
	
	      lines.forEach( (line2, i2) => {
	        if (i1 !== i2) {
	          let intersection = line1.intersectsAtX(line2);
	          // Not sure if this will key to "intersection" or value of intersection
	          intersections.push( { x: intersection, lineIdx: i2 } );
	          // lineHash[intersection] = line2;
	        }
	
	      });
	
	      intersections.sort( (intersect1, intersect2) => {
	        return intersect1.x - intersect2.x;
	      });
	
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
	
	const GameView = function (ctx, root, level=1) {
	  this.ctx = ctx;
	  this.root = root;
	  this.currentMousePos = { x: -1, y: -1 };
	  this.level = level;
	  this.game = new Game(this.level);
	
	  this.renderGraph();
	  this.renderButton();
	
	  this.bindGraphEvents();
	  this.bindButtonEvents();
	
	  setInterval( () => {
	    this.follow(this.game, this.currentMousePos);
	    this.renderGraph();
	  }, 50);
	};
	
	GameView.prototype.renderButton = function() {
	  $button = $("<button class='planar-check'>Is Planar?</button>");
	
	  this.root.append($button);
	};
	
	GameView.prototype.bindButtonEvents = function() {
	  $(".planar-check").on("click", event => {
	    let planar = true;
	    const game = this.game;
	
	    game.edges.forEach( (edge1, i1) => {
	      game.edges.forEach( (edge2, i2) => {
	        if (i1 !== i2 && edge1.intersectsWith(edge2)) {
	          planar = false;
	        };
	      });
	    });
	
	    console.log(`final: ${planar}`);
	
	    if (planar) {
	      this.level += 1;
	      console.log("Yay, you made a planar graph!!");;
	      // Level up to next level
	      // this.game = new Game(this.level);
	    } else {
	      console.log("The graph's not planar quite yet");
	    }
	    // return planar;
	
	  });
	
	};
	
	
	GameView.prototype.renderGraph = function() {
	  this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	
	  this.game.edges.forEach( (edge, i) => {
	    edge.draw(this.ctx);
	  });
	
	  this.game.vertices.forEach( (vertex, i) => {
	    vertex.draw(this.ctx);
	  });
	
	};
	
	GameView.prototype.bindGraphEvents = function() {
	  $("canvas").on("mousedown", event => {
	    this.offset = (0, 0);
	    let vertexSelected = false;
	
	    this.game.vertices.forEach( vertex => {
	      const dist = Util.distFromMouse(vertex, event);
	
	      if (dist < 70 && !vertexSelected) {
	        vertex.selected = true;
	        vertexSelected = true;
	      }
	    });
	
	  });
	
	  $("canvas").on("mouseup", event => {
	    this.game.vertices.forEach( vertex => {
	      vertex.selected = false;
	    });
	  });
	
	  $(document).mousemove( event => {
	    const yAdjust = -65;
	    const xAdjust = -8;
	
	    this.currentMousePos.x = event.pageX + xAdjust;
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map