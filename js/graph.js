"use strict";

const Edge = require("./edge")
    , Util = require("./util")
    , Vertex = require("./vertex");

const Graph = {

  pairIndex(n) {
    let pairIndex = {};

    let vertexIdx = 0;
    for (let i = 0; i <= n; i++) {
      for (let j = i+1; j<n; j++) {
        pairIndex[`${i},${j}`] = vertexIdx;
        vertexIdx++;
      }
    }

    return pairIndex;
  },

  generateLines(n) {
    let lines = [];
    let slopes = [];

    while (lines.length < n) {
      let v1 = new Vertex( { x: Math.random(), y: Math.random() });
      let v2 = new Vertex( { x: Math.random(), y: Math.random() });

      let slope = Util.slope(v1, v2);
      // let inverseSlope = Util.slope(v2, v1);
      if (!slopes.includes(slope)) {
        let line = new Edge({ vertex1: v1, vertex2: v2, idx: lines.length});
        lines.push(line);
      }
    }
    return lines;
  },

  generateEdges(level) {
    const n = level+4;

    // Build pairIndex hash from { [pair]: indexOfVertex }
    let pairIndex = this.pairIndex(n);

    // Generate n * (n-1)/2 random lines of differing slope
    const lines = this.generateLines(n);

    // For each line, find the intersection points
    // of that line with all other lines
    let edges = [];
    lines.forEach( (line1, i1) => {
      let intersections = [];

      lines.forEach( (line2, i2) => {
        if (i1 !== i2) {
          let intersection = line1.intersectsAtX(line2);
          intersections.push( { x: intersection, lineIdx: i2 } );
        }

      });

      // Order lines by intersection point's X coord
      intersections.sort( (intersect1, intersect2) => {
        return intersect1.x - intersect2.x;
      });

      // For each pair of neighboring intersections
      // create a new edge between them
      for (let i = 0; i < intersections.length-1; i++) {
        let l1 = intersections[i];
        let l2 = intersections[i+1];

        let indices1 = [i1, l1.lineIdx];
        let indices2 = [i1, l2.lineIdx];

        indices1.sort( (a, b) => a-b  );
        indices2.sort( (a, b) => a-b  );

        let v1 = pairIndex[indices1];
        let v2 = pairIndex[indices2];

        edges.push([v1, v2]);
      }

    });

    return edges;
  }

};

module.exports = Graph;
