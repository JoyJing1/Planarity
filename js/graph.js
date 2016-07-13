const Edge = require("./edge");
const Vertex = require("./vertex");
const Util = require("./util");

const Graph = {

  pairIndex(n) {
    let pairIndex = {};

    let k = 0;
    for (let i = 0; i <= n; i++) {
      for (let j = i+1; j<n; j++) {
        pairIndex[[i, j]] = k;
        k++;
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

  calculateIntersections(lines) {

    for (let i = 0; i <= lines.length; i++) {
      for (let j = i+1; j < lines.length; j++) {
        const line1 = lines[i];
        const line2 = lines[j];
        const intersection = line1.intersectsAtX(line2);



      }
    }
  },

  generateGraph(level) {
    const n = level+3;

    // Build pairIndex hash
    let pairIndex = this.pairIndex(n);

    // Generate n non-parallel lines
    const lines = this.generateLines(n);

    // Calculate intersections of every pair of lines
    // Associate each intersection with its two lines



    let vertices = [];

    for(let i = 0; i < n; i++) {
      vertices.push(i);
    }


  }


};

module.exports = Graph;
