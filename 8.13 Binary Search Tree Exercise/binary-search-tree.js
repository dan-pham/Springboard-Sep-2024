class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);

    // If tree is empty, create new root
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    // Start the pointer at the root
    let current = this.root;

    while (true) {
      if (val < current.val) {
        // If the new value is less than current node's value, insert to the left
        if (!current.left) {
          current.left = newNode;
          return this;
        }

        current = current.left;
      } else {
        // If the new value is greater than current node's value, insert to the right
        if (!current.right) {
          current.right = newNode;
          return this;
        }

        current = current.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    const insertNode = (node, val) => {
      // Base case
      if (!node) return new Node(val);

      // Insert new node on the left if less than the current node
      // Insert new node on the right if greater than the current node
      if (val < node.val) {
        node.left = insertNode(node.left, val);
      } else {
        node.right = insertNode(node.right, val);
      }

      return node;
    };

    // Start the recursion
    this.root = insertNode(this.root, val);
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;

    while (current) {
      // If value found, return current node
      if (current.val === val) {
        return current;
      }

      // If the value is less than the current value, move left. Otherwise, move right
      current = val < current.val ? current.left : current.right;
    }

    // No node found
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    const findNode = (node, val) => {
      // Base case
      if (!node) return undefined;

      // If found, return node
      if (node.val === val) return node;

      // If the value is less than the current node, recursively check left. Otherwise, check right.
      return val < node.val ? findNode(node.left, val) : findNode(node.right, val);
    };

    // Start the recursion
    return findNode(this.root, val);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const result = [];

    const traverse = (node) => {
      // Base case
      if (!node) return;

      // Push the current node
      result.push(node.val);

      // Traverse left and right subtrees
      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const result = [];

    const traverse = (node) => {
      // Base case
      if (!node) return;

      // Traverse left subtree
      traverse(node.left);

      // Push the current node
      result.push(node.val);

      // Traverse right subtree
      traverse(node.right);
    };

    traverse(this.root);
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const result = [];

    const traverse = (node) => {
      // Base case
      if (!node) return;

      // Traverse left and right subtrees
      traverse(node.left);
      traverse(node.right);

      // Push the current node
      result.push(node.val);
    };

    traverse(this.root);
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const result = [];

    // Return if tree is empty
    if (!this.root) return result;

    // Create an array starting with the root
    const queue = [this.root];

    while (queue.length) {
      // Dequeue the first node in the array
      const node = queue.shift();
      result.push(node.val);

      // Enqueue the left and right children
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let nodeToRemove = this.root;
    let parent = null;

    // Find the node to remove and its parent
    while (nodeToRemove && nodeToRemove.val !== val) {
      parent = nodeToRemove;
      if (val < nodeToRemove.val) {
        nodeToRemove = nodeToRemove.left;
      } else {
        nodeToRemove = nodeToRemove.right;
      }
    }

    // If the node to remove isn't found, return null
    if (!nodeToRemove) return null;

    // Case 1: Node has no children
    if (!nodeToRemove.left && !nodeToRemove.right) {
      if (parent) {
        if (parent.left === nodeToRemove) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      } else {
        // Remove the root node
        this.root = null;
      }
    }
    // Case 2: Node has one child
    else if (!nodeToRemove.left || !nodeToRemove.right) {
      const child = nodeToRemove.left ? nodeToRemove.left : nodeToRemove.right;
      if (parent) {
        if (parent.left === nodeToRemove) {
          parent.left = child;
        } else {
          parent.right = child;
        }
      } else {
        // Remove the root node
        this.root = child;
      }
    }
    // Case 3: Node has two children
    else {
      let minNodeParent = nodeToRemove;
      let minNode = nodeToRemove.right;

      // Find the minimum node in the right subtree
      while (minNode.left) {
        minNodeParent = minNode;
        minNode = minNode.left;
      }

      // Replace the value of the node to remove
      nodeToRemove.val = minNode.val;

      // Now remove the minimum node, linking the parent to the right child
      if (minNodeParent.left === minNode) {
        minNodeParent.left = minNode.right;
      } else {
        minNodeParent.right = minNode.right;
      }
    }

    return nodeToRemove;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    const checkBalance = (node) => {
      // Base case
      if (!node) return 0;

      // Left subtree is unbalanced
      const leftHeight = checkBalance(node.left);
      if (leftHeight === -1) return -1;

      // Right subtree is unbalanced
      const rightHeight = checkBalance(node.right);
      if (rightHeight === -1) return -1;

      // Current node is unbalanced
      if (Math.abs(leftHeight - rightHeight) > 1) return -1;

      // Return the height
      return Math.max(leftHeight, rightHeight) + 1;
    };

    // Tree is balanced if result is not -1
    return checkBalance(this.root) !== -1;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    let current = this.root;

    // If the tree is empty or there is only one node, return undefined
    if (!current || (!current.left && !current.right)) return undefined;

    while (current) {
      if (current.right) {
        // If the right child has no right child, the current val is the second highest
        if (!current.right.right && !current.right.left) {
          return current.val;
        }

        current = current.right;
      } else {
        current = current.left;
      }
    }
  }
}

module.exports = BinarySearchTree;
