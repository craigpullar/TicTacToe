import R from "ramda";
import { ERRORS, STATES, POSSIBLE_WIN_INDEXES } from "../Entities";
import {
  areIndexesTakenForPlayer,
  valueIsTrue,
  stateToString,
  emptyBoard,
  defaultPlayers,
  errorFactory,
  isNumberOfMovesFair
} from "./utils";

const Game = (board = emptyBoard(), PLAYERS = defaultPlayers) => {
  const getBoard = () => [...board];

  const evalState = (evalBoard = board.deepCopy()) => {
    const isWinIndexArray = indexArray =>
      R.or(
        areIndexesTakenForPlayer({
          indexArray,
          player: PLAYERS[0],
          board: evalBoard
        }),
        areIndexesTakenForPlayer({
          indexArray,
          player: PLAYERS[1],
          board: evalBoard
        })
      );

    const isWinState = () =>
      POSSIBLE_WIN_INDEXES.map(isWinIndexArray).some(valueIsTrue);

    const isActiveState = () => R.includes(0, evalBoard);

    // TODO: Refactor this reduce
    const getMovesCountArray = () =>
      R.reduce(
        (accumulator, value) =>
          !R.equals(value, 0)
            ? (accumulator[value - 1]++, accumulator)
            : accumulator,
        [0, 0],
        evalBoard.deepCopy()
      );

    const isValidState = () => isNumberOfMovesFair(...getMovesCountArray());

    if (!isValidState()) return STATES.get("INVALID");
    if (isWinState()) return STATES.get("WIN");
    if (isActiveState()) return STATES.get("ACTIVE");
    return STATES.get("DRAW");
  };

  const isValidMove = ({
    boardPosition,
    PLAYER = getCurrentPlayer(),
    board = getBoard()
  }) => {
    const gameOver = R.includes(evalState(), [
      STATES.get("WIN"),
      STATES.get("DRAW")
    ]);
    const isBoardPositionInRange = () =>
      R.includes(boardPosition, R.range(0, 9));
    const isBoardPositionTaken = () => !R.equals(board[boardPosition], 0);
    const wouldCreateInvalidState = () => !R.equals(PLAYER, getCurrentPlayer());

    gameOver && errorFactory("GAME_OVER");
    wouldCreateInvalidState() && errorFactory("MOVE_INVALID_STATE");
    !isBoardPositionInRange() && errorFactory("BOARD_POSITION_RANGE");
    isBoardPositionTaken() && errorFactory("BOARD_POSITION_TAKEN");
    return true;
  };

  //TODO: Refactor function
  const makeMove = (boardPosition, PLAYER = getCurrentPlayer()) => {
    isValidMove({ boardPosition, PLAYER }) && (board[boardPosition] = PLAYER);
    return [...board];
  };

  //TODO: Refactor function
  const getCurrentPlayer = () => {
    const countMoves = (moveCount, boardValue) =>
      boardValue > 0 ? ((moveCount += 1), moveCount) : moveCount;
    const numMoves = board.deepCopy().reduce(countMoves, 0);
    const isEven = numMoves % 2 == 0;
    return isEven ? PLAYERS[0] : PLAYERS[1];
  };

  return {
    getBoard,
    makeMove,
    evalState,
    getCurrentPlayer,
    getPlayers: R.always(PLAYERS),
    isValidMove,
    printState: R.partial(console.log, [stateToString(getBoard())])
  };
};

module.exports = Game;
