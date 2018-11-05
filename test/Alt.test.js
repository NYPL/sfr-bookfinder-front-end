/* eslint-env mocha */
import { expect } from 'chai';

import sinon from 'sinon';
import alt from '../src/app/alt';
import actions from '../src/app/actions/Actions.js';
import store from '../src/app/stores/Store.js';

/*
 * getDispatcherArguments
 * Results of Actions are stored in an array so they must be obtained sequentially.
 * @param {object} dispatcherSpy Sinon spy for the Alt dispatcher object.
 * @param {number} num The offset of the action called.
 * @returns {object} object with the name and data of that the Action was called with.
 */
const getDispatcherArguments = (dispatcherSpy, num) => dispatcherSpy.args[num][0];
const searchByKeyword = ['keyword one', 'keyword two'];

describe('Alt', () => {
  describe('Actions', () => {
    let dispatcherSpy;

    before(() => {
      dispatcherSpy = sinon.spy(alt.dispatcher, 'dispatch');
    });

    after(() => {
      alt.dispatcher.dispatch.restore();
    });

    it('should pass data to searchByKeyword Action', () => {
      const action = actions.SEARCH_BY_KEYWORD;

      // Trigger the action with data.
      actions.searchByKeyword([]);

      // Get the payload passed to the dispatcher.
      // Note, the offset must match the order that the action was called.
      const dispatcherArgs = getDispatcherArguments(dispatcherSpy, 0);

      // Test that the correct name of the action was called with the expected data.
      expect(dispatcherArgs.action).to.equal(action);
      expect(dispatcherArgs.data).to.eql([]);
    });
  });

  describe('Store', () => {
    it('should pass data to searchByKeyword Action', () => {
      const origSearchByKeyword = store.getState().searchByKeyword;
      const action = actions.SEARCH_BY_KEYWORD;

      expect(origSearchByKeyword).to.eql([]);

      // Dispatching new data.
      alt.dispatcher.dispatch({ action, data: searchByKeyword });
      const newSearchByKeyword = store.getState().searchByKeyword;

      expect(newSearchByKeyword).to.eql(searchByKeyword);
    });
  });
});
