"use strict";

const Constants = require('../constants')
    , Util = require("./util");

const Edge = function(options) {
  this.vertex1 = options.vertex1;
  this.vertex2 = options.vertex2;
};

Edge.prototype.draw = function(ctx, edges) {
    if (this.currentlyIntersecting(edges)) {
      ctx.strokeStyle = Constants.LINE_INTERSECTING;
      ctx.shadowColor = Constants.LINE_INTERSECTING;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(this.vertex1.x, this.vertex1.y);
      ctx.lineTo(this.vertex2.x, this.vertex2.y);
      ctx.stroke();

    } else {
      ctx.strokeStyle = Constants.BLACK;
      ctx.shadowColro = Constants.BLACK;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(this.vertex1.x, this.vertex1.y);
      ctx.lineTo(this.vertex2.x, this.vertex2.y);
      ctx.stroke();
    }
};

Edge.prototype.slope = function() {
  return Util.slope(this.vertex1, this.vertex2);
};

Edge.prototype.xIntercept = function() {
  if (this.isVertical()) {
    return this.vertex1.x;
  } else {
    return Util.xIntercept(this.vertex1, this.slope());
  }
};

Edge.prototype.shareVertex = function(edge) {
  return (
    this.vertex1 === edge.vertex1
    || this.vertex1 === edge.vertex2
    || this.vertex2 === edge.vertex1
    || this.vertex2 === edge.vertex2
  );
};

Edge.prototype.isVertical = function() {
  return (Math.abs(this.vertex1.x - this.vertex2.x) < 1);
};

Edge.prototype.isHorizontal = function() {
  return (Math.abs(this.vertex1.y - this.vertex2.y) < 1);
};

Edge.prototype.intersectsAtX = function(edge) {
  return (edge.xIntercept() - this.xIntercept()) / (this.slope() - edge.slope());
};

Edge.prototype.intersectsWith = function(edge) {

  if (this.isHorizontal()) {
    let y = this.vertex1.y;
    let minY = Math.min(edge.vertex1.y, edge.vertex2.y) + 1;
    let maxY = Math.max(edge.vertex1.y, edge.vertex2.y) - 1;
    return (minY < y && y < maxY);

  } else if (edge.isHorizontal()) {
    let y = edge.vertex1.y;
    let minY = Math.min(this.vertex1.y, this.vertex2.y) + 1;
    let maxY = Math.max(this.vertex1.y, this.vertex2.y) - 1;
    return (minY < y && y < maxY);

  } else if (this.isVertical()) {
    let x = this.vertex1.x;
    const minX = Math.min(edge.vertex1.x, edge.vertex2.x) + 1;
    const maxX = Math.max(edge.vertex1.x, edge.vertex2.x) - 1;
    return (minX < x && x < maxX);

  } else if (edge.isVertical()){
    let x = edge.vertex1.x;
    const minX = Math.min(this.vertex1.x, this.vertex2.x) + 1;
    const maxX = Math.max(this.vertex1.x, this.vertex2.x) - 1;
    return (minX < x && x < maxX);

  } else {
    let x = this.intersectsAtX(edge);

    const firstMin = Math.min(this.vertex1.x, this.vertex2.x) + 1;
    const firstMax = Math.max(this.vertex1.x, this.vertex2.x) - 1;

    const secondMin = Math.min(edge.vertex1.x, edge.vertex2.x) + 1;
    const secondMax = Math.max(edge.vertex1.x, edge.vertex2.x) - 1;

    const onFirst = (firstMin <= x && x <= firstMax);
    const onSecond = (secondMin <= x && x <= secondMax);

    return (onFirst && onSecond && !this.shareVertex(edge));
  }
};

Edge.prototype.currentlyIntersecting = function(allEdges) {
  let intersecting = false;

  allEdges.forEach( edge => {
    if (this.intersectsWith(edge)) {
      intersecting = true;
    }
  });
  return intersecting;
};

module.exports = Edge;
