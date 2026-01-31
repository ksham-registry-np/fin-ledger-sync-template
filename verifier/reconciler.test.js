const reconcile = require('../src/reconciler');

describe('FinTech Ledger Performance Audit', () => {
    it('should correctly identify missing transactions', () => {
        const bank = ['TX1', 'TX2', 'TX3', 'TX4'];
        const internal = ['TX1', 'TX3'];
        expect(reconcile(bank, internal)).toEqual(['TX2', 'TX4']);
    });

    it('should complete within 500ms for 100,000 records', () => {
        const size = 100000;
        const bank = Array.from({ length: size }, (_, i) => `TX${i}`);
        const internal = Array.from({ length: size - 100 }, (_, i) => `TX${i}`);

        const start = Date.now();
        const result = reconcile(bank, internal);
        const end = Date.now();

        expect(result.length).toBe(100);
        expect(end - start).toBeLessThan(500); // Enforce O(n) or O(n log n)
    });
});
