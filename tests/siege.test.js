const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.resolve(__dirname, '../tic-tac-siege.html'), 'utf8');

describe('Tic Tac Siege Game Logic', function() {
    let dom;
    let window;
    let document;

    beforeEach(async function() {
        dom = new JSDOM(html, {
            runScripts: "dangerously",
            resources: "usable",
            pretendToBeVisual: true
        });
        window = dom.window;
        document = window.document;

        window.scrollTo = () => {};

        await new Promise(resolve => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('load', resolve);
            }
        });
    });

    async function wait(ms = 0) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function select2PlayerMode() {
        const vsPlayerButton = document.getElementById('vsPlayer');
        vsPlayerButton.click();
        await wait(50);
    }

    it('should initialize a 5x5 grid', async function() {
        await select2PlayerMode();
        const cells = document.querySelectorAll('.cell');
        assert.strictEqual(cells.length, 25);
    });

    it('should place a wall and decrement wall count', async function() {
        await select2PlayerMode();
        const wallButton = document.getElementById('wallButton');
        const playerXStatus = document.getElementById('playerXStatus');

        assert.strictEqual(playerXStatus.textContent, 'Player X Walls: 3');

        wallButton.click();
        await wait(10);
        let cells = document.querySelectorAll('.cell');
        cells[0].click();
        await wait(50); // wait for render

        cells = document.querySelectorAll('.cell');
        assert.strictEqual(cells[0].textContent, '■');
        assert.strictEqual(playerXStatus.textContent, 'Player X Walls: 2');
        assert.strictEqual(document.getElementById('status').textContent.includes("Player O's turn"), true);
    });

    it('should win with 4 in a row', async function() {
        await select2PlayerMode();
        // X: 0, 1, 2, 3
        // O: 5, 6, 7
        const moves = [0, 5, 1, 6, 2, 7, 3];
        const cells = document.querySelectorAll('.cell');

        for (const move of moves) {
            cells[move].click();
            await wait(10);
        }

        assert.strictEqual(document.getElementById('status').textContent.includes('Wins'), true);
    });

    it('should not allow placing piece on a wall', async function() {
        await select2PlayerMode();
        const wallButton = document.getElementById('wallButton');

        // Player X places wall at 0
        wallButton.click();
        await wait(10);
        let cells = document.querySelectorAll('.cell');
        cells[0].click();
        await wait(50);

        // Player O tries to place piece at 0
        cells = document.querySelectorAll('.cell');
        cells[0].click();
        await wait(50);

        assert.strictEqual(cells[0].textContent, '■');
        assert.strictEqual(document.getElementById('status').textContent.includes("Player O's turn"), true);
    });
});
