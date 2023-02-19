function constrainedSubsetSum(nums: number[], k: number) {
  const queue: number[] = [];
  const dp: number[] = [];
  let max: number = -Infinity;

  for (let i = 0; i < nums.length; i++) {

    while (queue.length && i - queue[0] > k) {
      queue.shift();
    }

    if (dp.length) {
      const top = dp[queue[0]];
      dp[i] = top > 0 ? nums[i] + top : nums[i];
    } else {
      dp[i] = nums[i];
    }

    while (queue.length && dp[queue[queue.length - 1]] <= dp[i]) {
      queue.pop();
    }

    queue.push(i);

    if (dp[i] > max) {
      max = dp[i];
    }
  }

  return max;
}
