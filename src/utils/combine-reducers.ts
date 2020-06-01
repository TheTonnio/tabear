export function combineReducers (reducers: any = {}) {
  const reducerKeys = Object.keys(reducers);
  return function combination(state: any = { }, action: string) {
    let hasChanged = false;
    let nextState: any = { };
    for (let i = 0; i < reducerKeys.length; i++) {
      let key = reducerKeys[i];
      nextState[key] = reducers[key](state[key], action);
      hasChanged = hasChanged || nextState[key] !== state[key];
    }
    return hasChanged ? nextState : state;
  };
}
