const GameView = function (game, ctx, root) {
  this.ctx = ctx;
  this.game = game;
  this.root = root;

  this.render();
  // Add click handlers
};

GameView.prototype.render = function() {
  this.game.edges.forEach( edge => {
    edge.draw(this.ctx);
  });

  this.game.vertices.forEach( (vertex, i) => {
    // vertex.draw(this.ctx);
    const $vertex = $("<div>").addClass("vertex")
                    .draggable()
                    .css({ 'top': vertex.y-8, 'left': vertex.x-8 })
                    .attr("data-pos", [vertex.x, vertex.y]);

    // $vertex.draggable();
    // .draggable()
    // debugger;

    this.root.append($vertex);



  });

};

module.exports = GameView;
