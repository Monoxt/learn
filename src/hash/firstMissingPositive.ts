function firstMissingPositive(nums: number[]) {
  const hash: boolean[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      hash[nums[i]] = true;
    }
  }

  for (let i = 1; i <= hash.length; i++) {
    if (hash[i] === undefined) {
      return i;
    }
  }

  return 1;
}
