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
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	
	  const ctx = canvasEl.getContext("2d");
	  const rootEl = $('.planary-root');
	  const game = new Game(0);
	
	  console.log('created ctx & game in planary.js');
	  console.log(ctx);
	  console.log(game);
	  // debugger;
	  new GameView(game, ctx, rootEl);
	});
	
	// jsPlumb.bind("ready", function() {
	// // your jsPlumb related init code goes here
	//   console.log("inside jsPlum.bind callback");
	//
	// });
	
	// jsPlumb.ready(function() {
	// // your jsPlumb related init code goes here
	//   console.log("inside jsPlum.ready callback");
	//
	// });


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
	
	Game.DIM_X = 800;
	Game.DIM_Y = 800;
	
	
	Game.prototype.buildGraph = function (level) {
	  let game = Game.LEVELS[level];
	
	  for (let i = 0; i < game.vertices; i++) {
	    let x = Math.cos(i * 2 * Math.PI / game.vertices) * 300 + 400;
	    let y = Math.sin(i * 2 * Math.PI / game.vertices) * 300 + 400;
	
	    this.vertices.push(new Vertex({ x: x, y: y, index: i }) );
	  }
	
	  game.edges.forEach ( vertices => {
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
	  // ctx.moveTo(this.vertex1.y, this.vertex1.x);
	  // ctx.lineTo(this.vertex2.y, this.vertex2.x);
	  ctx.stroke();
	};
	
	Edge.prototype.intersectsWith = function (edge) {
	  const x = (edge.xIntercept - this.xIntercept) / (this.slope - edge.slope);
	
	  let min = Math.min(this.x, edge.x);
	  let max = Math.max(this.x, edge.x);
	
	  return (min <= x && x <= max);
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
	  },
	
	  dist (vertex1, vertex2) {
	    return Math.sqrt(
	      Math.pow(vertex1.x - vertex2.x, 2) + Math.pow(vertex1.y - vertex2.y, 2)
	    );
	  },
	
	  angle (vertex1, vertex2) {
	    const diffY = vertex2.y - vertex1.y;
	    const diffX = vertex2.x - vertex1.x;
	    const radians = Math.atan( diffY / diffX );
	    return radians;
	    // return radians / 2 / Math.PI * 360;
	  }
	
	  // getOffset( el ) {
	  //     var rect = el.getBoundingClientRect();
	  //     return {
	  //         left: rect.left + window.pageXOffset,
	  //         top: rect.top + window.pageYOffset,
	  //         width: rect.width || el.offsetWidth,
	  //         height: rect.height || el.offsetHeight
	  //     };
	  // },
	  //
	  // connect(div1, div2, color, thickness) { // draw a line connecting elements
	  //   var off1 = this.getOffset(div1);
	  //   var off2 = this.getOffset(div2);
	  //   // bottom right
	  //   var x1 = off1.left + off1.width;
	  //   var y1 = off1.top + off1.height;
	  //   // top right
	  //   var x2 = off2.left + off2.width;
	  //   var y2 = off2.top;
	  //   // distance
	  //   var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
	  //   // center
	  //   var cx = ((x1 + x2) / 2) - (length / 2);
	  //   var cy = ((y1 + y2) / 2) - (thickness / 2);
	  //   // angle
	  //   var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
	  //   // make hr
	  //   var htmlLine = "<div style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
	  //   //
	  //   // alert(htmlLine);
	  //   document.body.innerHTML += htmlLine;
	  // },
	  //
	  // lineDistance(x, y, x0, y0){
	  //     return Math.sqrt((x -= x0) * x + (y -= y0) * y);
	  // },
	  //
	  // drawLine(a, b, line) {
	  //   var pointA = $(a).offset();
	  //   var pointB = $(b).offset();
	  //   var pointAcenterX = $(a).width() / 2;
	  //   var pointAcenterY = $(a).height() / 2;
	  //   var pointBcenterX = $(b).width() / 2;
	  //   var pointBcenterY = $(b).height() / 2;
	  //   var angle = Math.atan2(pointB.top - pointA.top, pointB.left - pointA.left) * 180 / Math.PI;
	  //   var distance = lineDistance(pointA.left, pointA.top, pointB.left, pointB.top);
	  //
	  //   // INFO
	  //   $('.info .point-a').text('Point-A: Left: ' + pointA.left + ' Top: ' + pointA.top);
	  //   $('.info .point-b').text('Point-B: Left: ' + pointB.left + ' Top: ' + pointB.top);
	  //   $('.info .angle').text('Angle: ' + angle);
	  //   $('.info .distance').text('Distance: ' + distance);
	  //
	  //   // Set Angle
	  //   $(line).css('transform', 'rotate(' + angle + 'deg)');
	  //
	  //   // Set Width
	  //   $(line).css('width', distance + 'px');
	  //
	  //   // Set Position
	  //   $(line).css('position', 'absolute');
	  //   if(pointB.left < pointA.left) {
	  //     $(line).offset({top: pointA.top + pointAcenterY, left: pointB.left + pointBcenterX});
	  //   } else {
	  //     $(line).offset({top: pointA.top + pointAcenterY, left: pointA.left + pointAcenterX});
	  //   }
	  // }
	
	
	
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

	const Util = __webpack_require__(3);
	
	const GameView = function (game, ctx, root) {
	  this.ctx = ctx;
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
	    const $vertex = $("<div>")
	                    .text(`${i}: (${vertex.x}, ${vertex.y})`)
	                    .addClass("vertex")
	                    .attr('id', `v${i}`)
	                    .draggable()
	                    .css({ 'top': vertex.y-12, 'left': vertex.x-12 })
	                    .attr("data-pos", [vertex.x, vertex.y]);
	    this.root.append($vertex);
	  });
	
	  this.game.edges.forEach( (edge, i) => {
	    // let x1 = edge.vertex1;
	    // let y1 = edge.vertex2;
	
	    let length = Util.dist(edge.vertex1, edge.vertex2);
	    let angle = Util.angle(edge.vertex1, edge.vertex2);
	    console.log(`edge ${i}`);
	    console.log(`v1 = ${edge.vertex1.x}, ${edge.vertex1.y}`);
	    console.log(`v2 = ${edge.vertex2.x}, ${edge.vertex2.y}`);
	
	    const $div1 = $(`#e${edge.vertex1.index}`);
	    const $div2 = $(`#e${edge.vertex2.index}`);
	
	    const $edge = $("<div>");
	    edge.draw(this.ctx);
	    // debugger;
	    // Util.connect($div1, $div2, "red", 3);
	    // Util.drawLine($div1, $div2, $edge);
	    // debugger;
	    // edge.vertex2;
	    //
	    // Util.connect()
	
	    // Need to calculate minX, minY, diffX, diffY
	
	    // debugger;
	    // const $edge = $("<div>")
	    //               .attr('id', `e${i}`)
	    //               .addClass("edge")
	    //               .css({ 'width': `${length}px`})
	    //               .css({ 'transform': `rotate(${angle}rad) translateY(${100}px) translateX(${0}px)` });
	// edge.vertex1.x - edge.vertex2.x)/2
	                  //  translateX(${edge.vertex1.x}) translateY(${edge.vertex1.y})`});
	
	                  // debugger;
	
	    const $myEdge = $(`#e${i}`);
	    // $myEdge.css({ 'width': `${length}px` });
	// // , `webkit-transform: rotate(${angle}deg)`
	
	    // $edge.addClass("edge");
	    this.root.append($edge);
	
	    // edge.draw();
	    //
	    // const $edge = $(`<line id="e${i}"/>`);
	    //
	    // const v1 = edge.vertex1.index;
	    // const v2 = edge.vertex2.index;
	    //
	    // const $div1 = $(`.v${v1}`);
	    // const $div2 = $(`.v${v2}`);
	    //
	    // const pos1 = $div1.position();
	    // const pos2 = $div2.position();
	    //
	    // // $(document.createElementNS('http://www.w3.org/2000/svg','line')).attr({
	    // //     x1: pos1.left,
	    // //     y1: pos1.top,
	    // //     x2: pos2.left,
	    // //     y2: pos2.top,
	    // //     stroke: "black",
	    // //     stroke-width: "2"
	    // // }).appendTo(this.root);
	    //
	    // // debugger;
	    //
	    // $edge.attr('x1',pos1.left)
	    //       .attr('x1',pos1.left)
	    //       .attr('y1',pos1.top)
	    //       .attr('x2',pos2.left)
	    //       .attr('y2',pos2.top);
	    //       // .attr('style', "stroke:red; stroke-width:10px")
	    //
	    // const $svg = $(".svg-root");
	    // $svg.append($edge);
	    // this.root.append($svg);
	
	  });
	
	};
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map