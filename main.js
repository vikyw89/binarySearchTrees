import { prettyPrint } from "./module/prettyPrint.mjs"
import { Tree } from "./module/tree.mjs"

const driverScript = () => {
    // populate a random number array
    const randomArray = [...new Array(10)].map(() => Math.round(Math.random() * 100));

    // create a binarySearchTree
    const myTree = new Tree(randomArray)
    prettyPrint(myTree.root)

    // confirm that tree is indeed balanced
    const treeIsBalanced = myTree.isBalanced()
    console.log({ treeIsBalanced })

    // print out preOrder, postOrder, inOrder
    const preOrder = myTree.preorder((item)=>item.value)
    const postOrder = myTree.postorder((item)=>item.value)
    const inOrder = myTree.inorder((item)=>item.value)
    console.log({ preOrder, postOrder, inOrder })

    // unbalance the tree
    for (let i = 0; i < 100; i++){
        myTree.insert(Math.round(Math.random() * 100))
    }

    // confirm that tree is unbalanced
    const treeIsBalanced2 = myTree.isBalanced()
    console.log({treeIsBalanced2})

    // balance the tree
    myTree.rebalance()
    const treeIsBalanced3 = myTree.isBalanced()
    console.log({treeIsBalanced3})

    // print out preOrder, postOrder, inOrder
    const preOrder2 = myTree.preorder((item)=>item.value)
    const postOrder2 = myTree.postorder((item)=>item.value)
    const inOrder2 = myTree.inorder((item)=>item.value)
    console.log({ preOrder2, postOrder2, inOrder2 })

    prettyPrint(myTree.root)
}

driverScript()