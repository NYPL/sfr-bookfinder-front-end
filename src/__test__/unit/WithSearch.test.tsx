/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sinon-chai' or its correspondi... Remove this comment to see the full error message
import sinonChai from 'sinon-chai';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sinon' or its corresponding ty... Remove this comment to see the full error message
import { stub } from 'sinon';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import chai, { expect } from 'chai';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme' or its corresponding t... Remove this comment to see the full error message
import { mount } from 'enzyme';
import { mockRouterContext } from '../helpers/routing';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/Searc... Remove this comment to see the full error message
import withSearch from '../../src/app/components/SearchForm/WithSearch';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/search/query' or... Remove this comment to see the full error message
import { getQueryString } from '../../src/app/search/query';

chai.use(sinonChai);

type Props = {
    submitSearchRequest?: (...args: any[]) => any;
    onQueryChange?: (...args: any[]) => any;
    onFieldChange?: (...args: any[]) => any;
};


// @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'props'. Did you mean 'Props'?
const DummyComponent =props: Props => (
  <form
    // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'props'. Did you mean 'Props'?
    onSubmit={props.submitSearchRequest}
  >
    <select
      id="cakes"
      // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'props'. Did you mean 'Props'?
      onChange={props.onFieldChange}
      // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'props'. Did you mean 'Props'?
      onBlur={props.onFieldChange}
    >
      <option value="redvelvet">red velvet</option>
      <option value="carrot">carrot cake</option>
    </select>
    <input
      className="dummy-text"
      name="decorations"
      type="text"
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'props'.
      onChange={props.onQueryChange}
    />
  </form>
);
DummyComponent.defaultProps = {
  submitSearchRequest: () => {},
  onQueryChange: () => {},
  onFieldChange: () => {},
};

const testQuery = {
  filters: '[]',
  page: '0',
  per_page: '10',
  queries: [{ field: 'keyword', query: 'cat' }],
  showQueries: [{ field: 'keyword', query: 'cat' }],
  sort: '[]',
  total: '0',
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('With Search Component', () => {
  // @ts-expect-error ts-migrate(7034) FIXME: Variable 'wrapper' implicitly has type 'any' in so... Remove this comment to see the full error message
  let wrapper;
  let SearchDummy;
  const props = { dispatch: stub() };
  const push = stub();
  const context = mockRouterContext(push);
  const childContextTypes = mockRouterContext(push);

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(() => {
    SearchDummy = withSearch(DummyComponent);
    wrapper = mount(<SearchDummy dispatch={props.dispatch} />, { context, childContextTypes });
  });
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render passed in component', () => {
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'wrapper' implicitly has an 'any' type.
    expect(wrapper.find('form').exists()).to.equal(true);
  });
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should change state on queryChange', () => {
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'wrapper' implicitly has an 'any' type.
    wrapper.find('input').simulate('change', { target: { value: 'candles' } });
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'wrapper' implicitly has an 'any' type.
    expect(wrapper.state().searchQuery.queries[0]).to.eql({ query: 'candles', field: 'keyword' });
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'wrapper' implicitly has an 'any' type.
    expect(wrapper.state().searchQuery.showQueries[0]).to.eql({ query: 'candles', field: 'keyword' });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should change state on FieldChange', () => {
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'wrapper' implicitly has an 'any' type.
    expect(wrapper.state().searchQuery.queries.find(query => query.field === 'carrot')).to.equal(undefined);
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'wrapper' implicitly has an 'any' type.
    wrapper.find('select').simulate('change', { target: { value: 'carrot' } });
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'wrapper' implicitly has an 'any' type.
    expect(wrapper.state().searchQuery.queries.find(query => query.field === 'carrot')).to.eql({ query: '', field: 'carrot' });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should submit', () => {
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'wrapper' implicitly has an 'any' type.
    wrapper.setState({ searchQuery: testQuery });
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'wrapper' implicitly has an 'any' type.
    wrapper.find('form').simulate('submit');
    const path = `/search?${getQueryString(testQuery)}`;
    expect(context.router.push).to.have.been.calledWith(path);
  });
});
