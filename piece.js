var TT = TT || {}

TT.PieceModule = (function(Model) {
  // Private Variables
  // var _pieceTypes = ["single", "square", "l-shape-left", "l-shape-right", "4-bar"]
  var MAX_ROWS = 24;
  var MAX_COLS = 10;
  //Constructor
  function Piece(type){

    var i = TT.Model.getRandomInt(0, MAX_COLS-4);
    switch(type) {
      case "square":
        this.coords = [[0, 1], [0, 2], [1, 1], [1, 2]];
        break;
      case "4-bar":
        this.coords = [[0, 1], [0, 2], [0, 3], [0, 4]];
        break;
      case "l-shape-left":
        this.coords = [[0, 1], [1, 1], [1, 2], [1, 3]];
        break;
      case "l-shape-right":
        this.coords = [[1, 1], [1, 2], [1, 3], [0, 3]];
        break;
      case "single":
      default:
        this.coords = [[0, 1]];
        break;
    }
    this.coords.forEach( function(coord) {
      coord[1] += i;
    })
  }

  Piece.prototype.move = function() {
    if (this.hitObstacle("down")) {
      return false;
    } else {
      this.coords.forEach(function(coord) {
        coord[0] += 1;
      })
      return true;
    }
  }

  Piece.prototype.hitObstacle = function(dir) {
    var ret = false;
    if (dir === "down") {
      this.coords.forEach(function(coord) {
        if (coord[0] === MAX_ROWS - 1 || TT.Model.getBoard()[coord[0]+1][coord[1]] === 2) {
          ret = true;
        }
      })
    } else if (dir === "left") {
      this.coords.forEach(function(coord) {
        if (coord[1] === 0 || TT.Model.getBoard()[coord[0]][coord[1]-1] === 2) {
          ret = true;
        }
      })
    } else if (dir === "right") {
        this.coords.forEach(function(coord) {
        if (coord[1] === MAX_COLS - 1 || TT.Model.getBoard()[coord[0]][coord[1]+1] === 2) {
          ret = true;
        }
      })
    }
    return ret;
  }

  Piece.prototype.moveLeft = function(board) {
    if (this.hitObstacle("left") !== true) {
      TT.Model.clearBoard();
      this.coords.forEach(function(coord) {
        if ((coord[1] -= 1) < 0) coord[1] = 0;
        board[coord[0]][coord[1]] = 1;
      });
    }
  }

  Piece.prototype.moveRight = function(board) {
    if (this.hitObstacle("right") !== true) {
      TT.Model.clearBoard();
      this.coords.forEach(function(coord) {
        if ((coord[1] += 1) > MAX_COLS-1) coord[1] = MAX_COLS-1;
        board[coord[0]][coord[1]] = 1;
      });
    }
  }

  Piece.prototype.coords = function() {
    return this.coords;
  }

  //Interface
  return {
    Piece: Piece,
  };

})(TT.Model);