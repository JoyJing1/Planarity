const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  console.log("DOMContentLoaded");

  const canvasEl = document.getElementsByTagName("canvas")[0];

  Game.DIM_X = window.innerWidth;
  Game.DIM_Y = window.innerHeight;

  // debugger;


  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;


  // debugger;
  const ctx = canvasEl.getContext("2d");
  const rootEl = $('.planary-root');

  console.log('created ctx & game in planary.js');
  console.log(ctx);

  new GameView(ctx, rootEl, 0);
});
