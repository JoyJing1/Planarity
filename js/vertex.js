const DEFAULTS = {
	COLOR: "#2794EB",
	RADIUS: 15
};

const Vertex = function(options) {
  this.x = options.x;
  this.y = options.y;
  this.color = DEFAULTS.COLOR;
  this.radius = DEFAULTS.RADIUS;
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
