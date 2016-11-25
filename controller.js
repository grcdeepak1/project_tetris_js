var TT = TT || {};

TT.Controller = (function() {
  var _gameLoop;

  var init = function() {
    TT.Model.init();
    TT.View.init();
    _startGame();
  }

  var _startGame = function(){
    _gameLoop = setInterval( function(){
      TT.View.tic();
      TT.Model.tic();
    }, 10);
  }

  var gameOver = function(){
    clearInterval(_gameLoop);
    alert("Game Over!");
  }

  return {
    init: init,
    gameOver: gameOver,
  }

})();


$(document).ready(function(){
  TT.Controller.init();
});
