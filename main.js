// const testBoard = [
//     'x', 'o', 'x',
//     'x', 'o', 'x',
//     'x', 'o', 'x',
// ]

// Renders board and updates to it
const gameBoard = (() => {
    const _elBoard = document.querySelector('#game-board')
    const board = [];
    for (let i = 0; i < 9; i++) {
        let boardSquare = document.createElement('div')
        boardSquare.classList.add('board-square')
        boardSquare.addEventListener('click', (e) => {
            updateSquare(e.target)
        })
        board.push(_elBoard.appendChild(boardSquare));
    }
    const getSquareContent = (index) => {
        return board[index].textContent.trim();
    }
    const updateSquare = (square) => {
        if(square.textContent.trim() != "") return;
        square.textContent = game.getMarker();
        game.turn();
    }
    return {
        getSquareContent,
    }
})();

// Player attributes
function player(marker) {
    return {
        marker,
    }
}

// Handles game logic and state
const game = (() => {
    const markers = ['X', 'O']
    const player1 = player(markers[0]);
    const player2 = player(markers[1]);
    let currentPlayer = player1;
    // Called when player makes a move
    const turn = () => {
        console.log('is win:',_isWin());
        _changePlayer()
    }
    const _changePlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
    const getMarker = () => currentPlayer.marker;
    const _checkSequence = (initial, increment) => {
        let firstMark = gameBoard.getSquareContent(initial);
        if (firstMark === '') return false;
        for (let i = initial + increment; 
            i <= initial + increment * 2; 
            i += increment) {
            if(gameBoard.getSquareContent(i) != firstMark) return false;
        }
        return true;
    }
    const _checkRows = () => {
        // (+3, +1)
        // 0 1 2 
        // 3 4 5 
        // 6 7 8
        for (i = 0; i <= 6; i += 3) {
            if(_checkSequence(i, 1)) return true;
        }
        return false;
    }
    
    const _checkCols = () => {
        // (+1 +3)
        // 0 3 6 
        // 1 4 7 
        // 2 5 8 
        for (i = 0; i <= 2; i++) {
            if(_checkSequence(i, 3)) return true;
        }
        return false;
    }
    const _checkDiagonals = () => {
        // 0 4 8 (+4)
        // 2 4 6 (+2)
        return _checkSequence(0, 4) || _checkSequence(2, 2);
    }
    const _isWin = () => _checkRows() || _checkCols() || _checkDiagonals();
    return {
        turn,
        getMarker,
    }
})();