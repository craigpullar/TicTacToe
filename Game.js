const { ERRORS, STATES, POSSIBLE_WIN_INDEXES } = require('./Entities');
const emptyBoard = () => [0,0,0,0,0,0,0,0,0];
const Game = (board = emptyBoard()) => {    
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

    const areBoardIndexesTakenBySamePlayer = indexArray =>
        indexArray.map((boardIndex, i) => board[boardIndex] > 0 && 
            i ? (board[boardIndex] == board[indexArray[i-1]]) : true)


    const isWinIndexArray = indexArray => 
        areBoardIndexesTakenBySamePlayer(indexArray).every(valueIsTrue);

    const valueIsTrue = val => val === true;
    
    const isWinState = () => POSSIBLE_WIN_INDEXES.map(isWinIndexArray).some(valueIsTrue);              
    
    const isDrawState = () => !isWinState();

    const evalState = () => {
        if(isWinState()) return STATES.get('WIN');
        if(isDrawState()) return STATES.get('DRAW');
    }


    

    return {
        getBoard,
        makeMove,
        evalState,
    };
};

module.exports = Game;