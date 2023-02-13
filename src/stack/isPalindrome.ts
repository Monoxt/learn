class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
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

function isPalindrome(arr: number[]) {
  const len = arr.length - 1;
  for (let i = 0, j = len; i < j; i++, j--) {
    if (arr[i] !== arr[j]) return false;
  }
  return true;
}

function isPalindromeNode(head: ListNode) {
  let len = 0;
  let reverse: ListNode | null = head;
  let p: ListNode | null = head;
  let pre: ListNode | null = null;

  while(p.next) {
    pre = new ListNode(p.val, pre);
    p = p.next;
    len++;
  }

  reverse = new ListNode(p.val, pre);
  len++;
  p = head;

  if (!reverse) return true;

  for (let i = 0; i < len / 2; i++) {
    if (p?.val !== reverse?.val) return false;
    p = p?.next || null;
    reverse = reverse?.next || null;
  }
  return true;
}

// console.log(isPalindrome([1,2,2,1])); // true
// console.log(isPalindrome([1,2,3,3])); // false
console.log(isPalindrome([1,2])); // false
console.log(isPalindromeNode(createStackFromArray([1,2,2,1])!)); // true
