var TT = TT || {};

TT.Controller = (function() {
  var _gameLoop;
  var _defaultGameLoopTime = 300;
  var _gameLoopTime = _defaultGameLoopTime;
  var score = 0;

  var init = function() {
    TT.Model.init();
    TT.View.init();
    _startGameLoop();
  }

  var _startGameLoop = function(){
    _gameLoop = setTimeout(function () {
        TT.View.tic();
        TT.Model.tic();
        if (!gameOver()) _startGameLoop();
    }, _gameLoopTime);
  }

  var setGameLoopTime = function(time) {
    _gameLoopTime = time;
  }

  var resetGameLoopTime = function() {
    _gameLoopTime = _defaultGameLoopTime;
  }

  var gameOver = function() {
    if (TT.Model.isGameOver()) {
      stopGameLoop();
      alert("GameOver");
      return true;
    }
  }

  var newGame = function() {
    clearTimeout(_gameLoop);
    resetScore();
    init();
  }

  var incrScore = function() {
    score += 10;
    TT.View.renderScore(score);
  }

  var resetScore = function() {
    score = 0;
    TT.View.renderScore(score);
  }

  return {
    init: init,
    setGameLoopTime: setGameLoopTime,
    resetGameLoopTime: resetGameLoopTime,
    incrScore: incrScore,
    newGame: newGame,
  }

})();


$(document).ready(function(){
  TT.Controller.init();
});
