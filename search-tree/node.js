import ENTITIES from "../Entities";
const node = ({ gameState, possibleNodes = [] }) => {
  const _gameState = gameState;

  const getGameState = () => ({ ..._gameState });

  const utility = _gameState.evalState() === ENTITIES.STATES.get("WIN") ? 1 : 0;
  const getPossibleNodes = () => [...possibleNodes];
  return {
    getGameState,
    getPossibleNodes,
    utility
  };
};

export default node;
