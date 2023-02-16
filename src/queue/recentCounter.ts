class RecentCounter {
  queue: number[];
  constructor() {
    this.queue = [];
  }
  ping(t: number) {
    this.queue.push(t);
    while (t - this.queue[0] > 3000) {
      this.queue.shift();
    }
    return this.queue.length;
  }
}
