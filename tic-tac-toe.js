
function createGameBoard() {
    const gameBoard = ["empty","empty","empty","empty","empty","empty","empty","empty","empty"];
    const victoryRows = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    
    const squareEmpty = (pos) => gameBoard[pos] === "empty";
    const placeSymbol = (pos,symbol) => { gameBoard[pos] = symbol; }

    // Checks if every square is not empty and the same symbol
    const checkForVictory = () => victoryRows.find( rows => rows.every(
                                        i => gameBoard[i] !== "empty" 
                                        && gameBoard[i] === gameBoard[rows[0]])
                                    )

    return {squareEmpty,placeSymbol,checkForVictory}
}

function createPlayer(name,symbol) {
    let score = 0;
    
    const addPoint = () => score++;
    const getScore = () => score;
    const resetScore = () => score = 0;    
    
    return {name,symbol,addPoint,getScore,resetScore};
}


// Change to exposing currentPlayer and nextPlayer.
const Game = (function () {
    const playerOne = createPlayer("Player One","circle");
    const playerTwo = createPlayer("Player Two","cross");

    let currentPlayer = playerOne;
    let nextPlayer = playerTwo;

    let gameBoard = createGameBoard();

    let turn = 0;

    const play = (pos) => {
        console.log(pos);
        // Is square taken?
        if (!gameBoard.squareEmpty(pos)) return {status : "next", name : currentPlayer.name};

        // Place symbol
        gameBoard.placeSymbol(pos,currentPlayer.symbol);
        turn++;
        [currentPlayer,nextPlayer] = [nextPlayer,currentPlayer];

        // Is it a victory, tie or new turn.
        const victory = gameBoard.checkForVictory();
        if (victory !== undefined) {
            nextPlayer.addPoint();
            return {status : "winner", name : nextPlayer.name, winningRow : victory};
        }
        if(turn === 9) {
            return {status : "tie", name : nextPlayer};
        }
        return {status : "next", name : currentPlayer.name}
    }

    const resetGame = () => {
        gameBoard = createGameBoard();
        turn = 0;        
        currentPlayer = playerOne;
        nextPlayer = playerTwo;
    }

    const reset = () => {
        resetGame();
        playerOne.resetScore();
        playerTwo.resetScore();
    }

    const getPrevPlayer = () => nextPlayer;
    const getCurrentPlayer = () => currentPlayer;

    return {playerOne,playerTwo,play,resetGame,reset,getPrevPlayer,getCurrentPlayer}
})();
