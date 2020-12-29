/* eslint-disable no-underscore-dangle */
import configureStore from "./configureStore";

const preloadedState =
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'window' does not exist on type 'Global'.
  global && global.window && global.window.__PRELOADED_STATE__;
if (preloadedState) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'window' does not exist on type 'Global'.
  delete global.window.__PRELOADED_STATE__;
}

const store = configureStore(preloadedState);

export default store;
