class Node {
  constructor(data, left = null, right = null){
    this.data = data
    this.left = left 
    this.right = right; 
  }
  height(node = this) {
    let leftHeight = 0;
    let rightHeight = 0;
    let height = 0;
    if (node.left == null && node.right == null) {
      return 0;
    }
    if (node.left != null) {
      leftHeight = this.height(node.left);
    }
    if (node.right != null) {
      rightHeight = this.height(node.right);
    }
    height = Math.max(leftHeight, rightHeight) + 1;
    return height;
  }
}

class Tree {
  constructor(intArray){
    let sortedArray = [...new Set(intArray)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray);
    this.biggestValue = this.root;
    this.inorderArray = [];
    this.preorderArray = [];
    this.postorderArray = [];
  }

  buildTree(sortedArray) {
    if (sortedArray.length == 0) return null;
    let middle = Math.floor(sortedArray.length / 2);
    let newNode = new Node(sortedArray[middle]);
    newNode.left = this.buildTree(sortedArray.slice(0, middle));
    newNode.right = this.buildTree(sortedArray.slice(middle + 1));
    return newNode;
  }

  insert(value) {
    this.root = this.insertRec(this.root, value);
  }

  insertRec(currentNode, value) {
    if (currentNode == null) {
      currentNode = new Node(value);
      return currentNode;
    }
    if (value < currentNode.data){
      currentNode.left = this.insertRec(currentNode.left, value);
    }
    else if (value > currentNode.data){
      currentNode.right = this.insertRec(currentNode.right, value);
    }
    return currentNode;
  }

  delete(value, currentNode = this.root) {
    if(currentNode == null) {
      return currentNode;
    }
    if (value < currentNode.data) {
      currentNode.left = this.delete(value, currentNode.left);
    }
    else if (value > currentNode.data) {
      currentNode.right = this.delete(value, currentNode.right);
    }
    else {
      if (currentNode.right == null) {
        return currentNode.left;
      }
      else if (currentNode.left == null) {
        return currentNode.right;
      }
      
      currentNode.data = this.minValue(currentNode.right);
      currentNode.right = this.delete(currentNode.data, currentNode.right);
    }
    return currentNode;
  }

  minValue(root) {
    let minv = root.key;
        while (root.left != null)
        {
            minv = root.left.key;
            root = root.left;
        }
        return minv;
  }

  find(value) {
    let currentNode = this.root;
    while (currentNode != null) {
      if (currentNode.data > value) {
        currentNode = currentNode.left;
      }
      else if (currentNode.data < value) {
        currentNode = currentNode.right;
      }
      if (currentNode.data == value) {
        return currentNode;
      }
    return "Not found!"
    }
  }

  biggestValue() {
    let currentNode = this.root;
    while (currentNode.right != null) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }

  levelOrder(func) {
    let currentNode = this.root;
    let queue = [currentNode];
    let arrayOfValues = [];
    while (currentNode != null) {
      arrayOfValues.push(currentNode.data);
      arrayOfValues = [...new Set(arrayOfValues)];
      if (func != undefined) {
        func(currentNode.data);
      }
      if (currentNode.left != null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right != null) {
        queue.push(currentNode.right);
      }
      if (queue[1]) {
        currentNode = queue[1];
      }
      else {
        break;
      }
      queue.shift();
    }
    if (func == undefined) {
      return arrayOfValues;
    }
  }


  inorder(func, currentNode = this.root) {
    if (currentNode == this.root) {
      this.inorderArray = [];
    }
    if (currentNode.left != null) {
      this.inorderArray = this.inorder(func, currentNode.left);
      this.inorderArray = [...new Set(this.inorderArray)];
    }
    if (func != undefined) {
      func(currentNode.data);
    }
    this.inorderArray.push(currentNode.data);
    this.inorderArray = [...new Set(this.inorderArray)];
    if (currentNode.right != null) {
      this.inorderArray = this.inorder(func, currentNode.right);
      this.inorderArray = [...new Set(this.inorderArray)];
    }
    return this.inorderArray;
  }

  preorder(func, currentNode = this.root, preorderArray = this.preorderArray) {
    if (currentNode == this.root) {
      preorderArray = [];
    }
    if (func != undefined) {
      func(currentNode.data);
    }
    preorderArray.push(currentNode.data);
    preorderArray = [...new Set(preorderArray)];
    if (currentNode.left != null) {
      preorderArray = this.preorder(func, currentNode.left, preorderArray);
      preorderArray = [...new Set(preorderArray)];
    }
    if (currentNode.right != null) {
      preorderArray = this.preorder(func, currentNode.right, preorderArray);
      preorderArray = [...new Set(preorderArray)];
    }
    if (currentNode.data == this.biggestValue) {
      if (func == undefined) {
        return preorderArray;
      }
    }
    return preorderArray;
  }

  postorder(func, currentNode = this.root, postorderArray = this.postorderArray) {
    if (currentNode == this.root) {
      postorderArray = [];
    }
    if (currentNode.left != null) {
      postorderArray = this.postorder(func, currentNode.left, postorderArray);
      postorderArray = [...new Set(postorderArray)];
    }
    if (currentNode.right != null) {
      postorderArray = this.postorder(func, currentNode.right, postorderArray);
      postorderArray = [...new Set(postorderArray)];
    }
    if (func != undefined) {
      func(currentNode.data);
    }
    postorderArray.push(currentNode.data);
    postorderArray = [...new Set(postorderArray)];
    if (currentNode.data == this.biggestValue) {
      if (func == undefined) {
        return postorderArray;
      }
    }
    return postorderArray;
  }

  depth(node) {
    let currentNode = this.root;
    for (let i = 0; i <= this.root.height(); i++) {
      if (node.data == currentNode.data) {
        return i;
      }
      if (currentNode.data > node.data) {
        currentNode = currentNode.left;
      }
      else if (currentNode.data < node.data) {
        currentNode = currentNode.right;
      }
    }
  }

  isBalanced(currentNode = this.root) {
    let leftHeight;
    let rightHeight;
    if (currentNode.left == null) {
      leftHeight = 0;
    }
    else {
      leftHeight = Math.abs(currentNode.left.height());
    }

    if (currentNode.right == null) {
      rightHeight = 0;
    }
    else {
      rightHeight = Math.abs(currentNode.right.height());
    }
     
    let difference = Math.abs(rightHeight - leftHeight);
    if (difference > 1) {
      return false;
    }
    if (currentNode.left != null) {
      this.isBalanced(currentNode.left);
    }
    if (currentNode.right != null) {
      this.isBalanced(currentNode.right);
    }
    return true;
  }

  rebalance() {
    this.root = this.buildTree(this.inorder());
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

//TESTS
let myTree = new Tree([0,3,4,5,6,3,2,8,9,12,45,24]);
console.log(myTree.isBalanced());
console.log(myTree.levelOrder());
console.log(myTree.preorder());
console.log(myTree.postorder());
console.log(myTree.inorder());
myTree.insert(100);
myTree.insert(200);
myTree.insert(300);
myTree.insert(400);
myTree.insert(500);
myTree.insert(600);
console.log(myTree.isBalanced());
myTree.rebalance();
console.log(myTree.isBalanced());
console.log(myTree.levelOrder());
console.log(myTree.preorder());
console.log(myTree.postorder());
console.log(myTree.inorder());