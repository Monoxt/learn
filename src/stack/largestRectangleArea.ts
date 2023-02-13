function largestRectangleAreaError(heights: number[]) {
  const st: number[] = [];
  let max = 0;
  heights.push(-1);
  const len = heights.length;

  for (let i = 0; i < len; i++) {
    let top = st[st.length - 1];
    if (st.length === 0 || heights[top] <= heights[i]) {
      st.push(i);
    } else {
      while(st.length !== 0 && heights[top] >= heights[i]) {
        top = st[st.length - 1];
        st.pop();
        max = Math.max(max, (i - top) * heights[top]);
      }
      st.push(top);
      heights[top] = heights[i];
    }
  }

  return max;
}

function largestRectangleArea(heights: number[]) {
  const st: number[] = [];
  let max = 0;
  heights.push(-1);
  const len = heights.length;

  function getStTop() {
    return st[st.length - 1];
  }

  for (let i = 0; i < len; i++) {
    let top = st[st.length - 1];
    if (st.length === 0 || heights[top] <= heights[i]) {
      st.push(i);
    } else {
      let index = st[st.length - 1];
      while(st.length !== 0 && heights[getStTop()] >= heights[i]) {
        index = st[st.length - 1];
        st.pop();
        max = Math.max(max, (i - index) * heights[index]);
      }
      st.push(index);
      heights[index] = heights[i];
    }
  }

  return max;
}

console.log(largestRectangleAreaError([2,1,5,6,2,3])); // 10
console.log(largestRectangleArea([2,1,5,6,2,3])); // 10
