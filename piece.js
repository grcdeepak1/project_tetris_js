var TT = TT || {}

TT.PieceModule = (function(Model) {
  // Private Variables
  var MAX_ROWS = 24;
  var MAX_COLS = 10;
  //Constructor
  function Piece(type){
    switch(type) {
      case "single" :
      default:
        this.coords = [[0, 1]];
        break;
    }
  }

  Piece.prototype.move = function() {
    var op = this.coords.some(function(coord) {
      if (coord[0] === MAX_ROWS - 1 || TT.Model.getBoard()[coord[0]+1][coord[1]] === 2) {
        TT.View.removeCanClear(coord[0]-1, coord[1]);
        return false;
      } else {
        coord[0] += 1;
        return true;
      }
    });
    return op;
  }

  Piece.prototype.moveLeft = function(board) {
    this.coords.forEach(function(coord) {
      board[coord[0]][coord[1]] = 0;
      if ((coord[1] -= 1) < 0) coord[1] = 0;
      board[coord[0]][coord[1]] = 1;
    });
  }

  Piece.prototype.moveRight = function(board) {
    this.coords.forEach(function(coord) {
      board[coord[0]][coord[1]] = 0;
      if ((coord[1] += 1) > MAX_COLS-1) coord[1] = MAX_COLS-1;
      board[coord[0]][coord[1]] = 1;
    });
  }

  Piece.prototype.coords = function() {
    return this.coords;
  }

  //Interface
  return {
    Piece: Piece,
  };

})(TT.Model);