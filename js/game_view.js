const Util = require("./util");
const Game = require("./game");

const GameView = function (game, ctx, root) {
  this.ctx = ctx;
  this.game = game;
  this.root = root;
  this.currentMousePos = { x: -1, y: -1 };

  this.render();
  this.bindEvents();
  setInterval( () => {
    this.follow(this.game, this.currentMousePos);
    this.render();
  }, 50);
};

GameView.prototype.render = function() {
  this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.game.edges.forEach( (edge, i) => {
    edge.draw(this.ctx);
  });

  this.game.vertices.forEach( (vertex, i) => {
    vertex.draw(this.ctx);
  });
};

GameView.prototype.bindEvents = function() {
  $("canvas").on("mousedown", event => {

    this.game.vertices.forEach( vertex => {
      const dist = Util.distFromMouse(vertex, event);

      if (dist < 100) {
        vertex.selected = true;
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
