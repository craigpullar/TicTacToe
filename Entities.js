const ERRORS = new Map();
    ERRORS.set('BOARD_POSITION_RANGE', 'Board position not in range');
    ERRORS.set('BOARD_POSITION_TAKEN', 'Board position full, cannot move here');

const PLAYERS = new Map();
    PLAYERS.set('RED', 'Red Player');
    PLAYERS.set('BLUE', 'Blue Player');

const STATES = new Map();
    STATES.set('WIN', 0);
    STATES.set('DRAW', 1);
    STATES.set('ACTIVE', 2);
    STATES.set('INVALID', 4);

module.exports = { ERRORS, PLAYERS, STATES };