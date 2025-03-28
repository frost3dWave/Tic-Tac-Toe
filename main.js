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
        board[row][column] = marker;
        cell.textContent = marker;
    }
    return {board, cellClicked, updateCell};
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

    return {
        get activePlayer() {
            return getActivePlayer();
        },
        changeActivePlayer
    };
}

function gameController(){
    running = true;
    const gameInitialize = initializeGame();
    const boardGame = gameBoard();
    const playercontrol = playerController(gameInitialize);

    gameInitialize.gameStatus.textContent = `${playercontrol.activePlayer}'s turn`;
    
    gameInitialize.cells.forEach(cell => cell.addEventListener("click", (e) => { 
        
        boardGame.cellClicked(e.target, playercontrol.activePlayer);
        
        checkWinner();
    }));

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
                // console.log("Win condition found!");
                roundWon = true;
                break;
            }
        }
    
        // Check for board fullness (draw)
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
};