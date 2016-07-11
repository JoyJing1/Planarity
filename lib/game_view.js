const GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;

  this.render();
  // Add click handlers
};

GameView.prototype.render = function() {
  this.game.edges.forEach( edge => {
    edge.draw(this.ctx);
  });

  this.game.vertices.forEach( (vertex, i) => {
    // vertex.draw(this.ctx);
    const $vertex = $("<div>").addClass("vertex").addClass("drag").css({ 'top': vertex.y, 'left': vertex.x });

    // .draggable()

    // this.ctx.append($vertex);



  });

};

module.exports = GameView;
