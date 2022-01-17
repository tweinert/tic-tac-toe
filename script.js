// modules
const gameBoard = (() => {
    const gameSquares = new Array(9);

    function setSquareMarker(square, marker) {
        gameSquares[square] = marker;
    }

    function getSquareMarker(square) {
        return gameSquares[square];
    }

    return {
        setSquareMarker,
        getSquareMarker,
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
    }

    return {
        renderGameBoard,
    }
})();



// factory functions
const player = () => {

};



// testing
for (let i = 0; i < 9; i++) {
    gameBoard.setSquareMarker(i, "x");
}

displayController.renderGameBoard();

