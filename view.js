var TT = TT || {};

TT.View = (function() {

  var render = function() {
     $.each(TT.Model.getBoard(), function(i, col) {
       $.each(col, function(j, row) {
        renderBlock(i,j);
       })
     })
  }

  var renderBlock = function(i, j) {
    if (TT.Model.getBoard()[i][j] === 1) {
      $('#c_'+i+'_'+j).addClass('block');
    }

  }

  var removeCanClear = function(i, j) {
    $('#c_'+i+'_'+j).removeClass('canClear');
  }

  var resetBoard = function() {
    $('.cell.canClear').removeClass('block')
  }

  var _createCells = function() {
    $('#div_main').html("");
    for (var r=0 ; r<20 ; r++) {
      for (var c=0; c<10 ; c++) {
        $('#div_main').append('<div class="cell canClear" id=c_'+c+'_'+r+'></div>');
      }
    }
  }

  var tic = function() {
    resetBoard();
    render();
  }

  var init = function() {
    _createCells();
  }

  return {
    init: init,
    tic: tic,
    removeCanClear: removeCanClear
  }
})();