import * as R from "ramda";

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
