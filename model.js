var TT = TT || {};

TT.Model = (function() {
  // Private Variables
  var MAX_ROWS = 24;
  var MAX_COLS = 10;
  var _board;
  var _piece;
  var _col;
  var _row;

  // Private Methods
  var _createBoard = function() {
    _board = new Array(MAX_ROWS)
    for(var i = 0; i < _board.length; i++) {
      _board[i] = new Uint8Array(MAX_COLS);
    }
  }

  var _clearBoard = function() {
    for(var i = 0; i < _board.length; i++) {
      for(var j = 0; j < _board[i].length; j++) {
        if (_board[i][j] === 1) _board[i][j] = 0;
      }
    }
  }

  var _generatePiece = function() {
    _piece = new TT.PieceModule.Piece("single");
    _applyPiece(_board, _piece);
  }

  var _applyPiecePerm = function(_board, _piece) {
    _piece.coords.forEach(function(coord) {
       _board[coord[0]][coord[1]] = 2;
    });
  }

  var _applyPiece = function(_board, _piece) {
    _piece.coords.forEach(function(coord) {
       _board[coord[0]][coord[1]] = 1;
    });
  }

  var _collapseRow = function(row) {
    _board.splice(row, 1);
    _board.splice(0, 0, new Uint8Array(MAX_COLS));
    TT.View.resetRow(row);
  }

  var _isRowComplete = function() {
    for(var r = 0; r < MAX_ROWS; r++) {
      var sum = _board[r].reduce(function(a, b) {return a+b;})
      if (sum === MAX_COLS * 2) {
        _collapseRow(r);
      }
    }
  }

  var movePieceDown = function() {
    TT.Controller.setGameLoopTime(10);
  }

  var movePieceLeft = function() {
    _piece.moveLeft(_board);
  }

  var movePieceRight = function() {
    _piece.moveRight(_board);
  }

  // Public Methods
  var init = function() {
    _createBoard();
    _generatePiece();
  }

  var tic = function() {
    _clearBoard();
    if (_piece.move() === false) {
      _applyPiecePerm(_board, _piece);
      _isRowComplete();
      TT.Controller.resetGameLoopTime();
      _generatePiece();
    }
    _applyPiece(_board, _piece);
  }

  var getBoard = function() {
    return _board;
  }

  return {
    init: init,
    getBoard: getBoard,
    tic: tic,
    movePieceLeft: movePieceLeft,
    movePieceRight: movePieceRight,
    movePieceDown: movePieceDown
  }
})();

