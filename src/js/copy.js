// foo.bind(this, ...args)

const bind = (fun, thisArg, ...args) => {
  // const proto = Object.create(thisArg);

  const proto = {
    fun,
  };
  Object.setPrototypeOf(proto, thisArg);

  return (...newArgs) => {
    return proto.fun(...args, ...newArgs);
  };
};

global.num = 100;

const mathTeacher = {
  num: 10,
  add(a, b) {
    return this.num + a + b;
  },
};

const student = {
  num: 1,
};

function compareAdd(a, b) {
  const { add } = mathTeacher;
  console.log(mathTeacher.add(a, b));
  console.log(bind(mathTeacher.add, student)(a, b));
  console.log(add(a,b));
  const newAdd = bind(mathTeacher.add, student, a)
  console.log(newAdd(1))
}

compareAdd(1, 2);
