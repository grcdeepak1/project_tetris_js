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
    if (TT.Model.getBoard()[i][j] === 1 || TT.Model.getBoard()[i][j] === 2) {
      $($($('.row')[i]).children()[j]).addClass("block");
    }

  }

  var _resetBoard = function() {
    $('.cell').removeClass('block')
  }

  var resetRow = function(row) {
    $($('.row')[row]).remove();
    var newRow = $($('.row')[5]).clone();
    newRow.insertAfter($($('.row')[5]))
  }

  var _createCells = function() {
    $('#div_main').html("");
    for (var r=0 ; r<MAX_ROWS ; r++) {
      $('#div_main').append('<div class="row">');
      for (var c=0; c<MAX_COLS ; c++) {
        if (r < 5) {
          $($('.row')[r]).append('<div class="cell hidden"></div>');
        } else {
          $($('.row')[r]).append('<div class="cell"></div>');
        }
      }
    }
  }

  var _dirctionKeyListener = function() {
    $(document).keydown(function(e){
      if (e.keyCode == 37) {
         TT.Model.movePieceLeft();
      } else if (e.keyCode == 39) {
         TT.Model.movePieceRight();
      } else if (e.keyCode == 40) {
         TT.Model.movePieceDown();
      }
    });
  }

  // Public Methods
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
    resetRow: resetRow,
  }
})();