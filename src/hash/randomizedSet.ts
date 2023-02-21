class RandomizedSet {
  vals: number[];
  hash: Map<number, number>;
  constructor() {
    this.vals = [];
    this.hash = new Map();
  }

  insert(val: number): boolean {
    if (this.hash.has(val)) {
      return false;
    }
    this.vals.push(val);
    this.hash.set(val, this.vals.length - 1);
    return true;
  }

  remove(val: number): boolean {
    if (!this.hash.has(val)) {
      return false;
    }
    const last = this.vals[this.vals.length - 1];
    this.vals[this.hash.get(val)!] = last;
    this.hash.set(last, this.hash.get(val)!);
    this.vals.pop();
    this.hash.delete(val);
    return true;
  }

  getRandom(): number {
    const random = Math.floor(Math.random() * this.vals.length);
    return this.vals[random];
  }
}

const randomSet = new RandomizedSet();
randomSet.insert(0);
randomSet.insert(1);
randomSet.remove(0);
randomSet.insert(2);
randomSet.remove(1);
console.log(randomSet.getRandom());
