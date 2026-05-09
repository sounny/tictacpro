const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.resolve(__dirname, '../tic-tac-gravity.html'), 'utf8');

describe('Tic Tac Gravity Game Logic', function() {
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

    it('should fall to the lowest available spot', async function() {
        await select2PlayerMode();
        const cells = document.querySelectorAll('.cell');

        // Click top-middle cell (index 1)
        cells[1].click();

        // Should end up in bottom-middle cell (index 7)
        assert.strictEqual(cells[7].textContent, 'X');
        assert.strictEqual(cells[1].textContent, '');

        // Click top-middle again
        cells[1].click();

        // Should end up in middle-middle cell (index 4)
        assert.strictEqual(cells[4].textContent, 'O');
    });
});
