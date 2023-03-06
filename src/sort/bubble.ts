function bubbleSort(nums: number[]) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - i - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
      }
    }
  }
  return nums;
}

const res = bubbleSort([10,9,81,100,66,30,2,4,1,0,5,4,3,2,1]);

console.log(res, res.length);
