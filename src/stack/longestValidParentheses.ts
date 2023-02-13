function longestValidParentheses(str: string) {
  const bracketsMap: any = {
    ')': '(',
    ']': '[',
    '}': '{'
  };
  function isLeftBrackets(str: string) {
    return ['(', '[', '{'].includes(str);
  }
  function isRightBrackets(str: string) {
    return [')', ']', '}'].includes(str);
  }
  function compareBrackets(left?: string, right?: string) {
    if (!left || !right) {
      return false;
    }
    return bracketsMap[right] === left;
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
        const left = leftBrackets.pop();
        if (!compareBrackets(left, s)) {
          i = j;
          break;
        } else {
          count++;
        }
      } else {
        return 0;
      }
    }
    shouldResetMax();
  }
  return max;
}

console.log(longestValidParentheses('(())(')); // 4
console.log(longestValidParentheses('()(')); // 2
console.log(longestValidParentheses(')()())')); // 4

