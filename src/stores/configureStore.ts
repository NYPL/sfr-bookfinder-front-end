/* eslint-env browser */
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
import persistState from "redux-sessionstorage";
import { rootReducer } from "./Reducers";

/**
 * Provides a configurable store object that uses enhancers
 * which help provide an array of middleware for use by
 * applications. We can introduce middlware that provides
 * logging, debugging, async processing, caching, etc.
 *
 * @param {object} preloadedState
 * @return {object}
 */
export default function configureStore(preloadedState: any) {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  if (typeof window !== "undefined") {
    enhancers.push(persistState());
  }
  /* eslint-disable no-underscore-dangle */
  const composedEnhancers =
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'window' does not exist on type 'Global'.
    global.window && global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? // @ts-expect-error ts-migrate(2339) FIXME: Property 'window' does not exist on type 'Global'.
        global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(...enhancers)
      : compose(...enhancers);
  /* eslint-enable */

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
