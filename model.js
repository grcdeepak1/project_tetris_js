var TT = TT || {};

TT.Model = (function() {
  var board;
  var current_block_col;
  var current_block_row;

  function _createBoard() {
    board = new Array(10)
    for(var i = 0; i < board.length; i++) {
      board[i] = new Uint8Array(20);
    }
  }

  function generateBlock() {
    current_block_col = 1;
    current_block_row = 0;
    board[current_block_col][current_block_row] = 1;
  }

  function moveBlock() {
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

  function init() {
    _createBoard();
    generateBlock();
  }

  function tic() {
    if (moveBlock() === false) {
      generateBlock();
    }
  }

  function getBoard() {
    return board;
  }

  return {
    init: init,
    getBoard: getBoard,
    tic: tic
  }
})();

