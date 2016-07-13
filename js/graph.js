const Edge = require("./edge");
const Vertex = require("./vertex");
const Util = require("./util");

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
      if (!slopes.includes(slope)) {
        let line = new Edge({ vertex1: v1, vertex2: v2});
        // lines.push({v1: v1, v2: v2, slope: slope});
        lines.push(line);
      }
    }
    // Check that this is generating liens correctly
    return lines;
  },

  generateEdges(level) {
    const n = level+3;

    // Build pairIndex hash
    let pairIndex = this.pairIndex(n);

    // Generate n non-parallel lines
    const lines = this.generateLines(n);

    // For each line, order the other lines
    // by the location of their intersections
    // with the current line

    let edges = [];
    lines.forEach( (line1, i1) => {
      let intersections = [];
      // let lineHash = {};

      lines.forEach( (line2, i2) => {
        if (i1 !== i2) {
          let intersection = line1.intersectsAtX(line2);
          // Not sure if this will key to "intersection" or value of intersection
          intersections.push( { x: intersection, lineIdx: i2 } );
          // lineHash[intersection] = line2;
        }

      });

      intersections.sort( (intersect1, intersect2) => {
        return intersect1.x - intersect2.x;
      });

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
