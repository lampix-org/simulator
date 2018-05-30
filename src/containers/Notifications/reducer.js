// Constants
import * as Constants from './constants';

// Utils
import assign from '../../utils/assign';

const initialState = {
  open: false,
  messageQueue: []
};

const actionHandlers = {
  [Constants.QUEUE]: (state, { payload }) => assign(state, {
    messageQueue: [...state.messageQueue, payload.message],
    open: true
  }),
  [Constants.NEXT]: (state) => {
    const queue = state.messageQueue.slice(1);

    return assign(state, {
      messageQueue: queue,
      open: queue.length > 0
    });
  },
  [Constants.SHOW]: (state) => assign(state, {
    open: true
  }),
  [Constants.HIDE]: (state) => assign(state, {
    open: false
  })
};

export default (state = initialState, action) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
};
