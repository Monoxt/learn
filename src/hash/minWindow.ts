function minWindow(s: string, t: string) {
  const hash: Record<string, number> = {};
  let cnt: number = 0;
  let needCnt: number = 0;
  let l: number, r: number;
  let ans: number = Infinity;

  for (let i = 0; i < t.length; i++) {
    if (hash[t[i]] !== undefined) {
      hash[t[i]]++;
    } else {
      hash[t[i]] = 1;
      needCnt++;
    }
  }

  l = r = -1;
  let i = 0;
  for (let j = 0; j < s.length; j++) {
    if (--hash[s[j]] === 0) {
      cnt++;
    }
    while (cnt === needCnt) {
      if (j - i + 1 < ans) {
        ans = j - i + 1;
        l = i;
        r = j;
      }
      if (++hash[s[i]] > 0) {
        cnt--;
      }
      i++;
    }
  }

  if (r >= l) {
    return s.slice(l, r+1);
  }
  return "";
}

console.log(minWindow('ADOBECODEBANC', 'ABC'));


