import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import searchReducer from './Reducers';

export default function configureStore(preloadedState) {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(searchReducer, preloadedState, composedEnhancers);

  return store;
}
