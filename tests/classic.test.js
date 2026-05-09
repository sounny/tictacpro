const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.resolve(__dirname, '../tic-tac-classic.html'), 'utf8');

describe('Tic Tac Classic Game Logic', function() {
    let dom;
    let window;
    let document;

    beforeEach(async function() {
        // Use a fresh DOM for each test
        dom = new JSDOM(html, {
            runScripts: "dangerously",
            resources: "usable",
            pretendToBeVisual: true
        });
        window = dom.window;
        document = window.document;

        // Mocking window.scrollTo
        window.scrollTo = () => {};

        // Wait for scripts to load and execute
        await new Promise(resolve => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('load', resolve);
            }
        });
    });

    // Helper to wait for any async logic (like timeouts in the game)
    async function wait(ms = 0) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function select2PlayerMode() {
        const vsPlayerButton = document.getElementById('vsPlayer');
        if (!vsPlayerButton) throw new Error('vsPlayer button not found');
        vsPlayerButton.click();
        await wait(50); // Give it a moment to initialize
    }

    async function selectVsComputerMode() {
        const vsComputerButton = document.getElementById('vsComputer');
        if (!vsComputerButton) throw new Error('vsComputer button not found');
        vsComputerButton.click();
        await wait(100); // Give it a moment to initialize
    }

    it('should initialize correctly when mode is selected', async function() {
        await select2PlayerMode();
        const cells = document.querySelectorAll('.cell');
        assert.strictEqual(cells.length, 9);
        assert.strictEqual(document.getElementById('status').textContent.includes("turn"), true);
    });

    it('should switch players after a valid move', async function() {
        await select2PlayerMode();
        const cells = document.querySelectorAll('.cell');

        cells[0].click();
        assert.strictEqual(cells[0].textContent, 'X');
        assert.strictEqual(document.getElementById('status').textContent.includes("Player O's turn"), true);
    });

    it('should not allow playing in an already occupied cell', async function() {
        await select2PlayerMode();
        let cells = document.querySelectorAll('.cell');

        cells[0].click();
        assert.strictEqual(cells[0].textContent, 'X');

        cells[0].click();
        assert.strictEqual(cells[0].textContent, 'X');
        assert.strictEqual(document.getElementById('status').textContent.includes("Player O's turn"), true, 'Player should not have changed');
    });

    describe('Win Detection', function() {
        const winCombinations = [
            { name: 'top row', moves: [0, 3, 1, 4, 2] },
            { name: 'middle row', moves: [3, 0, 4, 1, 5] },
            { name: 'bottom row', moves: [6, 0, 7, 1, 8] },
            { name: 'left column', moves: [0, 1, 3, 4, 6] },
            { name: 'middle column', moves: [1, 0, 4, 3, 7] },
            { name: 'right column', moves: [2, 0, 5, 3, 8] },
            { name: 'main diagonal', moves: [0, 1, 4, 2, 8] },
            { name: 'anti-diagonal', moves: [2, 0, 4, 1, 6] }
        ];

        winCombinations.forEach(function(combo) {
            it(`should detect a win on the ${combo.name}`, async function() {
                await select2PlayerMode();
                for (const move of combo.moves) {
                    const cells = document.querySelectorAll('.cell');
                    cells[move].click();
                }

                assert.strictEqual(document.getElementById('status').textContent.includes('wins'), true, 'Status should mention win');
            });
        });
    });

    it('should detect a draw', async function() {
        await select2PlayerMode();
        const drawMoves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
        for (const move of drawMoves) {
            const cells = document.querySelectorAll('.cell');
            cells[move].click();
        }

        assert.strictEqual(document.getElementById('status').textContent, "It's a Tie!");
    });

    it('should reset the game when the Reset button is clicked', async function() {
        await select2PlayerMode();
        let cells = document.querySelectorAll('.cell');
        cells[0].click(); // X
        cells[1].click(); // O

        const resetButton = document.getElementById('resetButton');
        resetButton.click();
        await wait(50);

        cells = document.querySelectorAll('.cell'); // Re-query after reset/renderBoard
        cells.forEach(cell => {
            assert.strictEqual(cell.textContent, '');
        });
        assert.strictEqual(document.getElementById('status').textContent.includes("turn"), true);
    });

    it('should allow changing game mode', async function() {
        await select2PlayerMode();
        const changeModeButton = document.getElementById('changeModeButton');
        changeModeButton.click();

        assert.strictEqual(document.getElementById('modeSelection').classList.contains('hidden'), false);
        assert.strictEqual(document.getElementById('gameArea').classList.contains('hidden'), true);
    });

    it('should play against the computer', async function() {
        await selectVsComputerMode();

        // Either Player X starts or Computer O starts
        let status = document.getElementById('status').textContent;

        if (status.includes("Computer's (O) thinking")) {
            // Wait for computer move
            await wait(1000);
            status = document.getElementById('status').textContent;
            assert.strictEqual(status.includes("Player X's turn"), true);
            const cells = document.querySelectorAll('.cell');
            const board = Array.from(cells).map(c => c.textContent);
            assert.strictEqual(board.filter(c => c === 'O').length, 1);
        } else {
            assert.strictEqual(status.includes("Player X's turn"), true);
            const cells = document.querySelectorAll('.cell');
            cells[0].click(); // Player X moves

            await wait(100);
            status = document.getElementById('status').textContent;
            assert.strictEqual(status.includes("Computer's (O) thinking"), true);

            await wait(1000);
            status = document.getElementById('status').textContent;
            assert.strictEqual(status.includes("Player X's turn"), true);

            const newCells = document.querySelectorAll('.cell');
            const board = Array.from(newCells).map(c => c.textContent);
            assert.strictEqual(board.filter(c => c === 'X').length, 1);
            assert.strictEqual(board.filter(c => c === 'O').length, 1);
        }
    });
});
