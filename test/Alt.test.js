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
const searchByTitle = ['title one', 'title two'];
const searchByAuthor = ['author one', 'author two'];

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
      // NOTE: the offset must match the order that the action was called.
      const dispatcherArgs = getDispatcherArguments(dispatcherSpy, 0);

      // Test that the correct name of the action was called with the expected data.
      expect(dispatcherArgs.action).to.equal(action);
      expect(dispatcherArgs.data).to.eql([]);
    });

    it('should pass data to searchByTitle Action', () => {
      const action = actions.SEARCH_BY_TITLE;

      actions.searchByTitle([]);

      const dispatcherArgs = getDispatcherArguments(dispatcherSpy, 1);

      expect(dispatcherArgs.action).to.equal(action);
      expect(dispatcherArgs.data).to.eql([]);
    });

    it('should pass data to searchByAuthor Action', () => {
      const action = actions.SEARCH_BY_AUTHOR;

      actions.searchByAuthor([]);

      const dispatcherArgs = getDispatcherArguments(dispatcherSpy, 2);

      expect(dispatcherArgs.action).to.equal(action);
      expect(dispatcherArgs.data).to.eql([]);
    });
  });

  describe('Store', () => {
    it('should pass data to searchByKeyword Store', () => {
      const origSearchByKeyword = store.getState().searchByKeyword;
      const action = actions.SEARCH_BY_KEYWORD;

      expect(origSearchByKeyword).to.eql([]);

      // Dispatching new data.
      alt.dispatcher.dispatch({ action, data: searchByKeyword });
      const newSearchByKeyword = store.getState().searchByKeyword;

      expect(newSearchByKeyword).to.eql(searchByKeyword);
    });

    it('should pass data to searchByTitle Store', () => {
      const origSearchByTitle = store.getState().searchByTitle;
      const action = actions.SEARCH_BY_TITLE;

      expect(origSearchByTitle).to.eql([]);

      // Dispatching new data.
      alt.dispatcher.dispatch({ action, data: searchByTitle });
      const newSearchByTitle = store.getState().searchByTitle;

      expect(newSearchByTitle).to.eql(searchByTitle);
    });

    it('should pass data to searchByAuthor Store', () => {
      const origSearchByAuthor = store.getState().searchByAuthor;
      const action = actions.SEARCH_BY_AUTHOR;

      expect(origSearchByAuthor).to.eql([]);

      // Dispatching new data.
      alt.dispatcher.dispatch({ action, data: searchByAuthor });
      const newSearchByAuthor = store.getState().searchByAuthor;

      expect(newSearchByAuthor).to.eql(searchByAuthor);
    });
  });
});
