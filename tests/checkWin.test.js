const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Replicated checkWin function from tic-tac-classic.html
let board = ['', '', '', '', '', '', '', '', ''];
function checkWin(player) {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === player);
    });
}

describe('checkWin', () => {
    beforeEach(() => {
        board = ['', '', '', '', '', '', '', '', ''];
    });

    test('detects all winning combinations for X', () => {
        winningConditions.forEach(condition => {
            board = ['', '', '', '', '', '', '', '', ''];
            condition.forEach(i => board[i] = 'X');
            expect(checkWin('X')).toBe(true);
        });
    });

    test('returns false for a non-winning board', () => {
        board = ['X', 'O', 'X',
                 'X', 'O', 'O',
                 'O', 'X', 'X'];
        expect(checkWin('X')).toBe(false);
        expect(checkWin('O')).toBe(false);
    });
});
