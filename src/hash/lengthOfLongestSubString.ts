// function lengthOfLongestSubstring(s: string) {
//   let hash: Record<string, number> = {};
//   let max = 0;
//   let l: number = 0, r: number = s.length;

//   if (s.length === 0) {
//     return 0;
//   }

//   for (let i = 0; i < s.length; i++) {
//     if (hash[s[i]] === undefined) {
//       hash[s[i]] = i;
//       r = i;
//     } else {
//       r = i - 1;
//       if (max < r - l + 1) {
//         max = r - l + 1;
//       }
//       l = hash[s[i]] + 1;

//       Object.keys(hash).forEach((key) => {
//         if (hash[key] < l) {
//           delete hash[key];
//         }
//       });

//       hash[s[i]] = i;
//     }
//   }

//   if (max < r - l + 1) {
//     max = r - l + 1;
//   }

//   return max;
// }

function lengthOfLongestSubstring(s: string) {
  let max = 0;
  let l = 0;
  let r = -1;
  const len = s.length;
  const hash: Record<string, number> = {};

  while (++r < len) {
    if (hash[s[r]] !== undefined) {
      hash[s[r]]++;
    } else {
      hash[s[r]] = 1;
    }
    while (hash[s[r]] > 1) {
      --hash[s[l]];
      l++;
    }
    if (r - l + 1 > max) {
      max = r - l + 1;
    }
  }

  return max;
}

console.log(lengthOfLongestSubstring('abcabcbb'));
console.log(lengthOfLongestSubstring('a'));
console.log(lengthOfLongestSubstring('au'));
console.log(lengthOfLongestSubstring('auc'));
console.log(lengthOfLongestSubstring('auuc'));
console.log(lengthOfLongestSubstring('aab'));
console.log(lengthOfLongestSubstring('aabaab!bb'));
