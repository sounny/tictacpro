const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.resolve(__dirname, '../tic-tac-evolve.html'), 'utf8');

describe('Tic Tac Evolve Game Logic', function() {
    this.timeout(30000);
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
        // Mock requestAnimationFrame
        window.requestAnimationFrame = (callback) => setTimeout(callback, 0);

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
        await wait(100);
    }

    it('should initialize a 4x4 board', async function() {
        await select2PlayerMode();
        const cells = document.querySelectorAll('.cell');
        assert.strictEqual(cells.length, 16);
    });

    it('should evolve pieces at the start of a turn', async function() {
        await select2PlayerMode();

        // Player X places a seed at index 0
        document.querySelector('.cell[data-index="0"]').click();
        await wait(100);

        // Player O places a seed at index 1
        document.querySelector('.cell[data-index="1"]').click();
        await wait(1500);

        // Now it's Player X's turn again. X's piece at 0 should have evolved to SPROUT.
        const cell0 = document.querySelector('.cell[data-index="0"]');
        const piece = cell0.querySelector('.piece');
        assert.ok(piece !== null, 'Piece at index 0 should exist');
        assert.ok(piece.classList.contains('stage-sprout'), 'X piece at index 0 should be sprout');
    });

    it('should allow stomping an opponent sprout', async function() {
        await select2PlayerMode();

        // Turn 1: X places at 0
        document.querySelector('.cell[data-index="0"]').click();
        await wait(100);
        // Turn 2: O places at 1
        document.querySelector('.cell[data-index="1"]').click();
        await wait(1500);
        // Now it is X's turn (Turn 3). X piece at 0 is SPROUT.
        // X places at 2.
        document.querySelector('.cell[data-index="2"]').click();
        await wait(1500);
        // Now it is O's turn (Turn 4). O piece at 1 is SPROUT.

        // O should be able to stomp X's sprout at 0
        document.querySelector('.cell[data-index="0"]').click();
        await wait(100);

        const cell0 = document.querySelector('.cell[data-index="0"]');
        const piece = cell0.querySelector('.piece');
        assert.ok(piece !== null, 'Piece at index 0 should exist');
        assert.ok(piece.classList.contains('player-o'), 'Index 0 should now be owned by Player O');
        assert.ok(piece.classList.contains('stage-seed'), 'Stomped piece should be a seed');
    });

    it('should detect a win with 4 blooms', async function() {
        await select2PlayerMode();

        // Simulating enough turns for Blooms to appear and form a line
        document.querySelector('.cell[data-index="0"]').click(); await wait(100);
        document.querySelector('.cell[data-index="4"]').click(); await wait(1500);
        document.querySelector('.cell[data-index="1"]').click(); await wait(1500);
        document.querySelector('.cell[data-index="5"]').click(); await wait(1500);
        document.querySelector('.cell[data-index="2"]').click(); await wait(1500);
        document.querySelector('.cell[data-index="6"]').click(); await wait(1500);
        document.querySelector('.cell[data-index="3"]').click(); await wait(1500);
        document.querySelector('.cell[data-index="7"]').click(); await wait(1500);
        document.querySelector('.cell[data-index="8"]').click(); await wait(1500);
        document.querySelector('.cell[data-index="9"]').click(); await wait(1500);

        assert.strictEqual(document.getElementById('status').textContent.includes('Player X Wins'), true);
    });
});
