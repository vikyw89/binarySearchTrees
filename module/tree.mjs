import { Node } from "./node.mjs"

class Tree {
    constructor (array){
        this.root = Tree.buildTree(array.sort((a,b)=>a-b))
    }
    static buildTree = (arr) => {
        if (arr.length === 0) {
            return null;
        }
        let mid = Math.floor(arr.length / 2);
        let root = new Node(arr[mid]);
        root.left = this.buildTree(arr.slice(0, mid));
        root.right = this.buildTree(arr.slice(mid + 1));
        return root;
    }
    insert = (value) => {
        let pointer = this.root
        while(true) {
            if (pointer.value >= value) {
                if (!pointer.left){
                    pointer.left = new Node(value)
                    return
                } else {
                    pointer = pointer.left
                }
            } else {
                if(!pointer.right) {
                    pointer.right = new Node(value)
                    return
                } else {
                    pointer = pointer.right
                }
            }
        }
    }
    delete = (value) => {
        if (this.root === null) return;
        this.root = this.#delete(this.root, value);
    }

    #delete = (root, value) => {
        if (root === null) return null;
        if (value < root.value) {
            root.left = this.#delete(root.left, value);
        } else if (value > root.value) {
            root.right = this.#delete(root.right, value);
        } else {
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }
            root.value = this.#findMinValue(root.right);
            root.right = this.#delete(root.right, root.value);
        }
        return root;
    }

    #findMinValue = (root) => {
        let current = root;
        while (current.left !== null) {
            current = current.left;
        }
        return current.value;
    }

    find = (value) => {
        let pointer = this.root
        while (pointer.value) {
            // base case
            if (pointer.value === value) {
                return pointer
            }
            // recursive case
            if (value < pointer.value) {
                pointer = pointer.left
            } else {
                pointer = pointer.right
            }
        }
        return null
    }
    levelOrder = (fn) => {
        let pointer = this.root
        let breadthFirstLevel = []
        let queue = []
        if (!pointer) {
            return []
        }
        breadthFirstLevel.push(fn(pointer))
        pointer.left && queue.push(pointer.left)
        pointer.right && queue.push(pointer.right)
        while(queue.length !== 0) {
            pointer = queue.shift()
            breadthFirstLevel.push(fn(pointer))
            pointer.left && queue.push(pointer.left)
            pointer.right && queue.push(pointer.right)
        }
        return breadthFirstLevel
    }

    inorder = (fn) => {
        return this.#inorder(this.root, fn)
    }

    preorder = (fn) => {
        return this.#preorder(this.root, fn)
    }

    postorder = (fn) => {
        return this.#postorder(this.root,fn)
    }

    #inorder = (root, fn) => {
        let result = []
        // base case
        if (!root) {
            return
        }
        // recursive case node, left, right
        result.push(fn(root))
        root.left && result.push(...this.#inorder(root.left, fn))
        root.right && result.push(...this.#inorder(root.right, fn))
        return result
    }

    #preorder = (root, fn) => {
        let result = []
        // base case
        if (!root) {
            return
        }
        // recursive case node, left, right
        root.left && result.push(...this.#preorder(root.left, fn))
        result.push(fn(root))
        root.right && result.push(...this.#preorder(root.right, fn))
        return result
    }

    #postorder = (root, fn) => {
        let result = []
        // base case
        if (!root) {
            return
        }
        // recursive case right, node, left
        root.right && result.push(...this.#postorder(root.right, fn))
        result.push(fn(root))
        root.left && result.push(...this.#postorder(root.left, fn))
        return result
    }

    height = () => {
       return this.#height(this.root, 0)
    }

    #height = (root, maxDepth) => {
        // base case
        if (!root) {
            return maxDepth
        }
        maxDepth++
        // recursive case
        let leftMaxDepth = root.left ? this.#height(root.left, maxDepth) : maxDepth
        let rightMaxDepth = root.right ? this.#height(root.right, maxDepth) : maxDepth
        return leftMaxDepth > rightMaxDepth ? leftMaxDepth : rightMaxDepth

    }
}

export { Tree }