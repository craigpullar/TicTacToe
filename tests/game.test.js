const Game = require('../Game');
const { PLAYERS, STATES } = require('../Entities');

describe('Game Object', () => {
    let myGame;
    beforeEach(() => {
        myGame = Game();
    });

  describe('Board Creation', () => {
      
    it('should create an empty board', () => {
        const emptyBoard = [0,0,0,0,0,0,0,0,0];
        expect(myGame.getBoard()).toEqual(emptyBoard);
    });
    
  });

    describe('Making a move', () => {

        it('should alter the board', () => {
          myGame.makeMove(0);
          expect(myGame.getBoard()[0]).not.toBe(0);
        });

        it('should alter board to player value', () => {
            myGame.makeMove(0, PLAYERS.get('BLUE'));
            expect(myGame.getBoard()[0]).toBe(PLAYERS.get('BLUE'));
        });
        it('should not allow a move to a full square', () => {
            myGame.makeMove(0, PLAYERS.get('BLUE'));
            expect(() => {
                myGame.makeMove(0, PLAYERS.get('BLUE'))
            }).toThrow(Error);
        });
        it('should throw an error if boardPosition is not in range', () => {
            expect(() => {
                myGame.makeMove(10, PLAYERS.get('BLUE'))
            }).toThrow(Error);
        });
        
        
    });

    describe('Game States', () => {
        describe('Win state', () => {

        });

        describe('Draw state', () => {

        });

        describe('Active state', () => {
          
        });
        

        describe('Invalid state', () => {
          
        });
        
    });

    describe('Turn Counting', () => {
      
    });
    
        
  
});
