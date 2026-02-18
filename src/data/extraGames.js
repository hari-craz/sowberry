// ═══════════════════════════════════════════════════════════════════
//  EXTRA 33 CODE CHALLENGES & GAMES  (IDs 13–45)
//  Each new game maps to one of the 12 original game "types"
//  so the same interactive template is reused with a unique
//  code-challenge gate.
// ═══════════════════════════════════════════════════════════════════

export const EXTRA_CHALLENGES = {

  // ────────── SORTING FAMILY ──────────
  selection_sort: {
    title: 'Selection Sort',
    description: 'Implement selection sort that sorts an array in ascending order.\n\nFunction: selectionSort(arr) → sorted array',
    boilerplate: 'function selectionSort(arr) {\n  // Find minimum element, swap with first unsorted position\n  return arr;\n}',
    testCases: [{ input: '[64,25,12,22,11]', expected: '[11,12,22,25,64]' }, { input: '[5,1,4,2,8]', expected: '[1,2,4,5,8]' }],
    hint: 'Loop i from 0 to n-1. Find the minimum in arr[i..n-1] and swap it with arr[i].',
    validator: (code) => { try { const fn = new Function(code + '; return selectionSort;')(); return JSON.stringify(fn([64,25,12,22,11])) === '[11,12,22,25,64]' && JSON.stringify(fn([5,1,4,2,8])) === '[1,2,4,5,8]'; } catch { return false; } }
  },
  insertion_sort: {
    title: 'Insertion Sort',
    description: 'Implement insertion sort that sorts an array in ascending order.\n\nFunction: insertionSort(arr) → sorted array',
    boilerplate: 'function insertionSort(arr) {\n  // Insert each element into its correct position\n  return arr;\n}',
    testCases: [{ input: '[12,11,13,5,6]', expected: '[5,6,11,12,13]' }, { input: '[4,3,2,10,12,1,5,6]', expected: '[1,2,3,4,5,6,10,12]' }],
    hint: 'For each element starting from index 1, shift larger elements right and insert in the correct spot.',
    validator: (code) => { try { const fn = new Function(code + '; return insertionSort;')(); return JSON.stringify(fn([12,11,13,5,6])) === '[5,6,11,12,13]' && JSON.stringify(fn([4,3,2,10,12,1,5,6])) === '[1,2,3,4,5,6,10,12]'; } catch { return false; } }
  },
  merge_sort: {
    title: 'Merge Sort',
    description: 'Implement merge sort using divide and conquer.\n\nFunction: mergeSort(arr) → sorted array',
    boilerplate: 'function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  // Split, sort halves, merge\n  return arr;\n}',
    testCases: [{ input: '[38,27,43,3,9,82,10]', expected: '[3,9,10,27,38,43,82]' }, { input: '[5,2,8,1,9]', expected: '[1,2,5,8,9]' }],
    hint: 'Split array in half, recursively sort each half, then merge the two sorted halves using two pointers.',
    validator: (code) => { try { const fn = new Function(code + '; return mergeSort;')(); return JSON.stringify(fn([38,27,43,3,9,82,10])) === '[3,9,10,27,38,43,82]' && JSON.stringify(fn([5,2,8,1,9])) === '[1,2,5,8,9]'; } catch { return false; } }
  },
  quick_sort: {
    title: 'Quick Sort',
    description: 'Implement quick sort.\n\nFunction: quickSort(arr) → sorted array',
    boilerplate: 'function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  // Pick pivot, partition, recurse\n  return arr;\n}',
    testCases: [{ input: '[10,7,8,9,1,5]', expected: '[1,5,7,8,9,10]' }, { input: '[3,6,8,10,1,2,1]', expected: '[1,1,2,3,6,8,10]' }],
    hint: 'Choose a pivot (e.g. last element). Partition into elements < pivot, equal, > pivot. Recursively sort the partitions.',
    validator: (code) => { try { const fn = new Function(code + '; return quickSort;')(); return JSON.stringify(fn([10,7,8,9,1,5])) === '[1,5,7,8,9,10]' && JSON.stringify(fn([3,6,8,10,1,2,1])) === '[1,1,2,3,6,8,10]'; } catch { return false; } }
  },
  counting_sort: {
    title: 'Counting Sort',
    description: 'Implement counting sort for non-negative integers.\n\nFunction: countingSort(arr) → sorted array',
    boilerplate: 'function countingSort(arr) {\n  // Count occurrences, rebuild sorted array\n  return arr;\n}',
    testCases: [{ input: '[4,2,2,8,3,3,1]', expected: '[1,2,2,3,3,4,8]' }, { input: '[1,0,3,1,3,1]', expected: '[0,1,1,1,3,3]' }],
    hint: 'Find the max value, create a count array of that size, count each element, then rebuild from counts.',
    validator: (code) => { try { const fn = new Function(code + '; return countingSort;')(); return JSON.stringify(fn([4,2,2,8,3,3,1])) === '[1,2,2,3,3,4,8]' && JSON.stringify(fn([1,0,3,1,3,1])) === '[0,1,1,1,3,3]'; } catch { return false; } }
  },

  // ────────── SEARCHING FAMILY ──────────
  linear_search: {
    title: 'Linear Search',
    description: 'Implement linear search returning the index of the target, or -1 if not found.\n\nFunction: linearSearch(arr, target) → index',
    boilerplate: 'function linearSearch(arr, target) {\n  // Check each element one by one\n  return -1;\n}',
    testCases: [{ input: '[10,20,30,40,50], 30', expected: '2' }, { input: '[5,8,1,3], 7', expected: '-1' }],
    hint: 'Iterate through the array. Return the index when element === target.',
    validator: (code) => { try { const fn = new Function(code + '; return linearSearch;')(); return fn([10,20,30,40,50], 30) === 2 && fn([5,8,1,3], 7) === -1 && fn([1,2,3], 1) === 0; } catch { return false; } }
  },
  jump_search: {
    title: 'Jump Search',
    description: 'Implement jump search on a sorted array. Jump by √n steps, then do linear search in the block.\n\nFunction: jumpSearch(arr, target) → index or -1',
    boilerplate: 'function jumpSearch(arr, target) {\n  const n = arr.length;\n  const step = Math.floor(Math.sqrt(n));\n  // Jump then linear search\n  return -1;\n}',
    testCases: [{ input: '[0,1,2,3,5,8,13,21,34], 13', expected: '6' }, { input: '[1,3,5,7,9], 4', expected: '-1' }],
    hint: 'Jump ahead by √n until arr[min(step, n)-1] >= target. Then linear search backwards in that block.',
    validator: (code) => { try { const fn = new Function(code + '; return jumpSearch;')(); return fn([0,1,2,3,5,8,13,21,34], 13) === 6 && fn([1,3,5,7,9], 4) === -1 && fn([1,3,5,7,9], 7) === 3; } catch { return false; } }
  },
  range_sum: {
    title: 'Prefix Sum – Range Query',
    description: 'Build a prefix sum and answer range sum queries in O(1).\n\nFunction: rangeSum(arr, l, r) → sum of arr[l..r] inclusive',
    boilerplate: 'function rangeSum(arr, l, r) {\n  // Build prefix sums for O(1) range queries\n  return 0;\n}',
    testCases: [{ input: '[1,2,3,4,5], 1, 3', expected: '9' }, { input: '[10,20,30], 0, 2', expected: '60' }],
    hint: 'Compute prefix[i] = arr[0]+…+arr[i]. Then rangeSum(l,r) = prefix[r] - (l > 0 ? prefix[l-1] : 0).',
    validator: (code) => { try { const fn = new Function(code + '; return rangeSum;')(); return fn([1,2,3,4,5], 1, 3) === 9 && fn([10,20,30], 0, 2) === 60 && fn([5,5,5,5], 0, 0) === 5; } catch { return false; } }
  },

  // ────────── GRAPH / MAZE FAMILY ──────────
  dfs_traversal: {
    title: 'DFS Graph Traversal',
    description: 'Implement Depth-First Search on an adjacency list.\n\nFunction: dfs(graph, start) → array of visited nodes in DFS order\ngraph: object {0:[1,2], 1:[0,3], …}',
    boilerplate: 'function dfs(graph, start) {\n  const visited = [];\n  // Use stack or recursion\n  return visited;\n}',
    testCases: [{ input: '{0:[1,2], 1:[3], 2:[], 3:[]}, 0', expected: '[0,1,3,2]' }, { input: '{0:[1], 1:[2], 2:[]}, 0', expected: '[0,1,2]' }],
    hint: 'Use a stack (push start). Pop a node, if not visited mark it and push its neighbors.',
    validator: (code) => { try { const fn = new Function(code + '; return dfs;')(); const r1 = fn({0:[1,2],1:[3],2:[],3:[]}, 0); return r1.length === 4 && r1[0] === 0 && new Set(r1).size === 4 && fn({0:[1],1:[2],2:[]}, 0).length === 3; } catch { return false; } }
  },
  flood_fill: {
    title: 'Flood Fill',
    description: 'Fill connected same-colour cells with a new colour (like paint bucket).\n\nFunction: floodFill(grid, sr, sc, newColor) → modified grid',
    boilerplate: 'function floodFill(grid, sr, sc, newColor) {\n  // BFS/DFS from (sr,sc)\n  return grid;\n}',
    testCases: [{ input: '[[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2', expected: '[[2,2,2],[2,2,0],[2,0,1]]' }, { input: '[[0,0],[0,0]], 0, 0, 3', expected: '[[3,3],[3,3]]' }],
    hint: 'Get original colour at (sr,sc). BFS/DFS to all connected cells with that colour, change them to newColor.',
    validator: (code) => { try { const fn = new Function(code + '; return floodFill;')(); return JSON.stringify(fn([[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2)) === '[[2,2,2],[2,2,0],[2,0,1]]'; } catch { return false; } }
  },
  island_count: {
    title: 'Count Islands',
    description: 'Count the number of islands in a 2-D grid (1 = land, 0 = water). Connected horizontally/vertically.\n\nFunction: countIslands(grid) → number',
    boilerplate: 'function countIslands(grid) {\n  let count = 0;\n  // For each unvisited 1, BFS/DFS and increment count\n  return count;\n}',
    testCases: [{ input: '[[1,1,0,0],[0,0,1,0],[0,0,0,1]]', expected: '3' }, { input: '[[1,1,1],[0,1,0],[1,0,1]]', expected: '3' }],
    hint: 'Iterate every cell. When you find a 1, increment count and BFS/DFS to mark all connected 1s as visited (set to 0).',
    validator: (code) => { try { const fn = new Function(code + '; return countIslands;')(); return fn([[1,1,0,0],[0,0,1,0],[0,0,0,1]]) === 3 && fn([[1,1,1],[0,1,0],[1,0,1]]) === 3; } catch { return false; } }
  },
  prims_mst: {
    title: "Prim's MST Weight",
    description: "Find the total weight of the Minimum Spanning Tree.\n\nFunction: primsMST(n, edges) → total weight\nedges: [[from, to, weight], …]",
    boilerplate: 'function primsMST(n, edges) {\n  // Greedy: always add cheapest edge to the growing tree\n  return 0;\n}',
    testCases: [{ input: '4, [[0,1,10],[0,2,6],[0,3,5],[1,3,15],[2,3,4]]', expected: '19' }, { input: '3, [[0,1,1],[1,2,2],[0,2,3]]', expected: '3' }],
    hint: "Start from node 0, maintain a visited set. Always pick the minimum weight edge connecting visited to unvisited.",
    validator: (code) => { try { const fn = new Function(code + '; return primsMST;')(); return fn(4, [[0,1,10],[0,2,6],[0,3,5],[1,3,15],[2,3,4]]) === 19 && fn(3, [[0,1,1],[1,2,2],[0,2,3]]) === 3; } catch { return false; } }
  },
  bellman_ford: {
    title: 'Bellman-Ford Shortest Path',
    description: 'Find shortest distances from a source to all nodes (handles negative weights).\n\nFunction: bellmanFord(n, edges, src) → distances array\nedges: [[from, to, weight], …]',
    boilerplate: 'function bellmanFord(n, edges, src) {\n  const dist = Array(n).fill(Infinity);\n  dist[src] = 0;\n  // Relax all edges (n-1) times\n  return dist;\n}',
    testCases: [{ input: '5, [[0,1,6],[0,2,7],[1,2,8],[1,3,5],[1,4,-4],[2,3,-3],[2,4,9],[3,1,-2],[4,0,2],[4,3,7]], 0', expected: '[0,2,7,4,-2]' }],
    hint: 'Repeat n-1 times: for each edge (u,v,w), if dist[u]+w < dist[v] then dist[v] = dist[u]+w.',
    validator: (code) => { try { const fn = new Function(code + '; return bellmanFord;')(); return JSON.stringify(fn(5, [[0,1,6],[0,2,7],[1,2,8],[1,3,5],[1,4,-4],[2,3,-3],[2,4,9],[3,1,-2],[4,0,2],[4,3,7]], 0)) === '[0,2,7,4,-2]'; } catch { return false; } }
  },
  topo_sort: {
    title: 'Topological Sort',
    description: "Topological order of a DAG using Kahn's algorithm.\n\nFunction: topoSort(n, edges) → array of node ids in topological order\nedges: [[from, to], …]",
    boilerplate: 'function topoSort(n, edges) {\n  // Compute in-degree, BFS from 0-degree nodes\n  return [];\n}',
    testCases: [{ input: '6, [[5,2],[5,0],[4,0],[4,1],[2,3],[3,1]]', expected: 'valid topological order' }],
    hint: "Build in-degree array. Enqueue all nodes with in-degree 0. Dequeue, add to result, reduce neighbours' in-degree.",
    validator: (code) => { try { const fn = new Function(code + '; return topoSort;')(); const r = fn(6, [[5,2],[5,0],[4,0],[4,1],[2,3],[3,1]]); if (!r || r.length !== 6 || new Set(r).size !== 6) return false; const pos = {}; r.forEach((v, i) => pos[v] = i); return [[5,2],[5,0],[4,0],[4,1],[2,3],[3,1]].every(([u, v]) => pos[u] < pos[v]); } catch { return false; } }
  },

  // ────────── STACK / QUEUE FAMILY ──────────
  queue_impl: {
    title: 'Queue Implementation',
    description: 'Implement a Queue with enqueue, dequeue, front and size.\n\nReturn: { enqueue(val), dequeue(), front(), size() }',
    boilerplate: 'function createQueue() {\n  const items = [];\n  return {\n    enqueue(val) { /* add to back */ },\n    dequeue() { /* remove & return front */ },\n    front() { /* peek front */ },\n    size() { /* return length */ }\n  };\n}',
    testCases: [{ input: 'enqueue(1), enqueue(2), front(), dequeue(), size()', expected: 'front→1, dequeue→1, size→1' }],
    hint: 'Use push() to add to the back and shift() to remove from the front.',
    validator: (code) => { try { const fn = new Function(code + '; return createQueue;')(); const q = fn(); q.enqueue(1); q.enqueue(2); q.enqueue(3); return q.front() === 1 && q.size() === 3 && q.dequeue() === 1 && q.front() === 2 && q.size() === 2; } catch { return false; } }
  },
  prefix_eval: {
    title: 'Evaluate Prefix Expression',
    description: 'Evaluate a prefix (Polish notation) expression.\n\nFunction: evalPrefix(tokens) → number\ntokens: array of strings, e.g. ["+","3","4"] → 7',
    boilerplate: 'function evalPrefix(tokens) {\n  // Process right-to-left with a stack\n  return 0;\n}',
    testCases: [{ input: '["+","3","4"]', expected: '7' }, { input: '["*","+","2","3","4"]', expected: '20' }],
    hint: 'Traverse tokens right to left. Push numbers onto stack. On operator, pop two operands, compute, push result.',
    validator: (code) => { try { const fn = new Function(code + '; return evalPrefix;')(); return fn(['+','3','4']) === 7 && fn(['*','+','2','3','4']) === 20 && fn(['-','10','5']) === 5; } catch { return false; } }
  },
  infix_postfix: {
    title: 'Infix → Postfix',
    description: 'Convert infix expression to postfix (Reverse Polish Notation).\n\nFunction: toPostfix(tokens) → array in postfix order\nSupport +, -, *, / and parentheses',
    boilerplate: 'function toPostfix(tokens) {\n  // Shunting-yard algorithm\n  return [];\n}',
    testCases: [{ input: '["3","+","4"]', expected: '["3","4","+"]' }, { input: '["(","3","+","4",")","*","2"]', expected: '["3","4","+","2","*"]' }],
    hint: 'Use an operator stack and output queue. Pop higher/equal precedence ops before pushing new op. Parentheses reset precedence.',
    validator: (code) => { try { const fn = new Function(code + '; return toPostfix;')(); return JSON.stringify(fn(['3','+','4'])) === '["3","4","+"]' && JSON.stringify(fn(['(','3','+','4',')','*','2'])) === '["3","4","+","2","*"]'; } catch { return false; } }
  },

  // ────────── RECURSION FAMILY ──────────
  fibonacci_climb: {
    title: 'Stair Climbing (Fibonacci)',
    description: 'You can climb 1 or 2 steps at a time. How many distinct ways to reach step n?\n\nFunction: climbStairs(n) → number of ways',
    boilerplate: 'function climbStairs(n) {\n  // DP or recursion with memo\n  return 0;\n}',
    testCases: [{ input: '3', expected: '3' }, { input: '5', expected: '8' }],
    hint: 'climbStairs(n) = climbStairs(n-1) + climbStairs(n-2). Base cases: climbStairs(1)=1, climbStairs(2)=2.',
    validator: (code) => { try { const fn = new Function(code + '; return climbStairs;')(); return fn(1) === 1 && fn(3) === 3 && fn(5) === 8 && fn(10) === 89; } catch { return false; } }
  },
  subset_sum: {
    title: 'Subset Sum',
    description: 'Given positive integers and a target sum, return true if any subset sums to target.\n\nFunction: hasSubsetSum(arr, target) → boolean',
    boilerplate: 'function hasSubsetSum(arr, target) {\n  // Recursion or DP\n  return false;\n}',
    testCases: [{ input: '[3,34,4,12,5,2], 9', expected: 'true' }, { input: '[3,34,4,12,5,2], 30', expected: 'false' }],
    hint: 'For each element: include it (reduce target) or exclude it (keep target). Base: target===0 → true, arr empty → false.',
    validator: (code) => { try { const fn = new Function(code + '; return hasSubsetSum;')(); return fn([3,34,4,12,5,2], 9) === true && fn([3,34,4,12,5,2], 30) === false && fn([1,2,3], 6) === true; } catch { return false; } }
  },

  // ────────── GREEDY FAMILY ──────────
  activity_select: {
    title: 'Activity Selection',
    description: 'Find the maximum number of non-overlapping activities.\n\nFunction: maxActivities(acts) → count\nacts: [[start, end], …]',
    boilerplate: 'function maxActivities(acts) {\n  // Greedy: pick by earliest finish time\n  return 0;\n}',
    testCases: [{ input: '[[1,4],[3,5],[0,6],[5,7],[3,9],[5,9],[6,10],[8,11],[8,12],[2,14],[12,16]]', expected: '4' }, { input: '[[1,2],[2,3],[3,4]]', expected: '3' }],
    hint: 'Sort by end time. Pick the first activity, then always pick the next whose start ≥ last picked end.',
    validator: (code) => { try { const fn = new Function(code + '; return maxActivities;')(); return fn([[1,4],[3,5],[0,6],[5,7],[3,9],[5,9],[6,10],[8,11],[8,12],[2,14],[12,16]]) === 4 && fn([[1,2],[2,3],[3,4]]) === 3; } catch { return false; } }
  },
  char_frequency: {
    title: 'Frequency Sort',
    description: 'Sort characters of a string by frequency (descending). Same-frequency chars in original order.\n\nFunction: freqSort(str) → rearranged string',
    boilerplate: 'function freqSort(str) {\n  // Count chars, sort by frequency desc\n  return "";\n}',
    testCases: [{ input: '"tree"', expected: '"eert" (or "eetr")' }, { input: '"aab"', expected: '"aab"' }],
    hint: 'Build a frequency map, then sort characters by their frequency descending.',
    validator: (code) => { try { const fn = new Function(code + '; return freqSort;')(); const r1 = fn('tree'); return r1.length === 4 && (r1.slice(0,2) === 'ee') && fn('aab').startsWith('aa'); } catch { return false; } }
  },
  job_schedule: {
    title: 'Job Scheduling',
    description: 'Schedule jobs with deadlines to maximise profit (at most one job per time slot).\n\nFunction: jobSchedule(jobs) → max profit\njobs: [[deadline, profit], …]',
    boilerplate: 'function jobSchedule(jobs) {\n  // Sort by profit desc, assign to latest free slot\n  return 0;\n}',
    testCases: [{ input: '[[2,100],[1,19],[2,27],[1,25],[3,15]]', expected: '142' }],
    hint: 'Sort by profit descending. For each job try to schedule it at the latest free slot ≤ its deadline.',
    validator: (code) => { try { const fn = new Function(code + '; return jobSchedule;')(); return fn([[2,100],[1,19],[2,27],[1,25],[3,15]]) === 142; } catch { return false; } }
  },

  // ────────── LINKED-LIST FAMILY ──────────
  doubly_linked: {
    title: 'Reverse Doubly Linked List',
    description: 'Simulate reversing a doubly linked list by reversing an array in-place.\n\nFunction: reverseList(arr) → reversed array',
    boilerplate: 'function reverseList(arr) {\n  // Swap from both ends toward the center\n  return arr;\n}',
    testCases: [{ input: '[1,2,3,4,5]', expected: '[5,4,3,2,1]' }, { input: '[10,20]', expected: '[20,10]' }],
    hint: 'Use two pointers (start and end), swap elements, move inward until they meet.',
    validator: (code) => { try { const fn = new Function(code + '; return reverseList;')(); return JSON.stringify(fn([1,2,3,4,5])) === '[5,4,3,2,1]' && JSON.stringify(fn([10,20])) === '[20,10]'; } catch { return false; } }
  },
  cycle_detect: {
    title: 'Detect Cycle in Graph',
    description: 'Given an undirected graph, detect if it contains a cycle.\n\nFunction: hasCycle(n, edges) → boolean\nedges: [[u, v], …]',
    boilerplate: 'function hasCycle(n, edges) {\n  // Union-Find or DFS\n  return false;\n}',
    testCases: [{ input: '4, [[0,1],[1,2],[2,3],[3,0]]', expected: 'true' }, { input: '3, [[0,1],[1,2]]', expected: 'false' }],
    hint: 'Union-Find: for each edge, if both endpoints already share the same root, a cycle exists.',
    validator: (code) => { try { const fn = new Function(code + '; return hasCycle;')(); return fn(4, [[0,1],[1,2],[2,3],[3,0]]) === true && fn(3, [[0,1],[1,2]]) === false; } catch { return false; } }
  },
  merge_sorted: {
    title: 'Merge Two Sorted Arrays',
    description: 'Merge two sorted arrays into one sorted array.\n\nFunction: mergeSorted(a, b) → merged sorted array',
    boilerplate: 'function mergeSorted(a, b) {\n  const result = [];\n  // Two-pointer merge\n  return result;\n}',
    testCases: [{ input: '[1,3,5], [2,4,6]', expected: '[1,2,3,4,5,6]' }, { input: '[1,1], [2,2]', expected: '[1,1,2,2]' }],
    hint: 'Maintain two indices i, j. Compare a[i] and b[j], push the smaller one, advance that pointer.',
    validator: (code) => { try { const fn = new Function(code + '; return mergeSorted;')(); return JSON.stringify(fn([1,3,5], [2,4,6])) === '[1,2,3,4,5,6]' && JSON.stringify(fn([1,1], [2,2])) === '[1,1,2,2]'; } catch { return false; } }
  },

  // ────────── HASH FAMILY ──────────
  two_sum_hash: {
    title: 'Two Sum (Hash Map)',
    description: 'Find two indices whose values sum to target using a hash map.\n\nFunction: twoSum(arr, target) → [i, j]',
    boilerplate: 'function twoSum(arr, target) {\n  const map = {};\n  // Store complement → index\n  return [];\n}',
    testCases: [{ input: '[2,7,11,15], 9', expected: '[0,1]' }, { input: '[3,2,4], 6', expected: '[1,2]' }],
    hint: 'For each number, check if (target - number) exists in the map. If yes return both indices; otherwise store number→index.',
    validator: (code) => { try { const fn = new Function(code + '; return twoSum;')(); const r1 = fn([2,7,11,15], 9); const r2 = fn([3,2,4], 6); return [2,7,11,15][r1[0]] + [2,7,11,15][r1[1]] === 9 && [3,2,4][r2[0]] + [3,2,4][r2[1]] === 6; } catch { return false; } }
  },
  anagram_group: {
    title: 'Group Anagrams',
    description: 'Group words that are anagrams of each other.\n\nFunction: groupAnagrams(words) → array of groups',
    boilerplate: 'function groupAnagrams(words) {\n  const map = {};\n  // Sort each word as key\n  return [];\n}',
    testCases: [{ input: '["eat","tea","tan","ate","nat","bat"]', expected: '[["eat","tea","ate"],["tan","nat"],["bat"]]' }],
    hint: 'For each word, sort its letters to create a key. Map key → [words]. Return all values of the map.',
    validator: (code) => { try { const fn = new Function(code + '; return groupAnagrams;')(); const r = fn(['eat','tea','tan','ate','nat','bat']); if (!r || r.length !== 3 || r.flat().length !== 6) return false; return r.some(g => g.length === 3 && g.includes('eat') && g.includes('tea') && g.includes('ate')); } catch { return false; } }
  },

  // ────────── DP FAMILY ──────────
  lcs_dp: {
    title: 'Longest Common Subsequence',
    description: 'Find the length of the longest common subsequence of two strings.\n\nFunction: lcs(a, b) → number',
    boilerplate: 'function lcs(a, b) {\n  // Build a 2-D DP table\n  return 0;\n}',
    testCases: [{ input: '"abcde", "ace"', expected: '3' }, { input: '"abc", "def"', expected: '0' }],
    hint: 'dp[i][j] = LCS length of a[0..i-1] and b[0..j-1]. If a[i-1]===b[j-1] → dp[i-1][j-1]+1, else max(dp[i-1][j], dp[i][j-1]).',
    validator: (code) => { try { const fn = new Function(code + '; return lcs;')(); return fn('abcde', 'ace') === 3 && fn('abc', 'def') === 0 && fn('abc', 'abc') === 3; } catch { return false; } }
  },
  lis_dp: {
    title: 'Longest Increasing Subsequence',
    description: 'Find length of the longest strictly increasing subsequence.\n\nFunction: lis(arr) → number',
    boilerplate: 'function lis(arr) {\n  // dp[i] = LIS length ending at index i\n  return 0;\n}',
    testCases: [{ input: '[10,9,2,5,3,7,101,18]', expected: '4' }, { input: '[0,1,0,3,2,3]', expected: '4' }],
    hint: 'dp[i] = 1 + max(dp[j]) for all j < i where arr[j] < arr[i]. Answer is max(dp).',
    validator: (code) => { try { const fn = new Function(code + '; return lis;')(); return fn([10,9,2,5,3,7,101,18]) === 4 && fn([0,1,0,3,2,3]) === 4; } catch { return false; } }
  },
  rod_cutting: {
    title: 'Rod Cutting',
    description: 'Given a rod of length n and prices for each length, find maximum revenue.\n\nFunction: rodCut(prices, n) → max revenue\nprices[i] = price for length (i+1)',
    boilerplate: 'function rodCut(prices, n) {\n  // dp[i] = max revenue for rod of length i\n  return 0;\n}',
    testCases: [{ input: '[1,5,8,9,10,17,17,20], 8', expected: '22' }, { input: '[3,5,8,9,10,17,17,20], 4', expected: '12' }],
    hint: 'dp[i] = max(prices[j-1] + dp[i-j]) for j = 1..i. Base: dp[0] = 0.',
    validator: (code) => { try { const fn = new Function(code + '; return rodCut;')(); return fn([1,5,8,9,10,17,17,20], 8) === 22 && fn([3,5,8,9,10,17,17,20], 4) === 12; } catch { return false; } }
  },

  // ────────── TREE FAMILY ──────────
  heap_build: {
    title: 'Build Min-Heap',
    description: 'Rearrange an array into a valid min-heap (parent ≤ children).\n\nFunction: buildMinHeap(arr) → min-heap array',
    boilerplate: 'function buildMinHeap(arr) {\n  // Heapify from last non-leaf up to root\n  return arr;\n}',
    testCases: [{ input: '[5,3,8,1,2]', expected: 'valid min-heap (e.g. [1,2,8,5,3])' }],
    hint: 'Start from i = Math.floor(n/2)-1 down to 0. Swap with smallest child if needed, then sift down.',
    validator: (code) => { try { const fn = new Function(code + '; return buildMinHeap;')(); const r = fn([5,3,8,1,2,9,4]); for (let i = 0; i < r.length; i++) { const l = 2*i+1, ri2 = 2*i+2; if (l < r.length && r[i] > r[l]) return false; if (ri2 < r.length && r[i] > r[ri2]) return false; } return r.length === 7 && new Set(r).size === new Set([5,3,8,1,2,9,4]).size; } catch { return false; } }
  },
  avl_check: {
    title: 'Balanced BST Check',
    description: 'Check if a binary tree (given as level-order array, null for missing) is a balanced BST.\n\nFunction: isBalancedBST(arr) → boolean\nBalanced = height diff of subtrees ≤ 1 AND BST property holds',
    boilerplate: 'function isBalancedBST(arr) {\n  // Rebuild tree, verify BST + balance\n  return false;\n}',
    testCases: [{ input: '[2,1,3]', expected: 'true' }, { input: '[5,3,7,2,4,6,8]', expected: 'true' }],
    hint: 'Reconstruct the tree from the array. Check in-order traversal is sorted (BST) and height difference ≤ 1 at every node.',
    validator: (code) => { try { const fn = new Function(code + '; return isBalancedBST;')(); return fn([2,1,3]) === true && fn([5,3,7,2,4,6,8]) === true; } catch { return false; } }
  },

  // ────────── GRAPH COLORING FAMILY ──────────
  bipartite_check: {
    title: 'Bipartite Graph Check',
    description: 'Determine if an undirected graph is bipartite (2-colourable).\n\nFunction: isBipartite(n, edges) → boolean\nedges: [[u, v], …]',
    boilerplate: 'function isBipartite(n, edges) {\n  // BFS/DFS 2-colouring\n  return false;\n}',
    testCases: [{ input: '4, [[0,1],[1,2],[2,3],[3,0]]', expected: 'true (even cycle)' }, { input: '3, [[0,1],[1,2],[2,0]]', expected: 'false (odd cycle)' }],
    hint: 'Colour start node 0. BFS: colour every uncoloured neighbour with the opposite colour. If a neighbour already has the same colour → not bipartite.',
    validator: (code) => { try { const fn = new Function(code + '; return isBipartite;')(); return fn(4, [[0,1],[1,2],[2,3],[3,0]]) === true && fn(3, [[0,1],[1,2],[2,0]]) === false; } catch { return false; } }
  }
};

// ═══════════════════════════════════════════════════════════════════
//  33 NEW GAME CARDS
//  `type` maps each game to one of the 12 original interactive
//  game templates (sort visualizer, maze runner, etc.)
// ═══════════════════════════════════════════════════════════════════

export const EXTRA_GAMES = [
  // sorting template
  { id: 'selection_sort', type: 'sorting', title: 'Selection Sort', description: 'Find the minimum and place it at the front', icon: 'ri-sort-asc', color: 'from-blue-500 to-blue-700', algorithm: 'Selection Sort', difficulty: 'Easy' },
  { id: 'insertion_sort', type: 'sorting', title: 'Insertion Sort', description: 'Insert each card into its sorted position', icon: 'ri-insert-column-right', color: 'from-blue-300 to-blue-500', algorithm: 'Insertion Sort', difficulty: 'Easy' },
  { id: 'merge_sort', type: 'sorting', title: 'Merge Sort', description: 'Divide, conquer, and merge the array', icon: 'ri-git-merge-line', color: 'from-indigo-400 to-indigo-600', algorithm: 'Merge Sort', difficulty: 'Medium' },
  { id: 'quick_sort', type: 'sorting', title: 'Quick Sort', description: 'Partition around a pivot element', icon: 'ri-flashlight-line', color: 'from-indigo-500 to-indigo-700', algorithm: 'Quick Sort', difficulty: 'Medium' },
  { id: 'counting_sort', type: 'sorting', title: 'Counting Sort', description: 'Count occurrences for linear-time sorting', icon: 'ri-calculator-line', color: 'from-cyan-400 to-cyan-600', algorithm: 'Counting Sort', difficulty: 'Easy' },

  // binary_search template
  { id: 'linear_search', type: 'binary_search', title: 'Linear Search', description: 'Find the target by scanning one by one', icon: 'ri-search-line', color: 'from-teal-500 to-teal-700', algorithm: 'Linear Search', difficulty: 'Easy' },
  { id: 'jump_search', type: 'binary_search', title: 'Jump Search', description: 'Jump by √n blocks then linear scan', icon: 'ri-speed-line', color: 'from-teal-300 to-teal-500', algorithm: 'Jump Search', difficulty: 'Medium' },
  { id: 'range_sum', type: 'binary_search', title: 'Prefix Sum Query', description: 'Answer range sum queries in O(1)', icon: 'ri-bar-chart-line', color: 'from-emerald-400 to-emerald-600', algorithm: 'Prefix Sums', difficulty: 'Easy' },

  // bfs template
  { id: 'dfs_traversal', type: 'bfs', title: 'DFS Explorer', description: 'Traverse the graph depth-first', icon: 'ri-compass-3-line', color: 'from-sky-500 to-sky-700', algorithm: 'Depth-First Search', difficulty: 'Medium' },
  { id: 'flood_fill', type: 'bfs', title: 'Paint Bucket', description: 'Flood-fill connected regions with colour', icon: 'ri-paint-fill', color: 'from-sky-300 to-sky-500', algorithm: 'Flood Fill (BFS)', difficulty: 'Medium' },
  { id: 'island_count', type: 'bfs', title: 'Island Counter', description: 'Count islands in a grid of land & water', icon: 'ri-landscape-line', color: 'from-lime-400 to-lime-600', algorithm: 'Connected Components', difficulty: 'Hard' },

  // dijkstra template
  { id: 'prims_mst', type: 'dijkstra', title: "Prim's MST", description: 'Build the minimum spanning tree', icon: 'ri-share-line', color: 'from-purple-500 to-purple-700', algorithm: "Prim's Algorithm", difficulty: 'Hard' },
  { id: 'bellman_ford', type: 'dijkstra', title: 'Bellman-Ford', description: 'Shortest path with negative weights', icon: 'ri-road-map-line', color: 'from-fuchsia-400 to-fuchsia-600', algorithm: 'Bellman-Ford', difficulty: 'Hard' },
  { id: 'topo_sort', type: 'dijkstra', title: 'Topological Sort', description: 'Order tasks respecting dependencies', icon: 'ri-flow-chart', color: 'from-fuchsia-500 to-fuchsia-700', algorithm: 'Topological Sort', difficulty: 'Hard' },

  // stack template
  { id: 'queue_impl', type: 'stack', title: 'Queue Builder', description: 'Build a FIFO queue from scratch', icon: 'ri-align-justify', color: 'from-green-500 to-green-700', algorithm: 'Queue Operations', difficulty: 'Easy' },
  { id: 'prefix_eval', type: 'stack', title: 'Prefix Evaluator', description: 'Evaluate Polish notation expressions', icon: 'ri-terminal-box-line', color: 'from-green-300 to-green-500', algorithm: 'Stack + Prefix', difficulty: 'Medium' },
  { id: 'infix_postfix', type: 'stack', title: 'Shunting Yard', description: 'Convert infix to postfix notation', icon: 'ri-code-box-line', color: 'from-lime-500 to-lime-700', algorithm: 'Shunting-Yard', difficulty: 'Medium' },

  // recursion template
  { id: 'fibonacci_climb', type: 'recursion', title: 'Stair Climber', description: 'Count ways to climb n stairs', icon: 'ri-footprint-line', color: 'from-yellow-500 to-yellow-700', algorithm: 'Fibonacci / DP', difficulty: 'Easy' },
  { id: 'subset_sum', type: 'recursion', title: 'Subset Sum', description: 'Find if a subset sums to a target', icon: 'ri-checkbox-multiple-line', color: 'from-yellow-300 to-yellow-500', algorithm: 'Subset Sum', difficulty: 'Medium' },

  // greedy template
  { id: 'activity_select', type: 'greedy', title: 'Activity Selector', description: 'Pick maximum non-overlapping activities', icon: 'ri-calendar-check-line', color: 'from-amber-500 to-amber-700', algorithm: 'Activity Selection', difficulty: 'Medium' },
  { id: 'char_frequency', type: 'greedy', title: 'Frequency Sort', description: 'Sort characters by their frequency', icon: 'ri-bar-chart-2-line', color: 'from-amber-300 to-amber-500', algorithm: 'Frequency Counting', difficulty: 'Medium' },
  { id: 'job_schedule', type: 'greedy', title: 'Job Scheduler', description: 'Schedule jobs for maximum profit', icon: 'ri-time-line', color: 'from-orange-500 to-orange-700', algorithm: 'Job Scheduling', difficulty: 'Hard' },

  // linkedlist template
  { id: 'doubly_linked', type: 'linkedlist', title: 'Reverse List', description: 'Reverse a doubly linked list', icon: 'ri-arrow-left-right-line', color: 'from-orange-300 to-orange-500', algorithm: 'Doubly Linked List', difficulty: 'Medium' },
  { id: 'cycle_detect', type: 'linkedlist', title: 'Cycle Detector', description: 'Detect a cycle in a graph', icon: 'ri-refresh-line', color: 'from-red-500 to-red-700', algorithm: 'Union-Find', difficulty: 'Medium' },
  { id: 'merge_sorted', type: 'linkedlist', title: 'Merge Sorted', description: 'Merge two sorted arrays into one', icon: 'ri-merge-cells-horizontal', color: 'from-red-300 to-red-500', algorithm: 'Two-Pointer Merge', difficulty: 'Easy' },

  // hash template
  { id: 'two_sum_hash', type: 'hash', title: 'Two Sum Hash', description: 'Solve Two Sum with a hash map', icon: 'ri-add-circle-line', color: 'from-rose-500 to-rose-700', algorithm: 'Hash Map Lookup', difficulty: 'Easy' },
  { id: 'anagram_group', type: 'hash', title: 'Anagram Groups', description: 'Group words that are anagrams', icon: 'ri-text', color: 'from-rose-300 to-rose-500', algorithm: 'Hash Grouping', difficulty: 'Medium' },

  // dp template
  { id: 'lcs_dp', type: 'dp', title: 'LCS Challenge', description: 'Find the longest common subsequence', icon: 'ri-text-wrap', color: 'from-pink-500 to-pink-700', algorithm: 'LCS (DP)', difficulty: 'Hard' },
  { id: 'lis_dp', type: 'dp', title: 'LIS Challenge', description: 'Find the longest increasing subsequence', icon: 'ri-line-chart-line', color: 'from-pink-300 to-pink-500', algorithm: 'LIS (DP)', difficulty: 'Hard' },
  { id: 'rod_cutting', type: 'dp', title: 'Rod Cutter', description: 'Cut a rod for maximum revenue', icon: 'ri-scissors-cut-line', color: 'from-violet-500 to-violet-700', algorithm: 'Rod Cutting (DP)', difficulty: 'Hard' },

  // tree template
  { id: 'heap_build', type: 'tree', title: 'Heap Builder', description: 'Build a min-heap from an array', icon: 'ri-stack-line', color: 'from-violet-300 to-violet-500', algorithm: 'Min-Heap', difficulty: 'Medium' },
  { id: 'avl_check', type: 'tree', title: 'Balance Checker', description: 'Check if a tree is a balanced BST', icon: 'ri-scales-3-line', color: 'from-purple-300 to-purple-500', algorithm: 'Balanced BST', difficulty: 'Hard' },

  // graph_coloring template
  { id: 'bipartite_check', type: 'graph_coloring', title: 'Bipartite Tester', description: 'Check if a graph is 2-colourable', icon: 'ri-split-cells-horizontal', color: 'from-fuchsia-300 to-fuchsia-500', algorithm: 'Bipartite Check', difficulty: 'Hard' }
];
