# Agent Notes

This repository uses this file to share context between contributors.

## Guidelines
- After completing a task, append a short bullet under **Log** with the date, your name or handle, and a concise description of your changes or ideas for future work.
- Keep notes brief so they are easy to scan.
- Add new bullets to the bottom of the list to maintain order.

## Creating New Tic Tac Toe Variants
Follow these steps when adding a new variant to the collection:

1. **Study the current layout** – each game lives in its own `tic-tac-*.html` file. These pages use Tailwind CSS via CDN and inline JavaScript for the game logic.
2. **Copy an existing page** – `tic-tac-classic.html` is a good starting template. Keep the overall structure and styling consistent.
3. **Keep the style unified** – reuse classes from `style.css` and follow the same header, board and button look so all variants feel part of the same site.
4. **Add your page to `index.html`** – duplicate one of the `<div class="game-card">` blocks and update the title, description and link.
5. **Run `npm test`** – ensure existing tests pass before committing.
6. **Update the variant lists below** – add your new page under **Existing Variants** and remove it from **Proposed Variants** if it was previously listed.

### Existing Variants
The project currently includes the following games:

* Tic Tac Classic
* Tic Tac Two
* Numerical Tic-Tac-Toe
* Tic Tac Decay
* Tic Tac Swap
* Tic Tac Gravity
* Tic Tac Push
* Tic Tac Bomb
* Tic Tac Four
* 3D Tic Tac Toe
* Tic Tac Toe 3D Pro
* Misere Tic-Tac-Toe
* Tic Tac Toroid
* Tic Tac Flip
* Tic Tac Spin
* Tic Tac Teleport
* Tic Tac Ultimate
* Tic Tac Quantum
* Tic Tac Wild
* Tic Tac Duel
* Hex Tac Toe
* Tic Tac Fog
* Tic Tac Blitz
* Tic Tac Five
* Tic Tac Trio
* Twin Tac Toe
* Tic Tac Blind
* Tic Tac Trivia
* Tic Tac Mirror
* Tic Tac Slide
* Tic Tac Freeze
* Tic Tac Time
* Tic Tac Portal
* Tic Tac Wind
* Tic Tac Eclipse

### Proposed Variants
Agents should maintain a list of ideas here. If five similar suggestions accumulate, implement that variant, mark it **done**, and propose another. Otherwise, pick one of your own ideas to implement and add a new suggestion.

* Tic Tac Orbit – edge moves pull the nearest corner one space clockwise *(proposed)*

## Log
- 2025-07-23 ChatGPT: Created `AGENTS.md` and established logging instructions.

- 2025-07-27 ChatGPT: Added instructions for creating variants and listed games.
- 2025-08-12 ChatGPT: Implemented Tic Tac Mirror variant and updated variant lists.
- 2025-02-14 ChatGPT: Implemented Tic Tac Slide variant and updated variant lists.
- 2025-08-12 ChatGPT: Implemented Tic Tac Freeze variant and updated variant lists.
- 2025-08-13 ChatGPT: Implemented Tic Tac Time variant with undo feature and updated variant lists.
- 2025-08-15 ChatGPT: Implemented Tic Tac Portal variant and updated variant lists.
- 2025-08-27 ChatGPT: Implemented Tic Tac Wind variant with gusting rows and updated variant lists.
- 2025-11-21 ChatGPT: Implemented Tic Tac Eclipse variant, updated index, and refreshed variant lists.
