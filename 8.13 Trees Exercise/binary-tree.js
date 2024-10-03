/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    const minDepthHelper = (node) => {
      // Base case
      if (!node) return 0;

      // Recursively check leaf nodes, counting the current node with a + 1
      if (!node.left && !node.right) return 1;
      if (!node.left) return minDepthHelper(node.right) + 1;
      if (!node.right) return minDepthHelper(node.left) + 1;

      return Math.min(minDepthHelper(node.left), minDepthHelper(node.right)) + 1;
    };

    return minDepthHelper(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    const maxDepthHelper = (node) => {
      // Base case
      if (!node) return 0;

      // Recursively check leaf nodes, counting the current node with a + 1
      if (!node.left && !node.right) return 1;
      if (!node.left) return maxDepthHelper(node.right) + 1;
      if (!node.right) return maxDepthHelper(node.left) + 1;

      return Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right)) + 1;
    };

    return maxDepthHelper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = 0;

    const maxSumHelper = (node) => {
      // Base case
      if (!node) return 0;

      // Recursively check for max sum of each subtree
      const leftSum = maxSumHelper(node.left);
      const rightSum = maxSumHelper(node.right);

      // Update result with new maximum if found
      result = Math.max(result, node.val + leftSum + rightSum);

      return Math.max(0, leftSum + node.val, rightSum + node.val);
    };

    maxSumHelper(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    // Null case
    let result = null;

    const nextLargerHelper = (node) => {
      // Base case
      if (!node) return;

      // Update result with value that meets conditions
      const isGreaterThanLowerBound = node.val > lowerBound;
      const isResultNull = result === null;
      const isLessThanResult = node.val < result;

      if (isGreaterThanLowerBound) {
        if (isResultNull || isLessThanResult) {
          result = node.val;
        }
      }

      // Recursively check for next value
      nextLargerHelper(node.left);
      nextLargerHelper(node.right);
    };

    nextLargerHelper(this.root);
    return result;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    /** findDepthAndParent parameters
     * node: The current node being examined
     * val: The value of the node we are looking for
     * depth: The current depth in the tree
     * parent: The parent of the current node
     */

    const findDepthAndParent = (node, val, depth, parent) => {
      // Base case
      if (!node) return null;

      // If the current node matches the target value, return the depth and parent
      if (node.val === val) return { depth, parent };

      // Check the left subtree
      const leftResult = findDepthAndParent(node.left, val, depth + 1, node);
      if (leftResult) return leftResult;

      // Check the right subtree
      const rightResult = findDepthAndParent(node.right, val, depth + 1, node);
      if (rightResult) return rightResult;

      // No value is found in either subtree
      return null;
    };

    // Find the depth and parent of the two input nodes
    const node1Info = findDepthAndParent(this.root, node1.val, 0, null);
    const node2Info = findDepthAndParent(this.root, node2.val, 0, null);

    // Conditions for cousin relationship
    const foundBothNodes = node1Info && node2Info;
    const areSameLevel = node1Info.depth === node2Info.depth;
    const haveDifferentParents = node1Info.parent !== node2Info.parent;

    return foundBothNodes && areSameLevel && haveDifferentParents;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const result = [];

    const traverse = (node) => {
      // Push null if node does not exist
      if (!node) {
        result.push(null);
        return;
      }

      // Push the current node value
      result.push(node.val);

      // Recursively traverse the left and right subtrees
      traverse(node.left);
      traverse(node.right);
    };

    traverse(tree.root);
    return JSON.stringify(result);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    const values = JSON.parse(stringTree);

    const buildTree = (values) => {
      // Base case
      if (values.length === 0) return null;

      // Check value in front of array
      const val = values.shift();
      if (val === null) return null;

      // If value exists, use it to create a BinaryTreeNode
      const node = new BinaryTreeNode(val);

      // Recursively build out the tree
      node.left = buildTree(values);
      node.right = buildTree(values);

      return node;
    };

    const root = buildTree(values);
    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    const lcaHelper = (node) => {
      // Base case
      if (!node) return null;

      // If current node matches either input node
      if (node === node1 || node === node2) return node;

      // Recursively check left and right subtrees
      const left = lcaHelper(node.left);
      const right = lcaHelper(node.right);

      // If both sides found the node
      if (left && right) return node;

      // Return the side that found the node
      return left ? left : right;
    };

    return lcaHelper(this.root);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
