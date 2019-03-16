const ERRORS = new Map();
ERRORS.set("BOARD_POSITION_RANGE", "Board position not in range");
ERRORS.set("BOARD_POSITION_TAKEN", "Board position full, cannot move here");
ERRORS.set(
  "MOVE_INVALID_STATE",
  "Cannot make move: Move would create invalid state"
);

const PLAYERS = new Map();
PLAYERS.set("RED", 1);
PLAYERS.set("BLUE", 2);

const STATES = new Map();
STATES.set("WIN", 0);
STATES.set("DRAW", 1);
STATES.set("ACTIVE", 2);
STATES.set("INVALID", 4);

Array.prototype.deepCopy = function() {
  return JSON.parse(JSON.stringify(this));
};
const POSSIBLE_WIN_INDEXES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
].deepCopy();

module.exports = { ERRORS, PLAYERS, STATES, POSSIBLE_WIN_INDEXES };
