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
        
        for (let i = 0; i < 9; i++) {
            boardDiv.textContent += gameBoard.getSquareMarker(i);
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