const Util = require("./util");
const Game = require("./game");
const Constants = require('../constants');
const Vertex = require('./vertex');

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
