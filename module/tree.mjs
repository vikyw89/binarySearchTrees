import { Node } from "./node.mjs"

class Tree {
    constructor (array){
        this.root = Tree.buildTree(array)
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
}

export { Tree }