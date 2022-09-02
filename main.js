// const testBoard = [
//     'x', 'o', 'x',
//     'x', 'o', 'x',
//     'x', 'o', 'x',
// ]

// Renders board and updates to it, also contains logic for board squares themselves
const gameBoard = (() => {
    const _elBoard = document.querySelector('#game-board');
    const [elScore1, elScore2] = [...document.querySelectorAll('.game-score')];
    const board = [];
    const _result = document.querySelector('#game-result');
    const _initBoard = (() => {
        for (let i = 0; i < 9; i++) {
            let boardSquare = document.createElement('div');
            boardSquare.classList.add('board-square');
            boardSquare.addEventListener('click', (e) => {
                updateSquare(e.target);
            })
        board.push(_elBoard.appendChild(boardSquare));
        }
    })();
    function resetBoard() {
        for(el of board) {
            el.removeAttribute('value');
            el.textContent = '';
        }
    }
    const getSquarePlayer = (index) => {
        return board[index].getAttribute('value');
    }
    const updateSquare = (square) => {
        if(square.getAttribute('value')) return;
        square.setAttribute('value', game.getPlayerName());
        square.textContent = game.getMarker();
        game.turn();
    }
    function displayWinner(winnerName) {
        _result.textContent = `${winnerName} wins!`;
    }
    function updateScore(score1, score2) {
        elScore1.textContent = score1;
        elScore2.textContent = score2;
    }
    return {
        getSquarePlayer,
        displayWinner,
        resetBoard,
        updateScore,
    }
})();

// Player attributes
function player(marker, name) {
    return {
        marker,
        name,
    }
}

// Handles game logic and state
const game = (() => {
    const markers = ['X', 'O']
    const player1 = player(markers[0], 'player 1');
    const player2 = player(markers[1], 'player 2');
    const score = {
        [player1.name]: 0,
        [player2.name]: 0,
    };
    let currentPlayer = player1;
    // Called when player makes a move
    const turn = () => {
        const winner = getWinner();
        if(winner) {
            _incrementScore(winner);
            gameBoard.displayWinner(winner);
            gameBoard.updateScore(score[player1.name], score[player2.name]);
            gameBoard.resetBoard();
            
            
        }
        _changePlayer()
    }
    const _changePlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
    const getMarker = () => currentPlayer.marker;
    const getPlayerName = () => currentPlayer.name;
    const _checkSequence = (initial, increment) => {
        let firstMark = gameBoard.getSquarePlayer(initial);
        if (!firstMark) return false;
        for (let i = initial + increment; 
            i <= initial + increment * 2; 
            i += increment) {
            if(gameBoard.getSquarePlayer(i) != firstMark) return null;
        }
        return firstMark;
    }
    const _checkRows = () => {
        // (+3, +1)
        // 0 1 2 
        // 3 4 5 
        // 6 7 8
        for (i = 0; i <= 6; i += 3) {
            const winner = _checkSequence(i, 1);
            if(winner) return winner;
        }
        return null;
    }
    const _checkCols = () => {
        // (+1 +3)
        // 0 3 6 
        // 1 4 7 
        // 2 5 8 
        for (i = 0; i <= 2; i++) {
            const winner = _checkSequence(i, 3);
            if(winner) return winner;
        }
        return null;
    }
    const _checkDiagonals = () => {
        // 0 4 8 (+4)
        // 2 4 6 (+2)
        return _checkSequence(0, 4) || _checkSequence(2, 2);
    }
    // Returns null if no winner, else returns the winner
    const getWinner = () => _checkRows() || _checkCols() || _checkDiagonals();
    const _incrementScore = (playerName) => score[playerName]++;
    return {
        turn,
        getMarker,
        getPlayerName,
    }
})();