export const areIndexesTakenForPlayer = ({ indexArray, player, board }) =>
  indexArray.every(index => board[index] === player);
export const valueIsTrue = val => val === true;
