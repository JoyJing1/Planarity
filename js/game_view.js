"use strict";

const Constants = require('../constants')
    , Game = require("./game")
    , Util = require("./util")
    , Vertex = require('./vertex');

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
  // debugger;
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
      this.playLevel();
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

  const $button2 = $("<div>").addClass("buton").addClass("previous-level");
  const $button3 = $("<div>").addClass("buton").addClass("next-level");
  // const $button2 = $("<img class='previous-level button' src='./images/arrow.png'></img>");
  // const $button3 = $("<img class='next-level button' src='./images/arrow.png'></img>");
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
    const $level = $(".level").text(`Level: ${this.level+1}`);
    const $stage = $(".stage").text(`Stage: ${this.stage+1}`);
    const $moves = $(".moves").text(`Moves: ${this.game.moves}`);

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
