const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const rootEl = $('.planary-root');
  const game = new Game(0);

  console.log('created ctx & game in planary.js');
  console.log(ctx);
  console.log(game);
  // debugger;
  new GameView(game, ctx, rootEl);
});

// jsPlumb.bind("ready", function() {
// // your jsPlumb related init code goes here
//   console.log("inside jsPlum.bind callback");
//
// });

// jsPlumb.ready(function() {
// // your jsPlumb related init code goes here
//   console.log("inside jsPlum.ready callback");
//
// });
