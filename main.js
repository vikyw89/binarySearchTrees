import { prettyPrint } from "./module/prettyPrint.mjs"
import { Tree } from "./module/tree.mjs"

const myTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
// myTree.insert(5)
// myTree.delete(7)
prettyPrint(myTree.root)
// console.log(myTree.find(5))
function introduction (a) {
    return `this is ${a.value}`
}

// console.log(myTree.levelOrder(introduction))
// console.log(myTree.inorder(introduction))
// console.log(myTree.preorder(introduction))
console.log(myTree.postorder(introduction))
