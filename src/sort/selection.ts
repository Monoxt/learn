function selectionSort(nums: number[]) {
  let min: number;
  for (let i = 0; i < nums.length; i++) {
    min = nums.length - 1;
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[min]) {
        min = j;
      }
    }
    [nums[i], nums[min]] = [nums[min], nums[i]];
  }
  return nums;
}

const res = selectionSort([10,9,8,7,6,5,4,3,2,1]);

console.log(res, res.length);
console.log(selectionSort([10,9,81,100,66,30,2,4,1,0,5,4,3,2,1]));
