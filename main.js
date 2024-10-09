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
            // check for duplicates
            if(newNode.data === node.data) {
                  return newNode.data;
            }
            // if the value is less than the node's data, go left
            if (newNode.data < node.data) {
                  if (node.left === null) {
                        node.left = newNode;
                  } 
                  else {
                        this.insertNode(node.left, newNode); // recursive call until the left node is null
                  }
            } 
            // if the value is greater than the node's data, go right
            else {
                  if (node.right === null) {
                        node.right = newNode;
                  } 
                  else {
                        this.insertNode(node.right, newNode);// recursive call until the right node is null
                  }
            }
      }
      deleteItem(value) {
            this.root = this.deleteNode(this.root, value); // delete node with the given value
            return this.root; // return the updated node
      }
      deleteNode(node, value) {
            if (node === null) {
                  return null; 
            }
            // if the value is greater or leser than the node then recursively call until the value is found
            if (value < node.data) { 
                  node.left = this.deleteNode(node.left, value);
            } 
           
            else if (value > node.data) {
                  node.right = this.deleteNode(node.right, value);
            } 
            // else the value is equal to node's data, delete the node
            else {
                  // case 1: node has no children
                  if (node.left === null && node.right === null) {
                        node = null;
                  } 
                  // case 2: node has only one child (left or right)
                  else if (node.left === null) {
                        node = node.right;
                  } 
                  else if (node.right === null) {
                        node = node.left;
                  } 
                  // case 3: node has two children
                  else {
                        // find the minimum value in the right subtree
                        node.data = this.findMin(node.right);
                        // delete the minimum value in the right subtree
                        node.right = this.deleteNode(node.right, node.data);
                  }
            }
            return node; // return the updated node
      }
      find(value) {
            return this.findNode(this.root, value);      
      }
      findNode(node, value) {
            if (node === null) {
                  return null;
            } 
            // recursively call until the value is found
            else if (value < node.data) {
                  return this.findNode(node.left, value);
            } 
            else if (value > node.data) {
                  return this.findNode(node.right, value);
            } 
            else {
                  return node;
            }
      }
      levelOrder(callback) {
            if (!callback) {
                  return new Error('Callback function is required');
            }
            this.levelOrderTraversal(this.root, callback);
      }
      levelOrderTraversal(node, callback) {
            const queue = [node];
            while (queue.length > 0) {
              const currentNode = queue.shift();
              callback(currentNode);
              if (currentNode.left) {
                queue.push(currentNode.left);
              }
              if (currentNode.right) {
                queue.push(currentNode.right);
              }
            } 
      }
      inOrder(callback) {
            if (!callback) {
              return new Error('Callback function is required');
            }
            this.inOrderTraversal(this.root, callback);
      }
          
      inOrderTraversal(node, callback) {
            if (node === null) {
                  return null;
            }
            this.inOrderTraversal(node.left, callback);
            callback(node);
            this.inOrderTraversal(node.right, callback);
      }
      preOrder(callback) {
            if (!callback) {
              throw new Error('Callback function is required');
            }
            this.preOrderTraversal(this.root, callback);
      }
          
      preOrderTraversal(node, callback) {
            if (node === null) {
              return;
            }
            callback(node);
            this.preOrderTraversal(node.left, callback);
            this.preOrderTraversal(node.right, callback);
      }
      postOrder(callback) {
            if (!callback) {
                  throw new Error('Callback function is required');
            }
            this.postOrderTraversal(this.root, callback);
      }
      postOrderTraversal(node, callback) {
            if (node === null) {
              return;
            }
            this.postOrderTraversal(node.left, callback);
            this.postOrderTraversal(node.right, callback);
            callback(node);
      }
      buildTree(array) {
            // build a tree from an array insert each element in the tree
            for (let i = 0; i < array.length; i++) {
                  this.root = this.insert(array[i]);   
            }
            return this.root;
      }
      prettyPrint(node, prefix = "", isLeft = true) {
            if (node === null) {
                  return null;
            }
            if (node.right !== null) {
                  this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
            }
            console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

            if (node.left !== null) {
                  this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
            }
      }
}

const tree = new Tree();
tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log(tree.inOrder(node => console.log(node.data)));
console.log(tree.prettyPrint(tree.root));