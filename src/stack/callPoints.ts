function calPoints(arr: string[]) {
  const stack: number[] = [];
  let sum = 0;
  arr.forEach((val) => {
    if (!Number.isNaN(+val)) {
      stack.push(+val);
      sum += +val;
    } else if (val === 'C') {
      const v = stack.pop();
      sum -= v || 0;
    } else if (val === 'D') {
      stack.push(stack[stack.length - 1] * 2);
      sum += stack[stack.length - 1];
    } else if (val === '+') {
      stack.push(stack[stack.length - 1] + stack[stack.length - 2]);
      sum += stack[stack.length - 1];
    }
  });
  return sum;
}

console.log(calPoints(['5', '2', 'C', 'D', '+']));
