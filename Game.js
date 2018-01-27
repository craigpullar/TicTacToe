const { ERRORS, STATES } = require('./Entities');
const emptyBoard = () => [0,0,0,0,0,0,0,0,0];
const Game = function(board = emptyBoard()) {    
    const getBoard = () => board;

    const isBoardPositionInRange = boardPosition => (0 <= boardPosition && 9 > boardPosition);
    const isBoardPositionTaken = boardPosition => board[boardPosition] != 0;
    const throwError = error => { 
        if(ERRORS.has(error)) throw new Error(ERRORS.get(error));
        throw new Error('Invalid error thrown'); 
    }
    const isValidMove = boardPosition => {
        !isBoardPositionInRange(boardPosition) && throwError('BOARD_POSITION_RANGE');
        isBoardPositionTaken(boardPosition) && throwError('BOARD_POSITION_TAKEN');
        return true;
    }

    const makeMove = (boardPosition, PLAYER) => {
        isValidMove(boardPosition) && (board[boardPosition] = PLAYER);
    };
    

    return {
        getBoard,
        makeMove,
    };
};

module.exports = Game;