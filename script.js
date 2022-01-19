// modules
const gameBoard = (() => {
    const gameSquares = new Array(9);

    function setSquareMarker(square, marker) {
        gameSquares[square] = marker;
    }

    function getSquareMarker(square) {
        return gameSquares[square];
    }

    function startNewGame() {
        // create 2 players here
        const player1 = player("player1", "X");
        const player2 = player("player2", "O");

        player1.displayStuff();
        player2.displayStuff();
    }
    
    function squareClickHandler() {
        console.log("square clicked");
    }

    return {
        setSquareMarker,
        getSquareMarker,
        startNewGame,
        squareClickHandler,
    };
})();

const displayController = (() => {
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

            boardSquareDiv.textContent = gameBoard.getSquareMarker(i);

            boardDiv.appendChild(boardSquareDiv);
        }

        let boardSquares = document.querySelectorAll('.boardSquare');
        boardSquares.forEach(key => key.addEventListener('click', gameBoard.squareClickHandler));
    }

    return {
        renderGameBoard,
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
    gameBoard.setSquareMarker(i, "x");
}

displayController.renderGameBoard();

gameBoard.startNewGame();