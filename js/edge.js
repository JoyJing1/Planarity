"use strict";

const Constants = require('../constants')
    , Util = require("./util");

const Edge = function(options) {
  this.vertex1 = options.vertex1;
  this.vertex2 = options.vertex2;
  this.idx = options.idx;
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
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.vertex1.x, this.vertex1.y);
    ctx.lineTo(this.vertex2.x, this.vertex2.y);
    ctx.stroke();
  }
};

Edge.prototype.slope = function() {

  if (this.vertex1.x === this.vertex2.x) {
    return 100000;
  } else if (this.vertex1.x < this.vertex2.x) {
    return (this.vertex2.y - this.vertex1.y) / (this.vertex2.x - this.vertex1.x);
  } else {
    return (this.vertex1.y - this.vertex2.y) / (this.vertex1.x - this.vertex2.x);
  }

};

Edge.prototype.xIntercept = function() {
  if (this.isVertical()) {
    return this.vertex1.x;
  } else if (this.isHorizontal()) {
    return 1000000;
  } else {
    return -this.yIntercept()/this.slope();
  }
};

Edge.prototype.yIntercept = function() {
  if (this.isVertical()) {
    return 1000000;
  } else if (this.isHorizontal()) {
    return this.vertex1.y;
  } else {
    return this.vertex1.y - (this.slope()*this.vertex1.x);
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
  return (Math.abs(this.vertex1.x - this.vertex2.x) < Constants.EPSILON);
};

Edge.prototype.isHorizontal = function() {
  return (Math.abs(this.vertex1.y - this.vertex2.y) < Constants.EPSILON);
};

Edge.prototype.intersectsAtX = function(edge) {
  return (edge.yIntercept() - this.yIntercept()) / (this.slope() - edge.slope());
};

Edge.prototype.xValue = function(y) {
  return (y - this.yIntercept())/this.slope();
};

Edge.prototype.yValue = function(x) {
  return (this.slope() * x) + this.yIntercept();
};

Edge.prototype.minX = function() {
  return Math.min(this.vertex1.x, this.vertex2.x);
};

Edge.prototype.maxX = function() {
  return Math.max(this.vertex1.x, this.vertex2.x);
};

Edge.prototype.minY = function() {
  return Math.min(this.vertex1.y, this.vertex2.y);
};

Edge.prototype.maxY = function() {
  return Math.max(this.vertex1.y, this.vertex2.y);
};

Edge.prototype.intersectsWith = function(edge) {
  if (this === edge) {
    return false;

  } else if (this.vertex1 === edge.vertex1) {
    let response = false;

    let slope1 = Util.slope(this.vertex1, this.vertex2);
    let slope2 = Util.slope(edge.vertex1, edge.vertex2);

    if (slope1 === slope2) {
      response = true;
    }
    return response;

  } else if (this.vertex1 === edge.vertex2) {
    let response = false;

    let slope1 = Util.slope(this.vertex1, this.vertex2);
    let slope2 = Util.slope(edge.vertex2, edge.vertex1);

    if (slope1 === slope2) {
      response = true;
    }
    return response;

  } else if (this.vertex2 === edge.vertex1) {
    let response = false;

    let slope1 = Util.slope(this.vertex2, this.vertex1);
    let slope2 = Util.slope(edge.vertex1, edge.vertex2);

    if (slope1 === slope2) {
      response = true;
    }
    return response;

  } else if (this.vertex2 === edge.vertex2) {
    let response = false;

    let slope1 = Util.slope(this.vertex2, this.vertex1);
    let slope2 = Util.slope(edge.vertex2, edge.vertex1);

    if (slope1 === slope2) {
      response = true;
    }
    return response;

  } else if (this.isHorizontal()) {
    let response = false;

    if (edge.minY()+1 < this.vertex1.y && this.vertex1.y < edge.maxY()-1) {
      if (edge.isVertical()) {
        response = true;
      } else {
        let xValue = edge.xValue(this.vertex1.y);
        if (this.minX()+1 < xValue && xValue < this.maxX()-1) {
          response = true;
        }
      }
    }
    return response;

  } else if (edge.isHorizontal()) {
    let response = false;
    if (this.minY()+1 < edge.vertex1.y && edge.vertex1.y < this.maxY()-1) {
      if (this.isVertical()) {
        response = true;
      } else {
        let xValue = this.xValue(edge.vertex1.y);
        if (edge.minX()+1 < xValue && xValue < edge.maxX()-1) {
          response = true;
        }
      }
    }
    return response;

  } else if (this.isVertical()) {
    let response = false;
    if (edge.minX()+1 < this.vertex1.x && this.vertex1.x < edge.maxX()-1) {
      if (edge.isHorizontal()) {
        response = true;
      } else {
        let yValue = edge.yValue(this.vertex1.x);
        if (this.minY()+1 < yValue && yValue < this.maxY()-1) {
          response = true;
        }
      }
    }
    return response;

  } else if (edge.isVertical()){
    let response = false;

    if (this.minX()+1 < edge.vertex1.x && edge.vertex1.x < this.maxX()-1) {
      if (this.isHorizontal()) {
        response = true;
      } else {
        let yValue = this.yValue(edge.vertex1.x);
        if (edge.minY()+1 < yValue && yValue < edge.maxY()-1) {
          response = true;
        }
      }
    }
    return response;

  } else if (this.slope() === edge.slope()) {
    return false;

  } else {
    const x = this.intersectsAtX(edge);
    const y = this.yValue(x);

    const xWithinRange = (this.minX()+1 < x && x < this.maxX()-1 && edge.minX()+1 < x && x < edge.maxX()-1);
    const yWithinRange = (this.minY()+1 < y && y < this.maxY()-1 && edge.minY()+1 < y && y < edge.maxY()-1);

    return xWithinRange && yWithinRange;
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
