import { combineReducers } from 'redux';

// Reducers
import notifications from './containers/Notifications/reducer';

const appReducer = combineReducers({
  notifications
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
