import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './Reducers';

/**
 * Provides a configurable store object that uses enhancers
 * which help provide an array of middleware for use by
 * applications. We can introduce middlware that provides
 * logging, debugging, async processing, caching, etc.
 *
 * @param {object} preloadedState
 * @return {object}
 */
export default function configureStore(preloadedState) {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
