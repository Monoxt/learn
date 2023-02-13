function backspaceCompare(s: string, t: string): boolean {
  let i = 0;
  const sArr: string[] = [];
  const tArr: string[] = [];

  while (s[i] || t[i]) {
    if (s[i] === '#') {
      sArr.pop();
    } else {
      sArr.push(s[i]);
    }
    if (t[i] === '#') {
      tArr.pop();
    } else {
      tArr.push(t[i]);
    }
    i++;
  }
  return sArr.join('') === tArr.join('');
}

class ListNode {
  val: any;
  next: ListNode | null
  constructor(val?: any, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

class List {
  head: ListNode | null;
  size: number;
  isEmpty() {
    return this.size === 0;
  }
  pop() {
    const p = this.head;
    this.head = p?.next || null;
    this.size && this.size--;
    return p;
  }
  push(n: ListNode) {
    n.next = this.head;
    this.head = n;
    this.size++;
  }
  constructor(head: ListNode | null) {
    this.head = head;
    this.size = head ? 1 : 0;
  }
}

function generateStackFromString(str: string): List {
  let list = new List(null);
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '#') {
      list.pop();
    } else {
      list.push(new ListNode(str[i]));
    }
  }
  return list;
}

function backspaceCompare2(s: string, t: string): boolean {
  const sStack = generateStackFromString(s);
  const tStack = generateStackFromString(t);

  while (!sStack.isEmpty() && !tStack.isEmpty()) {
    if (sStack.pop()?.val !== tStack.pop()?.val) {
      return false;
    }
  }

  return sStack.isEmpty() && tStack.isEmpty();
}

console.log(backspaceCompare2('y#fo##f', 'y#f#o##f'));
