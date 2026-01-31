# Challenge: The Indiranagar Ledger Reconciliation Hub (Performance Engineering)

## Scenario
You are a Core Engineer at a fintech infrastructure company based in Indiranagar. We provide ledger syncing services for high-volume merchants. Every night, we need to reconcile the bank's transaction logs against our internal internal ledger to identify missing payments.

Currently, the reconciliation script takes **6 hours** to run for only 100,000 transactions. As our merchant base grows, this O(n^2) bottleneck is preventing us from scaling. We need a "Deep Basics" performance overhaul to process millions of transactions in seconds.

## The Technical Debt
The current `reconciler.js` uses a nested loop (`Array.includes()`) to find missing transactions. This results in **O(n * m)** time complexity. With datasets of 100k+ rows, the execution time grows exponentially, hitting CPU timeouts in our serverless environments.

## Your Task: "High-Performance" Sync
Refactor the reconciliation logic to achieve **O(n + m)** time complexity. You must move away from nested loops and use efficient data structures like `Sets` or `Maps`.

### Requirements:
1.  **Linear Time Complexity**: The algorithm must process 100,000 transactions in under **100ms**.
2.  **Structured Data Handling**: Transactions are objects with `id`, `amount_cents`, and `timestamp`.
3.  **Accuracy**: Zero false positives. Every transaction present in the bank log but missing in the internal log must be identified.

## The Scale-Up (Stretch Goals)
*In a real tech round, we would discuss these next steps:*
- **Memory Management**: If the logs are too large to fit in RAM (e.g., 50GB Google-Cloud-Storage buckets), how would you use **Node.js Streams** or **External Merge Sort**?
- **Fuzzy Matching**: How would you handle transactions where the timestamp differs by a few seconds but everything else is identical?
- **Parallelism**: Would worker threads help speed up the reconciliation?

## Success Criteria
- **Performance Benchmark**: Processes a 100k row dataset in under 100ms.
- **Big-O Verification**: No nested loops or `Array.includes()` allowed within the main reconciliation loop.
- **Null Safety**: Gracefully handles malformed transaction objects or empty logs.

---

## Starter Code (Node.js)
- `reconciler.js`: The file where you'll implement the O(n) algorithm.
- `package.json`: Benchmarking dependencies.
