const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

describe('Tic Tac Chain Game Logic', () => {
    let dom;
    let window;
    let document;

    beforeEach(() => {
        const html = fs.readFileSync(path.resolve(__dirname, '../tic-tac-chain.html'), 'utf8');
        dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
        window = dom.window;
        document = window.document;
    });

    it('should initialize a 4x4 board', (done) => {
        window.addEventListener('load', () => {
            document.getElementById('vsPlayer').click();
            const cells = document.querySelectorAll('.cell');
            assert.strictEqual(cells.length, 16);
            done();
        });
    });

    it('should detect a chain win', (done) => {
        window.addEventListener('load', () => {
            document.getElementById('vsPlayer').click();

            // X: 0, 1, 2, 3, 4 (Straight line)
            const moves = [0, 8, 1, 9, 2, 10, 3, 11, 4];
            const cells = document.querySelectorAll('.cell');

            moves.forEach(idx => {
                cells[idx].click();
            });

            const status = document.getElementById('status').textContent;
            assert.ok(status.includes('Player X wins'));
            done();
        });
    });

    it('should detect a non-linear chain win', (done) => {
        window.addEventListener('load', () => {
            document.getElementById('vsPlayer').click();

            // X: 0, 1, 5, 6, 10 (L-shape/zig-zag)
            const moves = [0, 15, 1, 14, 5, 13, 6, 12, 10];
            const cells = document.querySelectorAll('.cell');

            moves.forEach(idx => {
                cells[idx].click();
            });

            const status = document.getElementById('status').textContent;
            assert.ok(status.includes('Player X wins'));
            done();
        });
    });
});
