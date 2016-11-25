var TT = TT || {};

TT.Model = (function() {
  // Private Variables
  var _board;
  var _col;
  var _row;

  // Private Methods
  var _createBoard = function() {
    _board = new Array(20)
    for(var i = 0; i < _board.length; i++) {
      _board[i] = new Uint8Array(10);
    }
  }

  var _generateBlock = function() {
    _col = 1;
    _row = 0;
    if (_board[_row][_col] === 1) {
      TT.Controller.gameOver();
    } else {
      _board[_row][_col] = 1;
    }
  }

  var _moveBlock = function() {
    _board[_row][_col] = 0;
    _row += 1;
    if (_row === 20 || _board[_row][_col] === 1 ) {
      TT.View.removeCanClear(_row-1, _col);
      _board[_row - 1][_col] = 1;
      isRowComplete();
      return false;
    } else {
      _board[_row][_col] = 1;
      return true;
    }
  }

  var isRowComplete = function() {

  }


  var moveBlockDown = function() {
    TT.Controller.setGameLoopTime(10);
  }

  var moveBlockLeft = function() {
    _board[_row][_col] = 0;
    if ((_col -= 1) < 0) _col = 0;
    _board[_row][_col] = 1;
  }

  var moveBlockRight = function() {
    _board[_row][_col] = 0;
    if ((_col += 1) > 9) _col = 9;
    _board[_row][_col] = 1;
  }

  // Public Methods
  var init = function() {
    _createBoard();
    _generateBlock();
  }

  var tic = function() {
    if (_moveBlock() === false) {
        TT.Controller.resetGameLoopTime();
        _generateBlock();
    }
  }

  var getBoard = function() {
    return _board;
  }

  return {
    init: init,
    getBoard: getBoard,
    tic: tic,
    moveBlockLeft: moveBlockLeft,
    moveBlockRight: moveBlockRight,
    moveBlockDown: moveBlockDown
  }
})();

