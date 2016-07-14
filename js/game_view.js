const Util = require("./util");
const Game = require("./game");
const Constants = require('../constants');
const Vertex = require('./vertex');

const GameView = function (ctx, root, options) {
  this.ctx = ctx;
  this.root = root;
  this.currentMousePos = { x: -1, y: -1 };
  this.level = options.level || 0;
  this.stage = options.stage || 0;
  // this.numMoves = 0;

  this.renderButtons();
  this.bindButtonEvents();
  this.playLevel(this.level);
};

GameView.prototype.playLevel = function() {
  this.game = new Game({level: this.level, stage: this.stage});
  // this.numMoves = 0;
  // console.log(this.game);
  // console.log(this);
  // console.log("GameView.playLevel");
  // this.numMoves = 0;
  this.renderGraph();
  this.renderModal();
  this.bindGraphEvents();
  // console.log("after this.bindGraphEvents in GameView()");

  this.refreshIntervalId = setInterval( () => {
    this.follow(this.game, this.currentMousePos);
    this.renderGraph();
    // this.checkPlanarity();

  }, 1);
};

GameView.prototype.levelUp = function() {
  this.stage += 1;
  this.game.moves = 0;
  clearInterval(this.refreshIntervalId);
  console.log(`increment up this.stage --> ${this.stage}`);
  if (this.level === 0 || this.stage >= this.level + 3) {
    console.log(`increment up this.level --> ${this.level}`);
    this.level += 1;
    this.stage = 0;
  }
  console.log(`GameView.levelUp, moves = ${this.game.moves}`);
};

GameView.prototype.levelDown = function() {
  this.stage -= 1;
  this.game.moves = 0;
  clearInterval(this.refreshIntervalId);
  console.log(`increment up this.stage --> ${this.stage}`);
  if (this.stage < 0) {
    console.log(`increment up this.level --> ${this.level}`);
    this.level -= 1;
    this.stage = this.level + 3;
  }
  console.log(`GameView.levelDown, moves = ${this.game.moves}`);
  // console.log(this.game.moves);
};


GameView.prototype.renderModal = function() {
  // console.log("GameView.renderModal()");
  // let $modal = {};

  const prevModals = document.getElementsByClassName("modal");

    if (prevModals.length > 0) {
      const $modal = $(prevModals[0]);

    } else {
      const $modal = $("<div>").addClass("modal")
                    .addClass("win-modal")
                    .css( {display: "none"} );

      const $modalContent = $("<div>").addClass("modal-content");
      const $congrats = $("<h2>").text("Congratulations, you made the graph planar!");

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

      $nextButton.on("click", event => {
        this.levelUp();

        // clearInterval(this.refreshIntervalId);
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

  // console.log(`final: ${planar}`);

  if (planar) {
    // console.log("Yay, you made a planar graph!!");
    // this.game.dropVertices();
    const $modal = $(".modal");
    // const $modalContent = $(".modal-content");

    const $stats = $("<p>")
    const $level = $(".level").text(`Level: ${this.level+1}`);
    const $stage = $(".stage").text(`Stage: ${this.stage+1}`);
    const $moves = $(".moves").text(`Moves: ${this.game.moves}`);

    $modal.css({display: "block"});
  } else {
    // console.log("The graph's not planar quite yet");
  }

};

GameView.prototype.bindButtonEvents = function() {

  $(".previous-level").on("click", event => {
    if (this.level > 0) {
      // this.level -= 1;
      this.levelDown();
      console.log(`leveled down: level = ${this.level}, stage = ${this.stage}`)
      this.playLevel(this.level);
    }
  });

  $(".next-level").on("click", event => {
    // this.level += 1;
    this.levelUp();
    console.log(`leveled up: level = ${this.level}, stage = ${this.stage}`)
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
    this.game.moves += 1;
    console.log("in mousedown callback in GameView");
    // this.numMoves += 1;
    // console.log(this.numMoves);
    console.log(this.game.moves);
    // this.offset = (0, 0);
    let vertexSelected = false;
    // console.log(`Mouse Pos: (${this.currentMousePos.x}, ${this.currentMousePos.y})`);
    // console.log(`Mouse Pos: (${event.pageX}, ${event.pageY})`);
    // console.log(`Vertex Radius: ${Vertex.RADIUS}`);
    let withinVertex = 30;
    if (Vertex.RADIUS > 7) {
      withinVertex += (Vertex.RADIUS - 7);
    }

    // console.log(`withinVertex = ${withinVertex}`);

    this.game.vertices.forEach( vertex => {
      const dist = Util.distFromMouse(vertex, this.currentMousePos);
      // console.log(`(${vertex.x}, ${vertex.y})`);
      // console.log(dist);

      if (dist < withinVertex && !vertexSelected) {
        console.log("going through selected vertices");
        // this.game.moves += 1;
        vertex.selected = true;
        vertex.color = Constants.COLOR_SELECTED;
        vertexSelected = true;
      }
    });

  });

  $("canvas").on("mouseup", event => {
    this.game.dropVertices();
    this.checkPlanarity();
  });

  $(document).mousemove( event => {
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
