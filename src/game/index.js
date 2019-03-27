import R from "ramda";
import { STATES, POSSIBLE_WIN_INDEXES } from "../entities";
import { setArrayIndexToValue } from "../helpers";
import {
  areIndexesTakenForPlayer,
  valueIsTrue,
  stateToString,
  emptyBoard,
  defaultPlayers,
  errorFactory,
  isNumberOfMovesFair,
  reduceBoardToMoves,
  isBoardPositionInRange
} from "./utils";

const Game = (
  board = emptyBoard(),
  PLAYERS = defaultPlayers,
  startingPlayer = PLAYERS[0]
) => {
  let _currentPlayer = startingPlayer;
  let _board = board;
  const getBoard = () => [..._board];
  const setBoard = newBoard => {
    _board = newBoard;
  };
  const getCurrentPlayer = () => _currentPlayer;

  const getOtherPlayer = () => {
    const equalsCurrentPlayer = R.partial(R.equals, [_currentPlayer]);
    const notCurrentPlayerArray = R.filter(
      R.compose(
        R.not,
        equalsCurrentPlayer
      ),
      PLAYERS
    );
    return R.head(notCurrentPlayerArray);
  };

  const togglePlayer = () => {
    _currentPlayer = getOtherPlayer();
  };

  const evalState = (evalBoard = getBoard()) => {
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

    const getMovesCountArray = () =>
      R.reduce(reduceBoardToMoves, [0, 0], evalBoard);

    const isValidState = () => isNumberOfMovesFair(...getMovesCountArray());

    if (!isValidState()) return STATES.get("INVALID");
    if (isWinState()) return STATES.get("WIN");
    if (isActiveState()) return STATES.get("ACTIVE");
    return STATES.get("DRAW");
  };

  const isValidMove = ({ boardPosition }) => {
    const gameOver = R.includes(evalState(), [
      STATES.get("WIN"),
      STATES.get("DRAW")
    ]);

    const isBoardPositionTaken = () => !R.equals(getBoard()[boardPosition], 0);

    gameOver && errorFactory("GAME_OVER");
    !isBoardPositionInRange(boardPosition) &&
      errorFactory("BOARD_POSITION_RANGE");
    isBoardPositionTaken() && errorFactory("BOARD_POSITION_TAKEN");
    return true;
  };

  const makeMove = boardPosition => {
    if (isValidMove({ boardPosition })) {
      const boardWithMoveTaken = setArrayIndexToValue({
        index: boardPosition,
        value: getCurrentPlayer(),
        array: getBoard()
      });
      setBoard(boardWithMoveTaken);
      togglePlayer();
    }
  };

  return {
    getBoard,
    makeMove,
    evalState,
    getCurrentPlayer,
    getOtherPlayer,
    getPlayers: R.always(PLAYERS),
    isValidMove,
    printState: () => console.log(stateToString(getBoard()))
  };
};

export default Game;
