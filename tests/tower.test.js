const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.resolve(__dirname, '../tic-tac-tower.html'), 'utf8');

describe('Tic Tac Tower Game Logic', function() {
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

    async function wait(ms = 0) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function select2PlayerMode() {
        const vsPlayerButton = document.getElementById('vsPlayer');
        if (!vsPlayerButton) throw new Error('vsPlayer button not found');
        vsPlayerButton.click();
        await wait(100);
    }

    function getCells() {
        return document.querySelectorAll('.cell');
    }

    it('should initialize correctly with empty board', async function() {
        await select2PlayerMode();
        const cells = getCells();
        assert.strictEqual(cells.length, 9);
        cells.forEach(cell => {
            const indicator = cell.querySelector('.height-indicator');
            assert.strictEqual(indicator, null);
        });
    });

    it('should allow stacking up to 3 high', async function() {
        await select2PlayerMode();

        // 1st move (X)
        getCells()[0].click();
        await wait(50);
        assert.strictEqual(getCells()[0].querySelector('.height-indicator').textContent, '1');
        assert.strictEqual(document.getElementById('status').textContent.toLowerCase().includes("o's turn"), true);

        // 2nd move (O) - stack on top of X
        getCells()[0].click();
        await wait(50);
        assert.strictEqual(getCells()[0].querySelector('.height-indicator').textContent, '2');
        assert.strictEqual(document.getElementById('status').textContent.toLowerCase().includes("x's turn"), true);

        // 3rd move (X) - stack on top of O
        getCells()[0].click();
        await wait(50);
        assert.strictEqual(getCells()[0].querySelector('.height-indicator').textContent, '3');
        assert.strictEqual(document.getElementById('status').textContent.toLowerCase().includes("o's turn"), true);

        // 4th move (O) - should FAIL because full
        getCells()[0].click();
        await wait(50);
        assert.strictEqual(getCells()[0].querySelector('.height-indicator').textContent, '3');
        assert.strictEqual(document.getElementById('status').textContent.toLowerCase().includes("o's turn"), true);
    });

    it('should detect win based on TOP pieces', async function() {
        await select2PlayerMode();

        // X: 0, 4, 8 (diag)
        // O: tries to block by stacking on 4

        getCells()[0].click(); // X -> 0 [X]
        await wait(50);
        getCells()[1].click(); // O -> 1 [O]
        await wait(50);
        getCells()[4].click(); // X -> 4 [X]
        await wait(50);
        getCells()[4].click(); // O -> 4 [X, O] (O reclaimed center)
        await wait(50);
        getCells()[8].click(); // X -> 8 [X]
        await wait(50);

        // Current tops:
        // 0: X, 1: O, 4: O, 8: X
        assert.strictEqual(document.getElementById('status').textContent.toLowerCase().includes("wins"), false);

        getCells()[2].click(); // O -> 2 [O]
        await wait(50);
        getCells()[4].click(); // X -> 4 [X, O, X] (X reclaimed center back)
        await wait(50);

        // Now tops: 0: X, 4: X, 8: X -> WIN
        assert.strictEqual(document.getElementById('status').textContent.toLowerCase().includes("x wins"), true);
    });

    it('should reset correctly', async function() {
        await select2PlayerMode();
        getCells()[0].click();
        await wait(50);
        getCells()[0].click();
        await wait(50);

        const resetButton = document.getElementById('resetButton');
        resetButton.click();
        await wait(100);

        const cells = getCells();
        assert.strictEqual(cells[0].querySelector('.height-indicator'), null);
    });
});
