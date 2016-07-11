const Util = {
  slope (pos1, pos2) {
    return (pos2[1] - pos1[1]) / (pos2[0] - pos1[0]);
  },

  xIntercept (pos, slope) {
    return pos[1] - (slope * pos[0]);
  }

};

module.exports = Util;
