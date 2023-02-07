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
  while (p && p.next) {
    // console.log('prev: ', prev, )
    prev = next;
    next = p.next;
    p.next = next.next;
    next.next = prev;
  }
  head = next;
  return next;
};

function createListFromArray(arr: number[]) {
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

function generateArrayFromNodeList(head: ListNode | null) {
  let p = head;
  const res: number[] = [];
  while(p) {
    res.push(p.val);
    p = p.next;
  }
  return res;
}

console.log(generateArrayFromNodeList(reverseList(createListFromArray([1,2,3,4,5]))));
