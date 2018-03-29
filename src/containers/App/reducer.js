// Constants
// import * as Constants from './constants';

const initialState = {
  // helloWorld: false
};

const actionHandlers = {
  // [Constants.HELLO_WORLD]: (state, action) => ({
  //   ...state,
  //   helloWorld: true
  // })
};

export default (state = initialState, action) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
};
