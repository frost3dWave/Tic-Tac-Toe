// function gameBoard() {
//     const cells = document.querySelectorAll(".cell");
//     const board = [];
//     const rows = 3;
//     const columns = 3;

//     for (let i = 0; i < rows; i++) {
//         board[i] = [];
//         for (let j = 0; j < columns; j++) {
//             board[i][j] = "";
//         };
//     };

//     // for placing the marker & updating the board 
//     function placingMarker(row, column, marker) {
//         if (board[row][column] === "") { // but only if the current selected element in array is an empty string i.e has nothing inside
//             board[row][column] = marker;
//             return true;
//         }else {
//             console.log("position already taken! Please enter again.");
//             return false;
//         };
//     };

//     const getBoard = () => board;  

//     // check if board is full 
//     function isBoardFull() {
//         for (let i=0; i<rows; i++){
//             for (j=0; j<columns; j++){
//                 if (board[i][j] === ""){
//                     return false;
//                 }
//             }
//         }
//         return true;
//     };

//     // to reset the board 
//     function resetBoard() {
//         for (let i = 0; i < rows; i++){
//             for (let j = 0; j < columns; j++) {
//                 board[i][j] = "";
//             }
//         } 
//     };

//     return {getBoard, resetBoard, isBoardFull, placingMarker};
// }

// function playerController() {
//     const players = [
//         {
//             name: "playerOne",
//             marker: "X"
//         }, 
//         {
//             name: "playerTwo",
//             marker: "O"
//         }
//     ];

//     let activePlayer = players[0];

//     function switchPlayerTurn() {
//         activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
//     };

//     const getActivePlayer = () => activePlayer;

//     return {switchPlayerTurn, getActivePlayer};
// }

// function gameController() {
//     const board = gameBoard();
//     const players = playerController();
    
//     function playGame() {
//         console.log("Game started!");
//         let gameOver = false;
        
//         while (!gameOver) {
//             playRound();
//             // Check for win or tie
//             if (checkForWin() || board.isBoardFull()) {
//                 gameOver = true;
//             }
//         }
        
//         announceResult();
//     }
    
//     function playRound() {
//         const currentPlayer = players.getActivePlayer();
//         let validMove = false;
        
//         while (!validMove) {
//             let rowChoice = prompt("Enter row (0-2): ");
//             let columnChoice = prompt("Enter column (0-2): ");
            
//             validMove = board.placingMarker(rowChoice, columnChoice, currentPlayer.marker);
            
//             if (!validMove) {
//                 console.log("Invalid move! Try again.");
//             }
//         }
        
//         // After a valid move, switch player
//         players.switchPlayerTurn();
//     }
    
//     function checkForWin() {
//         // You'll need to implement win condition checks
//         // Check rows, columns, and diagonals
//         return false; // Placeholder
//     }
    
//     function announceResult() {
//         if (checkForWin()) {
//             // Since we switched players after the last move, 
//             // we need to switch back to get the winner
//             players.switchPlayerTurn();
//             console.log(`${players.getActivePlayer().name} wins!`);
//         } else if (board.isBoardFull()) {
//             console.log("It's a tie!");
//         }
//     }
    
//     function restart() {
//         board.resetBoard();
//         // Reset to first player if needed
//     }
    
//     return { playGame, restart};
// }
let running = false;
gameController();

function gameBoard(){
    const board = [];

    for (let i=0; i<3; i++){
        board[i] = [];
        for (let j=0; j<3; j++) {
            board[i][j] = "";
        }
    }

    function cellClicked(cell, marker){
        const row = parseInt(cell.dataset.row);
        const column = parseInt(cell.dataset.column);

        if (board[row][column] != "" || !running){
            return;
        }
        updateCell(cell, row, column, marker);
    }

    function updateCell(cell, row, column, marker){
        console.log(board);
        board[row][column] = marker;
        cell.textContent = marker;
    }
    return {cellClicked, updateCell};
};

function initializeGame(){
    const cells = document.querySelectorAll(".cell");
    // cells.forEach(cell => cell.addEventListener("click", cellClicked));

    const restartBtn = document.querySelector(".restartBtn");
    // restartBtn.addEventListener("click", restartGame);

    const gameStatus = document.querySelector(".gameStatus");

    running = true;

    return {cells, restartBtn, gameStatus, running};
};

function playerController(){
    const players = [
        {
            marker : "X",
        },
        {
            marker : "O",
        },
    ]

    const activePlayer = players[0].marker;

    function changeActivePlayer(){
        activePlayer = (activePlayer === players[0].marker) ? players[1].marker : players[0].marker; 
    }

    return {activePlayer, changeActivePlayer};
};

function gameController(){
    running = true;
    const gameInitialize = initializeGame();
    const boardGame = gameBoard();
    const playercontrol = playerController();

    gameInitialize.gameStatus.textContent = `${playercontrol.activePlayer}'s turn`;
    gameInitialize.cells.forEach(cell => 
        cell.addEventListener("click", (e) => {
            boardGame.cellClicked(e.target, playercontrol.activePlayer)
        }));
}