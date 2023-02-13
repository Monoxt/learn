// 只考虑 () 类型的括号
function longestValidParentheses(str: string) {
  function isLeftBrackets(str: string) {
    return str === '(';
  }
  function isRightBrackets(str: string) {
    return str === ')';
  }

  const leftBrackets: string[] = [];
  const len = str.length;
  let max = 0;
  let count = 0;

  function shouldResetMax() {
    if (!leftBrackets.length) {
      if (count > max) {
        max = count;
      }
    }
  }

  function addLeftBracket(s: string) {
    leftBrackets.push(s);
    count++;
  }

  for (let i = 0; i < len; i++) {
    if (isRightBrackets(str[i])) {
      continue;
    }
    leftBrackets.length = 0;
    count = 0;
    addLeftBracket(str[i]);
    for (let j = i + 1; j < len; j++) {
      shouldResetMax();
      const s = str[j];
      if (isLeftBrackets(s)) {
        addLeftBracket(s);
      } else if (isRightBrackets(s)) {
        if (leftBrackets.length) {
          leftBrackets.pop();
          count++;
        } else {
          i = j;
          break;
        }
      } else {
        return 0;
      }
    }
    shouldResetMax();
  }
  return max;
}

// 优化
function longestValidParenthesesImprove(str: string) {
  function isLeftBrackets(str: string) {
    return str === '(';
  }
  function isRightBrackets(str: string) {
    return str === ')';
  }

  const stack: number[] = [-1];
  const len = str.length;
  let max = 0;

  for (let i = 0; i < len; i++) {
    if (isLeftBrackets(str[i])) {
      stack.push(i);
    } else if (isRightBrackets(str[i])) {
      stack.pop();
      if (stack.length) {
        const l = i - stack[stack.length - 1];
        if (l > max) {
          max = l;
        }
      } else {
        stack.push(i);
      }
    }
  }
  return max;
}

console.log(longestValidParenthesesImprove('(())(')); // 4
console.log(longestValidParenthesesImprove('()(')); // 2
console.log(longestValidParenthesesImprove(')()())')); // 4
console.log(longestValidParenthesesImprove('(()')); // 2
console.log(longestValidParenthesesImprove(')()())()()(')); // 4

