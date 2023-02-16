class MyTreeNode {
  val: number
  left: MyTreeNode | null
  right: MyTreeNode | null
  next: MyTreeNode | null
  constructor(val?: number, left?: MyTreeNode, right?: MyTreeNode, next?: MyTreeNode) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
    this.next = (next === undefined ? null : next)
  }
}

function connect(node: MyTreeNode | null, nextQueue: Array<MyTreeNode | null> = []): MyTreeNode | null {
  if (!node) {
    return null;
  }
  let next: MyTreeNode | null = null;
  if (node.right) {
    next = connect(node.right);
    if (node.left) {
      node.left.next = next;
      nextQueue.push(connect(node.left));
    }
  } else {
    node.next = nextQueue.pop() || null;
  }

  return node;
}


