import ENTITIES from "../../Entities";
import { buildPossibleNodesForGameState } from "./utils";

const Node = ({
  gameState,
  shouldBuildPossibleNodes = false,
  possibleNodes = shouldBuildPossibleNodes
    ? buildPossibleNodesForGameState(gameState)
    : []
}) => {
  const _gameState = gameState;
  const _possibleNodes = possibleNodes;

  const getGameState = () => ({ ..._gameState });

  const utility = _gameState.evalState() === ENTITIES.STATES.get("WIN") ? 1 : 0;
  const getPossibleNodes = () => _possibleNodes;
  const getUtilityForPossibleNodes = () =>
    possibleNodes.reduce((accumulator, node) => accumulator + node.utility, 0);

  return {
    getGameState,
    getPossibleNodes,
    utility,
    getUtilityForPossibleNodes
  };
};

export default Node;
