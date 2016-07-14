const Util = {
  slope(vertex1, vertex2) {
    return (vertex2.y - vertex1.y) / (vertex2.x - vertex1.x);
  },

  xIntercept(vertex, slope) {
    return vertex.y - (slope * vertex.x);
  },

  dist(vertex1, vertex2) {
    return Math.sqrt(
      Math.pow(vertex1.x - vertex2.x, 2)
        + Math.pow(vertex1.y - vertex2.y, 2)
    );
  },

  distFromMouse(vertex, currentMousePos) {
    const vertexRadius = 12.5;

    return Math.sqrt(
      Math.pow(vertex.x + vertexRadius - currentMousePos.x, 2) + Math.pow(vertex.y + vertexRadius - currentMousePos.y, 2)
    );
  }

};

module.exports = Util;
