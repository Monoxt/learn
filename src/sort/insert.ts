function insertSort(nums: number[]) {
  for (let i = 1; i < nums.length; i++) {
    while (i > 0 && nums[i] < nums[i - 1]) {
      [nums[i - 1], nums[i]] = [nums[i], nums[i - 1]];
      i--;
    }
  }
  return nums;
}

const res = insertSort([10,9,8,7,6,5,4,3,2,1]);

console.log(res, res.length);
console.log(insertSort([10,9,81,100,66,30,2,4,1,0,5,4,3,2,1]));
