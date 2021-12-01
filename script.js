const gameBoard = (() => {
    const gameSquares = new Array(9);

    function setSquareMarker(square, marker) {
        gameSquares[square] = marker;
        console.log(gameSquares[square]);
    }

    return {
        setSquareMarker: setSquareMarker
    };
})();