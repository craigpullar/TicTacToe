import * as R from "ramda";
import { PLAYERS, ERRORS } from "../Entities";
import { throwError } from "../helpers";

export const areIndexesTakenForPlayer = ({ indexArray, player, board }) => {
  const boardPositionDoesEqualPlayerForIndex = R.compose(
    R.partialRight(R.equals, [player]),
    R.partialRight(R.nth, [board])
  );
  return R.all(boardPositionDoesEqualPlayerForIndex, indexArray);
};

export const valueIsTrue = R.partial(R.equals, [true]);

const rowToString = row => ` ${row[0]} | ${row[1]} | ${row[2]} \n`;
const dividerString = R.always("---|---|---\n");

const stateToStringWithoutDividers = board => {
  const multiplyBy3 = R.partialRight(R.multiply, [3]);
  const getEndOfRow = row => R.add(multiplyBy3(row), 3);
  const sliceBoardForRow = row =>
    R.slice(multiplyBy3(row), getEndOfRow(row), board);
  const slicedBoardRows = R.map(sliceBoardForRow, [0, 1, 2]);
  return R.map(rowToString, slicedBoardRows);
};

export const stateToString = board => {
  const boardArrayWithDividers = R.intersperse(
    dividerString(),
    stateToStringWithoutDividers(board)
  );
  return R.join("", boardArrayWithDividers);
};

export const emptyBoard = () => [0, 0, 0, 0, 0, 0, 0, 0, 0];

export const defaultPlayers = [PLAYERS.get("RED"), PLAYERS.get("BLUE")];

export const errorFactory = error => {
  ERRORS.has(error) && throwError(ERRORS.get(error));
  throwError("Invalid error thrown");
};

export const isNumberOfMovesFair = (a, b) => {
  const bIsValidNumberOfMoves = R.lt(R.subtract(a, b), 2);
  const aIsValidNumberOfMoves = R.gt(R.subtract(a, b), -2);
  return R.and(bIsValidNumberOfMoves, aIsValidNumberOfMoves);
};

// TODO: Refactor
export const reduceBoardToMoves = (movesArray, boardValue) => {
  const currentPlayer = R.dec(boardValue);
  if (R.equals(boardValue, 0)) return movesArray;
  return [...movesArray].map((moveArrayValue, movesArrayIndex) =>
    R.equals(currentPlayer, movesArrayIndex)
      ? R.inc(moveArrayValue)
      : moveArrayValue
  );
};

export const isBoardPositionInRange = boardPosition =>
  R.includes(boardPosition, R.range(0, 9));
