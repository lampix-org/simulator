// Constants
import * as Constants from './constants';

export const show = () => ({
  type: Constants.SHOW
});

export const hide = () => ({
  type: Constants.HIDE
});

export const queue = (message) => ({
  type: Constants.QUEUE,
  payload: {
    message: {
      message,
      key: new Date().getTime()
    }
  }
});

export const next = () => ({
  type: Constants.NEXT
});
