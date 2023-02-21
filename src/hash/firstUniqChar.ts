function firstUniqChar(str: string[]) {
  const hash: Record<string, number> = {};
  for (let i = 0; i < str.length; i++) {
    if (hash[str[i]]) {
      hash[str[i]]++;
    } else {
      hash[str[i]] = 1;
    }
  }

  for (let i = 0; i < str.length; i++) {
    if (hash[str[i]] === 1) {
      return i;
    }
  }

  return -1;
}
