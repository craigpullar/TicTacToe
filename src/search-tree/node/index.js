import R from "ramda";
import { throwError } from "../../helpers";
import ENTITIES from "../../entities";
import { buildPossibleNodesForGameState, maxWeight } from "./utils";

const Node = ({
  gameState,
  shouldBuildPossibleNodes = R.always(false),
  action,
  currentPlayer = gameState.getCurrentPlayer(),
  currentDepth = 0,
  possibleNodes = R.ifElse(
    R.partial(shouldBuildPossibleNodes, [currentDepth]),
    R.partial(buildPossibleNodesForGameState, [
      {
        gameState,
        shouldBuildPossibleNodes,
        currentPlayer,
        currentDepth
      }
    ]),
    R.always([])
  )()
}) => {
  const _gameState = gameState;
  const _possibleNodes = possibleNodes;
  !shouldBuildPossibleNodes && throwError("no shouldBuildPossibleNodes");

  const weightAgainstTreeDepthForUtility = utility =>
    Math.round(R.divide(utility, R.add(currentDepth, 1) ** 3));

  const utilityForWin = R.always(weightAgainstTreeDepthForUtility(maxWeight));

  const utilityForLoss = R.always(
    R.negate(weightAgainstTreeDepthForUtility(maxWeight))
  );

  const getWinStateUtilityForCurrentPlayer = R.ifElse(
    R.always(R.equals(currentPlayer, _gameState.getCurrentPlayer())),
    utilityForLoss,
    utilityForWin
  );

  const getUtility = R.cond([
    [
      R.partial(R.equals, [_gameState.evalState(), ENTITIES.STATES.get("WIN")]),
      getWinStateUtilityForCurrentPlayer
    ],
    [
      R.partial(R.equals, [
        _gameState.evalState(),
        ENTITIES.STATES.get("DRAW")
      ]),
      R.always(weightAgainstTreeDepthForUtility(50))
    ],
    [R.T, R.always(0)]
  ]);

  const getUtilityForPossibleNodes = () => {
    const getUtilityArray = R.map(
      R.partial(R.prop, ["getUtilityForPossibleNodes"]),
      possibleNodes
    );
    const utilityArray = R.map(R.call, getUtilityArray);
    return R.reduce(R.add, R.call(getUtility), utilityArray);
  };

  return {
    getGameState: R.always({ ..._gameState }),
    getPossibleNodes: R.always(_possibleNodes),
    getUtility,
    getUtilityForPossibleNodes,
    action
  };
};

export default Node;
