var TT = TT || {};

TT.Controller = (function() {
  var _gameLoop;
  var _gameLoopTime = 1000;

  var init = function() {
    TT.Model.init();
    TT.View.init();
    _startGameLoop();
  }

  var _startGameLoop = function(){
    _gameLoop = setTimeout(function () {
        TT.View.tic();
        TT.Model.tic();
        _startGameLoop();
    }, _gameLoopTime);
    console.log("settimeout"+_gameLoop);
  }

  var setGameLoopTime = function(time) {
    _gameLoopTime = time;
  }

  var resetGameLoopTime = function() {
    _gameLoopTime = 1000;
  }

  var gameOver = function(){
    console.log("clear timeout"+_gameLoop);
    clearTimeout(_gameLoop);
    alert("Game Over!");
  }

  return {
    init: init,
    gameOver: gameOver,
    setGameLoopTime: setGameLoopTime,
    resetGameLoopTime: resetGameLoopTime
  }

})();


$(document).ready(function(){
  TT.Controller.init();
});
