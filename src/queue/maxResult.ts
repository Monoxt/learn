function maxResult(nums: number[], k: number) {
  const queue: number[] = [0];
  const dp: number[] = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    while (queue.length && i - k > queue[0]) {
      queue.shift();
    }
    dp[i] = nums[i] + dp[queue[0]];
    while(queue.length && dp[queue[queue.length - 1]] <= dp[i]) {
      queue.pop();
    }
    queue.push(i);
  }

  return dp[nums.length - 1];
}

// console.log(maxResult([1,-1,-2,4,-7,3], 2));
// console.log(maxResult([10,-5,-2,4,0,3], 3));
console.log(maxResult([100,-1,-100,-1,100], 2));
