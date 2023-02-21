function subarraySum(nums: number[], k: number) {
  const sums: number[] = [];
  const hash: Record<string, number> = {[k]: 1};
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    sums[i] = nums[i];
    if (i) {
      sums[i] += sums[i - 1];
    }
    if (hash[sums[i]] !== undefined) {
      ans += hash[sums[i]];
    }
    if (hash[sums[i] + k] === undefined) {
      hash[sums[i] + k] = 1;
    } else {
      hash[sums[i] + k]++;
    }
  }

  return ans;
}

console.log(subarraySum([1,1,1], 2)); // 2
