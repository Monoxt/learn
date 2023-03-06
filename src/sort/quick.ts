function quickSort(nums: number[], l: number = 0, r: number = nums.length - 1) {
  if (l < r) {
    const id = Math.floor((Math.random() * (r - l)) + l);
    const val = nums[id];
    [nums[l], nums[id]] = [nums[id], nums[l]];
    let i = l + 1, j = l + 1;
    while (i <= r) {
      if (nums[i] < val) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
        j++;
      }
      i++;
    }
    [nums[j - 1], nums[l]] = [nums[l], nums[j - 1]];
    quickSort(nums, l, j - 1 - 1);
    quickSort(nums, j - 1 + 1, r);
  }
  return nums;
}

const res = quickSort([10,9,8,7,6,5,4,3,2,1]);

console.log(res, res.length);
console.log(quickSort([10,9,81,100,66,30,2,4,1,0,5,4,3,2,1]));
