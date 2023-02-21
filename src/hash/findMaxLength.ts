function findMaxLength(nums: number[]) {
  const hash: Record<number, number> = {};
  let left: number, right: number;
  let sum = 0;
  let max = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i === 0) {
      left = right = 0;
      hash[0] = 0;
    } else {
      left = i - 2 * sum;
      if (hash[left] === undefined) {
        hash[left] = i;
      }
      right = i + 1 - 2 * (sum + nums[i]);
      if (hash[right] !== undefined) {
        if (i - hash[right] + 1 > max) {
          max = i - hash[right] + 1;
        }
      }
    }
    sum += nums[i];
  }

  return max;
};

console.log(findMaxLength([0,1])); // 2
console.log(findMaxLength([0,1,0,1])); // 4
