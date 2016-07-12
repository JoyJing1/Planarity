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
	const Graphs6 = __webpack_require__(6);
	const Graphs7 = __webpack_require__(7);
	const Graphs8 = __webpack_require__(8);
	const Graphs9 = __webpack_require__(9);
	const Graphs10 = __webpack_require__(10);
	const Graphs14 = __webpack_require__(11);
	const Graphs18 = __webpack_require__(12);
	
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
	
	Edge.prototype.intersectsWith = function(edge) {
	  const x = (edge.xIntercept() - this.xIntercept()) / (this.slope() - edge.slope());
	
	  let firstMin = Math.min(this.vertex1.x, this.vertex2.x);
	  let firstMax = Math.max(this.vertex1.x, this.vertex2.x);
	
	  let secondMin = Math.min(edge.vertex1.x, edge.vertex2.x);
	  let secondMax = Math.max(edge.vertex1.x, edge.vertex2.x);
	
	  let onFirst = (firstMin < x && x < firstMax);
	  let onSecond = (secondMin < x && x < secondMax);
	
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
	
	  this.game.vertices.forEach( (vertex, i) => {
	    vertex.draw(this.ctx);
	  });
	
	  this.game.edges.forEach( (edge, i) => {
	    edge.draw(this.ctx);
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


/***/ },
/* 6 */
/***/ function(module, exports) {

	const Graphs6 = {
	  graphs: ["6 bcdef,afec,abed,ace,adcbf,aeb",
	          "6 bcde,aefc,abfd,acfe,adfb,bedc"]
	};
	
	module.exports = Graphs6;


/***/ },
/* 7 */
/***/ function(module, exports) {

	const Graphs7 = {
	  graphs: ["7 bcdefg,agfc,abfed,ace,adcf,aecbg,afb",
	            "7 bcdefg,agdc,abd,acbgfe,adf,aedg,afdb",
	            "7 bcdefg,agfdc,abd,acbfe,adf,aedbg,afb",
	            "7 bcdef,afgc,abgd,acge,adgf,aegb,bfedc",
	            "7 bcde,aefgc,abgd,acge,adgfb,beg,bfedc"]
	};
	
	module.exports = Graphs7;


/***/ },
/* 8 */
/***/ function(module, exports) {

	const Graphs8 = {
	  graphs: ["8 bcdefgh,ahgc,abgfed,ace,adcf,aecg,afcbh,agb",
	          "8 bcdefgh,ahdc,abd,acbhe,adhgf,aeg,afeh,agedb",
	          "8 bcdefg,aghfc,abfed,ace,adcf,aecbhg,afhb,bgf",
	          "8 bcdefgh,ahgc,abged,ace,adcgf,aeg,afecbh,agb",
	          "8 bcdefg,agfc,abfhed,ace,adchf,aehcbg,afb,cfe",
	          "8 bcdefgh,ahec,abed,ace,adcbhgf,aeg,afeh,ageb",
	          "8 bcdefg,aghc,abhd,ache,adhf,aehg,afhb,bgfedc",
	          "8 bcdefg,agfhdc,abd,acbhfe,adf,aedhbg,afb,bfd",
	          "8 bcdefg,aghdc,abd,acbhe,adhf,aehg,afhb,bgfed",
	          "8 bcde,aefghc,abhd,ache,adhfb,behg,bfh,bgfedc",
	          "8 bcde,aefgc,abgd,acghe,adhgfb,beg,bfehdc,dge",
	          "8 bcde,aefgc,abghd,achge,adgfb,beg,bfedhc,cgd",
	          "8 bcdef,afghc,abhed,ace,adchf,aehgb,bfh,bgfec",
	          "8 bcde,aefgc,abghd,achfe,adfb,bedhg,bfhc,cgfd"]
	};
	
	module.exports = Graphs8;


/***/ },
/* 9 */
/***/ function(module, exports) {

	const Graphs9 = {
	  graphs: ["9 bcdefghi,aihdc,abd,acbhgfe,adf,aedg,afdh,agdbi,ahb",
	          "9 bcdefghi,aihc,abhgfed,ace,adcf,aecg,afch,agcbi,ahb",
	          "9 bcdefghi,aifedc,abd,acbe,adbf,aebihg,afh,agfi,ahfb",
	          "9 bcdefghi,aic,abid,acigfe,adf,aedg,afdih,agi,ahgdcb",
	          "9 bcdefgh,ahedc,abd,acbe,adbhgif,aeig,afieh,ageb,egf",
	          "9 bcdefghi,aiedc,abd,acbe,adbihf,aehg,afh,agfei,aheb",
	          "9 bcdefghi,aiedc,abd,acbe,adbif,aeihg,afh,agfi,ahfeb",
	          "9 bcdefghi,aidc,abd,acbihe,adhgf,aeg,afeh,agedi,ahdb",
	          "9 bcdefghi,aihgdc,abd,acbgfe,adf,aedg,afdbh,agbi,ahb",
	          "9 bcdefghi,aihgc,abged,ace,adcgf,aeg,afecbh,agbi,ahb",
	          "9 bcdefg,aghifc,abfed,ace,adcf,aecbihg,afhb,bgfi,bhf",
	          "9 bcdefg,aghfc,abfed,ace,adcf,aecbhig,afihb,bgif,fhg",
	          "9 bcdefg,aghifc,abfed,ace,adcf,aecbig,afihb,bgi,bhgf",
	          "9 bcdefg,aghfic,abifed,ace,adcf,aecibhg,afhb,bgf,bfc",
	          "9 bcdefg,aghfc,abfied,ace,adcif,aeicbhg,afhb,bgf,cfe",
	          "9 bcdefgh,ahigc,abged,ace,adcgf,aeg,afecbih,agib,bhg",
	          "9 bcdefghi,aihfdc,abd,acbfe,adf,aedbhg,afh,agfbi,ahb",
	          "9 bcdefghi,aigdc,abd,acbge,adgf,aeg,afedbih,agi,ahgb",
	          "9 bcdefg,agfc,abfhed,ace,adchif,aeihcbg,afb,cfie,ehf",
	          "9 bcdefg,agfc,abfhied,ace,adcif,aeihcbg,afb,cfi,chfe",
	          "9 bcdefg,agfhc,abhfied,ace,adcif,aeichbg,afb,bfc,cfe",
	          "9 bcdefgh,ahfc,abfied,ace,adcif,aeicbhg,afh,agfb,cfe",
	          "9 bcdefgh,ahc,abhd,achife,adf,aedihg,afh,agfidcb,dhf",
	          "9 bcdefghi,aifc,abfd,acfe,adf,aedcbihg,afh,agfi,ahfb",
	          "9 bcdefgh,ahic,abid,acie,adif,aeig,afih,agib,bhgfedc",
	          "9 bcdefgh,ahidc,abd,acbie,adif,aeig,afih,agib,bhgfed",
	          "9 bcdefgh,ahiedc,abd,acbe,adbif,aeig,afih,agib,bhgfe",
	          "9 bcdefg,aghc,abhgid,acie,adif,aeig,afichb,bgc,cgfed",
	          "9 bcdefgh,ahc,abhied,ace,adcif,aeig,afih,agicb,chgfe",
	          "9 bcdefgh,ahgic,abied,ace,adcif,aeig,afibh,agb,bgfec",
	          "9 bcdefg,aghc,abhd,achie,adihgf,aeg,afehb,bgeidc,dhe",
	          "9 bcdefg,aghc,abhd,ache,adhigf,aeg,afeihb,bgiedc,ehg",
	          "9 bcdefg,aghic,abihd,ache,adhgf,aeg,afehb,bgedci,bhc",
	          "9 bcdefg,aghc,abhd,achie,adif,aeig,afihb,bgidc,dhgfe",
	          "9 bcde,aefghic,abid,acie,adifb,beihg,bfh,bgfi,bhfedc",
	          "9 bcde,aefghic,abid,acie,adifb,beig,bfih,bgi,bhgfedc",
	          "9 bcde,aefghic,abihd,ache,adhfb,behg,bfh,bgfedci,bhc",
	          "9 bcdef,afeghic,abid,acie,adigbf,aeb,beih,bgi,bhgedc",
	          "9 bcde,aefghic,abid,acie,adigfb,beg,bfeih,bgi,bhgedc",
	          "9 bcde,aefghc,abhd,ache,adhifb,beig,bfih,bgiedc,ehgf",
	          "9 bcde,aefgc,abgd,acghe,adhifb,beig,bfihdc,dgie,ehgf",
	          "9 bcde,aefgc,abghd,achige,adgfb,beg,bfedihc,cgid,dhg",
	          "9 bcde,aefgc,abghid,acihge,adgfb,beg,bfedhc,cgdi,chd",
	          "9 bcde,aefghc,abhgid,acige,adgfb,beg,bfedich,bgc,cgd",
	          "9 bcdef,afghc,abhid,acihfe,adf,aedhgb,bfh,bgfdic,chd",
	          "9 bcdefg,aghic,abihd,achge,adgf,aeg,afedhb,bgdci,bhc",
	          "9 bcdef,afeghc,abhid,acihe,adhgbf,aeb,beh,bgedic,chd",
	          "9 bcde,aefgc,abghd,achfe,adfb,bedhig,bfihc,cgifd,fhg",
	          "9 bcde,aefghc,abhgid,acife,adfb,bedig,bfich,bgc,cgfd",
	          "9 bcde,aefgc,abghd,achie,adifb,beig,bfihc,cgid,dhgfe"]
	};
	
	module.exports = Graphs9;


/***/ },
/* 10 */
/***/ function(module, exports) {

	const Graphs10 = {
	  graph: ["10 bcdefghi,aihjdc,abd,acbjhgfe,adf,aedg,afdh,agdjbi,ahb,bhd",
	          "10 bcdefghi,aihdc,abd,acbhjgfe,adf,aedg,afdjh,agjdbi,ahb,dhg",
	          "10 bcdefghi,aihdc,abd,acbhgjfe,adf,aedjg,afjdh,agdbi,ahb,dgf",
	          "10 bcdefghi,aihjc,abjhgfed,ace,adcf,aecg,afch,agcjbi,ahb,bhc",
	          "10 bcdefghi,aihc,abhjgfed,ace,adcf,aecg,afcjh,agjcbi,ahb,chg",
	          "10 bcdefghi,aihc,abhgjfed,ace,adcf,aecjg,afjch,agcbi,ahb,cgf",
	          "10 bcdefghi,aihc,abhgfjed,ace,adcjf,aejcg,afch,agcbi,ahb,cfe",
	          "10 bcdefghi,aihc,abhgfejd,acje,adjcf,aecg,afch,agcbi,ahb,ced",
	          "10 bcdefghij,ajic,abihgfd,acfe,adf,aedcg,afch,agci,ahcbj,aib",
	          "10 bcdefghij,ajfedc,abd,acbe,adbf,aebjihg,afh,agfi,ahfj,aifb",
	          "10 bcdefghi,aijc,abjid,acie,adihgf,aeg,afeh,agei,ahedcjb,bic",
	          "10 bcdefghij,ajc,abjd,acje,adjhgf,aeg,afeh,ageji,ahj,aihedcb",
	          "10 bcdefghi,aigc,abgfjed,ace,adcjf,aejcg,afcbih,agi,ahgb,cfe",
	          "10 bcdefghi,aigc,abgjfed,ace,adcf,aecjg,afjcbih,agi,ahgb,cgf",
	          "10 bcdefghij,ajc,abjed,ace,adcjhgf,aeg,afeh,ageji,ahj,aihecb",
	          "10 bcdefghij,ajic,abigfed,ace,adcf,aecg,afcih,agi,ahgcbj,aib",
	          "10 bcdefghij,ajhedc,abd,acbe,adbhgf,aeg,afeh,agebji,ahj,aihb",
	          "10 bcdefghi,aigdc,abd,acbgfje,adjf,aejdg,afdbih,agi,ahgb,dfe",
	          "10 bcdefghi,aigdc,abd,acbgjfe,adf,aedjg,afjdbih,agi,ahgb,dgf",
	          "10 bcdefghi,aihjedc,abd,acbe,adbjhgf,aeg,afeh,agejbi,ahb,bhe",
	          "10 bcdefghi,aihedc,abd,acbe,adbhjgf,aeg,afejh,agjebi,ahb,ehg",
	          "10 bcdefghi,aihedc,abd,acbe,adbhgjf,aejg,afjeh,agebi,ahb,egf",
	          "10 bcdefghi,aijhedc,abd,acbe,adbhgf,aeg,afeh,agebji,ahjb,bih",
	          "10 bcdefghi,aijc,abjihd,ache,adhgf,aeg,afeh,agedci,ahcjb,bic",
	          "10 bcdefghij,ajdc,abd,acbjie,adif,aeihg,afh,agfi,ahfedj,aidb",
	          "10 bcdefghij,ajihdc,abd,acbhe,adhgf,aeg,afeh,agedbi,ahbj,aib",
	          "10 bcdefghij,ajihc,abhd,achfe,adf,aedhg,afh,agfdcbi,ahbj,aib",
	          "10 bcdefghi,aihc,abhgfjd,acjfe,adf,aedjcg,afch,agcbi,ahb,cfd",
	          "10 bcdefghi,aihc,abhgjfd,acfe,adf,aedcjg,afjch,agcbi,ahb,cgf",
	          "10 bcdefghij,ajfedc,abd,acbe,adbf,aebjg,afjih,agi,ahgj,aigfb",
	          "10 bcdefghij,ajdc,abd,acbje,adjif,aeihg,afh,agfi,ahfej,aiedb",
	          "10 bcdefghi,aijhc,abhgd,acgfe,adf,aedg,afdch,agcbji,ahjb,bih",
	          "10 bcdefghij,ajic,abigd,acgfe,adf,aedg,afdcih,agi,ahgcbj,aib",
	          "10 bcdefghij,ajigfc,abfed,ace,adcf,aecbg,afbih,agi,ahgbj,aib",
	          "10 bcdefghi,aihc,abhgd,acgjfe,adf,aedjg,afjdch,agcbi,ahb,dgf",
	          "10 bcdefghi,aihc,abhgjd,acjgfe,adf,aedg,afdjch,agcbi,ahb,cgd",
	          "10 bcdefghij,ajedc,abd,acbe,adbjif,aeihg,afh,agfi,ahfej,aieb",
	          "10 bcdefghij,ajdc,abd,acbjie,adigf,aeg,afeih,agi,ahgedj,aidb",
	          "10 bcdefghij,ajic,abihed,ace,adchf,aehg,afh,agfeci,ahcbj,aib",
	          "10 bcdefghi,aigfc,abfd,acfe,adf,aedcbg,afbijh,agji,ahjgb,gih",
	          "10 bcdefghi,aijgfc,abfd,acfe,adf,aedcbg,afbjih,agi,ahgjb,big",
	          "10 bcdefghij,ajgfc,abfd,acfe,adf,aedcbg,afbjih,agi,ahgj,aigb",
	          "10 bcdefghij,ajc,abjd,acjhe,adhf,aehg,afh,agfedji,ahj,aihdcb",
	          "10 bcdefghi,aijedc,abd,acbe,adbjif,aeig,afih,agi,ahgfejb,bie",
	          "10 bcdefghi,aiedc,abd,acbe,adbijf,aejig,afih,agi,ahgfjeb,eif",
	          "10 bcdefghij,ajedc,abd,acbe,adbjf,aejg,afjh,agji,ahj,aihgfeb",
	          "10 bcdefghi,aihjgfc,abfed,ace,adcf,aecbg,afbjh,agjbi,ahb,bhg",
	          "10 bcdefghi,aijhgfc,abfed,ace,adcf,aecbg,afbh,agbji,ahjb,bih",
	          "10 bcdefghij,ajihedc,abd,acbe,adbhgf,aeg,afeh,agebi,ahbj,aib",
	          "10 bcdefghi,aijc,abjifed,ace,adcf,aecig,afih,agi,ahgfcjb,bic",
	          "10 bcdefghi,aic,abifed,ace,adcf,aecijg,afjih,agi,ahgjfcb,fig",
	          "10 bcdefghi,aic,abijfed,ace,adcf,aecjig,afih,agi,ahgfjcb,cif",
	          "10 bcdefghij,ajigc,abged,ace,adcgf,aeg,afecbih,agi,ahgbj,aib",
	          "10 bcdefghi,aihjfec,abed,ace,adcbf,aebjhg,afh,agfjbi,ahb,bhf",
	          "10 bcdefghi,aijhfec,abed,ace,adcbf,aebhg,afh,agfbji,ahjb,bih",
	          "10 bcdefghi,aihfec,abed,ace,adcbf,aebhjg,afjh,agjfbi,ahb,fhg",
	          "10 bcdefghij,ajigec,abed,ace,adcbgf,aeg,afebih,agi,ahgbj,aib",
	          "10 bcdefghi,aifdc,abd,acbfe,adf,aedbijg,afjih,agi,ahgjfb,fig",
	          "10 bcdefghij,ajgdc,abd,acbge,adgf,aeg,afedbjh,agji,ahj,aihgb",
	          "10 bcdefghi,aihfjec,abed,ace,adcbjf,aejbhg,afh,agfbi,ahb,bfe",
	          "10 bcdefghi,aihfec,abejd,acje,adjcbf,aebhg,afh,agfbi,ahb,ced",
	          "10 bcdefgh,ahijgc,abgfed,ace,adcf,aecg,afcbjih,agib,bhgj,big",
	          "10 bcdefgh,ahc,abhd,achfije,adjf,aejidhg,afh,agfdcb,dfj,dife",
	          "10 bcdefg,aghedc,abd,acbe,adbhgijf,aejg,afjiehb,bge,egj,eigf",
	          "10 bcdefg,agedc,abd,acbe,adbghijf,aejg,afjiheb,egi,ehgj,eigf",
	          "10 bcdefg,agedc,abd,acbe,adbghif,aeig,afijheb,egji,ehjgf,gih",
	          "10 bcdefgh,ahedc,abd,acbe,adbhijf,aejhg,afh,agfjieb,ehj,eihf",
	          "10 bcdefgh,ahifc,abfed,ace,adcf,aecbijhg,afh,agfjib,bhjf,fih",
	          "10 bcdefgh,ahedijc,abjid,acibe,adbhf,aehg,afh,agfeb,bdcj,bic",
	          "10 bcdefgh,ahfc,abfeijd,acjie,adicf,aecbhg,afh,agfb,cedj,cid",
	          "10 bcdefgh,ahc,abhd,achfije,adjif,aeidhg,afh,agfdcb,dfej,die",
	          "10 bcdefgh,ahedc,abd,acbe,adbhijf,aejihg,afh,agfieb,ehfj,eif",
	          "10 bcdefg,aghfc,abfed,ace,adcf,aecbhig,afijhb,bgjif,fhjg,gih",
	          "10 bcdefg,aghijfc,abfed,ace,adcf,aecbjg,afjihb,bgi,bhgj,bigf",
	          "10 bcdefg,aghijfc,abfed,ace,adcf,aecbjg,afjhb,bgji,bhj,bihgf",
	          "10 bcdefg,aghifc,abfed,ace,adcf,aecbig,afijhb,bgji,bhjgf,gih",
	          "10 bcdefgh,ahgijfc,abfed,ace,adcf,aecbjg,afjibh,agb,bgj,bigf",
	          "10 bcdefg,aghifjc,abjfed,ace,adcf,aecjbig,afihb,bgi,bhgf,bfc",
	          "10 bcdefg,aghijfc,abfed,ace,adcf,aecbjig,afihb,bgi,bhgfj,bif",
	          "10 bcdefg,aghifc,abfed,ace,adcf,aecbijg,afjihb,bgi,bhgjf,fig",
	          "10 bcdefgh,ahigjdc,abd,acbjgfe,adf,aedg,afdjbih,agib,bhg,bgd",
	          "10 bcdefg,aghedc,abd,acbe,adbhigjf,aejg,afjeihb,bgie,ehg,egf",
	          "10 bcdefgh,ahgeidc,abd,acbie,adibgjf,aejg,afjebh,agb,bed,egf",
	          "10 bcdefgh,aheidc,abd,acbie,adibhjf,aejhg,afh,agfjeb,bed,ehf",
	          "10 bcdefghi,aihfdc,abd,acbfje,adjf,aejdbhg,afh,agfbi,ahb,dfe",
	          "10 bcdefghi,aihfjdc,abd,acbjfe,adf,aedjbhg,afh,agfbi,ahb,bfd",
	          "10 bcdefghi,aigjdc,abd,acbjge,adgf,aeg,afedjbih,agi,ahgb,bgd",
	          "10 bcdefgh,ahgc,abgifed,ace,adcf,aecijg,afjicbh,agb,cgjf,fig",
	          "10 bcdefgh,ahfiec,abed,ace,adcbijf,aejibhg,afh,agfb,bfje,eif",
	          "10 bcdefghij,ajgc,abgd,acgfe,adf,aedg,afdcbjih,agi,ahgj,aigb",
	          "10 bcdefghij,ajdc,abd,acbjihgfe,adf,aedg,afdh,agdi,ahdj,aidb",
	          "10 bcdefghij,ajihgfdc,abd,acbfe,adf,aedbg,afbh,agbi,ahbj,aib",
	          "10 bcdefghij,ajic,abied,ace,adcif,aeig,afih,agi,ahgfecbj,aib",
	          "10 bcdefghi,aijc,abjd,acje,adjf,aejg,afjh,agji,ahjb,bihgfedc",
	          "10 bcdefghi,aijdc,abd,acbje,adjf,aejg,afjh,agji,ahjb,bihgfed",
	          "10 bcdefghi,aijedc,abd,acbe,adbjf,aejg,afjh,agji,ahjb,bihgfe",
	          "10 bcdefgh,ahic,abihjd,acje,adjf,aejg,afjh,agjcib,bhc,chgfed",
	          "10 bcdefghi,aic,abijed,ace,adcjf,aejg,afjh,agji,ahjcb,cihgfe",
	          "10 bcdefghi,aihjc,abjed,ace,adcjf,aejg,afjh,agjbi,ahb,bhgfec",
	          "10 bcdefghi,aijc,abjed,ace,adcjf,aejg,afjih,agi,ahgjb,bigfec",
	          "10 bcdefgh,ahic,abid,acije,adjigf,aeg,afeih,agib,bhgejdc,die",
	          "10 bcdefgh,ahic,abid,acie,adijgf,aeg,afejih,agib,bhgjedc,eig",
	          "10 bcdefgh,ahijc,abjd,acje,adjgf,aeg,afejh,agjib,bhj,bihgedc",
	          "10 bcdefgh,ahijc,abjid,acie,adigf,aeg,afeih,agib,bhgedcj,bic",
	          "10 bcdefgh,ahic,abid,acije,adjf,aejg,afjh,agjib,bhjdc,dihgfe",
	          "10 bcdefghi,aijfedc,abd,acbe,adbf,aebjg,afjh,agji,ahjb,bihgf",
	          "10 bcdefghi,aijfdc,abd,acbfe,adf,aedbjg,afjh,agji,ahjb,bihgf",
	          "10 bcdefghi,aihc,abhjd,acje,adjf,aejhg,afh,agfjcbi,ahb,chfed",
	          "10 bcdefghi,aijc,abjfed,ace,adcf,aecjhg,afh,agfji,ahjb,bihfc",
	          "10 bcdefgh,ahic,abid,acie,adihgjf,aejg,afjeh,ageib,bhedc,egf",
	          "10 bcdefghi,aijc,abjd,acje,adjihf,aehg,afh,agfei,ahejb,biedc",
	          "10 bcdefgh,ahic,abid,acihje,adjf,aejg,afjh,agjdib,bhdc,dhgfe",
	          "10 bcdefg,aghic,abihgjd,acje,adjf,aejg,afjchb,bgci,bhc,cgfed",
	          "10 bcdefg,aghc,abhigjd,acje,adjf,aejg,afjcihb,bgic,chg,cgfed",
	          "10 bcdefg,aghc,abhgijd,acje,adjf,aejg,afjichb,bgc,cgj,cigfed",
	          "10 bcdefg,aghc,abhgijd,acjie,adif,aeig,afichb,bgc,cgfedj,cid",
	          "10 bcdefgh,ahic,abihjed,ace,adcjf,aejg,afjh,agjcib,bhc,chgfe",
	          "10 bcdefgh,ahic,abid,acie,adihjf,aejhg,afh,agfjeib,bhedc,ehf",
	          "10 bcdefgh,ahigjc,abjed,ace,adcjf,aejg,afjbih,agib,bhg,bgfec",
	          "10 bcdefghi,aihjc,abjfed,ace,adcf,aecjg,afjh,agjbi,ahb,bhgfc",
	          "10 bcdefghi,aidc,abd,acbije,adjf,aejhg,afh,agfji,ahjdb,dihfe",
	          "10 bcdefghi,aihjdc,abd,acbje,adjgf,aeg,afejh,agjbi,ahb,bhged",
	          "10 bcdefghi,aihjc,abjd,acjfe,adf,aedjhg,afh,agfjbi,ahb,bhfdc",
	          "10 bcdefg,aghc,abhd,achije,adjhgf,aeg,afehb,bgejidc,dhj,dihe",
	          "10 bcdefg,aghc,abhd,achie,adijhgf,aeg,afehb,bgejidc,dhje,eih",
	          "10 bcdefg,aghc,abhd,achie,adihjgf,aeg,afejhb,bgjeidc,dhe,ehg",
	          "10 bcdefgh,ahic,abied,ace,adcijf,aejihg,afh,agfib,bhfjec,eif",
	          "10 bcdefg,aghc,abhijed,ace,adcjhf,aehg,afhb,bgfejic,chj,cihe",
	          "10 bcdefg,aghc,abhijd,acje,adjihf,aehg,afhb,bgfeic,chej,cied",
	          "10 bcdefg,aghc,abhed,ace,adchf,aehig,afijhb,bgjifec,fhjg,gih",
	          "10 bcdefg,aghc,abhed,ace,adchf,aehijg,afjhb,bgjifec,fhj,fihg",
	          "10 bcdefg,aghc,abhed,ace,adchf,aehijg,afjihb,bgifec,fhgj,fig",
	          "10 bcdefg,aghic,abied,ace,adcif,aeijg,afjihb,bgi,bhgjfec,fig",
	          "10 bcdefg,aghic,abihed,ace,adchf,aehjg,afjhb,bgjfeci,bhc,fhg",
	          "10 bcdefg,aghc,abhied,ace,adcihf,aehjg,afjhb,bgjfeic,che,fhg",
	          "10 bcdefg,aghc,abhed,ace,adchif,aeihjg,afjhb,bgjfiec,ehf,fhg",
	          "10 bcdefgh,ahidc,abd,acbie,adijf,aejg,afjh,agjib,bhjed,eihgf",
	          "10 bcdefg,aghic,abijd,acje,adjf,aejig,afihb,bgi,bhgfjc,cifed",
	          "10 bcdefg,aghic,abihjd,acje,adjf,aejhg,afhb,bgfjci,bhc,chfed",
	          "10 bcdefgh,ahidc,abd,acbije,adjf,aejg,afjih,agib,bhgjd,digfe",
	          "10 bcdefg,aghic,abid,acie,adijhf,aehg,afhb,bgfeji,bhjedc,eih",
	          "10 bcdefg,aghic,abid,acije,adjf,aejhg,afhb,bgfji,bhjdc,dihfe",
	          "10 bcde,aefghic,abijd,acjie,adifb,beihg,bfh,bgfi,bhfedjc,cid",
	          "10 bcde,aefghijc,abjid,acie,adifb,beihg,bfh,bgfi,bhfedcj,bic",
	          "10 bcdef,afghijdc,abd,acbje,adjf,aejgb,bfjih,bgi,bhgj,bigfed",
	          "10 bcde,aefc,abfd,acfghe,adhgijfb,bejgdc,dfjieh,dge,egj,eigf",
	          "10 bcde,aefc,abfd,acfge,adghijfb,bejgdc,dfjihe,egi,ehgj,eigf",
	          "10 bcde,aefc,abfd,acfge,adghijfb,bejigdc,dfihe,egi,ehgfj,eif",
	          "10 bcdef,afgc,abgd,acghfe,adf,aedhijgb,bfjhdc,dgjif,fhj,fihg",
	          "10 bcde,aefghic,abid,acije,adjifb,beihg,bfh,bgfi,bhfejdc,die",
	          "10 bcde,aefghic,abid,acie,adijfb,bejihg,bfh,bgfi,bhfjedc,eif",
	          "10 bcde,aefghic,abid,acie,adifb,beijhg,bfh,bgfji,bhjfedc,fih",
	          "10 bcde,aefghic,abid,acie,adifb,beihjg,bfjh,bgjfi,bhfedc,fhg",
	          "10 bcde,aefghijc,abjd,acje,adjfb,bejig,bfih,bgi,bhgfj,bifedc",
	          "10 bcde,aefghijc,abjd,acje,adjfb,bejg,bfjih,bgi,bhgj,bigfedc",
	          "10 bcde,aefghijc,abjd,acje,adjfb,bejg,bfjh,bgji,bhj,bihgfedc",
	          "10 bcde,aefghijc,abjid,acie,adifb,beig,bfih,bgi,bhgfedcj,bic",
	          "10 bcde,aefghic,abid,acie,adifb,beijg,bfjh,bgji,bhjfedc,fihg",
	          "10 bcde,aefghijc,abjhd,ache,adhfb,behg,bfh,bgfedcji,bhj,bihc",
	          "10 bcde,aefghic,abijd,acje,adjfb,bejg,bfjh,bgji,bhjc,cihgfed",
	          "10 bcdefg,agehijc,abjd,acje,adjhbgf,aeg,afeb,beji,bhj,bihedc",
	          "10 bcdef,afghdc,abd,acbhigje,adjgf,aegb,bfejdih,bgid,dhg,dge",
	          "10 bcdefg,aghiec,abed,ace,adcbijhf,aehg,afhb,bgfeji,bhje,eih",
	          "10 bcdef,afeghijc,abjd,acje,adjgbf,aeb,bejh,bgji,bhj,bihgedc",
	          "10 bcdef,afgehijc,abjd,acje,adjhbgf,aegb,bfe,beji,bhj,bihedc",
	          "10 bcdef,afeghic,abid,acije,adjigbf,aeb,beih,bgi,bhgejdc,die",
	          "10 bcdef,afeghic,abid,acie,adijgbf,aeb,bejih,bgi,bhgjedc,eig",
	          "10 bcde,aefghijc,abjd,acje,adjgfb,beg,bfejh,bgji,bhj,bihgedc",
	          "10 bcde,aefghijc,abjid,acie,adigfb,beg,bfeih,bgi,bhgedcj,bic",
	          "10 bcde,aefghic,abid,acie,adijgfb,beg,bfejih,bgi,bhgjedc,eig",
	          "10 bcde,aefghc,abhd,ache,adhijfb,bejig,bfih,bgiedc,ehgfj,eif",
	          "10 bcde,aefghc,abhd,ache,adhifb,beijg,bfjih,bgiedc,ehgjf,fig",
	          "10 bcde,aefghic,abid,acie,adijgfb,beg,bfejh,bgji,bhjedc,eihg",
	          "10 bcde,aefgc,abgd,acghe,adhijfb,bejg,bfjhdc,dgjie,ehj,eihgf",
	          "10 bcde,aefghc,abhd,achie,adijgfb,beg,bfejh,bgjidc,dhje,eihg",
	          "10 bcdef,afeghc,abhd,achie,adijgbf,aeb,bejh,bgjidc,dhje,eihg",
	          "10 bcdef,afghdc,abd,acbhe,adhif,aeijgb,bfjh,bgjied,ehjf,fihg",
	          "10 bcde,aefc,abfgd,acghie,adifb,beijgc,cfjhd,dgji,dhjfe,fihg",
	          "10 bcde,aefgc,abghd,achijge,adgfb,beg,bfedjihc,cgid,dhgj,dig",
	          "10 bcde,aefghc,abhgid,acijge,adgfb,beg,bfedjich,bgc,cgjd,dig",
	          "10 bcde,aefghc,abhid,acijhe,adhfb,behg,bfh,bgfedjic,chjd,dih",
	          "10 bcde,aefgc,abghd,achigje,adjgfb,beg,bfejdihc,cgid,dhg,dge",
	          "10 bcde,aefgc,abghid,acijge,adgfb,beg,bfedjihc,cgi,chgjd,dig",
	          "10 bcde,aefgc,abghd,achige,adgjfb,bejg,bfjedihc,cgid,dhg,egf",
	          "10 bcde,aefgc,abghijd,acjhge,adgfb,beg,bfedhc,cgdji,chj,cihd",
	          "10 bcde,aefgc,abghijd,acjihge,adgfb,beg,bfedhc,cgdi,chdj,cid",
	          "10 bcdef,afghc,abhijed,ace,adcjihf,aehgb,bfh,bgfeic,chej,cie",
	          "10 bcdef,afghic,abijd,acjife,adf,aedihgb,bfh,bgfi,bhfdjc,cid",
	          "10 bcde,aefghic,abihgd,acgje,adjgfb,beg,bfejdch,bgci,bhc,dge",
	          "10 bcde,aefghic,abihfd,acfje,adjfb,bejdchg,bfh,bgfci,bhc,dfe",
	          "10 bcde,aefghc,abhgfd,acfije,adjifb,beidcg,bfch,bgc,dfej,die",
	          "10 bcde,aefghc,abhgfd,acfie,adijfb,bejidcg,bfch,bgc,dfje,eif",
	          "10 bcde,aefghc,abhgid,acigje,adjgfb,beg,bfejdich,bgc,cgd,dge",
	          "10 bcdef,afghc,abhgeid,acie,adicgjf,aejgb,bfjech,bgc,ced,egf",
	          "10 bcdef,afghc,abhgied,ace,adcigjf,aejgb,bfjeich,bgc,cge,egf",
	          "10 bcdefg,aghidc,abd,acbije,adjigf,aeg,afeihb,bgi,bhgejd,die",
	          "10 bcdefgh,ahijc,abjid,acihe,adhgf,aeg,afeh,agedib,bhdcj,bic",
	          "10 bcdefgh,ahdc,abd,acbhgie,adijf,aejig,afidh,agdb,dgfje,eif",
	          "10 bcdefgh,ahgfidc,abd,acbije,adjif,aeibg,afbh,agb,bfejd,die",
	          "10 bcdefgh,ahgfic,abijed,ace,adcjif,aeibg,afbh,agb,bfejc,cie",
	          "10 bcdefgh,ahijc,abjied,ace,adcihf,aehg,afh,agfeib,bhecj,bic",
	          "10 bcdefgh,ahijc,abjged,ace,adcgf,aeg,afecjh,agjib,bhj,bihgc",
	          "10 bcdefg,aghec,abed,ace,adcbhf,aehijg,afjhb,bgjife,fhj,fihg",
	          "10 bcdefg,aghec,abed,ace,adcbhf,aehig,afijhb,bgjife,fhjg,gih",
	          "10 bcdefg,aghiec,abed,ace,adcbif,aeijg,afjihb,bgi,bhgjfe,fig",
	          "10 bcdef,afeghc,abhid,acihe,adhjgbf,aeb,bejh,bgjedic,chd,ehg",
	          "10 bcdefg,agfhic,abijd,acjife,adf,aedihbg,afb,bfi,bhfdjc,cid",
	          "10 bcdef,afghidc,abd,acbihe,adhjf,aejhgb,bfh,bgfjedi,bhd,ehf",
	          "10 bcdefg,aghidc,abd,acbihe,adhjgf,aeg,afejhb,bgjedi,bhd,ehg",
	          "10 bcde,aefgc,abghd,achfe,adfb,bedhijg,bfjhc,cgjifd,fhj,fihg",
	          "10 bcde,aefgc,abghd,achfe,adfb,bedhig,bfijhc,cgjifd,fhjg,gih",
	          "10 bcde,aefghc,abhid,acife,adfb,bedijhg,bfh,bgfjic,chjfd,fih",
	          "10 bcde,aefghc,abhid,acige,adgfb,beg,bfedijh,bgjic,chjgd,gih",
	          "10 bcde,aefgc,abghid,acihfe,adfb,bedhjg,bfjhc,cgjfdi,chd,fhg",
	          "10 bcde,aefgc,abghid,acife,adfb,bedijg,bfjihc,cgi,chgjfd,fig",
	          "10 bcdef,afghdc,abd,acbhie,adigf,aegb,bfeijh,bgjid,dhjge,gih",
	          "10 bcdef,afghc,abhid,acife,adf,aedigb,bfijh,bgjic,chjgfd,gih",
	          "10 bcdef,afghidc,abd,acbihje,adjgf,aegb,bfejh,bgjdi,bhd,dhge",
	          "10 bcde,aefghic,abihjd,acjfe,adfb,bedjhg,bfh,bgfjci,bhc,chfd",
	          "10 bcde,aefghc,abhgid,acifje,adjfb,bejdig,bfich,bgc,cgfd,dfe",
	          "10 bcde,aefghc,abhgid,acijfe,adfb,bedjig,bfich,bgc,cgfjd,dif",
	          "10 bcdef,afghic,abihjed,ace,adcjgf,aegb,bfejh,bgjci,bhc,chge",
	          "10 bcde,aefghc,abhd,achije,adjigfb,beg,bfeih,bgidc,dhgej,die",
	          "10 bcde,aefgc,abgd,acghije,adjihfb,behg,bfhdc,dgfei,dhej,die",
	          "10 bcde,aefgc,abgd,acghie,adijhfb,behg,bfhdc,dgfeji,dhje,eih",
	          "10 bcde,aefgc,abgd,acghije,adjhfb,behg,bfhdc,dgfeji,dhj,dihe",
	          "10 bcdef,afghc,abhd,achije,adjf,aejigb,bfih,bgidc,dhgfj,dife",
	          "10 bcde,aefghc,abhid,acie,adijfb,bejg,bfjih,bgic,chgjed,eigf",
	          "10 bcde,aefghc,abhid,acie,adijfb,bejg,bfjh,bgjic,chjed,eihgf",
	          "10 bcde,aefgc,abghd,achie,adijfb,bejihg,bfhc,cgfid,dhfje,eif",
	          "10 bcde,aefgc,abghd,achije,adjifb,beihg,bfhc,cgfid,dhfej,die",
	          "10 bcde,aefghc,abhid,acije,adjgfb,beg,bfejih,bgic,chgjd,dige",
	          "10 bcde,aefgc,abghd,achie,adifb,beijg,bfjhc,cgjid,dhjfe,fihg"]
	};
	
	module.exports = Graphs10;


/***/ },
/* 11 */
/***/ function(module, exports) {

	const Graphs14 = {
	  graphs: ["14 bcdefghi,aijklhmndc,abd,acbnhgfe,adf,aedg,afdh,agdnmbli,ahlkjb,bik,bjil,bkih,bhn,bmhd",
	    "14 bcdefghi,aijkhlmdc,abd,acbmhgfe,adf,aedg,afdh,agdmlbki,ahknjb,bink,bjnih,bhm,blhd,ikj",
	    "14 bcdefghi,aijkhlmdc,abd,acbmhgnfe,adf,aedng,afndh,agdmlbki,ahkjb,bik,bjih,bhm,blhd,dgf",
	    "14 bcdefghi,aijkhlmdc,abd,acbmhgfne,adnf,aendg,afdh,agdmlbki,ahkjb,bik,bjih,bhm,blhd,dfe",
	    "14 bcdefghij,ajklimndc,abd,acbnihfe,adf,aedhg,afh,agfdi,ahdnmblj,ailkb,bjl,bkji,bin,bmid",
	    "14 bcdefghij,ajgc,abgklemd,acmne,adnmclkgf,aeg,afekcbjh,agji,ahj,aihgb,cgel,cke,cend,dme",
	    "14 bcdefghi,aihc,abhd,achjkfle,adlmf,aemldknjhg,afh,agfjdcbi,ahb,dhfnk,djnf,dfme,elf,fkj",
	    "14 bcdefghi,aihc,abhd,achjkfle,adlmf,aemnldkjhg,afh,agfjdcbi,ahb,dhfk,djf,dfnme,elnf,fml",
	    "14 bcdefghi,aihc,abhd,achjkflme,admlnf,aenldkjhg,afh,agfjdcbi,ahb,dhfk,djf,dfnem,dle,elf",
	    "14 bcdefghi,aihc,abhd,achjkflmne,adnmlf,aeldkjhg,afh,agfjdcbi,ahb,dhfk,djf,dfem,dlen,dme",
	    "14 bcdefghi,aihc,abhd,achjklfmne,adnmf,aemdljhg,afh,agfjdcbi,ahb,dhflk,djl,dkjf,dfen,dme",
	    "14 bcdefghi,aihc,abhd,achjkflmne,adnlf,aeldkjhg,afh,agfjdcbi,ahb,dhfk,djf,dfenm,dln,dmle",
	    "14 bcdefghi,aijhc,abhd,achklfmne,adnmf,aemdlkhg,afh,agfkdcbji,ahjb,bih,dhfl,dkf,dfen,dme",
	    "14 bcdefghi,aihjc,abjhd,achklfmne,adnmf,aemdlkhg,afh,agfkdcjbi,ahb,bhc,dhfl,dkf,dfen,dme",
	    "14 bcdefghij,ajidc,abd,acbie,adiklgmnf,aenmg,afmelkih,agi,ahgkedbj,aib,eigl,ekg,egfn,emf",
	    "14 bcdefghij,ajgc,abgklemnd,acnme,admclkgf,aeg,afekcbjh,agji,ahj,aihgb,cgel,cke,cedn,cmd",
	    "14 bcdefghi,aihc,abhd,achjkflme,admlf,aeldknjhg,afh,agfjdcbi,ahb,dhfnk,djnf,dfem,dle,fkj",
	    "14 bcdefghi,aihc,abhd,achjkflme,admnlf,aeldkjhg,afh,agfjdcbi,ahb,dhfk,djf,dfenm,dlne,eml",
	    "14 bcdefghi,aihc,abhd,achjkfle,adlf,aeldkjmnhg,afh,agfnjdcbi,ahb,dhnmfk,djf,dfe,fjn,fmjh",
	    "14 bcdefghij,ajic,abid,aciklgme,admgf,aeg,afemdlknih,agi,ahgnkdcbj,aib,dingl,dkg,dge,gki",
	    "14 bcdefghi,aijkhlmndc,abd,acbnmhgfe,adf,aedg,afdh,agdmlbki,ahkjb,bik,bjih,bhm,blhdn,bmd",
	    "14 bcdefghi,aijkc,abkilmned,ace,adcnmihgf,aeg,afeh,agei,ahemlckjb,bik,bjic,cim,clien,cme",
	    "14 bcdefghi,aifjkldmc,abmd,acmbljnfe,adf,aednjbihg,afh,agfi,ahfb,bfndlk,bjl,bkjd,bdc,djf",
	    "14 bcdefghi,aifjkdlc,abld,aclbkjmfe,adf,aedmjbinhg,afh,agfni,ahnfb,bfmdk,bjd,bdc,djf,fih",
	    "14 bcdefghi,aifjkdlc,abld,aclbkjmfe,adf,aedmjbihng,afnh,agnfi,ahfb,bfmdk,bjd,bdc,djf,fhg",
	    "14 bcdefghij,ajfkldmc,abmd,acmblknfe,adf,aednkbjhg,afh,agfji,ahj,aihfb,bfndl,bkd,bdc,dkf",
	    "14 bcdefghij,ajgc,abgklemd,acme,admclkngf,aeg,afenkcbjh,agji,ahj,aihgb,cgnel,cke,ced,ekg",
	    "14 bcdefghi,aihc,abhd,achjkfle,adlf,aeldkmjnhg,afh,agfnjdcbi,ahb,dhnfmk,djmf,dfe,fkj,fjh",
	    "14 bcdefghi,aihc,abhd,achjkfle,adlf,aeldkjmhg,afh,agfmnjdcbi,ahb,dhnmfk,djf,dfe,fjnh,hmj",
	    "14 bcdefghij,ajic,abid,aciklfme,admf,aemdlkinhg,afh,agfni,ahnfkdcbj,aib,difl,dkf,dfe,fih",
	    "14 bcdefghij,ajkilmdnc,abnd,acnbmihgfe,adf,aedg,afdh,agdi,ahdmlbkj,aikb,bji,bim,blid,bdc",
	    "14 bcdefghi,aijkhlfedc,abd,acbe,adbf,aeblmhng,afnh,agnfmlbkji,ahjb,bihk,bjh,bhmf,flh,fhg",
	    "14 bcdefghij,ajkilfedc,abd,acbe,adbf,aeblming,afnih,agi,ahgnfmlbkj,aikb,bji,bimf,fli,fig",
	    "14 bcdefghi,aijkhlmdnc,abnd,acnbmhgfe,adf,aedg,afdh,agdmlbki,ahkjb,bik,bjih,bhm,blhd,bdc",
	    "14 bcdefghi,aijhkldmc,abmd,acmblhgfe,adf,aedg,afdh,agdlkbjni,ahnjb,binh,bhl,bkhd,bdc,hji",
	    "14 bcdefghi,aijc,abjiklemd,acme,admclnihgf,aeg,afeh,agei,ahenlkcjb,bic,cil,ckine,ced,eli",
	    "14 bcdefghi,aijc,abjiklemd,acme,admclihgf,aeg,afeh,agei,ahelnkcjb,bic,cinl,cknie,ced,ilk",
	    "14 bcdefghij,ajkc,abkjlmend,acne,adncmjhgf,aeg,afeh,ageji,ahj,aihemlckb,bjc,cjm,clje,ced",
	    "14 bcdefghi,aijfkldmc,abmd,acmblkfne,adnf,aendkbjihg,afh,agfi,ahfjb,bif,bfdl,bkd,bdc,dfe",
	    "14 bcdefghi,aifjkdlc,abld,aclbkjfme,admf,aemdjbinhg,afh,agfni,ahnfb,bfdk,bjd,bdc,dfe,fih",
	    "14 bcdefghi,aifjkdlc,abld,aclbkjfme,admf,aemdjbihng,afnh,agnfi,ahfb,bfdk,bjd,bdc,dfe,fhg",
	    "14 bcdefghij,ajgkldmc,abmd,acmblkgne,adngf,aeg,afendkbjih,agi,ahgj,aigb,bgdl,bkd,bdc,dge",
	    "14 bcdefghi,aijkhlfedc,abd,acbe,adbf,aeblmhng,afnh,agnfmlbki,ahkjb,bik,bjih,bhmf,flh,fhg",
	    "14 bcdefghi,aijhklfedc,abd,acbe,adbf,aeblmhng,afnh,agnfmlkbji,ahjb,bih,bhl,bkhmf,flh,fhg",
	    "14 bcdefghij,ajkilgfdc,abd,acbfe,adf,aedbg,afblminh,agni,ahngmlbkj,aikb,bji,bimg,gli,gih",
	    "14 bcdefghij,ajgc,abgklemd,acme,admclkgnf,aeng,afnekcbjh,agji,ahj,aihgb,cgel,cke,ced,egf",
	    "14 bcdefghi,aihc,abhd,achjkfle,adlf,aeldkjhmng,afnmh,agmfjdcbi,ahb,dhfk,djf,dfe,fhgn,fmg",
	    "14 bcdefghi,aihc,abhd,achjkfle,adlf,aeldkmjhng,afnh,agnfjdcbi,ahb,dhfmk,djmf,dfe,fkj,fhg",
	    "14 bcdefghijk,akjc,abjd,acjlmhnfe,adf,aednhg,afh,agfndmlji,ahj,aihldcbk,ajb,djhm,dlh,dhf",
	    "14 bcdefghij,ajklhmndc,abd,acbnhgfe,adf,aedg,afdh,agdnmblji,ahj,aihlkb,bjl,bkjh,bhn,bmhd",
	    "14 bcdefghijk,aklhmndc,abd,acbnhgfe,adf,aedg,afdh,agdnmblki,ahkj,aik,ajihlb,bkh,bhn,bmhd",
	    "14 bcdefghij,ajiklc,ablimned,ace,adcnihgf,aeg,afeh,agei,ahenmclkbj,aib,bil,bkic,cin,cmie",
	    "14 bcdefghij,ajikc,abkilmed,ace,adcmnihgf,aeg,afeh,agei,ahenmlckbj,aib,bic,cim,cline,emi",
	    "14 bcdefghij,ajikc,abkilmed,ace,adcmihgf,aeg,afeh,agei,ahemnlckbj,aib,bic,cinm,clnie,iml",
	    "14 bcdefghij,ajkilc,ablimned,ace,adcnihgf,aeg,afeh,agei,ahenmclbkj,aikb,bji,bic,cin,cmie",
	    "14 bcdefghijk,akjlc,abljmned,ace,adcnjhgf,aeg,afeh,ageji,ahj,aihenmclbk,ajb,bjc,cjn,cmje",
	    "14 bcdefghij,ajkglmendc,abd,acbne,adnbmlgf,aeg,afelbkjih,agi,ahgj,aigkb,bjg,bgem,ble,bed",
	    "14 bcdefghij,ajgklemdc,abd,acbme,admblkgf,aeg,afekbjnih,agi,ahgnj,aingb,bgel,bke,bed,gji",
	    "14 bcdefghij,ajgklemdc,abd,acbme,admblkgf,aeg,afekbjinh,agni,ahngj,aigb,bgel,bke,bed,gih",
	    "14 bcdefghijk,akglmendc,abd,acbne,adnbmlgf,aeg,afelbkih,agi,ahgkj,aik,ajigb,bgem,ble,bed",
	    "14 bcdefghijk,akhc,abhlmfned,ace,adcnf,aencmlhg,afh,agflcbki,ahkj,aik,ajihb,chfm,clf,cfe",
	    "14 bcdefghij,ajic,abid,aciklgmfe,adf,aedmg,afmdlnkih,agi,ahgkdcbj,aib,dignl,dkng,dgf,glk",
	    "14 bcdefghijk,aklc,ablkmned,ace,adcnkhgf,aeg,afeh,agekji,ahj,aihk,ajhenmclb,bkc,ckn,cmke",
	    "14 bcdefghijk,akidc,abd,acbilmgne,adngf,aeg,afendmlih,agi,ahgldbkj,aik,ajib,digm,dlg,dge",
	    "14 bcdefghij,ajklimndc,abd,acbnigfe,adf,aedg,afdih,agi,ahgdnmblj,ailkb,bjl,bkji,bin,bmid",
	    "14 bcdefghij,ajklc,abljmned,ace,adcnjhgf,aeg,afeh,ageji,ahj,aihenmclkb,bjl,bkjc,cjn,cmje",
	    "14 bcdefghijk,aklc,ablkmned,ace,adcnkhgf,aeg,afeh,ageki,ahkj,aik,ajihenmclb,bkc,ckn,cmke",
	    "14 bcdefghij,ajifklmdnc,abnd,acnbmkfe,adf,aedkbihg,afh,agfi,ahfbj,aib,bfdml,bkm,blkd,bdc",
	    "14 bcdefghij,ajifkldmc,abmd,acmblkfe,adf,aedkbihng,afnh,agnfi,ahfbj,aib,bfdl,bkd,bdc,fhg",
	    "14 bcdefghij,ajikflmdnc,abnd,acnbmlfe,adf,aedlbkihg,afh,agfi,ahfkbj,aib,bif,bfdm,bld,bdc",
	    "14 bcdefghij,ajifkldmc,abmd,acmblkfe,adf,aedkbinhg,afh,agfni,ahnfbj,aib,bfdl,bkd,bdc,fih",
	    "14 bcdefghijk,akjflmdnc,abnd,acnbmlfe,adf,aedlbjhg,afh,agfji,ahj,aihfbk,ajb,bfdm,bld,bdc",
	    "14 bcdefghij,ajhdkc,abkd,ackbhlmfne,adnf,aendmlhg,afh,agfldbji,ahj,aihb,bdc,dhfm,dlf,dfe",
	    "14 bcdefghijk,akhdc,abd,acbhlmfne,adnf,aendmlhg,afh,agfldbki,ahkj,aik,ajihb,dhfm,dlf,dfe",
	    "14 bcdefghij,ajic,abied,ace,adciklgmf,aemg,afmelnkih,agi,ahgkecbj,aib,eignl,ekng,egf,glk",
	    "14 bcdefghi,aifjkdlc,abld,aclbkjfe,adf,aedjbimnhg,afh,agfni,ahnmfb,bfdk,bjd,bdc,fin,fmih",
	    "14 bcdefghij,ajfkldmc,abmd,acmblkfe,adf,aedkbjnhg,afh,agfnji,ahj,aihnfb,bfdl,bkd,bdc,fjh",
	    "14 bcdefghi,aijkgc,abglmend,acne,adncmlgf,aeg,afelcbkih,agi,ahgkjb,bik,bjig,cgem,cle,ced",
	    "14 bcdefghi,aijgc,abgklemd,acme,admclkgf,aeg,afekcbjnih,agi,ahgnjb,bing,cgel,cke,ced,gji",
	    "14 bcdefghi,aijgc,abgklemd,acme,admclkgf,aeg,afekcbjinh,agni,ahngjb,big,cgel,cke,ced,gih",
	    "14 bcdefghi,aigc,abgjkeld,acle,adlckjgf,aeg,afejcbimnh,agni,ahnmgb,cgek,cje,ced,gin,gmih",
	    "14 bcdefghij,ajigc,abgklemd,acme,admclkgf,aeg,afekcbinh,agni,ahngbj,aib,cgel,cke,ced,gih",
	    "14 bcdefghij,ajgc,abgklemd,acme,admclkgf,aeg,afekcbjnh,agnji,ahj,aihngb,cgel,cke,ced,gjh",
	    "14 bcdefghi,aijkhc,abhd,achlmfne,adnf,aendmlhg,afh,agfldcbki,ahkjb,bik,bjih,dhfm,dlf,dfe",
	    "14 bcdefghi,aijhc,abhd,achklfme,admf,aemdlkhg,afh,agfkdcbjni,ahnjb,binh,dhfl,dkf,dfe,hji",
	    "14 bcdefghij,ajhc,abhd,achklfme,admf,aemdlkhg,afh,agfkdcbjni,ahnj,ainhb,dhfl,dkf,dfe,hji",
	    "14 bcdefghijk,akhc,abhd,achlmfne,adnf,aendmlhg,afh,agfldcbkji,ahj,aihk,ajhb,dhfm,dlf,dfe",
	    "14 bcdefghijk,akc,abkd,acke,adkf,aeklmhng,afnh,agnfmlki,ahkj,aik,ajihlfedcb,fkhm,flh,fhg",
	    "14 bcdefghij,ajiklgfedc,abd,acbe,adbf,aebg,afblminh,agni,ahngmlkbj,aib,bil,bkimg,gli,gih",
	    "14 bcdefghij,ajiklgfedc,abd,acbe,adbf,aebg,afblkminh,agni,ahngmkbj,aib,bimgl,bkg,gki,gih",
	    "14 bcdefghij,ajikglfedc,abd,acbe,adbf,aeblg,aflbkminh,agni,ahngmkbj,aib,bimg,bgf,gki,gih",
	    "14 bcdefghij,ajikgfledc,abd,acbe,adblf,aelbg,afbkminh,agni,ahngmkbj,aib,bimg,bfe,gki,gih",
	    "14 bcdefghij,ajikgfeldc,abd,acble,adlbf,aebg,afbkminh,agni,ahngmkbj,aib,bimg,bed,gki,gih",
	    "14 bcdefghij,ajikgfedc,abd,acbe,adbf,aebg,afbklimh,agmni,ahnmglkbj,aib,bilg,gki,ginh,hmi",
	    "14 bcdefghij,ajikgfedc,abd,acbe,adbf,aebg,afbklminh,agni,ahngmkbj,aib,bimlg,gkm,glki,gih",
	    "14 bcdefghijk,akc,abkd,acke,adklmgnf,aeng,afnemlkh,agkji,ahj,aihk,ajhgledcb,ekgm,elg,egf",
	    "14 bcdefghijk,akdc,abd,acbkjlhgfe,adf,aedg,afdh,agdlmjni,ahnj,ainhmldk,ajdb,djmh,hlj,hji",
	    "14 bcdefghijk,akjilgfec,abed,ace,adcbf,aebg,afblminh,agni,ahngmlbj,aibk,ajb,bimg,gli,gih",
	    "14 bcdefghijk,akc,abked,ace,adckf,aeklmhng,afnh,agnfmlki,ahkj,aik,ajihlfecb,fkhm,flh,fhg",
	    "14 bcdefghijk,akjc,abjed,ace,adcjlmgnf,aeng,afnemljh,agji,ahj,aihglecbk,ajb,ejgm,elg,egf",
	    "14 bcdefghijk,akic,abilmfned,ace,adcnf,aencmlig,afih,agi,ahgflcbkj,aik,ajib,cifm,clf,cfe",
	    "14 bcdefghijk,akhlmenc,abned,ace,adcnbmlhf,aehg,afh,agfelbkji,ahj,aihk,ajhb,bhem,ble,bec",
	    "14 bcdefghij,ajkilmec,abed,ace,adcbmihgf,aeg,afeh,agei,ahemnlbkj,aikb,bji,binm,blnie,iml",
	    "14 bcdefghij,ajklimnec,abed,ace,adcbnihgf,aeg,afeh,agei,ahenmblj,ailkb,bjl,bkji,bin,bmie",
	    "14 bcdefghi,aihjfedc,abd,acbe,adbf,aebjhklg,aflmh,agmlnkfjbi,ahb,bhf,fhnl,fknhmg,glh,hlk",
	    "14 bcdefghi,aihjfedc,abd,acbe,adbf,aebjhklg,aflh,aglmnkfjbi,ahb,bhf,fhnl,fknmhg,hln,hmlk",
	    "14 bcdefghi,aihjfedc,abd,acbe,adbf,aebjhklmg,afmlh,aglnkfjbi,ahb,bhf,fhnl,fknhgm,flg,hlk",
	    "14 bcdefghi,aihjfekdc,abd,acbke,adkbf,aebjhlmg,afmh,agmnlfjbi,ahb,bhf,bed,fhnm,flnhg,hml",
	    "14 bcdefghi,aihjfedkc,abkd,ackbe,adbf,aebjhlmg,afmh,agmnlfjbi,ahb,bhf,bdc,fhnm,flnhg,hml",
	    "14 bcdefghij,ajikgfdc,abd,acbfe,adf,aedbg,afbkilmh,agmi,ahmnlgkbj,aib,big,ginm,glnih,iml",
	    "14 bcdefghij,ajgc,abgkelmd,acme,admnlckgf,aeg,afekcbjh,agji,ahj,aihgb,cge,cenm,clned,eml",
	    "14 bcdefghi,aihc,abhd,achjfkle,adlf,aelmkdjhg,afh,agfjdcbi,ahb,dhf,dfmnl,dknmfe,flnk,kml",
	    "14 bcdefghi,aihc,abhd,achjfkle,adlf,aelmnkdjhg,afh,agfjdcbi,ahb,dhf,dfnml,dkmfe,flkn,fmk",
	    "14 bcdefghi,aihc,abhd,achjfklme,admnf,aenmkdjhg,afh,agfjdcbi,ahb,dhf,dfml,dkm,dlkfne,emf",
	    "14 bcdefghi,aihc,abhd,achjfklme,admf,aemnkdjhg,afh,agfjdcbi,ahb,dhf,dfnml,dkm,dlknfe,fmk",
	    "14 bcdefghi,aihc,abhd,achjfklmne,adnmf,aemkdjhg,afh,agfjdcbi,ahb,dhf,dfml,dkm,dlkfen,dme",
	    "14 bcdefghi,aihc,abhd,achjfklmne,adnf,aenkdjhg,afh,agfjdcbi,ahb,dhf,dfnml,dkm,dlkn,dmkfe",
	    "14 bcdefghi,aihjc,abjhd,achkflmne,adnf,aenldkhg,afh,agfkdcjbi,ahb,bhc,dhf,dfnm,dln,dmlfe",
	    "14 bcdefghij,ajidc,abd,acbie,adikglmnf,aeng,afnlekih,agi,ahgkedbj,aib,eig,egnm,eln,emlgf",
	    "14 bcdefghij,ajgc,abgkelmnd,acne,adnlckgf,aeg,afekcbjh,agji,ahj,aihgb,cge,cenm,cln,cmled",
	    "14 bcdefghi,aihc,abhd,achjfklmne,adnf,aenkdjhg,afh,agfjdcbi,ahb,dhf,dfnl,dknm,dln,dmlkfe",
	    "14 bcdefghi,aihc,abhd,achjfklme,admf,aemkdjhg,afh,agfjdcbi,ahb,dhf,dfmnl,dknm,dlnkfe,kml",
	    "14 bcdefghij,ajklmindc,abd,acbnihgfe,adf,aedg,afdh,agdi,ahdnbmlkj,aikb,bjil,bkim,bli,bid",
	    "14 bcdefghi,aihjfedc,abd,acbe,adbf,aebjhklmg,afmh,agmnlkfjbi,ahb,bhf,fhl,fkhnm,flnhg,hml",
	    "14 bcdefghi,aihjfedc,abd,acbe,adbf,aebjhklmg,afmh,agmlnkfjbi,ahb,bhf,fhnl,fknhm,flhg,hlk",
	    "14 bcdefghi,aihjfedc,abd,acbe,adbf,aebjkhlmng,afnh,agnmlfkjbi,ahb,bhkf,fjh,fhm,flhn,fmhg",
	    "14 bcdefghi,aijhkfedc,abd,acbe,adbf,aebkhlmng,afnh,agnmlfkbji,ahjb,bih,bhf,fhm,flhn,fmhg",
	    "14 bcdefghij,ajikfedc,abd,acbe,adbf,aebkilmng,afnih,agi,ahgnmlfkbj,aib,bif,fim,flin,fmig",
	    "14 bcdefghi,aijklmhndc,abd,acbnhgfe,adf,aedg,afdh,agdnbmlki,ahkjb,bik,bjihl,bkhm,blh,bhd",
	    "14 bcdefghi,aijklhmdc,abd,acbmhgfe,adf,aedg,afdh,agdmblkjni,ahnjb,binhk,bjhl,bkh,bhd,hji",
	    "14 bcdefghij,ajklmhndc,abd,acbnhgfe,adf,aedg,afdh,agdnbmlkji,ahj,aihkb,bjhl,bkhm,blh,bhd",
	    "14 bcdefghij,ajkc,abklmjned,ace,adcnjhgf,aeg,afeh,ageji,ahj,aihencmlkb,bjlc,ckjm,clj,cje",
	    "14 bcdefghi,aifjdklmnc,abnd,acnmlkbjfe,adf,aedjbihg,afh,agfi,ahfb,bfd,bdl,bkdm,bldn,bmdc",
	    "14 bcdefghi,aifjdklmc,abmd,acmlkbjfe,adf,aedjbinhg,afh,agfni,ahnfb,bfd,bdl,bkdm,bldc,fih",
	    "14 bcdefghi,aifjdklmc,abmd,acmlkbjfe,adf,aedjbihng,afnh,agnfi,ahfb,bfd,bdl,bkdm,bldc,fhg",
	    "14 bcdefghij,ajgkdlmnc,abnd,acnmlbkge,adgf,aeg,afedkbjih,agi,ahgj,aigb,bgd,bdm,bldn,bmdc",
	    "14 bcdefghi,aihjkfedc,abd,acbe,adbf,aebkhlmng,afnh,agnmlfkjbi,ahb,bhk,bjhf,fhm,flhn,fmhg",
	    "14 bcdefghi,aihjfkedc,abd,acbe,adbkf,aekbjhlmng,afnh,agnmlfjbi,ahb,bhf,bfe,fhm,flhn,fmhg",
	    "14 bcdefghij,ajikgfdc,abd,acbfe,adf,aedbg,afbkilmnh,agni,ahnmlgkbj,aib,big,gim,glin,gmih",
	    "14 bcdefghij,ajgc,abgkelmnd,acne,adnmlckgf,aeg,afekcbjh,agji,ahj,aihgb,cge,cem,clen,cmed",
	    "14 bcdefghi,aihc,abhd,achjfklmne,adnf,aenlkdjhg,afh,agfjdcbi,ahb,dhf,dfl,dkfnm,dln,dmlfe",
	    "14 bcdefghi,aihc,abhd,achjfklmne,adnf,aenmkdjhg,afh,agfjdcbi,ahb,dhf,dfml,dkm,dlkfn,dmfe",
	    "14 bcdefghi,aihjfedc,abd,acbe,adbf,aebjklhmng,afnh,agnmflkjbi,ahb,bhkf,fjhl,fkh,fhn,fmhg",
	    "14 bcdefghij,ajikfedc,abd,acbe,adbf,aebklimng,afnih,agi,ahgnmflkbj,aib,bilf,fki,fin,fmig",
	    "14 bcdefghi,aijklhmndc,abd,acbnhgfe,adf,aedg,afdh,agdnmblki,ahkjb,bik,bjihl,bkh,bhn,bmhd",
	    "14 bcdefghi,aijklhmndc,abd,acbnhgfe,adf,aedg,afdh,agdnmblji,ahjb,bihlk,bjl,bkjh,bhn,bmhd",
	    "14 bcdefghij,ajklhmndc,abd,acbnhgfe,adf,aedg,afdh,agdnmblkji,ahj,aihkb,bjhl,bkh,bhn,bmhd",
	    "14 bcdefghi,aijkc,abklimned,ace,adcnihgf,aeg,afeh,agei,ahenmclkjb,bik,bjilc,cki,cin,cmie",
	    "14 bcdefghij,ajkc,abkljmned,ace,adcnjhgf,aeg,afeh,ageji,ahj,aihenmclkb,bjlc,ckj,cjn,cmje",
	    "14 bcdefghi,aifjkldmnc,abnd,acnmbljfe,adf,aedjbihg,afh,agfi,ahfb,bfdlk,bjl,bkjd,bdn,bmdc",
	    "14 bcdefghi,aijfkldmnc,abnd,acnmblkfe,adf,aedkbjihg,afh,agfi,ahfjb,bif,bfdl,bkd,bdn,bmdc",
	    "14 bcdefghi,aifjkdlmc,abmd,acmlbkjfe,adf,aedjbinhg,afh,agfni,ahnfb,bfdk,bjd,bdm,bldc,fih",
	    "14 bcdefghi,aifjkdlmc,abmd,acmlbkjfe,adf,aedjbihng,afnh,agnfi,ahfb,bfdk,bjd,bdm,bldc,fhg",
	    "14 bcdefghij,ajgkldmnc,abnd,acnmblkge,adgf,aeg,afedkbjih,agi,ahgj,aigb,bgdl,bkd,bdn,bmdc",
	    "14 bcdefghij,ajikgfdc,abd,acbfe,adf,aedbg,afbklimnh,agni,ahnmglkbj,aib,bilg,gki,gin,gmih",
	    "14 bcdefghij,ajgc,abgklemnd,acne,adnmclkgf,aeg,afekcbjh,agji,ahj,aihgb,cgel,cke,cen,cmed",
	    "14 bcdefghi,aihc,abhd,achjkflme,admf,aemldknjhg,afh,agfjdcbi,ahb,dhfnk,djnf,dfm,dlfe,fkj",
	    "14 bcdefghi,aihc,abhd,achjkflmne,adnf,aenldkjhg,afh,agfjdcbi,ahb,dhfk,djf,dfnm,dln,dmlfe",
	    "14 bcdefghi,aihjkfedc,abd,acbe,adbf,aebklhmng,afnh,agnmflkjbi,ahb,bhk,bjhlf,fkh,fhn,fmhg",
	    "14 bcdefghi,aihjkfedc,abd,acbe,adbf,aebkhlmg,afmh,agmlfknjbi,ahb,bhnk,bjnhf,fhm,flhg,hkj",
	    "14 bcdefghi,aijhklfedc,abd,acbe,adbf,aeblhmng,afnh,agnmflkbji,ahjb,bih,bhl,bkhf,fhn,fmhg",
	    "14 bcdefghij,ajiklfedc,abd,acbe,adbf,aeblimng,afnih,agi,ahgnmflkbj,aib,bil,bkif,fin,fmig",
	    "14 bcdefghi,aijklhmndc,abd,acbnmhgfe,adf,aedg,afdh,agdmblki,ahkjb,bik,bjihl,bkh,bhdn,bmd",
	    "14 bcdefghi,aijklhmndc,abd,acbnmhgfe,adf,aedg,afdh,agdmblji,ahjb,bihlk,bjl,bkjh,bhdn,bmd",
	    "14 bcdefghi,aijkhlmdc,abd,acbmlhgfe,adf,aedg,afdh,agdlbkjni,ahnjb,binhk,bjh,bhdm,bld,hji",
	    "14 bcdefghij,ajklhmndc,abd,acbnmhgfe,adf,aedg,afdh,agdmblkji,ahj,aihkb,bjhl,bkh,bhdn,bmd",
	    "14 bcdefghij,ajkc,abkljmned,ace,adcnmjhgf,aeg,afeh,ageji,ahj,aihemclkb,bjlc,ckj,cjen,cme",
	    "14 bcdefghi,aifjdklc,abld,aclkbjmnfe,adf,aednmjbihg,afh,agfi,ahfb,bfmd,bdl,bkdc,djfn,dmf",
	    "14 bcdefghi,aijfkdlmc,abmd,acmlbknfe,adf,aednkbjihg,afh,agfi,ahfjb,bif,bfnd,bdm,bldc,dkf",
	    "14 bcdefghi,aifjdklc,abld,aclkbjmfe,adf,aedmjbinhg,afh,agfni,ahnfb,bfmd,bdl,bkdc,djf,fih",
	    "14 bcdefghi,aifjdklc,abld,aclkbjmfe,adf,aedmjbihng,afnh,agnfi,ahfb,bfmd,bdl,bkdc,djf,fhg",
	    "14 bcdefghij,ajgkdlmc,abmd,acmlbknge,adgf,aeg,afednkbjih,agi,ahgj,aigb,bgnd,bdm,bldc,dkg",
	    "14 bcdefghij,ajiklgfdc,abd,acbfe,adf,aedbg,afblimnh,agni,ahnmglkbj,aib,bil,bkig,gin,gmih",
	    "14 bcdefghij,ajgc,abgkelmd,acme,admlckngf,aeg,afenkcbjh,agji,ahj,aihgb,cgne,cem,cled,ekg",
	    "14 bcdefghi,aihc,abhd,achjfkle,adlf,aelkdjmhg,afh,agfmnjdcbi,ahb,dhnmf,dfl,dkfe,fjnh,hmj",
	    "14 bcdefghi,aihc,abhd,achjfklme,admf,aemkdjnhg,afh,agfnjdcbi,ahb,dhnf,dfml,dkm,dlkfe,fjh",
	    "14 bcdefghijk,akjc,abjd,acjlfmne,adnf,aenmdljihg,afh,agfi,ahfj,aifldcbk,ajb,djf,dfn,dmfe",
	    "14 bcdefghijk,aklmjnedc,abd,acbe,adbnjihgf,aeg,afeh,agei,ahej,aienbmlk,ajlb,bkjm,blj,bje",
	    "14 bcdefghij,ajkhlfedc,abd,acbe,adbf,aeblhmng,afnh,agnmflbkji,ahj,aihkb,bjh,bhf,fhn,fmhg",
	    "14 bcdefghij,ajhkfedc,abd,acbe,adbf,aebkhlmg,afmh,agmlfkbjni,ahnj,ainhb,bhf,fhm,flhg,hji",
	    "14 bcdefghijk,akilfedc,abd,acbe,adbf,aeblimng,afnih,agi,ahgnmflbkj,aik,ajib,bif,fin,fmig",
	    "14 bcdefghij,ajklminedc,abd,acbe,adbnihgf,aeg,afeh,agei,ahenbmlj,ailkb,bjl,bkjim,bli,bie",
	    "14 bcdefghij,ajklminedc,abd,acbe,adbnihgf,aeg,afeh,agei,ahenbmkj,aikb,bjiml,bkm,blki,bie",
	    "14 bcdefghij,ajklimnedc,abd,acbe,adbnihgf,aeg,afeh,agei,ahenmblkj,aikb,bjil,bki,bin,bmie",
	    "14 bcdefghijk,aklminedc,abd,acbe,adbnihgf,aeg,afeh,agei,ahenbmlkj,aik,ajilb,bkim,bli,bie",
	    "14 bcdefghij,ajklc,ablmjnfed,ace,adcf,aecnjihg,afh,agfi,ahfj,aifncmlkb,bjl,bkjmc,clj,cjf",
	    "14 bcdefghijk,aklc,ablmknfed,ace,adcf,aecnkihg,afh,agfi,ahfkj,aik,ajifncmlb,bkmc,clk,ckf",
	    "14 bcdefghij,ajgkdlmnc,abnd,acnmlbkgfe,adf,aedg,afdkbjih,agi,ahgj,aigb,bgd,bdm,bldn,bmdc",
	    "14 bcdefghij,ajkgldmnc,abnd,acnmblgfe,adf,aedg,afdlbkjih,agi,ahgj,aigkb,bjg,bgd,bdn,bmdc",
	    "14 bcdefghij,ajgkdlmc,abmd,acmlbkgfe,adf,aedg,afdkbjnih,agi,ahgnj,aingb,bgd,bdm,bldc,gji",
	    "14 bcdefghij,ajgkdlmc,abmd,acmlbkgfe,adf,aedg,afdkbjinh,agni,ahngj,aigb,bgd,bdm,bldc,gih",
	    "14 bcdefghijk,akhldmnc,abnd,acnmblhfe,adf,aedhg,afh,agfdlbkji,ahj,aihk,ajhb,bhd,bdn,bmdc",
	    "14 bcdefghij,ajhklfedc,abd,acbe,adbf,aeblhmng,afnh,agnmflkbji,ahj,aihb,bhl,bkhf,fhn,fmhg",
	    "14 bcdefghijk,akilgfdc,abd,acbfe,adf,aedbg,afblimnh,agni,ahnmglbkj,aik,ajib,big,gin,gmih",
	    "14 bcdefghijk,akhc,abhlemnd,acne,adnmclhgf,aeg,afeh,agelcbki,ahkj,aik,ajihb,che,cen,cmed",
	    "14 bcdefghijk,akjc,abjd,acjlfmne,adnf,aenmdljig,afih,agi,ahgfj,aifldcbk,ajb,djf,dfn,dmfe",
	    "14 bcdefghij,ajic,abikgfed,ace,adcf,aecg,afckilmnh,agni,ahnlgkcbj,aib,cig,ginm,gln,gmlih",
	    "14 bcdefghijk,akc,abklgfed,ace,adcf,aecg,afclkmnh,agnkji,ahj,aihk,ajhnmglcb,ckg,gkn,gmkh",
	    "14 bcdefghijk,aklec,abed,ace,adcblmkngf,aeg,afenkjih,agi,ahgj,aigk,ajgnemlb,bkme,elk,ekg",
	    "14 bcdefghij,ajiklmhndc,abd,acbnhgfe,adf,aedg,afdh,agdnbmli,ahlkbj,aib,bil,bkihm,blh,bhd",
	    "14 bcdefghij,ajiklmhndc,abd,acbnhgfe,adf,aedg,afdh,agdnbmki,ahkbj,aib,bihml,bkm,blkh,bhd",
	    "14 bcdefghij,ajiklhmdc,abd,acbmhgfe,adf,aedg,afdh,agdmblkni,ahnkbj,aib,binhl,bkh,bhd,hki",
	    "14 bcdefghij,ajkilmhndc,abd,acbnhgfe,adf,aedg,afdh,agdnbmli,ahlbkj,aikb,bji,bihm,blh,bhd",
	    "14 bcdefghij,ajkglemnc,abned,ace,adcnmblgf,aeg,afelbkjih,agi,ahgj,aigkb,bjg,bge,ben,bmec",
	    "14 bcdefghi,aigjkc,abkljged,ace,adcgmnf,aenmg,afmecjbih,agi,ahgb,bgclk,bjlc,ckj,egfn,emf",
	    "14 bcdefghi,aigjkc,abklmjged,ace,adcgnf,aeng,afnecjbih,agi,ahgb,bgcmlk,bjlc,ckjm,clj,egf",
	    "14 bcdefghi,aigjkc,abkljged,ace,adcgmf,aemg,afmecjbih,agi,ahgb,bgclnk,bjnlc,cknj,egf,jlk",
	    "14 bcdefghijk,akjihdc,abd,acbhlgfe,adf,aedg,afdlmh,agmnldbi,ahbj,aibk,ajb,dhnmg,glnh,hml",
	    "14 bcdefghij,ajkihdc,abd,acbhlgfe,adf,aedg,afdlmh,agmnldbi,ahbkj,aikb,bji,dhnmg,glnh,hml",
	    "14 bcdefghijk,akjidc,abd,acbilgfe,adf,aedg,afdlmih,agi,ahgmnldbj,aibk,ajb,dinmg,glni,iml",
	    "14 bcdefghij,ajklmngec,abed,ace,adcbgf,aeg,afebnjih,agi,ahgj,aignlkb,bjl,bkjnm,bln,bmljg",
	    "14 bcdefghij,ajklmgec,abed,ace,adcbgf,aeg,afebmjnih,agi,ahgnj,aingmkb,bjml,bkm,blkjg,gji"]
	};
	
	module.exports = Graphs14;


/***/ },
/* 12 */
/***/ function(module, exports) {

	const Graphs18 = {
	graph: [
	    "18 bcdefghi,aijklmhnodc,abd,acbohgfe,adf,aedg,afdh,agdonbmpi,ahpmqrlkjb,bik,bjil,bkirm,blrqiph,bho,bnhd,hmi,imr,iqml",
	    "18 bcdefghi,aijklmnhopdc,abd,acbphgfe,adf,aedg,afdh,agdpobnqi,ahqnrlkjb,bik,bjil,bkirnm,bln,bmlriqh,bhp,bohd,hni,inl",
	    "18 bcdefghi,aijklmhnodc,abd,acbohgfe,adf,aedg,afdh,agdonbmpi,ahpmqlkjb,bik,bjil,bkiqrm,blrqiph,bho,bnhd,hmi,imrl,lqm",
	    "18 bcdefghi,aijklmhnodc,abd,acbohgfe,adf,aedg,afdh,agdonbmpi,ahpmqrlkjb,bik,bjil,bkirqm,blqiph,bho,bnhd,hmi,imlr,iql",
	    "18 bcdefghi,aijklmhnodc,abd,acbohgfe,adf,aedg,afdh,agdonbmpi,ahpmqlrkjb,bik,bjirl,bkriqm,blqiph,bho,bnhd,hmi,iml,ilk",
	    "18 bcdefghi,aijklmhnodc,abd,acbohgfe,adf,aedg,afdh,agdonbmpi,ahpmlqrkjb,bik,bjirl,bkrqim,bliph,bho,bnhd,hmi,ilr,iqlk",
	    "18 bcdefghi,aijklmnhopdc,abd,acbphgfe,adf,aedg,afdh,agdpobnmqi,ahqmlrkjb,bik,bjirl,bkrim,bliqhn,bmh,bhp,bohd,hmi,ilk",
	    "18 bcdefghi,aijklmhnodc,abd,acbohgfe,adf,aedg,afdh,agdonbmpqi,ahqmlrkjb,bik,bjirl,bkrim,bliqph,bho,bnhd,hmq,hpmi,ilk",
	    "18 bcdefghi,aijklmhnodc,abd,acbohgpfe,adf,aedpg,afpdh,agdonbmqi,ahqmlrkjb,bik,bjirl,bkrim,bliqh,bho,bnhd,dgf,hmi,ilk",
	    "18 bcdefghij,ajklmniopdc,abd,acbpihfe,adf,aedhg,afh,agfdi,ahdpobnqj,aiqnmrlkb,bjl,bkjrm,blrjn,bmjqi,bip,boid,inj,jml",
	    "18 bcdefghi,aigc,abgjkelmd,acmnlopqre,adrqolckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceodnm,clnd,dml,dleqp,doq,dpoer,dqe",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnopqe,adqpnrlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cerndm,cld,dlrepo,dnp,doneq,dpe,enl",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnopqe,adqprnlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cendm,cld,dlerpo,dnp,donreq,dpe,epn",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnopqe,adqpnlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cendm,cld,dlepro,dnrp,dorneq,dpe,npo",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnopqre,adrqnlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cendm,cld,dleqo,dnqp,doq,dponer,dqe",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnopqre,adrpnlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cendm,cld,dlepo,dnp,donerq,dpr,dqpe",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnopqre,adronlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cendm,cld,dleo,dnerqp,doq,dpor,dqoe",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnopqre,adrpolckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceondm,cld,dlo,dnlep,doerq,dpr,dqpe",
	    "18 bcdefghi,aigc,abgjkelmnd,acnlopqre,adrpolckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceodnm,cln,cmld,dlep,doerq,dpr,dqpe",
	    "18 bcdefghi,aigc,abgjklemnd,acnmopqre,adrpomcljgf,aeg,afejcbih,agi,ahgb,cgelk,cjl,ckje,ceodn,cmd,dmep,doerq,dpr,dqpe",
	    "18 bcdefghi,aigc,abgjkelmnd,acnmopqre,adrpomlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cem,cleodn,cmd,dmep,doerq,dpr,dqpe",
	    "18 bcdefghi,aijgc,abgklemnd,acnmopqre,adrpomclkgf,aeg,afekcbjih,agi,ahgjb,big,cgel,cke,ceodn,cmd,dmep,doerq,dpr,dqpe",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnopqe,adqonlckjrgf,aeg,aferjcbih,agi,ahgb,cgrek,cje,cendm,cld,dleo,dneqp,doq,dpoe,ejg",
	    "18 bcdefghij,ajigc,abgklemnd,acnmopqre,adrpomclkgf,aeg,afekcbih,agi,ahgbj,aib,cgel,cke,ceodn,cmd,dmep,doerq,dpr,dqpe",
	    "18 bcdefghi,aihc,abhd,achjkflme,admlnopqf,aeqonldkrjhg,afh,agfjdcbi,ahb,dhfrk,djrf,dfnem,dle,elfo,enfqp,eoq,epof,fkj",
	    "18 bcdefghi,aihc,abhd,achjkflme,admlnopqf,aeqonrldkjhg,afh,agfjdcbi,ahb,dhfk,djf,dfrnem,dle,elrfo,enfqp,eoq,epof,fnl",
	    "18 bcdefghi,aihc,abhd,achjkflme,admnlopqrf,aerpoldkjhg,afh,agfjdcbi,ahb,dhfk,djf,dfoenm,dlne,eml,elfp,eofrq,epr,eqpf",
	    "18 bcdefghi,aihc,abhd,achjkflme,admlnopqf,aeqornldkjhg,afh,agfjdcbi,ahb,dhfk,djf,dfnem,dle,elfro,enrfqp,eoq,epof,fon",
	    "18 bcdefghi,aihc,abhd,achjkflme,admlnopqf,aeqronldkjhg,afh,agfjdcbi,ahb,dhfk,djf,dfnem,dle,elfo,enfrqp,eoq,eporf,fqo",
	    "18 bcdefghi,aihc,abhd,achjkflme,admlnopqf,aeqonldkjhg,afh,agfjdcbi,ahb,dhfk,djf,dfnem,dle,elfo,enfqrp,eorq,eprof,oqp",
	    "18 bcdefghi,aihc,abhd,achjkflme,admlnopqrf,aeronldkjhg,afh,agfjdcbi,ahb,dhfk,djf,dfnem,dle,elfo,enfrp,eorq,epr,eqpof",
	    "18 bcdefghijk,akjc,abjfed,ace,adcf,aecjlmhnog,afonpqrh,agrqpnfmlji,ahj,aihlfcbk,ajb,fjhm,flh,fhpgo,fng,gnhq,gphr,gqh",
	    "18 bcdefghij,ajhdc,abd,acbhklfmne,adnmopqrf,aerpomdlkhg,afh,agfkdbji,ahj,aihb,dhfl,dkf,dfoen,dme,emfp,eofrq,epr,eqpf",
	    "18 bcdefghij,ajhdc,abd,acbhklfmne,adnmopqrf,aerqpmdlkhg,afh,agfkdbji,ahj,aihb,dhfl,dkf,dfpoen,dme,emp,eomfq,epfr,eqf",
	    "18 bcdefghij,ajhdc,abd,acbhklfmne,adnmopqrf,aerqomdlkhg,afh,agfkdbji,ahj,aihb,dhfl,dkf,dfoen,dme,emfqp,eoq,epofr,eqf",
	    "18 bcdefghij,ajhdc,abd,acbhklfmnoe,adonpqrf,aerqpnmdlkhg,afh,agfkdbji,ahj,aihb,dhfl,dkf,dfn,dmfpeo,dne,enfq,epfr,eqf",
	    "18 bcdefghij,ajhdc,abd,acbhklfmnoe,adompqrf,aerqpmdlkhg,afh,agfkdbji,ahj,aihb,dhfl,dkf,dfpeon,dmo,dnme,emfq,epfr,eqf",
	    "18 bcdefghij,ajhdc,abd,acbhklmfnoe,adonpqrf,aerqpndmkhg,afh,agfkdbji,ahj,aihb,dhfml,dkm,dlkf,dfpeo,dne,enfq,epfr,eqf",
	    "18 bcdefghij,ajhkdc,abd,acbkhlmfnoe,adonpqrf,aerqpndmlhg,afh,agfldkbji,ahj,aihb,bhd,dhfm,dlf,dfpeo,dne,enfq,epfr,eqf",
	    "18 bcdefghij,ajkhdc,abd,acbhlmfnoe,adonpqrf,aerqpndmlhg,afh,agfldbkji,ahj,aihkb,bjh,dhfm,dlf,dfpeo,dne,enfq,epfr,eqf",
	    "18 bcdefghij,ajhdc,abd,acbhklfmne,adnmopqf,aeqpomdlkhg,afh,agfkdbjri,ahrj,airhb,dhfl,dkf,dfoen,dme,emfp,eofq,epf,hji",
	    "18 bcdefghijk,akjhdc,abd,acbhlmfnoe,adonpqrf,aerqpndmlhg,afh,agfldbji,ahj,aihbk,ajb,dhfm,dlf,dfpeo,dne,enfq,epfr,eqf",
	    "18 bcdefghij,ajhdkc,abkd,ackbhlmfnoe,adonpqrf,aerqpndmlhg,afh,agfldbji,ahj,aihb,bdc,dhfm,dlf,dfpeo,dne,enfq,epfr,eqf",
	    "18 bcdefghijk,akhdc,abd,acbhlmfnoe,adonpqrf,aerqpndmlhg,afh,agfldbki,ahkj,aik,ajihb,dhfm,dlf,dfpeo,dne,enfq,epfr,eqf",
	    "18 bcdefghij,ajic,abied,ace,adciklgmnf,aenmopqg,afqpomelrkih,agi,ahgkecbj,aib,eigrl,ekrg,egofn,emf,fmgp,fogq,fpg,glk",
	    "18 bcdefghij,ajic,abied,ace,adciklgmnf,aenompqrg,afrqpmelkih,agi,ahgkecbj,aib,eigl,ekg,egpfon,emof,fnm,fmgq,fpgr,fqg",
	    "18 bcdefghij,ajic,abied,ace,adciklgmnf,aenmopqg,afqpormelkih,agi,ahgkecbj,aib,eigl,ekg,egrofn,emf,fmrgp,fogq,fpg,gom",
	    "18 bcdefghij,ajic,abied,ace,adciklgmnf,aenmopqg,afqpromelkih,agi,ahgkecbj,aib,eigl,ekg,egofn,emf,fmgrp,forgq,fpg,gpo",
	    "18 bcdefghij,ajic,abied,ace,adciklgmnf,aenmopqg,afqrpomelkih,agi,ahgkecbj,aib,eigl,ekg,egofn,emf,fmgp,fogrq,fprg,gqp",
	    "18 bcdefghi,aifjkldmnc,abnmopqrd,acrqpmbljfe,adf,aedjbihg,afh,agfi,ahfb,bfdlk,bjl,bkjd,bdpocn,bmc,cmp,comdq,cpdr,cqd",
	    "18 bcdefghi,aifjkldmnc,abnmopqrd,acrqombljfe,adf,aedjbihg,afh,agfi,ahfb,bfdlk,bjl,bkjd,bdocn,bmc,cmdqp,coq,cpodr,cqd",
	    "18 bcdefghi,aifjklmdnoc,abonpqrd,acrqpnbmjfe,adf,aedjbihg,afh,agfi,ahfb,bfdmlk,bjl,bkjm,bljd,bdpco,bnc,cndq,cpdr,cqd",
	    "18 bcdefghi,aifjkldmnoc,abonpqrd,acrqpnmbljfe,adf,aedjbihg,afh,agfi,ahfb,bfdlk,bjl,bkjd,bdn,bmdpco,bnc,cndq,cpdr,cqd",
	    "18 bcdefghi,aifjkldmnoc,abompqrd,acrqpmbljfe,adf,aedjbihg,afh,agfi,ahfb,bfdlk,bjl,bkjd,bdpcon,bmo,bnmc,cmdq,cpdr,cqd",
	    "18 bcdefghi,aifjkldmnc,abnmopqd,acqpombljfe,adf,aedjbirhg,afh,agfri,ahrfb,bfdlk,bjl,bkjd,bdocn,bmc,cmdp,codq,cpd,fih",
	    "18 bcdefghij,ajfklmdnoc,abonpqrd,acrqpnbmkfe,adf,aedkbjhg,afh,agfji,ahj,aihfb,bfdml,bkm,blkd,bdpco,bnc,cndq,cpdr,cqd",
	    "18 bcdefghi,aigc,abgjklemnd,acnmopqe,adqpomclrjgf,aeg,afejcbih,agi,ahgb,cgerlk,cjl,ckjre,ceodn,cmd,dmep,doeq,dpe,elj",
	    "18 bcdefghi,aigc,abgjklemnd,acnmopqe,adqpomcljgf,aeg,afejcbih,agi,ahgb,cgelrk,cjrl,ckrje,ceodn,cmd,dmep,doeq,dpe,jlk",
	    "18 bcdefghi,aigc,abgjklemnd,acnmopqe,adqpormcljgf,aeg,afejcbih,agi,ahgb,cgelk,cjl,ckje,cerodn,cmd,dmrep,doeq,dpe,eom",
	    "18 bcdefghi,aigc,abgjklemnd,acnompqre,adrqpmcljgf,aeg,afejcbih,agi,ahgb,cgelk,cjl,ckje,cepdon,cmod,dnm,dmeq,dper,dqe",
	    "18 bcdefghi,aigc,abgjklmenod,aconpqre,adrqpncmjgf,aeg,afejcbih,agi,ahgb,cgemk,cjml,ckm,clkje,cepdo,cnd,dneq,dper,dqe",
	    "18 bcdefghi,aigc,abgjklemnd,acnmopqe,adqpromcljgf,aeg,afejcbih,agi,ahgb,cgelk,cjl,ckje,ceodn,cmd,dmerp,doreq,dpe,epo",
	    "18 bcdefghi,aigc,abgjklemnd,acnmopqe,adqrpomcljgf,aeg,afejcbih,agi,ahgb,cgelk,cjl,ckje,ceodn,cmd,dmep,doerq,dpre,eqp",
	    "18 bcdefghi,aigc,abgjkelmnd,acnmopqe,adqpomrlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cerm,clreodn,cmd,dmep,doeq,dpe,eml",
	    "18 bcdefghi,aigc,abgjkelmnd,acnmopqre,adrqpmlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cem,clepodn,cmd,dmp,domeq,dper,dqe",
	    "18 bcdefghi,aigc,abgjkelmnod,aconpqre,adrqpnlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cenm,cln,cmlepdo,cnd,dneq,dper,dqe",
	    "18 bcdefghi,aigc,abgjkelmnd,acnmopqe,adqpormlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cem,clerodn,cmd,dmrep,doeq,dpe,eom",
	    "18 bcdefghi,aigc,abgjkelmnd,acnlopqre,adrqplckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cepodnm,cln,cmld,dlp,doleq,dper,dqe",
	    "18 bcdefghi,aigc,abgjkelmnod,acompqre,adrqpmlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cem,clepdon,cmo,cnmd,dmeq,dper,dqe",
	    "18 bcdefghi,aigc,abgjkelmnod,acolpqre,adrqplckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cepdonm,cln,cmlo,cnld,dleq,dper,dqe",
	    "18 bcdefghi,aigc,abgjkelmnd,acnlopqe,adqporlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cerodnm,cln,cmld,dlrep,doeq,dpe,eol",
	    "18 bcdefghi,aigc,abgjkelmnd,acnlopqe,adqpolckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceodnrm,clrn,cmrld,dlep,doeq,dpe,lnm",
	    "18 bcdefghi,aigc,abgjkelmnod,acolpqre,adrqplckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cepdom,clon,cmo,cnmld,dleq,dper,dqe",
	    "18 bcdefghi,aigjc,abjgklemnd,acnmopqre,adrqpmclkgf,aeg,afekcjbih,agi,ahgb,bgc,cgel,cke,cepodn,cmd,dmp,domeq,dper,dqe",
	    "18 bcdefghi,aigjc,abjgklemnd,acnmopqre,adrqomclkgf,aeg,afekcjbih,agi,ahgb,bgc,cgel,cke,ceodn,cmd,dmeqp,doq,dpoer,dqe",
	    "18 bcdefghi,aigjc,abjgklemnd,acnmopqre,adrpomclkgf,aeg,afekcjbih,agi,ahgb,bgc,cgel,cke,ceodn,cmd,dmep,doerq,dpr,dqpe",
	    "18 bcdefghi,aigjc,abjgklemnod,acompqre,adrqpmclkgf,aeg,afekcjbih,agi,ahgb,bgc,cgel,cke,cepdon,cmo,cnmd,dmeq,dper,dqe",
	    "18 bcdefghi,aijkflmdnoc,abonpqrd,acrqpnbmlfe,adf,aedlbkihg,afh,agfi,ahfkjb,bik,bjif,bfdm,bld,bdpco,bnc,cndq,cpdr,cqd",
	    "18 bcdefghi,aijfklmdnoc,abonpqrd,acrqpnbmkfe,adf,aedkbjihg,afh,agfi,ahfjb,bif,bfdml,bkm,blkd,bdpco,bnc,cndq,cpdr,cqd",
	    "18 bcdefghi,aijfkldmnoc,abonpqrd,acrqpnmblkfe,adf,aedkbjihg,afh,agfi,ahfjb,bif,bfdl,bkd,bdn,bmdpco,bnc,cndq,cpdr,cqd",
	    "18 bcdefghi,aijfkldmnc,abnmopqd,acqpomblkfe,adf,aedkbjirhg,afh,agfri,ahrfjb,bif,bfdl,bkd,bdocn,bmc,cmdp,codq,cpd,fih",
	    "18 bcdefghi,aijfkldmnc,abnmopqd,acqpomblkfe,adf,aedkbjihrg,afrh,agrfi,ahfjb,bif,bfdl,bkd,bdocn,bmc,cmdp,codq,cpd,fhg",
	    "18 bcdefghi,aijfkldmnc,abnmopqd,acqpomblkrfe,adf,aedrkbjihg,afh,agfi,ahfjb,bif,bfrdl,bkd,bdocn,bmc,cmdp,codq,cpd,dkf",
	    "18 bcdefghij,ajkflmdnoc,abonpqrd,acrqpnbmlfe,adf,aedlbkjhg,afh,agfji,ahj,aihfkb,bjf,bfdm,bld,bdpco,bnc,cndq,cpdr,cqd",
	    "18 bcdefghi,aigjkc,abkglmenod,aconpqre,adrqpncmlgf,aeg,afelckjbih,agi,ahgb,bgk,bjgc,cgem,cle,cepdo,cnd,dneq,dper,dqe",
	    "18 bcdefghij,ajgkc,abkglmenod,aconpqre,adrqpncmlgf,aeg,afelckbjh,agji,ahj,aihgb,bgc,cgem,cle,cepdo,cnd,dneq,dper,dqe",
	    "18 bcdefghi,aihc,abhjd,acjhklfmne,adnmopqf,aeqpomdlrkhg,afh,agfkdjcbi,ahb,chd,dhfrl,dkrf,dfoen,dme,emfp,eofq,epf,flk",
	    "18 bcdefghi,aihc,abhjd,acjhklfmne,adnmopqf,aeqpormdlkhg,afh,agfkdjcbi,ahb,chd,dhfl,dkf,dfroen,dme,emrfp,eofq,epf,fom",
	    "18 bcdefghi,aihc,abhjd,acjhklfmne,adnompqrf,aerqpmdlkhg,afh,agfkdjcbi,ahb,chd,dhfl,dkf,dfpeon,dmoe,enm,emfq,epfr,eqf",
	    "18 bcdefghi,aihc,abhjd,acjhklfmne,adnmopqf,aeqpromdlkhg,afh,agfkdjcbi,ahb,chd,dhfl,dkf,dfoen,dme,emfrp,eorfq,epf,fpo",
	    "18 bcdefghi,aihc,abhjd,acjhklfmne,adnmopqf,aeqrpomdlkhg,afh,agfkdjcbi,ahb,chd,dhfl,dkf,dfoen,dme,emfp,eofrq,eprf,fqp",
	    "18 bcdefghi,aihjc,abjhd,achklfmne,adnmopqrf,aerqpmdlkhg,afh,agfkdcjbi,ahb,bhc,dhfl,dkf,dfpoen,dme,emp,eomfq,epfr,eqf",
	    "18 bcdefghi,aihjc,abjhd,achklfmnoe,adonpqrf,aerqpnmdlkhg,afh,agfkdcjbi,ahb,bhc,dhfl,dkf,dfn,dmfpeo,dne,enfq,epfr,eqf",
	    "18 bcdefghi,aihjc,abjhd,achklfmnoe,adompqrf,aerqpmdlkhg,afh,agfkdcjbi,ahb,bhc,dhfl,dkf,dfpeon,dmo,dnme,emfq,epfr,eqf",
	    "18 bcdefghi,aihjc,abjkhd,achlmfnoe,adonpqrf,aerqpndmlhg,afh,agfldckjbi,ahb,bhkc,cjh,dhfm,dlf,dfpeo,dne,enfq,epfr,eqf",
	    "18 bcdefghi,aijkgc,abglmenod,aconpqre,adrqpncmlgf,aeg,afelcbkih,agi,ahgkjb,bik,bjig,cgem,cle,cepdo,cnd,dneq,dper,dqe",
	    "18 bcdefghi,aijgc,abgklemnd,acnmopqe,adqpomclkgf,aeg,afekcbjrih,agi,ahgrjb,birg,cgel,cke,ceodn,cmd,dmep,doeq,dpe,gji",
	    "18 bcdefghi,aijgc,abgklemnd,acnompqre,adrqpmclkgf,aeg,afekcbjih,agi,ahgjb,big,cgel,cke,cepdon,cmod,dnm,dmeq,dper,dqe",
	    "18 bcdefghi,aijgc,abgklemnd,acnmopqe,adqpormclkgf,aeg,afekcbjih,agi,ahgjb,big,cgel,cke,cerodn,cmd,dmrep,doeq,dpe,eom",
	    "18 bcdefghi,aijgc,abgklemnd,acnmopqe,adqpromclkgf,aeg,afekcbjih,agi,ahgjb,big,cgel,cke,ceodn,cmd,dmerp,doreq,dpe,epo",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnopqe,adqpolckjgf,aeg,afejcbirh,agri,ahrgb,cgek,cje,ceondm,cld,dlo,dnlep,doeq,dpe,gih",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnopqe,adqpnlckjgf,aeg,afejcbirh,agri,ahrgb,cgek,cje,cendm,cld,dlepo,dnp,doneq,dpe,gih",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnopqe,adqonlckjgf,aeg,afejcbirh,agri,ahrgb,cgek,cje,cendm,cld,dleo,dneqp,doq,dpoe,gih",
	    "18 bcdefghi,aigc,abgjkelmnd,acnlopqe,adqpolckjgf,aeg,afejcbirh,agri,ahrgb,cgek,cje,ceodnm,cln,cmld,dlep,doeq,dpe,gih",
	    "18 bcdefghi,aigc,abgjklemnd,acnmopqe,adqpomcljgf,aeg,afejcbirh,agri,ahrgb,cgelk,cjl,ckje,ceodn,cmd,dmep,doeq,dpe,gih",
	    "18 bcdefghi,aigc,abgjkelmnd,acnmopqe,adqpomlckjgf,aeg,afejcbirh,agri,ahrgb,cgek,cje,cem,cleodn,cmd,dmep,doeq,dpe,gih",
	    "18 bcdefghi,aijgc,abgklemnd,acnmopqe,adqpomclkgf,aeg,afekcbjirh,agri,ahrgjb,big,cgel,cke,ceodn,cmd,dmep,doeq,dpe,gih",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnope,adponlckjgf,aeg,afejcbiqrh,agri,ahrqgb,cgek,cje,cendm,cld,dleo,dnep,doe,gir,gqih",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnope,adponlckjqgf,aeg,afeqjcbirh,agri,ahrgb,cgqek,cje,cendm,cld,dleo,dnep,doe,ejg,gih",
	    "18 bcdefghij,ajigc,abgklemnd,acnmopqe,adqpomclkgf,aeg,afekcbirh,agri,ahrgbj,aib,cgel,cke,ceodn,cmd,dmep,doeq,dpe,gih",
	    "18 bcdefghi,aijkhc,abhd,achlmfnoe,adonpqrf,aerqpndmlhg,afh,agfldcbki,ahkjb,bik,bjih,dhfm,dlf,dfpeo,dne,enfq,epfr,eqf",
	    "18 bcdefghi,aijhc,abhd,achklfmne,adnmopqf,aeqpomdlkhg,afh,agfkdcbjri,ahrjb,birh,dhfl,dkf,dfoen,dme,emfp,eofq,epf,hji",
	    "18 bcdefghi,aijhc,abhd,achklfmne,adnmopqf,aeqpomdlrkhg,afh,agfkdcbji,ahjb,bih,dhfrl,dkrf,dfoen,dme,emfp,eofq,epf,flk",
	    "18 bcdefghi,aijhc,abhd,achklfmne,adnmopqf,aeqpormdlkhg,afh,agfkdcbji,ahjb,bih,dhfl,dkf,dfroen,dme,emrfp,eofq,epf,fom",
	    "18 bcdefghi,aijhc,abhd,achklfmne,adnompqrf,aerqpmdlkhg,afh,agfkdcbji,ahjb,bih,dhfl,dkf,dfpeon,dmoe,enm,emfq,epfr,eqf",
	    "18 bcdefghi,aijhc,abhd,achklfmne,adnmopqf,aeqpromdlkhg,afh,agfkdcbji,ahjb,bih,dhfl,dkf,dfoen,dme,emfrp,eorfq,epf,fpo",
	    "18 bcdefghi,aijhc,abhd,achklfmne,adnmopqf,aeqrpomdlkhg,afh,agfkdcbji,ahjb,bih,dhfl,dkf,dfoen,dme,emfp,eofrq,eprf,fqp",
	    "18 bcdefghi,aihc,abhd,achjkflme,admlnopf,aeponldkjqrhg,afh,agfrjdcbi,ahb,dhrqfk,djf,dfnem,dle,elfo,enfp,eof,fjr,fqjh",
	    "18 bcdefghi,aihc,abhd,achjkflme,admlnopqf,aeqpoldkjrhg,afh,agfrjdcbi,ahb,dhrfk,djf,dfonem,dle,elo,enlfp,eofq,epf,fjh",
	    "18 bcdefghi,aihc,abhd,achjkflme,admlnopqf,aeqpnldkjrhg,afh,agfrjdcbi,ahb,dhrfk,djf,dfnem,dle,elfpo,enp,eonfq,epf,fjh",
	    "18 bcdefghi,aihc,abhd,achjkflmne,adnmopqf,aeqpomldkjrhg,afh,agfrjdcbi,ahb,dhrfk,djf,dfm,dlfoen,dme,emfp,eofq,epf,fjh",
	    "18 bcdefghi,aihc,abhd,achjkflmne,adnlopqf,aeqpoldkjrhg,afh,agfrjdcbi,ahb,dhrfk,djf,dfoenm,dln,dmle,elfp,eofq,epf,fjh",
	    "18 bcdefghi,aihc,abhd,achjklfmne,adnmopqf,aeqpomdljrhg,afh,agfrjdcbi,ahb,dhrflk,djl,dkjf,dfoen,dme,emfp,eofq,epf,fjh",
	    "18 bcdefghi,aihjc,abjhd,achklfmne,adnmopqf,aeqpomdlkrhg,afh,agfrkdcjbi,ahb,bhc,dhrfl,dkf,dfoen,dme,emfp,eofq,epf,fkh",
	    "18 bcdefghij,ajidc,abd,acbie,adiklgmnf,aenmopqg,afqpomelkrih,agi,ahgrkedbj,aib,eirgl,ekg,egofn,emf,fmgp,fogq,fpg,gki",
	    "18 bcdefghi,aihc,abhd,achjkflme,admlnopf,aeponldkqjrhg,afh,agfrjdcbi,ahb,dhrfqk,djqf,dfnem,dle,elfo,enfp,eof,fkj,fjh",
	    "18 bcdefghi,aihc,abhd,achjkflme,admlnopf,aeponldkjqhg,afh,agfqrjdcbi,ahb,dhrqfk,djf,dfnem,dle,elfo,enfp,eof,fjrh,hqj",
	    "18 bcdefghi,aihc,abhd,achjkflme,admnlopqf,aeqpoldkjrhg,afh,agfrjdcbi,ahb,dhrfk,djf,dfoenm,dlne,eml,elfp,eofq,epf,fjh",
	    "18 bcdefghi,aihc,abhd,achjkflme,admlnopf,aeponqldkjrhg,afh,agfrjdcbi,ahb,dhrfk,djf,dfqnem,dle,elqfo,enfp,eof,fnl,fjh",
	    "18 bcdefghi,aihc,abhd,achjkflme,admlnopf,aepoqnldkjrhg,afh,agfrjdcbi,ahb,dhrfk,djf,dfnem,dle,elfqo,enqfp,eof,fon,fjh",
	    "18 bcdefghi,aihc,abhd,achjkflme,admlnopf,aepqonldkjrhg,afh,agfrjdcbi,ahb,dhrfk,djf,dfnem,dle,elfo,enfqp,eoqf,fpo,fjh",
	    "18 bcdefghijk,akjedc,abd,acbe,adbjf,aejlmhnog,afonpqrh,agrqpnfmlji,ahj,aihlfebk,ajb,fjhm,flh,fhpgo,fng,gnhq,gphr,gqh",
	    "18 bcdefghij,ajidc,abd,acbie,adiklgmnf,aenmopqrg,afrqpmelkih,agi,ahgkedbj,aib,eigl,ekg,egpofn,emf,fmp,fomgq,fpgr,fqg",
	    "18 bcdefghij,ajidc,abd,acbie,adiklgmnof,aeonpqrg,afrqpnmelkih,agi,ahgkedbj,aib,eigl,ekg,egn,emgpfo,enf,fngq,fpgr,fqg",
	    "18 bcdefghij,ajidc,abd,acbie,adiklgmnof,aeompqrg,afrqpmelkih,agi,ahgkedbj,aib,eigl,ekg,egpfon,emo,enmf,fmgq,fpgr,fqg",
	    "18 bcdefghij,ajikdc,abd,acbkie,adilmgnof,aeonpqrg,afrqpnemlih,agi,ahgledkbj,aib,bid,eigm,elg,egpfo,enf,fngq,fpgr,fqg",
	    "18 bcdefghijk,akjec,abed,ace,adcbjf,aejlmhnog,afonpqrh,agrqpnfmlji,ahj,aihlfebk,ajb,fjhm,flh,fhpgo,fng,gnhq,gphr,gqh",
	    "18 bcdefghij,ajkigc,abglmenod,aconpqre,adrqpncmlgf,aeg,afelcbih,agi,ahgbkj,aikb,bji,cgem,cle,cepdo,cnd,dneq,dper,dqe",
	    "18 bcdefghij,ajigc,abgklemnd,acnmopqe,adqpormclkgf,aeg,afekcbih,agi,ahgbj,aib,cgel,cke,cerodn,cmd,dmrep,doeq,dpe,eom",
	    "18 bcdefghij,ajigc,abgklemnd,acnompqre,adrqpmclkgf,aeg,afekcbih,agi,ahgbj,aib,cgel,cke,cepdon,cmod,dnm,dmeq,dper,dqe",
	    "18 bcdefghij,ajigc,abgklemnd,acnmopqe,adqpromclkgf,aeg,afekcbih,agi,ahgbj,aib,cgel,cke,ceodn,cmd,dmerp,doreq,dpe,epo",
	    "18 bcdefghijk,akgc,abglmenod,aconpqre,adrqpncmlgf,aeg,afelcbkh,agkji,ahj,aihk,ajhgb,cgem,cle,cepdo,cnd,dneq,dper,dqe",
	    "18 bcdefghij,ajdc,abd,acbje,adjf,aejklhmng,afnmopqrh,agrqpmflkji,ahj,aihkfedb,fjhl,fkh,fhpogn,fmg,gmp,gomhq,gphr,gqh",
	    "18 bcdefghij,ajdc,abd,acbje,adjf,aejklhmng,afnmopqrh,agrqomflkji,ahj,aihkfedb,fjhl,fkh,fhogn,fmg,gmhqp,goq,gpohr,gqh",
	    "18 bcdefghij,ajdc,abd,acbje,adjf,aejklhmng,afnmopqrh,agrpomflkji,ahj,aihkfedb,fjhl,fkh,fhogn,fmg,gmhp,gohrq,gpr,gqph",
	    "18 bcdefghij,ajdc,abd,acbje,adjf,aejklhmnog,afompqrh,agrqpmflkji,ahj,aihkfedb,fjhl,fkh,fhpgon,fmo,fnmg,gmhq,gphr,gqh",
	    "18 bcdefghij,ajdc,abd,acbje,adjf,aejklmhnog,afonpqrh,agrqpnfmkji,ahj,aihkfedb,fjhml,fkm,flkh,fhpgo,fng,gnhq,gphr,gqh",
	    "18 bcdefghij,ajdc,abd,acbje,adjf,aejklhmnog,afonpqrh,agrqpnmflkji,ahj,aihkfedb,fjhl,fkh,fhn,fmhpgo,fng,gnhq,gphr,gqh",
	    "18 bcdefghij,ajdc,abd,acbjke,adkjf,aejlmhnog,afonpqrh,agrqpnfmlji,ahj,aihlfekdb,dje,fjhm,flh,fhpgo,fng,gnhq,gphr,gqh",
	    "18 bcdefghij,ajkdc,abd,acbkje,adjf,aejlmhnog,afonpqrh,agrqpnfmlji,ahj,aihlfedkb,bjd,fjhm,flh,fhpgo,fng,gnhq,gphr,gqh",
	    "18 bcdefghij,ajdc,abd,acbje,adjf,aejklhmng,afnmopqh,agqpomflkrji,ahj,aihrkfedb,fjrhl,fkh,fhogn,fmg,gmhp,gohq,gph,hkj",
	    "18 bcdefghijk,akdc,abd,acbkfe,adf,aedkg,afklminoh,agonpqri,ahrqpngmlkj,aik,ajilgfdb,gkim,gli,gipho,gnh,hniq,hpir,hqi",
	    "18 bcdefghijk,akgc,abglmenod,aconpqre,adrqpncmlgf,aeg,afelcbkh,agki,ahkj,aik,ajihgb,cgem,cle,cepdo,cnd,dneq,dper,dqe",
	    "18 bcdefghij,ajkihc,abhd,achlmfnoe,adonpqrf,aerqpndmlhg,afh,agfldcbi,ahbkj,aikb,bji,dhfm,dlf,dfpeo,dne,enfq,epfr,eqf",
	    "18 bcdefghij,ajihc,abhd,achklfmne,adnmopqf,aeqpomdlrkhg,afh,agfkdcbi,ahbj,aib,dhfrl,dkrf,dfoen,dme,emfp,eofq,epf,flk",
	    "18 bcdefghij,ajihc,abhd,achklfmne,adnompqrf,aerqpmdlkhg,afh,agfkdcbi,ahbj,aib,dhfl,dkf,dfpeon,dmoe,enm,emfq,epfr,eqf",
	    "18 bcdefghij,ajihc,abhd,achklfmne,adnmopqf,aeqpormdlkhg,afh,agfkdcbi,ahbj,aib,dhfl,dkf,dfroen,dme,emrfp,eofq,epf,fom",
	    "18 bcdefghij,ajihc,abhd,achklfmne,adnmopqf,aeqpromdlkhg,afh,agfkdcbi,ahbj,aib,dhfl,dkf,dfoen,dme,emfrp,eorfq,epf,fpo",
	    "18 bcdefghij,ajihc,abhd,achklfmne,adnmopqf,aeqrpomdlkhg,afh,agfkdcbi,ahbj,aib,dhfl,dkf,dfoen,dme,emfp,eofrq,eprf,fqp",
	    "18 bcdefghi,aihc,abhd,achjkflme,admlnopf,aeponldkqrjhg,afh,agfjdcbi,ahb,dhfrk,djrqf,dfnem,dle,elfo,enfp,eof,fkr,fqkj",
	    "18 bcdefghi,aihc,abhd,achjkflme,admlnopqf,aeqpoldkrjhg,afh,agfjdcbi,ahb,dhfrk,djrf,dfonem,dle,elo,enlfp,eofq,epf,fkj",
	    "18 bcdefghi,aihc,abhd,achjkflme,admlnopqf,aeqpnldkrjhg,afh,agfjdcbi,ahb,dhfrk,djrf,dfnem,dle,elfpo,enp,eonfq,epf,fkj",
	    "18 bcdefghi,aihc,abhd,achjkflmne,adnmopqf,aeqpomldkrjhg,afh,agfjdcbi,ahb,dhfrk,djrf,dfm,dlfoen,dme,emfp,eofq,epf,fkj",
	    "18 bcdefghi,aihc,abhd,achjkflmne,adnlopqf,aeqpoldkrjhg,afh,agfjdcbi,ahb,dhfrk,djrf,dfoenm,dln,dmle,elfp,eofq,epf,fkj",
	    "18 bcdefghi,aihjc,abjhd,achklfmne,adnmopqf,aeqpomdlrkhg,afh,agfkdcjbi,ahb,bhc,dhfrl,dkrf,dfoen,dme,emfp,eofq,epf,flk",
	    "18 bcdefghij,ajidc,abd,acbie,adiklgmnf,aenmopqg,afqpomelrkih,agi,ahgkedbj,aib,eigrl,ekrg,egofn,emf,fmgp,fogq,fpg,glk",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnope,adponlckqrjgf,aeg,afejcbih,agi,ahgb,cgerqk,cjqe,cendm,cld,dleo,dnep,doe,ekjr,eqj",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnope,adponqlckrjgf,aeg,afejcbih,agi,ahgb,cgerk,cjre,ceqndm,cld,dlqeo,dnep,doe,enl,ekj",
	    "18 bcdefghi,aigc,abgjkelmd,acmnlopqe,adqpolckrjgf,aeg,afejcbih,agi,ahgb,cgerk,cjre,ceodnm,clnd,dml,dlep,doeq,dpe,ekj",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnope,adponlckqjgf,aeg,afejcbih,agi,ahgb,cgeqrk,cjrqe,cendm,cld,dleo,dnep,doe,ekrj,jqk",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnope,adpoqnlckrjgf,aeg,afejcbih,agi,ahgb,cgerk,cjre,cendm,cld,dleqo,dnqep,doe,eon,ekj",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnope,adpqonlckrjgf,aeg,afejcbih,agi,ahgb,cgerk,cjre,cendm,cld,dleo,dneqp,doqe,epo,ekj",
	    "18 bcdefghi,aigc,abgjkelmd,acmnlopqre,adrqplckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cepodnm,clnd,dml,dlp,doleq,dper,dqe",
	    "18 bcdefghi,aigc,abgjkelmd,acmnolpqre,adrqplckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cepdom,clond,dmo,dnml,dleq,dper,dqe",
	    "18 bcdefghi,aigc,abgjkelmnd,acnolpqre,adrqplckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cepdonm,cln,cmlod,dnl,dleq,dper,dqe",
	    "18 bcdefghi,aigc,abgjkelmnd,acnompqre,adrqpmlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cem,clepdon,cmod,dnm,dmeq,dper,dqe",
	    "18 bcdefghi,aigc,abgjkelmd,acmnolpqre,adrqplckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cepdonm,clnd,dmlo,dnl,dleq,dper,dqe",
	    "18 bcdefghi,aigc,abgjkelmd,acmnlopqe,adqporlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cerodnm,clnd,dml,dlrep,doeq,dpe,eol",
	    "18 bcdefghi,aigc,abgjkelmd,acmnlopqe,adqpolckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceodnrm,clrnd,dmrl,dlep,doeq,dpe,lnm",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnope,adponqrlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cerndm,cld,dlrqeo,dnep,doe,enr,eqnl",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnope,adponqrlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cerqndm,cld,dlqeo,dnep,doe,enlr,eql",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnope,adponqlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceqrndm,cld,dlrqeo,dnep,doe,enrl,lqn",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnope,adpoqrnlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cendm,cld,dlero,dnrqep,doe,eor,eqon",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnopqe,adqprolckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceondm,cld,dlo,dnlerp,doreq,dpe,epo",
	    "18 bcdefghi,aigc,abgjkelmnd,acnmopqe,adqpromlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cem,cleodn,cmd,dmerp,doreq,dpe,epo",
	    "18 bcdefghi,aigc,abgjkelmnd,acnlopqe,adqprolckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceodnm,cln,cmld,dlerp,doreq,dpe,epo",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnope,adpoqnrlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cerndm,cld,dlreqo,dnqep,doe,eon,enl",
	    "18 bcdefghi,aigc,abgjkelmd,acmnlopqe,adqprolckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceodnm,clnd,dml,dlerp,doreq,dpe,epo",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnope,adpoqrnlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cendm,cld,dlerqo,dnqep,doe,eonr,eqn",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnope,adpoqnlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cendm,cld,dleqro,dnrqep,doe,eorn,nqo",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnope,adpqronlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cendm,cld,dleo,dnerp,dorqe,epr,eqpo",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnopqe,adqrpolckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceondm,cld,dlo,dnlep,doerq,dpre,eqp",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnopqe,adqrpnlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cendm,cld,dlepo,dnp,donerq,dpre,eqp",
	    "18 bcdefghi,aigc,abgjkelmnd,acnlopqe,adqrpolckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceodnm,cln,cmld,dlep,doerq,dpre,eqp",
	    "18 bcdefghi,aigc,abgjkelmnd,acnmopqe,adqrpomlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cem,cleodn,cmd,dmep,doerq,dpre,eqp",
	    "18 bcdefghi,aijgc,abgklemnd,acnmopqe,adqrpomclkgf,aeg,afekcbjih,agi,ahgjb,big,cgel,cke,ceodn,cmd,dmep,doerq,dpre,eqp",
	    "18 bcdefghij,ajigc,abgklemnd,acnmopqe,adqrpomclkgf,aeg,afekcbih,agi,ahgbj,aib,cgel,cke,ceodn,cmd,dmep,doerq,dpre,eqp",
	    "18 bcdefghi,aigc,abgjkelmd,acmnlopqe,adqrpolckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceodnm,clnd,dml,dlep,doerq,dpre,eqp",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnope,adpqonrlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cerndm,cld,dlreo,dneqp,doqe,epo,enl",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnope,adpqornlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cendm,cld,dlero,dnreqp,doqe,epo,eon",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnope,adpqronlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cendm,cld,dleo,dnerqp,doqe,epor,eqo",
	    "18 bcdefghi,aigc,abgjkelmd,acmlnope,adpqonlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cendm,cld,dleo,dneqrp,dorqe,epro,oqp",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqre,adrqplckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceponmd,dln,dmlo,dnlp,doleq,dper,dqe",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqre,adrqolckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceonmd,dln,dmlo,dnleqp,doq,dpoer,dqe",
	    "18 bcdefghi,aigc,abgjkelmd,acmnopqre,adrqpmlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cem,clepond,dmo,dnmp,domeq,dper,dqe",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqe,adqporlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceronmd,dln,dmlo,dnlrep,doeq,dpe,eol",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqe,adqpolckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceornmd,dln,dmlro,dnrlep,doeq,dpe,lon",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqe,adqpolckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceonrmd,dlrn,dmrlo,dnlep,doeq,dpe,lnm",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqe,adqprolckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceonmd,dln,dmlo,dnlerp,doreq,dpe,epo",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqre,adrqplckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cepnmd,dln,dmlpo,dnp,donleq,dper,dqe",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqre,adrqplckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cepomd,dlon,dmo,dnmlp,doleq,dper,dqe",
	    "18 bcdefghi,aijgc,abgklemd,acmnopqre,adrqpmclkgf,aeg,afekcbjih,agi,ahgjb,big,cgel,cke,cepond,dmo,dnmp,domeq,dper,dqe",
	    "18 bcdefghi,aijkgc,abglmend,acnopqre,adrqpncmlgf,aeg,afelcbkjih,agi,ahgjb,bigk,bjg,cgem,cle,cepod,dnp,doneq,dper,dqe",
	    "18 bcdefghi,aijkgc,abglmend,acnopqre,adrqpncmlgf,aeg,afelcbkih,agi,ahgkjb,bik,bjig,cgem,cle,cepod,dnp,doneq,dper,dqe",
	    "18 bcdefghi,aijgc,abgklemd,acmnopqe,adqpomclkgf,aeg,afekcbjrih,agi,ahgrjb,birg,cgel,cke,ceond,dmo,dnmep,doeq,dpe,gji",
	    "18 bcdefghi,aijgc,abgklemd,acmnopqe,adqpormclkgf,aeg,afekcbjih,agi,ahgjb,big,cgel,cke,cerond,dmo,dnmrep,doeq,dpe,eom",
	    "18 bcdefghi,aijgc,abgklemd,acmnopqe,adqpomclkgf,aeg,afekcbjih,agi,ahgjb,big,cgel,cke,ceornd,dmro,dnrmep,doeq,dpe,mon",
	    "18 bcdefghi,aijgc,abgklemd,acmnopqre,adrqpmclkgf,aeg,afekcbjih,agi,ahgjb,big,cgel,cke,cepnd,dmpo,dnp,donmeq,dper,dqe",
	    "18 bcdefghi,aijgc,abgklemd,acmnopqe,adqpromclkgf,aeg,afekcbjih,agi,ahgjb,big,cgel,cke,ceond,dmo,dnmerp,doreq,dpe,epo",
	    "18 bcdefghijk,akigc,abglmend,acnopqre,adrqpncmlgf,aeg,afelcbih,agi,ahgbkj,aik,ajib,cgem,cle,cepod,dnp,doneq,dper,dqe",
	    "18 bcdefghij,ajidc,abd,acbie,adiklgmf,aemnopqrg,afrqpmelkih,agi,ahgkedbj,aib,eigl,ekg,egponf,fmo,fnmp,fomgq,fpgr,fqg",
	    "18 bcdefghij,ajikdc,abd,acbkie,adilmgnf,aenopqrg,afrqpnemlih,agi,ahgledkbj,aib,bid,eigm,elg,egpof,fnp,fongq,fpgr,fqg",
	    "18 bcdefghijk,akjec,abed,ace,adcbjf,aejlmhng,afnopqrh,agrqpnfmlji,ahj,aihlfebk,ajb,fjhm,flh,fhpog,gnp,gonhq,gphr,gqh",
	    "18 bcdefghij,ajkigc,abglmend,acnopqre,adrqpncmlgf,aeg,afelcbih,agi,ahgbkj,aikb,bji,cgem,cle,cepod,dnp,doneq,dper,dqe",
	    "18 bcdefghij,ajigc,abgklemd,acmnopqe,adqpomclkgf,aeg,afekcbih,agi,ahgbj,aib,cgel,cke,ceornd,dmro,dnrmep,doeq,dpe,mon",
	    "18 bcdefghij,ajigc,abgklemd,acmnopqe,adqpormclkgf,aeg,afekcbih,agi,ahgbj,aib,cgel,cke,cerond,dmo,dnmrep,doeq,dpe,eom",
	    "18 bcdefghij,ajigc,abgklemd,acmnopqe,adqpromclkgf,aeg,afekcbih,agi,ahgbj,aib,cgel,cke,ceond,dmo,dnmerp,doreq,dpe,epo",
	    "18 bcdefghij,ajigc,abgklemd,acmnopqre,adrqpmclkgf,aeg,afekcbih,agi,ahgbj,aib,cgel,cke,cepnd,dmpo,dnp,donmeq,dper,dqe",
	    "18 bcdefghi,aigc,abgjkeld,aclmnope,adponqlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceqrnmd,dln,dmlrqeo,dnep,doe,enrl,lqn",
	    "18 bcdefghi,aigc,abgjkeld,aclmnope,adponqlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceqnrmd,dlrn,dmrlqeo,dnep,doe,enl,lnm",
	    "18 bcdefghi,aigc,abgjkeld,aclmnope,adponlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cenqrmd,dlrn,dmrqleo,dnep,doe,lnr,lqnm",
	    "18 bcdefghi,aigc,abgjkeld,aclmnope,adponlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cenqmd,dlqrn,dmrqleo,dnep,doe,lnrm,mqn",
	    "18 bcdefghi,aigc,abgjkeld,aclmnope,adponlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cenqrmd,dlrqn,dmqleo,dnep,doe,lnmr,lqm",
	    "18 bcdefghi,aigc,abgjkeld,aclmnope,adpoqrnlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cenmd,dln,dmlero,dnrqep,doe,eor,eqon",
	    "18 bcdefghi,aigc,abgjkeld,aclmnope,adpoqnlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cenrmd,dlrn,dmrleqo,dnqep,doe,eon,lnm",
	    "18 bcdefghi,aigc,abgjkeld,aclmnope,adpoqnrlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cernmd,dln,dmlreqo,dnqep,doe,eon,enl",
	    "18 bcdefghi,aigc,abgjkeld,aclmnope,adpoqrnlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cenmd,dln,dmlerqo,dnqep,doe,eonr,eqn",
	    "18 bcdefghi,aigc,abgjkeld,aclmnope,adpoqnlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cenmd,dln,dmleqro,dnrqep,doe,eorn,nqo",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqre,adrqolckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceomd,dlon,dmo,dnmleqp,doq,dpoer,dqe",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqre,adrqplckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cepmd,dlpon,dmo,dnmp,domleq,dper,dqe",
	    "18 bcdefghi,aigc,abgjkelmd,acmnopqre,adrqpmlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cem,clepnd,dmpo,dnp,donmeq,dper,dqe",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqe,adqporlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceromd,dlon,dmo,dnmlrep,doeq,dpe,eol",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqe,adqpolckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceormd,dlron,dmo,dnmrlep,doeq,dpe,lom",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqe,adqprolckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceomd,dlon,dmo,dnmlerp,doreq,dpe,epo",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqre,adrqplckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cepmd,dlpn,dmpo,dnp,donmleq,dper,dqe",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqe,adqpolckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,ceomd,dlorn,dmro,dnrmlep,doeq,dpe,mon",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqe,adqpnrlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cernmd,dln,dmlrepo,dnp,doneq,dpe,enl",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqe,adqpnlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cenrmd,dlrn,dmrlepo,dnp,doneq,dpe,lnm",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqe,adqprnlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cenmd,dln,dmlerpo,dnp,donreq,dpe,epn",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqe,adqpnlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cenmd,dln,dmlepro,dnrp,dorneq,dpe,npo",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqre,adrqnlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cenmd,dln,dmleqpo,dnp,donq,dpner,dqe",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqre,adrqmlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cemd,dleqpon,dmo,dnmp,domq,dpmer,dqe",
	    "18 bcdefghi,aigc,abgjkeld,aclmnopqre,adrpmlckjgf,aeg,afejcbih,agi,ahgb,cgek,cje,cemd,dlepon,dmo,dnmp,domerq,dpr,dqpe",
	    "18 bcdefghi,aijgc,abgklemd,acmnope,adpqonrmclkgf,aeg,afekcbjih,agi,ahgjb,big,cgel,cke,cernd,dmreo,dneqp,doqe,epo,enm",
	    "18 bcdefghi,aijgc,abgklemd,acmnope,adpqornmclkgf,aeg,afekcbjih,agi,ahgjb,big,cgel,cke,cend,dmero,dnreqp,doqe,epo,eon",
	    "18 bcdefghi,aijgc,abgklemd,acmnope,adpqronmclkgf,aeg,afekcbjih,agi,ahgjb,big,cgel,cke,cend,dmeo,dnerqp,doqe,epor,eqo",
	    "18 bcdefghi,aijgc,abgklemd,acmnope,adpqonmclkgf,aeg,afekcbjih,agi,ahgjb,big,cgel,cke,cend,dmeo,dneqrp,dorqe,epro,oqp",
	    "18 bcdefghijk,akigc,abglmend,acnopqe,adqrponcmlgf,aeg,afelcbih,agi,ahgbkj,aik,ajib,cgem,cle,ceod,dnep,doerq,dpre,eqp",
	    "18 bcdefghij,ajidc,abd,acbie,adiklgmf,aemnopg,afpqronmelkih,agi,ahgkedbj,aib,eigl,ekg,egnf,fmgo,fngrp,forqg,gpr,gqpo",
	    "18 bcdefghij,ajidc,abd,acbie,adiklgmf,aemnopqg,afqrpnmelkih,agi,ahgkedbj,aib,eigl,ekg,egnf,fmgpo,fnp,fongrq,fprg,gqp",
	    "18 bcdefghij,ajikdc,abd,acbkie,adilmgnf,aenopqg,afqrponemlih,agi,ahgledkbj,aib,bid,eigm,elg,egof,fngp,fogrq,fprg,gqp",
	    "18 bcdefghijk,akjec,abed,ace,adcbjf,aejlmhng,afnopqh,agqrponfmlji,ahj,aihlfebk,ajb,fjhm,flh,fhog,gnhp,gohrq,gprh,hqp"]
	};
	
	module.exports = Graphs18;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map