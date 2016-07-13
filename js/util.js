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

  angle(vertex1, vertex2) {
    const diffY = vertex2.y - vertex1.y;
    const diffX = vertex2.x - vertex1.x;
    const radians = Math.atan( diffY / diffX );
    return radians;
    // return radians / 2 / Math.PI * 360;
  },

  distFromMouse(vertex, event) {
    const vertexRadius = 12.5;

    return Math.sqrt(
      Math.pow(vertex.x + vertexRadius - event.pageX, 2) + Math.pow(vertex.y + vertexRadius - event.pageY, 2)
    );
  },

  // readTextFile(file) {
  //   var rawFile = new XMLHttpRequest();
  //   rawFile.open("GET", file, false);
  //   rawFile.onreadystatechange = function () {
  //     if(rawFile.readyState === 4) {
  //       if(rawFile.status === 200 || rawFile.status === 0) {
  //         const allText = rawFile.responseText;
  //
  //         // Check allText - pulling file contents?
  //         // debugger;
  //       }
  //     }
  //   };
  //   rawFile.send(null);
  // }


};

module.exports = Util;
