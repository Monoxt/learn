function isValid(str: string) {
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

  for (let s of str) {
    if (isLeftBrackets(s)) {
      leftBrackets.push(s);
    } else if (isRightBrackets(s)) {
      const left = leftBrackets.pop();
      if (!compareBrackets(left, s)) return false;
    } else {
      return false;
    }
  }
  if (leftBrackets.length) {
    return false;
  }
  return true;
}

console.log(isValid('()[]{}'))
console.log(isValid('([)]'))
console.log(isValid('{[]}'))
