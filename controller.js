var TT = TT || {};

TT.Controller = (function() {
  var _gameLoop;
  var _defaultGameLoopTime = 100;
  var _gameLoopTime = _defaultGameLoopTime;

  var init = function() {
    TT.Model.init();
    TT.View.init();
    _startGameLoop();
  }

  var _startGameLoop = function(){
    _gameLoop = setTimeout(function () {
        TT.View.tic();
        TT.Model.tic();
        gameOver();
        _startGameLoop();
    }, _gameLoopTime);
    console.log("set timeout"+_gameLoop);
  }

  var setGameLoopTime = function(time) {
    _gameLoopTime = time;
  }

  var resetGameLoopTime = function() {
    _gameLoopTime = _defaultGameLoopTime;
  }

  var stopGameLoop = function(){
    console.log("clear timeout"+_gameLoop);
    clearTimeout(_gameLoop);
  }

  var gameOver = function() {
    if (TT.View.isGameOver()) {
      stopGameLoop();
      alert("GameOver");
    }
  }

  return {
    init: init,
    setGameLoopTime: setGameLoopTime,
    resetGameLoopTime: resetGameLoopTime,
  }

})();


$(document).ready(function(){
  TT.Controller.init();
});
