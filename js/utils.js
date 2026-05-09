/**
 * Utility functions for Tic Tac Pro games.
 */
window.TicTacUtils = {
    /**
     * Shows a message in the game's outcome modal.
     * @param {string} message - The message to display.
     * @param {HTMLElement} modalElement - The modal DOM element.
     * @param {HTMLElement} messageElement - The element where the message is shown.
     */
    showModal: function(message, modalElement, messageElement) {
        if (!modalElement || !messageElement) return;
        messageElement.textContent = message;
        modalElement.style.display = 'flex';
    },

    /**
     * Closes the game outcome modal.
     * @param {HTMLElement} modalElement - The modal DOM element.
     */
    closeModal: function(modalElement) {
        if (!modalElement) return;
        modalElement.style.display = 'none';
    },

    /**
     * Toggles interaction with the game board cells.
     * @param {boolean} enable - Whether to enable or disable interaction.
     * @param {string} cellSelector - CSS selector for the game cells.
     */
    toggleBoardInteraction: function(enable, cellSelector = '.cell') {
        const cells = document.querySelectorAll(cellSelector);
        cells.forEach(cell => {
            if (enable) {
                cell.style.pointerEvents = 'auto';
                cell.style.opacity = '1';
            } else {
                cell.style.pointerEvents = 'none';
                cell.style.opacity = '0.7';
            }
        });
    },

    /**
     * Standard win checking logic.
     * @param {Array<string>} board - The board state.
     * @param {Array<Array<number>>} conditions - Winning combinations.
     * @param {string} player - The player mark.
     * @returns {boolean}
     */
    checkWin: function(board, conditions, player) {
        if (!board || !conditions || !player) return false;
        return conditions.some(condition => {
            return condition.every(index => board[index] === player);
        });
    }
};

// Global error handling for debugging
window.onerror = function(message, source, lineno, colno, error) {
    console.error("Global error caught:", message, "at", source, ":", lineno);
    return false;
};
