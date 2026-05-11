/**
 * Tic Tac Pro Statistics System
 * Manages persistent scoring using localStorage
 */

const TicTacStats = {
    STORAGE_KEY: 'tictacpro_stats',

    getStats() {
        const stats = localStorage.getItem(this.STORAGE_KEY);
        return stats ? JSON.parse(stats) : {};
    },

    saveStats(stats) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stats));
    },

    /**
     * Records a game result
     * @param {string} variant - The name of the game variant
     * @param {string} result - 'win', 'loss', or 'draw'
     */
    recordResult(variant, result) {
        const stats = this.getStats();
        if (!stats[variant]) {
            stats[variant] = { wins: 0, losses: 0, draws: 0, currentStreak: 0, maxStreak: 0 };
        }

        const vStats = stats[variant];

        if (result === 'win') {
            vStats.wins++;
            vStats.currentStreak++;
            if (vStats.currentStreak > vStats.maxStreak) {
                vStats.maxStreak = vStats.currentStreak;
            }
        } else if (result === 'loss') {
            vStats.losses++;
            vStats.currentStreak = 0;
        } else if (result === 'draw') {
            vStats.draws++;
            vStats.currentStreak = 0;
        }

        this.saveStats(stats);
        this.updateBadge(variant);
    },

    /**
     * Updates the stats badge on the page
     * @param {string} variant
     */
    updateBadge(variant) {
        const stats = this.getStats();
        const vStats = stats[variant] || { wins: 0, losses: 0, draws: 0, currentStreak: 0 };

        const badge = document.getElementById('stats-badge');
        if (badge) {
            badge.innerHTML = `
                <div class="flex justify-center space-x-3 text-xs md:text-sm font-medium text-slate-400">
                    <span title="Wins"><span class="text-emerald-500">W:</span> ${vStats.wins}</span>
                    <span title="Losses"><span class="text-rose-500">L:</span> ${vStats.losses}</span>
                    <span title="Draws"><span class="text-slate-300">D:</span> ${vStats.draws}</span>
                    <span title="Current Win Streak"><span class="text-sky-400">Streak:</span> ${vStats.currentStreak}</span>
                </div>
            `;
        }
    },

    /**
     * Initializes the stats badge for a variant
     * @param {string} variant
     */
    initBadge(variant) {
        // Find the main game container to append the badge
        const container = document.querySelector('.bg-slate-800');
        if (container && !document.getElementById('stats-badge')) {
            const badgeDiv = document.createElement('div');
            badgeDiv.id = 'stats-badge';
            badgeDiv.className = 'mt-6 pt-4 border-t border-slate-700/50';

            // Insert before the "Return to Menu" link if possible, or at the end
            const returnLink = container.querySelector('a[href="index.html"]');
            if (returnLink) {
                container.insertBefore(badgeDiv, returnLink.parentElement);
            } else {
                container.appendChild(badgeDiv);
            }

            this.updateBadge(variant);
        }
    }
};

// Auto-initialize if we can determine the variant from the title
window.addEventListener('DOMContentLoaded', () => {
    const title = document.title;
    if (title && title !== 'Tic Tac Pro - Game Collection') {
        TicTacStats.initBadge(title);
    }
});
