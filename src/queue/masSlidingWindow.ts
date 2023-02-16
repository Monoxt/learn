function maxSlidingWindow(nums: number[], k: number) {
  const queue: number[] = [];
  const res: number[] = [];

  function addQueue(i: number) {
    if (queue.length) {
      while (nums[queue[queue.length - 1]] < nums[i]) {
        queue.pop();
      }
    }
    queue.push(i);
  }

  for (let i = 0; i < nums.length; i++) {
    if (i < k) {
      addQueue(i);
    } else {
      res.push(nums[queue[0]]);
      if ((i-k) === queue[0]) {
        queue.shift();
      }
      addQueue(i);
    }
  }

  res.push(nums[queue[0]]);
  
  return res;
}

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); // [3,3,5,5,6,7]
console.log(maxSlidingWindow([1,3,1,2,0,5], 3)); // [3,3,2,5]
