const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

describe('Tic Tac Virus Game Logic', () => {
    let dom;
    let window;
    let document;
    let gameLogic;

    before(async () => {
        const html = fs.readFileSync(path.resolve(__dirname, '../tic-tac-virus.html'), 'utf8');
        dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
        window = dom.window;
        document = window.document;

        // Wait for scripts to load if any
        await new Promise(resolve => {
            if (window.initializeGame) resolve();
            else {
                window.addEventListener('load', resolve);
                // Fallback for JSDOM
                setTimeout(resolve, 500);
            }
        });
    });

    beforeEach(() => {
        // Reset the game before each test
        if (window.initializeGame) {
            window.initializeGame();
        } else {
            throw new Error('window.initializeGame is not defined');
        }
    });

    it('should initialize a 5x5 board', () => {
        const cells = document.querySelectorAll('.cell');
        assert.strictEqual(cells.length, 25);
    });

    it('should spread infection after a move', () => {
        const board = window.board;
        // Make a move at center (12)
        window.makeMove(12, 'X');

        // Count infected cells
        const infectedX = window.board.filter(v => v === 'iX').length;
        assert.strictEqual(infectedX, 1, 'X should have infected 1 cell');
    });

    it('should cure opponent infection', () => {
        // Set up a situation where O has an infected cell at 13
        window.board[13] = 'iO';
        window.renderBoard();

        // X places at 12 (adjacent to 13)
        window.makeMove(12, 'X');

        assert.notStrictEqual(window.board[13], 'iO', 'Infected O at 13 should be cured by X at 12');
    });

    it('should detect a win with 4 in a row (placed)', () => {
        // Manual win setup for X: 0, 1, 2, 3
        window.board[0] = 'X';
        window.board[1] = 'X';
        window.board[2] = 'X';
        assert.strictEqual(window.checkWin('X'), false);

        window.board[3] = 'X';
        assert.strictEqual(window.checkWin('X'), true);
    });

    it('should detect a win with 4 in a row (mixed)', () => {
        // Mixed: 2 placed, 2 infected
        window.board[10] = 'X';
        window.board[11] = 'iX';
        window.board[12] = 'X';
        window.board[13] = 'iX';

        assert.strictEqual(window.checkWin('X'), true);
    });

    it('should NOT detect a win for 3 in a row', () => {
        window.board[0] = 'X';
        window.board[1] = 'X';
        window.board[2] = 'X';
        assert.strictEqual(window.checkWin('X'), false);
    });
});
