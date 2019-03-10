import { or } from "ramda";
const {
  ERRORS,
  STATES,
  POSSIBLE_WIN_INDEXES,
  PLAYERS
} = require("../Entities");
import { areIndexesTakenForPlayer, valueIsTrue } from "./utils";

const emptyBoard = () => [0, 0, 0, 0, 0, 0, 0, 0, 0];

const defaultPlayers = [PLAYERS.get("RED"), PLAYERS.get("BLUE")];

const Game = (board = emptyBoard(), PLAYERS = defaultPlayers) => {
  const getBoard = () => [...board];

  const isValidMove = ({
    boardPosition,
    PLAYER = getCurrentPlayer(),
    board = getBoard()
  }) => {
    const isBoardPositionInRange = () =>
      0 <= boardPosition && 9 > boardPosition;
    const isBoardPositionTaken = () => board[boardPosition] != 0;
    const wouldCreateInvalidState = () => PLAYER != getCurrentPlayer();

    wouldCreateInvalidState() && errorFactory("MOVE_INVALID_STATE");
    !isBoardPositionInRange() && errorFactory("BOARD_POSITION_RANGE");
    isBoardPositionTaken() && errorFactory("BOARD_POSITION_TAKEN");
    return true;
  };

  const makeMove = (boardPosition, PLAYER = getCurrentPlayer()) => {
    isValidMove({ boardPosition, PLAYER }) && (board[boardPosition] = PLAYER);
    return [...board];
  };

  const errorFactory = error => {
    if (ERRORS.has(error)) throw new Error(ERRORS.get(error));
    throw new Error("Invalid error thrown");
  };

  const evalState = (evalBoard = board.deepCopy()) => {
    const isWinIndexArray = indexArray =>
      or(
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

    const isActiveState = () => evalBoard.includes(0);

    const isNumberOfMovesFair = ([a, b]) => a - b < 2 && a - b > -2;
    const getMovesCountArray = () =>
      evalBoard
        .deepCopy()
        .reduce(
          (accum, val) => (val != 0 ? (accum[val - 1]++, accum) : accum),
          [0, 0]
        );
    const isValidState = () => isNumberOfMovesFair(getMovesCountArray());

    if (!isValidState()) return STATES.get("INVALID");
    else if (isWinState()) return STATES.get("WIN");
    else if (isActiveState()) return STATES.get("ACTIVE");
    else return STATES.get("DRAW");
  };

  const getCurrentPlayer = () => {
    const countMoves = (moveCount, boardValue) =>
      boardValue > 0 ? ((moveCount += 1), moveCount) : moveCount;
    const numMoves = board.deepCopy().reduce(countMoves, 0);
    const isEven = numMoves % 2 == 0;
    return isEven ? PLAYERS[0] : PLAYERS[1];
  };

  const getPlayers = () => PLAYERS;

  return {
    getBoard,
    makeMove,
    evalState,
    getCurrentPlayer,
    getPlayers,
    isValidMove
  };
};

module.exports = Game;
