const Util = window.Util = require("./util");
const Constants = require('../constants');

const Edge = function(options) {
  this.vertex1 = options.vertex1;
  this.vertex2 = options.vertex2;
  this.color = Constants.BLACK;
};

Edge.prototype.draw = function(ctx) {
  ctx.strokeStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(this.vertex1.x, this.vertex1.y);
  ctx.lineTo(this.vertex2.x, this.vertex2.y);
  ctx.stroke();
};

Edge.prototype.slope = function() {
  return Util.slope(this.vertex1, this.vertex2);
};

Edge.prototype.xIntercept = function() {
  return Util.xIntercept(this.vertex1, this.slope());
};


Edge.prototype.shareVertex = function(edge) {
  return (
    this.vertex1 === edge.vertex1
    || this.vertex1 === edge.vertex2
    || this.vertex2 === edge.vertex1
    || this.vertex2 === edge.vertex2
  );
};

Edge.prototype.intersectsAtX = function(edge) {
  return (edge.xIntercept() - this.xIntercept()) / (this.slope() - edge.slope());
}

Edge.prototype.intersectsWith = function(edge) {
  const x = this.intersectsAtX(edge);

  const firstMin = Math.min(this.vertex1.x, this.vertex2.x);
  const firstMax = Math.max(this.vertex1.x, this.vertex2.x);

  const secondMin = Math.min(edge.vertex1.x, edge.vertex2.x);
  const secondMax = Math.max(edge.vertex1.x, edge.vertex2.x);

  const onFirst = (firstMin < x && x < firstMax);
  const onSecond = (secondMin < x && x < secondMax);

  // debugger;

  return (onFirst && onSecond && !this.shareVertex(edge));
};

module.exports = Edge;
