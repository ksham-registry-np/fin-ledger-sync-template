The existing README has several inaccuracies when compared to the actual codebase:

1. **Test framework mismatch**: README mentions `mocha` but tests use Jest syntax (`expect().toEqual()`)
2. **File structure discrepancy**: README mentions only `reconciler.js` and `package.json` but actual structure has `starter/`, `verifier/`, and `manifest.json`
3. **Test data format mismatch**: README describes transaction objects with `{id, amount_cents, timestamp}` but tests use simple strings
4. **Missing starter template explanation**: No mention of the starter vs main implementation structure
5. **Incomplete installation/usage instructions**

Here's the corrected README.md:

```markdown
# fin-ledger-sync-template

## Challenge: The Indiranagar Ledger Reconciliation Hub (Performance Engineering)

### Scenario
You are a Core Engineer at a fintech infrastructure company based in Indiranagar. We provide ledger syncing services for high-volume merchants. Every night, we need to reconcile the bank's transaction logs against our internal ledger to identify missing payments.

Currently, the reconciliation script takes **6 hours** to run for only 100,000 transactions. The nested loop implementation results in **O(n²)** time complexity, preventing us from scaling to millions of transactions.

### The Problem
The current `reconciler.js` uses nested loops to find missing transactions, resulting in **O(n * m)** time complexity. With datasets of 100k+ rows, execution time grows exponentially, hitting CPU timeouts in serverless environments.

## Project Structure
```
fin-ledger-sync-template/
├── README.md
├── manifest.json
├── package.json                 # Main project with Mocha
├── src/
│   └── reconciler.js           # Optimized O(n) implementation
├── starter/
│   ├── package.json            # Starter template with Jest
│   └── src/
│       └── reconciler.js       # O(n²) problematic implementation
└── verifier/
    └── reconciler.test.js      # Performance and correctness tests
```

## Installation

### For the main optimized version:
```bash
npm install
npm test
```

### For the starter template:
```bash
cd starter
npm install
npm test
```

## Usage

The reconciliation function identifies transactions present in bank logs but missing from internal logs:

```javascript
const reconcile = require('./src/reconciler');

// Example usage
const bankLogs = ['TX1', 'TX2', 'TX3', 'TX4'];
const internalLogs = ['TX1', 'TX3'];

const missingTransactions = reconcile(bankLogs, internalLogs);
console.log(missingTransactions); // ['TX2', 'TX4']
```

## Your Task: High-Performance Sync

Refactor the reconciliation logic in `starter/src/reconciler.js` to achieve **O(n + m)** time complexity using efficient data structures like `Set` or `Map`.

### Requirements:
1. **Linear Time Complexity**: Process 100,000 transactions in under **500ms**
2. **Zero False Positives**: Every transaction in bank logs but missing in internal logs must be identified
3. **No Nested Loops**: Eliminate `Array.includes()` or `Array.find()` within loops

### Success Criteria:
- ✅ **Performance**: Processes 100k records in <500ms  
- ✅ **Correctness**: Identifies exactly 100 missing transactions in test dataset
- ✅ **Complexity**: O(n + m) time using Set/Map data structures

## Tech Stack

- **Runtime**: Node.js
- **Testing**: Jest (starter), Mocha (main)
- **Algorithm**: Set-based lookup for O(1) transaction matching
- **Data Structure**: Transaction IDs as strings

## Performance Benchmark

The verifier tests enforce:
- **Correctness**: Must identify missing transactions accurately
- **Performance**: Must complete 100k record reconciliation in under 500ms
- **Scalability**: Linear time complexity for production workloads

## Scale-Up Considerations

For production environments, consider:
- **Memory Management**: Node.js Streams for large datasets (50GB+ files)
- **Fuzzy Matching**: Handle timestamp variations between systems  
- **Parallelism**: Worker threads for multi-core processing
- **External Sort**: Handle datasets larger than available RAM

---

**Note**: The `src/reconciler.js` contains the optimized O(n) solution, while `starter/src/reconciler.js` contains the problematic O(n²) implementation that needs optimization.
```