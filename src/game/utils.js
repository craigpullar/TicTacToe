import R from "ramda";

export const areIndexesTakenForPlayer = ({ indexArray, player, board }) =>
  indexArray.every(index => board[index] === player);
export const valueIsTrue = val => val === true;

const rowToString = row => ` ${row[0]} | ${row[1]} | ${row[2]} \n`;
const dividerString = R.always("---|---|---\n");
const stateToStringWithoutDividers = board =>
  [0, 1, 2].map(row => board.slice(row * 3, row * 3 + 3)).map(rowToString);
export const stateToString = board =>
  R.intersperse(dividerString(), stateToStringWithoutDividers(board)).join("");
