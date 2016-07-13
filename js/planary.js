const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  console.log("DOMContentLoaded");

  const canvasEl = document.getElementsByTagName("canvas")[0];

  if (window.innerHeight < window.innerWidth) {
    Game.DIM_X = window.innerHeight * 0.8;
    Game.DIM_Y = window.innerHeight * 0.8;
  } else {
    Game.DIM_X = window.innerWidth;
    Game.DIM_Y = window.innerWidth;
  }


  // Game.DIM_X = Math.min(window.innerWidth, window.innerHeight);
  // Game.DIM_Y = Math.min(window.innerWidth, window.innerHeight);

  // debugger;


  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  canvasEl.left = Game.DIM_X/4;

  // debugger;
  const ctx = canvasEl.getContext("2d");
  const rootEl = $('.planary-root');

  console.log('created ctx & game in planary.js');
  console.log(ctx);

  new GameView(ctx, rootEl, 0);
});
