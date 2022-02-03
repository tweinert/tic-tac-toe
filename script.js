// modules
const gameBoard = (() => {
    const gameSquares = new Array(9);

    let gameStarted = false;
    
    let player1;
    let player2;

    let isPlayer1Turn = true;
    
    function getPlayer(playerNum) {
        switch (playerNum) {
            case 1:
                return player1;
            case 2:
                return player2;
            default:
                return player1;
        } 
    }

    function getPlayerName(playerNum) {
        switch (playerNum) {
            case 1:
                return player1.getPlayerName();
            case 2:
                return player2.getPlayerName();
            default:
                return player1.getPlayerName();
        } 
    }

    function getPlayerTurn() {
        return isPlayer1Turn;
    }
    
    function setSquareMarker(square, marker) {
        gameSquares[square] = marker;
    }

    function getSquareMarker(square) {
        return gameSquares[square];
    }

    function startNewGame() {
        let player1TextBox = document.getElementById("p1NameTextbox");
        let player2TextBox = document.getElementById("p2NameTextbox");
        
        // create 2 players here
        player1 = player(player1TextBox.value, "X");
        player2 = player(player2TextBox.value, "O");

        // empty all squares
        for (let i = 0; i < 9; i++) {
            gameBoard.setSquareMarker(i, "-");
        }

        isPlayer1Turn = true;
        
        displayController.renderGameBoard();
        displayController.endPlayerTurn();

        gameStarted = true;
    }
    
    // Run on click of any game square
    function squareClickHandler(event) {
        // gets clicked board square
        let clickedSquareNum = event.target.id;
        
        // checks if square has marker
        if (gameStarted) {
            if (gameSquares[clickedSquareNum] != "X" && gameSquares[clickedSquareNum] != "O") {
                if (isPlayer1Turn) {
                    setSquareMarker(clickedSquareNum, player1.marker);
                    isPlayer1Turn = false;
                    displayController.endPlayerTurn();
                } else { 
                    setSquareMarker(clickedSquareNum, player2.marker);
                    isPlayer1Turn = true;
                    displayController.endPlayerTurn();
                }
            }
        }

        displayController.renderGameBoard();
        checkGameWin();
    }

    // Checks if someone has won
    function checkGameWin() {
        // horizontal
        if (utilsModule.areEqual(gameSquares[0], gameSquares[1], gameSquares[2])) {
            gameWinSwitch(0, "top row win");
        } else if (utilsModule.areEqual(gameSquares[3], gameSquares[4], gameSquares[5])) {
            gameWinSwitch(3, "middle row win");
        } else if (utilsModule.areEqual(gameSquares[6], gameSquares[7], gameSquares[8])) {
            gameWinSwitch(6, "bottom row win");
        } 
        // vertical
        else if (utilsModule.areEqual(gameSquares[0], gameSquares[3], gameSquares[6])) {
            gameWinSwitch(0, "left column win");
        } else if (utilsModule.areEqual(gameSquares[1], gameSquares[4], gameSquares[7])) {
            gameWinSwitch(1, "middle column win");
        } else if (utilsModule.areEqual(gameSquares[2], gameSquares[5], gameSquares[8])) {
            gameWinSwitch(2, "right column win");
        } 
        // diagonal
        else if (utilsModule.areEqual(gameSquares[0], gameSquares[4], gameSquares[8])) {
            gameWinSwitch(0, "diagonal right win");
        } else if (utilsModule.areEqual(gameSquares[2], gameSquares[4], gameSquares[6])) {
            gameWinSwitch(2, "diagonal left win");
        }
    }

    // Checks which player wins
    function gameWinSwitch(firstSquare, winString) {
        switch (gameSquares[firstSquare]) {
            case player1.marker:
                displayController.displayWinMessage(getPlayerName(1) + " wins!");
                gameStarted = false;
                console.log("player1 " + winString);
                break;
            case player2.marker:
                displayController.displayWinMessage(getPlayerName(2) + " wins!");
                gameStarted = false;
                console.log("player2 " + winString);
                break;
            default:
                break;
        }
    }

    return {
        getPlayer,
        getPlayerName,
        getPlayerTurn,
        setSquareMarker,
        getSquareMarker,
        startNewGame,
        squareClickHandler,
    };
})();

const displayController = (() => {
    // Modify player turn text at end of player turn
    function endPlayerTurn() {
        let turnText = document.getElementById("turnText");
        
        if(gameBoard.getPlayerTurn()) {
            turnText.textContent = ">" + gameBoard.getPlayerName(1) + " Turn";
        } else {
            turnText.textContent = ">" + gameBoard.getPlayerName(2) + " Turn";
        }
    }
    
    function renderGameBoard() {
        let boardDiv = document.getElementById("gameBoard");

        // clear the game board
        boardDiv.innerHTML = "";
        
        for (let i = 0; i < 9; i++) {
            //end of row line break
            if (i % 3 == 0) {
                boardDiv.innerHTML += "<br>";
            }
            
            let boardSquareDiv = document.createElement('div');
            boardSquareDiv.classList.add('boardSquare');
            boardSquareDiv.setAttribute("id", i.toString());

            boardSquareDiv.textContent = gameBoard.getSquareMarker(i);

            boardDiv.appendChild(boardSquareDiv);
        }

        let boardSquares = document.querySelectorAll('.boardSquare');
        boardSquares.forEach(key => key.addEventListener('click', gameBoard.squareClickHandler));
    }

    function displayWinMessage(winString) {
        let turnText = document.getElementById("turnText");

        turnText.textContent = winString;
    }

    return {
        renderGameBoard,
        endPlayerTurn,
        displayWinMessage,
    }
})();

const utilsModule = (() => {
    // Checks if multiple values are equal to each other
    function areEqual() {
        let len = arguments.length;
        for (let i = 1; i < len; i++) {
            if (arguments[i] === null || arguments[i] !== arguments[i-1] || arguments[i] === "-") {
                return false;
            }
        }
        return true;
    }

    return {
        areEqual,
    }
})();



// factory functions
const player = (name, marker) => {
    function getPlayerName() {
        return name;
    }
    
    return {
        getPlayerName,
        marker
    };
};


// Testing
window.onload = function() {
    document.getElementById("startButton").addEventListener('click', gameBoard.startNewGame);
}