export default interface SortOptions {
  // could add option for in/out of place. implementing out of place will slow down some of the sorting
  // algorithms but not necessarily O(n) longer
  direction: 'ascending' | 'descending';
}