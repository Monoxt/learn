const pipe = (...args: Function[]) => {
  return args.reduce((pre, cur) => {
    return (...args: any[]) => {
      return cur(pre(...args));
    };
  });
};

const fun = pipe((s: string) => s.toUpperCase(), (s: string) => s.split('').reverse().join(''), (s: string) => s.slice(0, 3));

console.log(fun('abcdefg'));
