var TT = TT || {};

TT.View = (function() {
  var MAX_ROWS = 24;
  var MAX_COLS = 10;
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
      $($($('.row')[i]).children()[j]).addClass("block");
    }

  }

  var _resetBoard = function() {
    $('.cell.canClear').removeClass('block')
  }

  var resetRow = function(row) {
    $($('.row')[row]).remove();
    $('#div_main').prepend($($('.row')[0]).clone());
  }

  var _createCells = function() {
    $('#div_main').html("");
    for (var r=0 ; r<MAX_ROWS ; r++) {
      $('#div_main').append('<div class="row">');
      for (var c=0; c<MAX_COLS ; c++) {
        if (r < 5) {
          $($('.row')[r]).append('<div class="cell canClear hidden"></div>');
        } else {
          $($('.row')[r]).append('<div class="cell canClear"></div>');
        }
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
    $($($('.row')[i]).children()[j]).removeClass("canClear");
  }

  var tic = function() {
    _resetBoard();
    _render();
  }

  var init = function() {
    _createCells();
    _dirctionKeyListener();
  }

  var isGameOver = function() {
    if ($($('.row')[0]).find('.canClear').length < MAX_COLS) {
      return true;
    } else {
      return false;
    }
  }

  return {
    init: init,
    tic: tic,
    removeCanClear: removeCanClear,
    resetRow: resetRow,
    isGameOver: isGameOver
  }
})();