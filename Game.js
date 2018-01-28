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
    const wouldCreateInvalidState = (boardPosition, PLAYER) => {
        const evalBoard = board.deepCopy();
        evalBoard[boardPosition] = PLAYER;
        return evalState(evalBoard) == STATES.get('INVALID');
    }
    const isValidMove = (boardPosition, PLAYER) => {
        wouldCreateInvalidState(boardPosition, PLAYER) && throwError('MOVE_INVALID_STATE');
        !isBoardPositionInRange(boardPosition) && throwError('BOARD_POSITION_RANGE');
        isBoardPositionTaken(boardPosition) && throwError('BOARD_POSITION_TAKEN');
        return true;
    }

    const makeMove = (boardPosition, PLAYER) => {
        isValidMove(boardPosition, PLAYER) && (board[boardPosition] = PLAYER);
    };

    
    const areBoardIndexesTakenBySamePlayer = (evalBoard, indexArray) =>
        indexArray.map((boardIndex, i) => evalBoard[boardIndex] > 0 && 
            i ? (evalBoard[boardIndex] == evalBoard[indexArray[i-1]]) : true)
        const isWinIndexArray = (indexArray, evalBoard) => 
            areBoardIndexesTakenBySamePlayer(evalBoard, indexArray).every(valueIsTrue);
        const valueIsTrue = val => val === true;  
        const isWinState = evalBoard => 
            POSSIBLE_WIN_INDEXES.map(isWinIndexArray.bind(evalBoard)).some(valueIsTrue);

        const isActiveState = evalBoard => evalBoard.includes(0);

        const isNumberOfMovesFair = ([a,b]) => a-b < 2 && a-b > -2;
        const getMovesCountArray = evalBoard => 
            evalBoard.deepCopy().reduce((accum, val) => 
                val != 0 ? (accum[val-1]++, accum) : accum 
            , [0,0]);
        const isValidState = evalBoard => isNumberOfMovesFair(getMovesCountArray(evalBoard));                           

    const evalState = (evalBoard = board.deepCopy()) => {
        if(!isValidState(evalBoard)) return STATES.get('INVALID');
        else if(isWinState(evalBoard)) return STATES.get('WIN');
        else if(isActiveState(evalBoard)) return STATES.get('ACTIVE');
        else return STATES.get('DRAW');
    }


    

    return {
        getBoard,
        makeMove,
        evalState,
    };
};

module.exports = Game;