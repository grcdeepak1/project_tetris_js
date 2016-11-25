var TT = TT || {};

TT.View = (function() {

  function render() {
     $.each(TT.Model.getBoard(), function(i, col) {
       $.each(col, function(j, row) {
        renderBlock(i,j);
       })
     })
  }

  function renderBlock(i, j) {
    if (TT.Model.getBoard()[i][j] === 1) {
      $('#c_'+i+'_'+j).addClass('block');
    }

  }

  function removeCanClear(i, j) {
    $('#c_'+i+'_'+j).removeClass('canClear');
  }

  function resetBoard() {
    $('.cell.canClear').removeClass('block')
  }

  function _createCells() {
    $('#div_main').html("");
    for (var r=0 ; r<20 ; r++) {
      for (var c=0; c<10 ; c++) {
        $('#div_main').append('<div class="cell canClear" id=c_'+c+'_'+r+'></div>');
      }
    }
  }

  function tic() {
    resetBoard();
    render();
  }

  function init() {
    _createCells();
  }

  return {
    init: init,
    tic: tic,
    removeCanClear: removeCanClear
  }
})();