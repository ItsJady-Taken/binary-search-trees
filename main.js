class Node {
      constructor(data) {
            this.data = data; // root node
            this.left = null; // pointer to left node
            this.right = null; // pointer to right node
      }
}

class Tree {
      constructor() {
            this.root = null; // root node of the tree starts with null
      }
      // insert data in the tree
      insert(value) {
            const newNode = new Node(value);

            if (this.root === null) {
                  this.root = newNode;
            } 
            else {
                  this.insertNode(this.root, newNode);
            }
            return this.root;
      }

      insertNode(node, newNode) {
            if (newNode.data < node.data) {
                  if (node.left === null) {
                        node.left = newNode;
                  } 
                  else {
                        this.insertNode(node.left, newNode); // recursive call until the left node is null
                  }
            } 
            else {
                  if (node.right === null) {
                        node.right = newNode;
                  } 
                  else {
                        this.insertNode(node.right, newNode);// recursive call until the right node is null
                  }
            }
      }
      buildTree(array) {
            for (let i = 0; i < array.length; i++) {
                  this.root = this.insert(array[i]);
            }
      }
}

const tree = new Tree();
tree.buildTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
console.log();