const enum StatusType {
  'pending',
  'fulfilled',
  'rejected'
}

interface _PromiseType {
  then: any;
}

interface _PromiseInstance extends _PromiseType {
  status: StatusType;
  fulfilled: Function[];
  rejected: Function[];
  value: any;
}

const nextTick = (fn: (...args: any[]) => any) => {
  process.nextTick(() => {
    fn();
  });
}

function _Promise (this: _PromiseInstance, fn: (resolve: any, reject?: any) => void) {
  this.status = StatusType.pending;
  this.value = undefined;
  this.fulfilled = [];
  this.rejected = [];

  const resolve = (value: any) => {
    if (this.status !== StatusType.pending) {
      return;
    }

    if (value instanceof _Promise) {
      return (value as any).then((val: any) => {
        resolve(val);
      }).catch((err: any) => {
        reject(err);
      });
    }

    this.status = StatusType.fulfilled;
    this.value = value;

    const {
      fulfilled
    } = this;

    nextTick(() => {
      while(fulfilled.length) {
        const fun = fulfilled.shift();
        fun && fun(value);
      }
    });
  };

  const reject = (err: any) => {
    if (this.status !== StatusType.pending) {
      return;
    }

    this.value = err;
    this.status = StatusType.rejected;

    const {
      rejected
    } = this;

    nextTick(() => {
      while(rejected.length) {
        const fun = rejected.shift();
        fun && fun(err);
      }
    });
  };

  try {
    fn(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

_Promise.prototype.then = function (this: _PromiseInstance, fulfilledCallback: any, rejectedCallback: any) {
  return new (_Promise as any)((resolve: any, reject: any) => {

    const _fullfilledCallback = fulfilledCallback || (() => {});
    const _rejectedCallback = rejectedCallback || (() => {});

    const _resolve = (value: any) => {
      try {
        if (fulfilledCallback) {
          const p = _fullfilledCallback(value);
          resolve(p);
        } else {
          resolve(value);
        }
      } catch (err) {
        reject(err);
      }
    }

    const _reject = (reason: any) => {
      try {
        if (rejectedCallback) {
          const e = _rejectedCallback(reason);
          resolve(e || this.value);
        } else {
          reject(reason);
        }
      } catch (err) {
        reject(err);
      }
    }

    if (this.status === StatusType.fulfilled) {
      nextTick(() => _resolve(this.value));
    } else if (this.status === StatusType.rejected) {
      nextTick(() => _reject(this.value));
    } else {
      this.fulfilled.push(_resolve);
      this.rejected.push(_reject);
    }
  })
}

_Promise.prototype.catch = function (rejectedCallback: any = () => {}) {
  return this.then(undefined, rejectedCallback);
}

_Promise.all = function (arrs: _PromiseInstance[]) {
  return new MyPromise((resolve: any, reject: any) => {
    // const res: any[] = [];
    let errMsg: any;
    let p: _PromiseInstance = new MyPromise((r: any) => r([]));
    arrs.forEach((promise) => {
      p = p.then((res: any[]) => {
        console.log('res: ', res);
        return promise.then((val: any) => {
          res.push(val);
          return res;
        }).catch((err: any) => {
          errMsg = err;
          reject(err);
        });
      });
    });
    return p.then((res: any) => {
      resolve(res);
    });
  });
}

const MyPromise = _Promise as any;

// test then
// const p = new MyPromise((resolve: any) => {
//   console.log('inner');
//   setTimeout(() => {
//     resolve(1);
//   }, 100)
// });
// p.then((val: any) => {
//   console.log('next loop', val);
//   return 666;
// }).catch().then((val: any) => {
//   console.log('2', val);
// }).then(() => {
//   console.log('3');
// }).then(() => {
//   console.log('4');
// }).then((val: any) => {
//   console.log(val);
// });

// p.then((val: any) => {
//   console.log('interested', val);
// })

// console.log('outer');
// console.log(p);


// test catch
// const c = new MyPromise((resolve: any) => {
//   setTimeout(() => {
//     resolve('not see me');
//   }, 300);
//   throw new Error('error')
// });

// c.then((val: any) => {
//   console.log(val);
// }).then((val: any) => {
//   console.log(2, val);
// }).catch((err: any) => {
//   console.log('get err in another promise', err);
// }).catch((err: any) => {
//   console.log('could get error here?', err);
// });

// c.catch((err: any) => {
//   console.log('err: ', err);
// })

// test all
const p1 = new MyPromise((resolve: any) => {
  setTimeout(() => {
    resolve(100);
  }, 100)
});
const p2 = new MyPromise((resolve: any) => {
  setTimeout(() => {
    resolve(200);
  }, 200)
});
const p3 = new MyPromise((resolve: any) => {
  setTimeout(() => {
    resolve(300);
  }, 300)
});

MyPromise.all([p2, p1, p3]).then((res: any) => {
  console.log('res: ', res);
});
