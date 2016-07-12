const Util = {
  slope (pos1, pos2) {
    return (pos2[1] - pos1[1]) / (pos2[0] - pos1[0]);
  },

  xIntercept (pos, slope) {
    return pos[1] - (slope * pos[0]);
  },

  dist (vertex1, vertex2) {
    return Math.sqrt(
      Math.pow(vertex1.x - vertex2.x, 2) + Math.pow(vertex1.y - vertex2.y, 2)
    );
  },

  angle (vertex1, vertex2) {
    const diffY = vertex2.y - vertex1.y;
    const diffX = vertex2.x - vertex1.x;
    const radians = Math.atan( diffY / diffX );
    return radians;
    // return radians / 2 / Math.PI * 360;
  }

  // getOffset( el ) {
  //     var rect = el.getBoundingClientRect();
  //     return {
  //         left: rect.left + window.pageXOffset,
  //         top: rect.top + window.pageYOffset,
  //         width: rect.width || el.offsetWidth,
  //         height: rect.height || el.offsetHeight
  //     };
  // },
  //
  // connect(div1, div2, color, thickness) { // draw a line connecting elements
  //   var off1 = this.getOffset(div1);
  //   var off2 = this.getOffset(div2);
  //   // bottom right
  //   var x1 = off1.left + off1.width;
  //   var y1 = off1.top + off1.height;
  //   // top right
  //   var x2 = off2.left + off2.width;
  //   var y2 = off2.top;
  //   // distance
  //   var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
  //   // center
  //   var cx = ((x1 + x2) / 2) - (length / 2);
  //   var cy = ((y1 + y2) / 2) - (thickness / 2);
  //   // angle
  //   var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
  //   // make hr
  //   var htmlLine = "<div style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
  //   //
  //   // alert(htmlLine);
  //   document.body.innerHTML += htmlLine;
  // },
  //
  // lineDistance(x, y, x0, y0){
  //     return Math.sqrt((x -= x0) * x + (y -= y0) * y);
  // },
  //
  // drawLine(a, b, line) {
  //   var pointA = $(a).offset();
  //   var pointB = $(b).offset();
  //   var pointAcenterX = $(a).width() / 2;
  //   var pointAcenterY = $(a).height() / 2;
  //   var pointBcenterX = $(b).width() / 2;
  //   var pointBcenterY = $(b).height() / 2;
  //   var angle = Math.atan2(pointB.top - pointA.top, pointB.left - pointA.left) * 180 / Math.PI;
  //   var distance = lineDistance(pointA.left, pointA.top, pointB.left, pointB.top);
  //
  //   // INFO
  //   $('.info .point-a').text('Point-A: Left: ' + pointA.left + ' Top: ' + pointA.top);
  //   $('.info .point-b').text('Point-B: Left: ' + pointB.left + ' Top: ' + pointB.top);
  //   $('.info .angle').text('Angle: ' + angle);
  //   $('.info .distance').text('Distance: ' + distance);
  //
  //   // Set Angle
  //   $(line).css('transform', 'rotate(' + angle + 'deg)');
  //
  //   // Set Width
  //   $(line).css('width', distance + 'px');
  //
  //   // Set Position
  //   $(line).css('position', 'absolute');
  //   if(pointB.left < pointA.left) {
  //     $(line).offset({top: pointA.top + pointAcenterY, left: pointB.left + pointBcenterX});
  //   } else {
  //     $(line).offset({top: pointA.top + pointAcenterY, left: pointA.left + pointAcenterX});
  //   }
  // }



};

module.exports = Util;
