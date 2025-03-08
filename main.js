function gameBoard() {
    const board = [];
    const rows = 3;
    const columns = 3;

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = "";
        };
    };

    // for placing the marker & updating the board 
    function placingMarker(row, column, marker) {
        if (board[row][column] === "") { // but only if the current selected element in array is an empty string i.e has nothing inside
            board[row][column] = marker;
            return true;
        }else {
            console.log("position already taken! Please enter again.");
            return false;
        };
    };

    const getBoard = () => board;  

    // check if board is full 
    function isBoardFull() {
        for (let i=0; i<rows; i++){
            for (j=0; j<columns; j++){
                if (board[i][j] === ""){
                    return false;
                }
            }
        }
        return true;
    };

    // to reset the board 
    function resetBoard() {
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < columns; j++) {
                board[i][j] = "";
            }
        } 
    };

    return {getBoard, resetBoard, isBoardFull, placingMarker};
}