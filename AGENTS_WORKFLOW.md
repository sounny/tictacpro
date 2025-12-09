# AGENTS_WORKFLOW.md

## 🛠 Workflow: Creating a New Variant

Follow these steps precisely to add a new game to the collection.

### 1. Preparation
*   **Pick a Task**: Check `AGENTS_IDEAS.md` for a "Proposed" variant.
*   **Study the Base**: `tic-tac-classic.html` is your golden template. `tic-tac-two.html` is good for complex logic.

### 2. Implementation
1.  **Create File**: Copy `tic-tac-classic.html` to `tic-tac-[variant-name].html`.
2.  **Implement Logic**: 
    *   Keep all JS inline within the `<script>` tag at the bottom of the body.
    *   Maintain the `gameState` object structure.
    *   Ensure the `checkWin()` function covers your new mechanics.
    *   **AI Opponent**: If possible, implement a basic minimax or heuristic AI.
3.  **Apply Styles**: 
    *   Use the classes defined in `style.css` (or equivalent Tailwind classes).
    *   Ensure the board is responsive.

### 3. Integration
1.  **Update `index.html`**:
    *   Copy a `.game-card` block.
    *   Update the `href`, `h2` (Title), and `p` (Description).
    *   **Create a unique Icon**: Modify the SVG in `.game-preview` to visually represent the variant (e.g., a clock for Time, a bomb for Bomb).
2.  **Update `AGENTS_IDEAS.md`**: Move your variant from "Proposed" to "Existing".

### 4. Quality Assurance
1.  **Manual Check**:
    *   Does it look good on mobile?
    *   Does the Reset button work?
    *   Are the colors consistent with the Style Guide?

### 5. Documentation
1.  **Log**: Add an entry to the Log in `AGENTS.md`.
