function maxResult(nums: number[], k: number) {
  const queue: number[] = [];
  let sum: number = nums[0] || 0;
  for (let i = 1; i < nums.length; i++) {
    if (!queue.length) {
      queue.push(i);
    } else if (i <= k) {
      if (nums[i] >= nums[queue[0]]) {
        queue.length = 0;
      }
      queue.push(i);
    } else {
      if ((i - k) === queue[0]) {
        sum += nums[queue.shift() as number];
      }
      if (queue.length && nums[i] >= nums[queue[0]]) {
        queue.length = 0;
        queue.push(i);
      } else if (!queue.length) {
        queue.push(i);
      }
    }
  }

  let other = -Infinity;

  if (queue[0] < nums.length - 1) {
    for (let j = queue[0] + 1; j < nums.length; j++) {
      if (other < nums[j]) other = nums[j];
    }
  } else {
    other = 0;
  }
  return sum + nums[queue[0]] + other;
}

// console.log(maxResult([1,-1,-2,4,-7,3], 2));
// console.log(maxResult([10,-5,-2,4,0,3], 3));
console.log(maxResult([100,-1,-100,-1,100], 2));
