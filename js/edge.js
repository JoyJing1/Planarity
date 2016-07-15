"use strict";

const Constants = require('../constants')
    , Util = require("./util");

const Edge = function(options) {
  this.vertex1 = options.vertex1;
  this.vertex2 = options.vertex2;
};

Edge.prototype.draw = function(ctx, edges) {
  // console.log(this);
  // debugger;
  if (this.currentlyIntersecting(edges)) {
    // console.log(`FINAL: TRUE`);
    ctx.strokeStyle = Constants.LINE_INTERSECTING;
    ctx.shadowColor = Constants.LINE_INTERSECTING;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.vertex1.x, this.vertex1.y);
    ctx.lineTo(this.vertex2.x, this.vertex2.y);
    ctx.stroke();

  } else {
    // console.log(`FINAL: FALSE`);
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
    // return Util.xIntercept(this.vertex1, this.slope());
    console.log(`xIntercept: ${-this.yIntercept()/this.slope()}`);
    return -this.yIntercept()/this.slope();
  }
};

Edge.prototype.yIntercept = function() {
  return this.vertex1.y - this.slope()*this.vertex1.x;
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

Edge.prototype.xValue = function(y) {
  return (y - this.xIntercept())/this.slope();
};

Edge.prototype.yValue = function(x) {
  return this.slope()*x + this.xIntercept();
};

Edge.prototype.minX = function() {
  return Math.min(this.vertex1.x, this.vertex2.x);
}
Edge.prototype.maxX = function() {
  return Math.max(this.vertex1.x, this.vertex2.x);
}
Edge.prototype.minY = function() {
  return Math.min(this.vertex1.y, this.vertex2.y);
}
Edge.prototype.maxY = function() {
  return Math.max(this.vertex1.y, this.vertex2.y);
}


Edge.prototype.intersectsWith = function(edge) {
  // debugger;
  // let response = false;
  if (this === edge) {
    return false;
  } else if (this.vertex1 === edge.vertex1) {
    // console.log("this.vertex1 === edge.vertex1");
    let response = false;
    let slope1 = Util.slope(this.vertex1, this.vertex2);
    let slope2 = Util.slope(edge.vertex1, edge.vertex2);
    // if (Math.abs(slope1, slope2) < Constants.EPSILON) {
    if (slope1 === slope2) {
      // console.log("true line 73");
      response = true;
      console.log("line 105 - true");
      console.log(slope1);
      console.log(slope2);
    // } else {
    //   return false
    }
    // console.log(response);
    return response;

  } else if (this.vertex1 === edge.vertex2) {
    // console.log("this.vertex1 === edge.vertex2");
    let response = false;
    let slope1 = Util.slope(this.vertex1, this.vertex2);
    let slope2 = Util.slope(edge.vertex2, edge.vertex1);
    // if (Math.abs(slope1, slope2) < Constants.EPSILON) {
    if (slope1 === slope2) {
      response = true;
      console.log("line 122 - true");
      console.log(slope1);
      console.log(slope2);
      // console.log("true line 87");
    // } else {
    //   return false
    }
    // console.log(response);
    return response;

  } else if (this.vertex2 === edge.vertex1) {
    // console.log("this.vertex2 === edge.vertex1");
    let response = false;
    let slope1 = Util.slope(this.vertex2, this.vertex1);
    let slope2 = Util.slope(edge.vertex1, edge.vertex2);
    // if (Math.abs(slope1, slope2) < Constants.EPSILON) {
    if (slope1 === slope2) {
      console.log("line 139 - true");
      console.log(slope1);
      console.log(slope2);
      response = true;
      // console.log("true line 100");
    // } else {
    //   return false
    }
    // console.log(response);
    return response;

  } else if (this.vertex2 === edge.vertex2) {
    // console.log("this.vertex2 === edge.vertex2");
    let response = false;
    let slope1 = Util.slope(this.vertex2, this.vertex1);
    let slope2 = Util.slope(edge.vertex2, edge.vertex1);
    // if (Math.abs(slope1, slope2) < Constants.EPSILON) {
    if (slope1 === slope2) {
      response = true;
      console.log("line 158 - true");
      console.log(slope1);
      console.log(slope2);
      // console.log("true line 113");
    // } else {
    //   return false
    }
    // console.log(response);
    return response;

  } else if (this.isHorizontal()) {
    let response = false;
    // check if my y is within edgeY's range

    // check if the value of x at that y for edge is within myXRange
    if (edge.minY()+1 < this.vertex1.y && this.vertex1.y < edge.maxY()-1) {
      let xValue = edge.xValue(this.vertex1.y);
      if (this.minX()+1 < xValue && xValue < this.maxX()-1) {
        response = true;
      }
    }
    return response;

  } else if (edge.isHorizontal()) {
    let response = false;
    if (this.minY()+1 < edge.vertex1.y && edge.vertex1.y < this.maxY()-1) {
      let xValue = this.xValue(edge.vertex1.y);
      if (edge.minX()+1 < xValue && xValue < edge.maxX()-1) {
        response = true;
      }
    }
    return response;

  } else if (this.isVertical()) {
    return (edge.minX()+1 < this.vertex1.x && this.vertex1.x < edge.maxX()-1);

  } else if (edge.isVertical()){
    return (this.minX()+1 < edge.vertex1.x && edge.vertex1.x < this.maxX()-1);

  } else {
    let x = this.intersectsAtX(edge);
    let y = this.yValue(x);


    let xWithinRange = (this.minX() < x && x < this.maxX() && edge.minX() < x && x < edge.maxX())
    let yWithinRange = (this.minY() < y && y < this.maxY() && edge.minY() < y && y < edge.maxY())

    // console.log()
    if (xWithinRange && yWithinRange) {
      console.log("---------------------------------------------");
      console.log(this);
      console.log(edge);
      console.log(`xRange1: ${this.minX()} - ${this.maxX()}`);
      console.log(`xRange2: ${edge.minX()} - ${edge.maxX()}`);
      console.log(`yRange1: ${this.minY()} - ${this.maxY()}`);
      console.log(`yRange2: ${edge.minY()} - ${edge.maxY()}`);
      console.log(`(${x}, ${y})`);
    }
    return xWithinRange && yWithinRange;
    // const firstMin = Math.min(this.vertex1.x, this.vertex2.x) + 1;
    // const firstMax = Math.max(this.vertex1.x, this.vertex2.x) - 1;
    //
    // const secondMin = Math.min(edge.vertex1.x, edge.vertex2.x) + 1;
    // const secondMax = Math.max(edge.vertex1.x, edge.vertex2.x) - 1;
    //
    // const onFirst = (firstMin+1 < x && x < firstMax-1);
    // const onSecond = (secondMin+1 < x && x < secondMax-1);
    // // console.log("line 159");
    // // console.log(onFirst && onSecond && !this.shareVertex(edge));
    // return (onFirst && onSecond && !this.shareVertex(edge));

    // Check whether the x would be in between both
    // check whether the y would be in between both





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
