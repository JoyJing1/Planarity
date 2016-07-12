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
  // const $board = $("<ul class='board'></ul>");
  this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.game.edges.forEach( (edge, i) => {
    edge.draw(this.ctx);
    // console.log(`edge ${i}`);
    // console.log(`vertex1: (${edge.vertex1.x}, ${edge.vertex1.y})`);
    // console.log(`vertex2: (${edge.vertex2.x}, ${edge.vertex2.y})`);
  });

  this.game.vertices.forEach( (vertex, i) => {
    vertex.draw(this.ctx);
  });

  // this.root.append($board);
};

GameView.prototype.bindEvents = function() {
  $("canvas").on("mousedown", event => {
    // console.log("inside mousedown on .canvas");

    this.game.vertices.forEach( vertex => {
      const dist = Util.distFromMouse(vertex, event);
      // console.log(vertex);
      // console.log(dist);

      if (dist < 100) {
        vertex.selected = true;
        // console.log(`selected vertex ${vertex.index}`);
      }
    });

  });

  $("canvas").on("mouseup", event => {
    // Change all statuses to not selected
    // debugger;
    this.game.vertices.forEach( vertex => {
      vertex.selected = false;
    });
  });

  $(document).mousemove( event => {
    const yAdjust = -65;
    const xAdjust = -8;
    this.currentMousePos.x = event.pageX + xAdjust;
    this.currentMousePos.y = event.pageY + yAdjust;
    // console.log(this.currentMousePos);
  });

};

GameView.prototype.follow = function(game, currentMousePos) {
  // debugger;
  // console.log("inside GameView.follow()");
  game.vertices.forEach( vertex => {
    if (vertex.selected) {
      // debugger;
      vertex.x = currentMousePos.x;
      vertex.y = currentMousePos.y;
      // console.log(`New position for vertex ${vertex.index} is (${vertex.x}, ${vertex.y})`);
    }
  });


};


module.exports = GameView;
