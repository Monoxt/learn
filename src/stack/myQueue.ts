class MyQueue {
  pushStack: any[];
  popStack: any[];

  constructor() {
    this.pushStack = [];
    this.popStack = [];
  }

  push(x: number): void {
    this.pushStack.push(x);
  }

  private checkPop(): void {
    if (!this.popStack.length) {
      while(this.pushStack.length) {
        const v = this.pushStack.pop();
        this.popStack.push(v);
      }
    }
  }

  pop(): number {
    this.checkPop();
    return this.popStack.pop();
  }

  peek(): number {
    this.checkPop();
    return this.popStack[this.popStack.length - 1] || null;
  }

  empty(): boolean {
    return !this.pushStack.length && !this.popStack.length;
  }
}

/**
* Your MyQueue object will be instantiated and called as such:
* var obj = new MyQueue()
* obj.push(x)
* var param_2 = obj.pop()
* var param_3 = obj.peek()
* var param_4 = obj.empty()
*/
const obj = new MyQueue();
obj.push(1);
obj.push(2);
obj.push(3);
obj.push(4);
obj.pop();
obj.push(5);
obj.pop();
obj.pop();
obj.pop();
obj.pop();
