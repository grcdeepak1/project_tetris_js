var TT = TT || {};

TT.View = (function() {

  // Private Methods
  var _render = function() {
     $.each(TT.Model.getBoard(), function(i, row) {
       $.each(row, function(j, col) {
        _renderBlock(i, j);
       })
     })
  }

  var _renderBlock = function(i, j) {
    if (TT.Model.getBoard()[i][j] === 1) {
      $('#c_'+i+'_'+j).addClass('block');
    }

  }

  var _resetBoard = function() {
    $('.cell.canClear').removeClass('block')
  }

  var _createCells = function() {
    $('#div_main').html("");
    for (var r=0 ; r<20 ; r++) {
      for (var c=0; c<10 ; c++) {
        $('#div_main').append('<div class="cell canClear" id=c_'+r+'_'+c+'></div>');
      }
    }
  }

  var _dirctionKeyListener = function() {
    $(document).keydown(function(e){
      if (e.keyCode == 37) {
         TT.Model.moveBlockLeft();
      } else if (e.keyCode == 39) {
         TT.Model.moveBlockRight();
      } else if (e.keyCode == 40) {
         TT.Model.moveBlockDown();
      }
    });
  }

  // Public Methods
  var removeCanClear = function(i, j) {
    $('#c_'+i+'_'+j).removeClass('canClear');
  }

  var tic = function() {
    _resetBoard();
    _render();
  }

  var init = function() {
    _createCells();
    _dirctionKeyListener();
  }

  return {
    init: init,
    tic: tic,
    removeCanClear: removeCanClear
  }
})();