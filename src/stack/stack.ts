/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  let p = head;
  let prev, next = head;
  prev = head;
  while (p && p.next) {
    // console.log('prev: ', prev, )
    // prev = next;
    // next = p.next;
    // p.next = next.next;
    // next.next = prev;

    prev = p.next;
    p.next = p.next?.next!;
    prev.next = p;
    p = p.next;
  }
  head = next;
  return next;
};

function reverseRecursion(node: ListNode | null): ListNode | null {
  if (!node) return null;
  if (!node.next) return node;

  let sub = node.next;
  const reverseSub = reverseRecursion(sub);
  let p = reverseSub;
  while (p && p.next) {
    p = p.next;
  }
  if (p) {
    p.next = node;
    node.next = null;
  }
  return reverseSub;
}

function createStackFromArray(arr: number[]) {
  let head: ListNode | null = null, p: ListNode;
  arr.reduce((a, b) => {
    if (head) {
      const node = new ListNode(b);
      p.next = node;
      p = node;
    } else {
      head = p = new ListNode(a, new ListNode(b));
      p = head.next!;
    }
    return p as any;
  });
  return head;
}

function generateArrayFromStack(head: ListNode | null) {
  let p = head;
  const res: number[] = [];
  while (p) {
    res.push(p.val);
    p = p.next;
  }
  return res;
}

console.log(generateArrayFromStack(reverseList(createStackFromArray([1, 2, 3, 4, 5]))));
console.log(generateArrayFromStack(reverseRecursion(createStackFromArray([1, 2, 3, 4, 5]))));

