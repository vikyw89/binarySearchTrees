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
        // base case
        // recursive case
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
}

export { Tree }