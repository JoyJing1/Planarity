const Util = require("./util");

const GameView = function (game, ctx, root) {
  this.ctx = ctx;
  this.game = game;
  this.root = root;

  this.render();
  // Add click handlers
};

GameView.prototype.render = function() {
  // this.game.edges.forEach( edge => {
  //   edge.draw(this.ctx);
  // });

  this.game.vertices.forEach( (vertex, i) => {
    // vertex.draw(this.ctx);
    const $vertex = $("<div>")
                    .text(`${i}: (${vertex.x}, ${vertex.y})`)
                    .addClass("vertex")
                    .attr('id', `v${i}`)
                    .draggable()
                    .css({ 'top': vertex.y-12, 'left': vertex.x-12 })
                    .attr("data-pos", [vertex.x, vertex.y]);
    this.root.append($vertex);
  });

  this.game.edges.forEach( (edge, i) => {
    // let x1 = edge.vertex1;
    // let y1 = edge.vertex2;

    let length = Util.dist(edge.vertex1, edge.vertex2);
    let angle = Util.angle(edge.vertex1, edge.vertex2);
    console.log(`edge ${i}`);
    console.log(`v1 = ${edge.vertex1.x}, ${edge.vertex1.y}`);
    console.log(`v2 = ${edge.vertex2.x}, ${edge.vertex2.y}`);

    const $div1 = $(`#e${edge.vertex1.index}`);
    const $div2 = $(`#e${edge.vertex2.index}`);

    const $edge = $("<div>");
    edge.draw(this.ctx);
    // debugger;
    // Util.connect($div1, $div2, "red", 3);
    // Util.drawLine($div1, $div2, $edge);
    // debugger;
    // edge.vertex2;
    //
    // Util.connect()

    // Need to calculate minX, minY, diffX, diffY

    // debugger;
    // const $edge = $("<div>")
    //               .attr('id', `e${i}`)
    //               .addClass("edge")
    //               .css({ 'width': `${length}px`})
    //               .css({ 'transform': `rotate(${angle}rad) translateY(${100}px) translateX(${0}px)` });
// edge.vertex1.x - edge.vertex2.x)/2
                  //  translateX(${edge.vertex1.x}) translateY(${edge.vertex1.y})`});

                  // debugger;

    const $myEdge = $(`#e${i}`);
    // $myEdge.css({ 'width': `${length}px` });
// // , `webkit-transform: rotate(${angle}deg)`

    // $edge.addClass("edge");
    this.root.append($edge);

    // edge.draw();
    //
    // const $edge = $(`<line id="e${i}"/>`);
    //
    // const v1 = edge.vertex1.index;
    // const v2 = edge.vertex2.index;
    //
    // const $div1 = $(`.v${v1}`);
    // const $div2 = $(`.v${v2}`);
    //
    // const pos1 = $div1.position();
    // const pos2 = $div2.position();
    //
    // // $(document.createElementNS('http://www.w3.org/2000/svg','line')).attr({
    // //     x1: pos1.left,
    // //     y1: pos1.top,
    // //     x2: pos2.left,
    // //     y2: pos2.top,
    // //     stroke: "black",
    // //     stroke-width: "2"
    // // }).appendTo(this.root);
    //
    // // debugger;
    //
    // $edge.attr('x1',pos1.left)
    //       .attr('x1',pos1.left)
    //       .attr('y1',pos1.top)
    //       .attr('x2',pos2.left)
    //       .attr('y2',pos2.top);
    //       // .attr('style', "stroke:red; stroke-width:10px")
    //
    // const $svg = $(".svg-root");
    // $svg.append($edge);
    // this.root.append($svg);

  });

};

module.exports = GameView;
