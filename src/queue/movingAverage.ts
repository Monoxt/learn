class MovingAverage {
  size: number;
  queue: number[];
  sum: number;
  constructor(size: number) {
    this.size = size;
    this.queue = [];
    this.sum = 0;
  }
  next(val: number) {
    if (!this.queue.length || this.queue.length < this.size) {
      this.queue.push(val);
      this.sum += val;
      return this.sum / this.queue.length;
    } else if (this.queue.length >= this.size) {
      const del = this.queue.shift() || 0;
      this.queue.push(val);
      this.sum = this.sum - del + val;
    }
    return this.sum / this.size;
  }
}
