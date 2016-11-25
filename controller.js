var TT = TT || {};

TT.Controller = (function() {
  function init() {
    TT.Model.init();
    TT.View.init();
    _startGame();
  }

  function _startGame() {
    gameLoop = setInterval( function(){
      TT.View.tic();
      TT.Model.tic();
    }, 1000);
  }

  return {
    init: init
  }

})();


$(document).ready(function(){
  TT.Controller.init();
});
