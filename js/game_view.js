const Util = require("./util");
const Game = require("./game");

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
