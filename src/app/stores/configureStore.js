/* eslint-env browser */
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
  /* eslint-disable no-underscore-dangle */
  const composedEnhancers = global.window && global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(...enhancers)
    : compose(...enhancers);
  /* eslint-enable */

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
