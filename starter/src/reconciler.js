/**
 * THE INDIRANAGAR LEDGER RECONCILIATION HUB
 * 
 * Your goal: Optimize the reconciliation logic from O(n^2) to O(n).
 */

/**
 * RECONCILE:
 * Identifies transactions in bankLogs that are missing from internalLogs.
 * 
 * @param {Array} bankLogs - Array of { id, amount_cents, timestamp }
 * @param {Array} internalLogs - Array of { id, amount_cents, timestamp }
 * @returns {Array} - Missing transactions
 */
function reconcile(bankLogs, internalLogs) {
    const missing = [];

    // VULNERABILITY: O(n * m) complexity.
    // 'Array.includes()' or 'Array.find()' inside a loop is the classic O(n^2) trap.
    for (const bankTx of bankLogs) {
        let found = false;
        for (const internalTx of internalLogs) {
            if (bankTx.id === internalTx.id) {
                found = true;
                break;
            }
        }

        if (!found) {
            missing.push(bankTx);
        }
    }

    return missing;
}

module.exports = reconcile;
