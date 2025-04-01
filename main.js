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

    function resetBoard(){
        for(let i=0; i<3; i++){
            board[i] = [];
            for(let j=0; j<3; j++){
                board[i][j] = "";
            }
        }
        return board;
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
        board[row][column] = marker;
        cell.textContent = marker;
    }

    return {board, cellClicked, updateCell, resetBoard};
};

function initializeGame(){
    const cells = document.querySelectorAll(".cell");

    const restartBtn = document.querySelector(".restartBtn");
    // restartBtn.addEventListener("click", restartGame);

    const gameStatus = document.querySelector(".gameStatus");

    running = true;

    return {cells, restartBtn, gameStatus, running};
};

function playerController(gameInitialize) {
    const players = [
        { marker: "X" },
        { marker: "O" }
    ];

    let activePlayerIndex = 0;

    function getActivePlayer() {
        return players[activePlayerIndex].marker;
    }

    function changeActivePlayer() {
        activePlayerIndex = activePlayerIndex === 0 ? 1 : 0;
        gameInitialize.gameStatus.textContent = `${getActivePlayer()}'s turn`;
        return getActivePlayer();
    }

    function resetPlayer(){
        activePlayerIndex = 0;
        return getActivePlayer();
    }

    return {
        get activePlayer() {
            return getActivePlayer();
        },
        changeActivePlayer,
        resetPlayer
    };
}

function gameController(){
    let running = true;
    const gameInitialize = initializeGame();
    const boardGame = gameBoard();
    const playercontrol = playerController(gameInitialize);

    function restartGame(){
        // Reset the board array
        boardGame.resetBoard();

        // Clear all cell contents in the UI
        gameInitialize.cells.forEach(cell => {
            cell.textContent = "";
        });

        // Reset the active player
        const initialPlayer = playercontrol.resetPlayer();
        
        // Update game status
        gameInitialize.gameStatus.textContent = `${initialPlayer}'s turn`;

        running = true;
    }

    gameInitialize.gameStatus.textContent = `${playercontrol.activePlayer}'s turn`;
    
    gameInitialize.cells.forEach(cell => cell.addEventListener("click", (e) => { 
        if (!running) return;
        
        boardGame.cellClicked(e.target, playercontrol.activePlayer);
        
        checkWinner();
    }));

    gameInitialize.restartBtn.addEventListener("click", restartGame);

    function checkWinner(){
        const winConditions = [
            // Rows
            [[0,0], [0,1], [0,2]],
            [[1,0], [1,1], [1,2]],
            [[2,0], [2,1], [2,2]],
            
            // Columns
            [[0,0], [1,0], [2,0]],
            [[0,1], [1,1], [2,1]],
            [[0,2], [1,2], [2,2]],
            
            // Diagonals
            [[0,0], [1,1], [2,2]],
            [[0,2], [1,1], [2,0]]
        ];
    
        let roundWon = false;
        for(let condition of winConditions){
            const [a, b, c] = condition;
            const cellA = boardGame.board[a[0]][a[1]];
            const cellB = boardGame.board[b[0]][b[1]];
            const cellC = boardGame.board[c[0]][c[1]];
    
            // Check if cells are not empty and match
            if(cellA && cellA === cellB && cellB === cellC){
                roundWon = true;
                break;
            }
        }
    
        const isBoardFull = boardGame.board.every(row => row.every(cell => cell !== ""));
    
        if (roundWon){
            gameInitialize.gameStatus.textContent = `${playercontrol.activePlayer} wins!`;
            running = false;
        }
        else if(isBoardFull){
            gameInitialize.gameStatus.textContent = `Draw!`;
            running = false;
        }
        else {
            playercontrol.changeActivePlayer();
        }
    }
}

gameController();