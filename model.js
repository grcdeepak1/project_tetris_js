var TT = TT || {};

TT.Model = (function() {
  var board;
  var current_block_col;
  var current_block_row;
  var isGameOver = false;

  var _createBoard = function() {
    board = new Array(10)
    for(var i = 0; i < board.length; i++) {
      board[i] = new Uint8Array(20);
    }
  }

  var generateBlock = function() {
    current_block_col = 1;
    current_block_row = 0;
    if (board[current_block_col][current_block_row] === 1) {
      TT.Controller.gameOver();
    } else {
      board[current_block_col][current_block_row] = 1;
    }
  }

  var moveBlock = function() {
    board[current_block_col][current_block_row] = 0;
    current_block_row += 1;
    if (board[current_block_col][current_block_row] === 1 || current_block_row === 20) {
      TT.View.removeCanClear(current_block_col, current_block_row - 1);
      board[current_block_col][current_block_row - 1] = 1;
      return false;
    } else {
      board[current_block_col][current_block_row] = 1;
      return true;
    }
  }

  var init = function() {
    _createBoard();
    generateBlock();
  }

  var tic = function() {
    if (moveBlock() === false) {
        generateBlock();
    }
  }

  var getBoard = function() {
    return board;
  }

  return {
    init: init,
    getBoard: getBoard,
    tic: tic
  }
})();

