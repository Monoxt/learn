type MinStackNode = {
  val: any;
  idx: number;
}

class MinStack {
  normal: MinStackNode[];
  min: MinStackNode[];
  idx: number;
  constructor() {
    this.normal = [];
    this.min = [];
    this.idx = 0;
  }

  push(val: number): void {
    if (this.min.length) {
      if (this.min[this.min.length - 1].val > val) {
        this.min.push({
          val,
          idx: this.idx,
        });
      }
    } else {
      this.min.push({
        val,
        idx: this.idx,
      })
    }
    this.normal.push({
      val,
      idx: this.idx++,
    });
  }

  pop(): MinStackNode | null {
    if (this.normal[this.normal.length - 1]?.idx === this.min[this.min.length - 1]?.idx) {
      this.min.pop();
    }
    return this.normal.pop() || null;
  }

  top(): number {
    return this.normal[this.normal.length - 1]?.val;
  }

  getMin(): number {
    return this.min[this.min.length - 1]?.val;
  }
}

/**
* Your MinStack object will be instantiated and called as such:
* var obj = new MinStack()
* obj.push(val)
* obj.pop()
* var param_3 = obj.top()
* var param_4 = obj.getMin()
*/
