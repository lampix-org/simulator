import { combineReducers } from 'redux';

// Reducers
import app from './containers/App/reducer';

const appReducer = combineReducers({
  app
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
