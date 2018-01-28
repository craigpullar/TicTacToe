const Game = require('../Game');
const { PLAYERS, STATES } = require('../Entities');

describe('Game Object', () => {
    let myGame;
 
  describe('Board Creation', () => {
    beforeEach(() => {
        myGame = Game();
    });
      
    it('should create an empty board', () => {
        const emptyBoard = [0,0,0,0,0,0,0,0,0];
        expect(myGame.getBoard()).toEqual(emptyBoard);
    });
    
  });

    describe('Making a move', () => {
        beforeEach(() => {
            myGame = Game();
        });

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

    describe('Game State Evaluation', () => {
        describe('State where user has 3 across', () => {
            it('should return Win State', () => {
                const board = [1,1,1,2,2,1,2,1,2];
                myGame = Game(board);
                expect(myGame.evalState()).toBe(STATES.get('WIN'));
            });
        });

        describe('State where no one has 3 in any direction', () => {
            it('should return draw state', () => {
                const board = [1,2,1,1,2,2,2,1,2];
                myGame = Game(board);
                expect(myGame.evalState()).toBe(STATES.get('DRAW'));
            });
            
        });

        describe('State where user has 3 down', () => {
            it('should return a win state', () => {
                const board = [1,2,2,1,2,1,1,1,2];
                myGame = Game(board);
                expect(myGame.evalState()).toBe(STATES.get('WIN'));
            });  
        });

        describe('State where user has 3 diag', () => {
            it('should return a win state', () => {
                const board = [2,1,2,1,2,1,1,1,2];
                myGame = Game(board);
                expect(myGame.evalState()).toBe(STATES.get('WIN'));
            });
            
        });
        
        
               
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
