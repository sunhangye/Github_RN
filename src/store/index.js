import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import reducers from '../reducer';
import { middleware } from '../navigator/AppNavigators';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
  middleware,
]

export default createStore(reducers, composeEnhancers(
   applyMiddleware(...middlewares)
));
