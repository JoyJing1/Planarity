const Util = require("./util");

const Edge = function (options) {
  this.vertex1 = options.vertex1;
  this.vertex2 = options.vertex2;
};

Edge.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.moveTo(this.vertex1.x, this.vertex1.y);
  ctx.lineTo(this.vertex2.x, this.vertex2.y);
  // ctx.moveTo(this.vertex1.y, this.vertex1.x);
  // ctx.lineTo(this.vertex2.y, this.vertex2.x);
  ctx.stroke();
};

Edge.prototype.intersectsWith = function (edge) {
  const x = (edge.xIntercept - this.xIntercept) / (this.slope - edge.slope);

  let min = Math.min(this.x, edge.x);
  let max = Math.max(this.x, edge.x);

  return (min <= x && x <= max);
};

module.exports = Edge;
