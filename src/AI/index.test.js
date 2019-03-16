import AI from "./index";
import Game from "../Game";

describe("AI", () => {
  describe("getNextAction", () => {
    it("should for an empty board should return index 1", () => {
      const myGame = Game();
      const myAi = AI({ gameState: myGame });
      const nextAction = myAi.getNextAction();

      expect(nextAction).toBe(0);
    });

    it("should a potential win state choose the win state action", () => {
      const myGame = Game();
      myGame.makeMove(3);
      myGame.makeMove(7);
      myGame.makeMove(5);
      myGame.makeMove(2);

      const myAi = AI({ gameState: myGame });
      const nextAction = myAi.getNextAction();

      expect(nextAction).toBe(4);
    });

    it("should for a potential lose state, block the win", () => {
      const myGame = Game();
      myGame.makeMove(3);
      myGame.makeMove(7);
      myGame.makeMove(5);

      const myAi = AI({ gameState: myGame });
      const nextAction = myAi.getNextAction();

      expect(nextAction).toBe(4);
    });
  });
});
