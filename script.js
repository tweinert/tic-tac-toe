// modules
const gameBoard = (() => {
    const gameSquares = new Array(9);

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
        // create 2 players here
        player1 = player("player1", "X");
        player2 = player("player2", "O");
    }
    
    function squareClickHandler(event) {
        // gets clicked board square
        let clickedSquareNum = event.target.id;
        
        // checks if square has marker
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

        displayController.renderGameBoard();
        checkGameWin();
    }

    function checkGameWin() {
        // horizontal
        if (utilsModule.areEqual(gameSquares[0], gameSquares[1], gameSquares[2])) {
            gameWinSwitch(0, "top row win");
        } else if (utilsModule.areEqual(gameSquares[3], gameSquares[4], gameSquares[5])) {
            gameWinSwitch(3, "middle row win");
        } else if (utilsModule.areEqual(gameSquares[6], gameSquares[7], gameSquares[8])) {
            gameWinSwitch(6, "bottom row win");
        } else if (utilsModule.areEqual(gameSquares[0], gameSquares[3], gameSquares[6])) {
            // vertical
            gameWinSwitch(0, "left column win");
        } else if (utilsModule.areEqual(gameSquares[1], gameSquares[4], gameSquares[7])) {
            gameWinSwitch(1, "middle column win");
        } else if (utilsModule.areEqual(gameSquares[2], gameSquares[5], gameSquares[8])) {
            gameWinSwitch(2, "right column win");
        } else if (utilsModule.areEqual(gameSquares[0], gameSquares[4], gameSquares[8])) {
            // diagonal
            gameWinSwitch(0, "diagonal right win");
        } else if (utilsModule.areEqual(gameSquares[2], gameSquares[4], gameSquares[6])) {
            gameWinSwitch(2, "diagonal left win");
        }
    }

    function gameWinSwitch(firstSquare, winString) {
        switch (gameSquares[firstSquare]) {
            case player1.marker:
                console.log("player1 " + winString);
                break;
            case player2.marker:
                console.log("player2 " + winString);
                break;
            default:
                break;
        }
    }

    return {
        getPlayer,
        getPlayerTurn,
        setSquareMarker,
        getSquareMarker,
        startNewGame,
        squareClickHandler,
    };
})();

const displayController = (() => {
    function endPlayerTurn() {
        let turnText = document.getElementById("turnText");
        
        turnText.textContent = gameBoard.getPlayerTurn() ? ">Player 1 Turn" : ">Player 2 Turn";
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

    return {
        renderGameBoard,
        endPlayerTurn,
    }
})();

const utilsModule = (() => {
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
    const displayStuff = () => console.log(name + ", " + marker);
    
    return {
        name,
        marker,
        displayStuff
    };
};



// testing

for (let i = 0; i < 9; i++) {
    gameBoard.setSquareMarker(i, "-");
}

displayController.renderGameBoard();


gameBoard.startNewGame();