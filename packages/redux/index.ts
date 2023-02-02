import {createStore} from './redux';

const store = createStore((state = {}) => state);

class MyTestClass {
  run() {
    console.log('Done.');
  }
}

document.querySelector('#btn')?.addEventListener('click', () => {
  runTest();
})

function runTest() {
  const test = new MyTestClass();
  const unsubscribe = store.subscribe(() => {
    test.run();
  });
  store.dispatch({type: 'RUN'});
  unsubscribe();
}

// won't be called but will keep code running
setInterval(runTest, 10000000000);

