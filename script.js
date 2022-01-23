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
        // TODO check if square already has marker
        // gets clicked board square
        let clickedSquareNum = event.target.id;
        
        if (isPlayer1Turn) {
            setSquareMarker(clickedSquareNum, player1.marker);
            isPlayer1Turn = false;
            displayController.endPlayerTurn();
        } else { 
            setSquareMarker(clickedSquareNum, player2.marker);
            isPlayer1Turn = true;
            displayController.endPlayerTurn();
        }

        displayController.renderGameBoard();
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