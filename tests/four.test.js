const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.resolve(__dirname, '../tic-tac-four.html'), 'utf8');

describe('Tic Tac Four Game Logic', function() {
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
            if (document.readyState === 'complete') resolve();
            else window.addEventListener('load', resolve);
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

    it('should initialize a 4x4 board', async function() {
        await select2PlayerMode();
        const cells = document.querySelectorAll('.cell');
        assert.strictEqual(cells.length, 16);
    });

    it('should detect a row win', async function() {
        await select2PlayerMode();
        // X X X X
        // O O O
        const moves = [0, 4, 1, 5, 2, 6, 3];
        for (const move of moves) {
            const cells = document.querySelectorAll('.cell');
            cells[move].click();
        }
        assert.strictEqual(document.getElementById('status').textContent.includes('wins'), true);
    });

    it('should detect a diagonal win', async function() {
        await select2PlayerMode();
        // X . . .
        // O X . .
        // O . X .
        // O . . X
        const moves = [0, 1, 5, 2, 10, 3, 15];
        for (const move of moves) {
            const cells = document.querySelectorAll('.cell');
            cells[move].click();
        }
        assert.strictEqual(document.getElementById('status').textContent.includes('wins'), true);
    });
});
