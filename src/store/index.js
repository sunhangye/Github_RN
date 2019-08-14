import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import reducers from '../reducer';
import { middleware } from '../navigator/AppNavigators';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = (store) => next => action => {
  if (typeof action === 'function') {
    console.log('dispatching a function');
  } else {
    console.log('dispatch', action);
  }
  const result = next(action);
}


const middlewares = [
  middleware,
  thunk,
]

export default createStore(reducers, composeEnhancers(
   applyMiddleware(...middlewares)
));
