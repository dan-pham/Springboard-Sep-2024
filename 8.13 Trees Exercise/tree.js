/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    const sumHelper = (node) => {
      // Base case
      if (!node) return 0;

      // Tracking value
      let total = node.val;

      // Recursively sum values of children
      for (const child of node.children) {
        total += sumHelper(child);
      }

      return total;
    };

    return sumHelper(this.root);
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    const evenHelper = (node) => {
      // Base case
      if (!node) return 0;

      // Tracking value
      const isEven = node.val % 2 === 0;
      let count = isEven ? 1 : 0;

      // Recursively count values of children
      for (const child of node.children) {
        count += evenHelper(child);
      }

      return count;
    };

    return evenHelper(this.root);
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    const greaterHelper = (node) => {
      // Base case
      if (!node) return 0;

      // Tracking value
      const isGreaterThanLowerBound = node.val > lowerBound;
      let count = isGreaterThanLowerBound ? 1 : 0;

      // Recursively count children
      for (const child of node.children) {
        count += greaterHelper(child);
      }

      return count;
    };

    return greaterHelper(this.root);
  }
}

module.exports = { Tree, TreeNode };
