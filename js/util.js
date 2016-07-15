"use strict";

const Util = {
  slope(vertex1, vertex2) {
    return (vertex2.y - vertex1.y) / (vertex2.x - vertex1.x);
  },

  distFromMouse(vertex, currentMousePos) {
    const vertexRadius = 12.5;

    return Math.sqrt(
      Math.pow(vertex.x + vertexRadius - currentMousePos.x, 2) + Math.pow(vertex.y + vertexRadius - currentMousePos.y, 2)
    );
  }

};

module.exports = Util;
