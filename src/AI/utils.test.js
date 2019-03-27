import { compareAndRetrieveDesiredNode } from "./utils";

describe("AI Utils", () => {
  describe("compareAndRetrieveDesiredNode", () => {
    it("should return compareNode if it has a higher utility than the currentNode", () => {
      const mockCompareNode = { getUtilityForPossibleNodes: () => 1 };
      const mockCurrentNode = { getUtilityForPossibleNodes: () => 0 };
      expect(
        compareAndRetrieveDesiredNode(mockCurrentNode, mockCompareNode)
      ).toBe(mockCompareNode);
    });

    it("should return currentNode if it has a higher utility than the compareNode", () => {
      const mockCompareNode = { getUtilityForPossibleNodes: () => 0 };
      const mockCurrentNode = { getUtilityForPossibleNodes: () => 1 };
      expect(
        compareAndRetrieveDesiredNode(mockCurrentNode, mockCompareNode)
      ).toBe(mockCurrentNode);
    });
  });
});
