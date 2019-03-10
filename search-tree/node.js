import ENTITIES from "../Entities";
const node = ({ gameState, possibleNodes = [] }) => {
  const _gameState = gameState;

  const getGameState = () => ({ ..._gameState });

  const utility = _gameState.evalState() === ENTITIES.STATES.get("WIN") ? 1 : 0;
  const getPossibleNodes = () => [...possibleNodes];
  const getUtilityForPossibleNodes = () =>
    possibleNodes.reduce((accumulator, node) => accumulator + node.utility, 0);

  return {
    getGameState,
    getPossibleNodes,
    utility,
    getUtilityForPossibleNodes
  };
};

export default node;
