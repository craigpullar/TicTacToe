import R from "ramda";
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

  const getUtility = R.ifElse(
    R.partial(R.equals, [_gameState.evalState(), ENTITIES.STATES.get("WIN")]),
    R.always(1),
    R.always(0)
  );

  const getUtilityForPossibleNodes = () => {
    const getUtilityArray = R.map(
      R.partial(R.prop, ["getUtility"]),
      possibleNodes
    );
    const utilityArray = R.map(R.call, getUtilityArray);
    return R.reduce(R.add, 0, utilityArray);
  };

  return {
    getGameState: R.always({ ..._gameState }),
    getPossibleNodes: R.always(_possibleNodes),
    getUtility,
    getUtilityForPossibleNodes
  };
};

export default Node;
