const Constants = require('../constants');

const Vertex = function(options) {
  this.index = options.index;
  this.x = options.x;
  this.y = options.y;
  this.color = Constants.COLOR;
  this.radius = Constants.RADIUS;
  this.edges = [];
  this.selected = false;
};

Vertex.prototype.pos = function() {
  return [this.x, this.y];
};

Vertex.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, Vertex.RADIUS, 0, 2 * Math.PI);
  ctx.fill();
};

module.exports = Vertex;
