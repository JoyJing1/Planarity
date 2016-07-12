const Util = window.Util = require("./util");

const Edge = function(options) {
  this.vertex1 = options.vertex1;
  this.vertex2 = options.vertex2;
};

Edge.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.moveTo(this.vertex1.x, this.vertex1.y);
  ctx.lineTo(this.vertex2.x, this.vertex2.y);
  // ctx.moveTo(this.vertex1.y, this.vertex1.x);
  // ctx.lineTo(this.vertex2.y, this.vertex2.x);
  ctx.stroke();
};

Edge.prototype.slope = function() {
  return Util.slope(this.vertex1, this.vertex2);
};

Edge.prototype.xIntercept = function() {
  // debugger;
  return Util.xIntercept(this.vertex1, this.slope());
};

// Edge.prototype.equals = function(edge) {
//   return this.vertex1 === edge.vertex1 && this.vertex2 === edge.vertex2;
// };

Edge.prototype.shareVertex = function(edge) {
  return (
    this.vertex1 === edge.vertex1
    || this.vertex1 === edge.vertex2
    || this.vertex2 === edge.vertex1
    || this.vertex2 === edge.vertex2
  );
};

Edge.prototype.intersectsWith = function(edge) {
  const x = (edge.xIntercept() - this.xIntercept()) / (this.slope() - edge.slope());

  let firstMin = Math.min(this.vertex1.x, this.vertex2.x);
  let firstMax = Math.max(this.vertex1.x, this.vertex2.x);

  let secondMin = Math.min(edge.vertex1.x, edge.vertex2.x);
  let secondMax = Math.max(edge.vertex1.x, edge.vertex2.x);

  let onFirst = (firstMin < x && x < firstMax);
  let onSecond = (secondMin < x && x < secondMax);

  // debugger;

  return (onFirst && onSecond && !this.shareVertex(edge));
};

module.exports = Edge;
