interface S {
  [x: string]: any;
}

interface A {
  type: string;
}

export const createStore = (reducer: (state: S, action: A) => S, preloadedState?: S) => {
  let currentReducer = reducer;
  let currentState = preloadedState || {};
  let currentListeners: Map<number, any> | null = new Map();
  let nextListeners = currentListeners;
  let listenerIdCount = 0;
  let isDispatching = false;

  const dispatchingError = () => {
    if (isDispatching) {
      throw new Error('dispatching...');
    }
  }

  const getState = () => {
    dispatchingError();
    return currentState as S;
  }

  const dispatch = (action: A) => {
    dispatchingError();
    isDispatching = true;
    currentState = currentReducer(currentState, action);

    const listeners: any = (currentListeners = nextListeners);

    listeners.forEach((listener: any) => {
      listener();
    });

    return action;
  }

  const subscribe = (callback: () => void) => {
    dispatchingError();
    let isSubscribed = true;
    const id = listenerIdCount++;
    nextListeners.set(id, callback);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      nextListeners.delete(id);
      currentListeners = null;
    }
  }

  const store = {
    getState,
    dispatch,
    subscribe,
  };

  return store;
}
