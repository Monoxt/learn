// foo.bind(this, ...args)

const bind = (fun: (...args: any[]) => any, thisArg: any, ...args: any[]) => {
  const proto = Object.create(thisArg);

  proto.fun = fun;

  return (...newArgs: any[]) => {
    return proto.fun(...args, ...newArgs);
  }
}

const call = (fun: (...args: any[]) => any, thisArg: any, ...args: any[]) => {
  const proto = Object.create(thisArg);

  proto.fun = fun;

  return proto.fun(...args)
}

const apply = (fun: (...args: any[]) => any, thisArg: any, args: any[]) => {
  const proto = Object.create(thisArg);
  proto.fun = fun;
  return proto.fun(...args)
}

const copy = (obj: any) => {
  if (Array.isArray(obj)) {
    return obj.slice();
  } else if (typeof obj === 'object') {
    return Object.assign({}, obj);
  }
  return obj;
}

const copyDeep = (obj: any) => {
  let res: any = {};
  if (!obj) return;

  if (Array.isArray(obj)) {
    res = [];
    obj.forEach((item, index) => {
      res[index] = copyDeep(item);
    });
    return res;
  }

  if (typeof obj === 'object') {
    Object.entries(obj).forEach(([key, val]) => {
      if (typeof val === 'object') {
        res[key] = copyDeep(val);
      } else {
        res[key] = copy(val);
      }
    });
    return res;
  } else {
    return obj;
  }
}

(globalThis as any).num = 100;

const mathTeacher = {
  num: 10,
  add(this: any, a: number, b: number) {
    return this?.num + a + b;
  }
}

const student = {
  num: 1
}


function compareAdd(a: number, b: number) {
  const { add } = mathTeacher;
  console.log(mathTeacher.add(a, b));
  console.log(bind(mathTeacher.add, student)(a, b));
  console.log(add(a,b));
  const newAdd = bind(mathTeacher.add, student, a)
  console.log(newAdd(1))
}

// compareAdd(1, 2);

const p = { x: 1, y: 2, z: { a: 'a' } };
const cp = copyDeep(p);

console.log(cp);

cp.z.a = 'z';

console.log(cp);
console.log(p);
