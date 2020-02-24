/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import sinonChai from 'sinon-chai';
import { stub } from 'sinon';
import chai, { expect } from 'chai';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import { mockRouterContext } from '../helpers/routing';
import withSearch from '../../src/app/components/SearchForm/WithSearch';
import { getQueryString } from '../../src/app/search/query';

chai.use(sinonChai);


const DummyComponent = props => (
  <form
    onSubmit={props.submitSearchRequest}
  >
    <select
      id="cakes"
      onChange={props.onFieldChange}
      onBlur={props.onFieldChange}
    >
      <option value="redvelvet">red velvet</option>
      <option value="carrot">carrot cake</option>
    </select>
    <input
      className="dummy-text"
      name="decorations"
      type="text"
      onChange={props.onQueryChange}
    />
  </form>
);

DummyComponent.propTypes = {
  submitSearchRequest: PropTypes.func,
  onQueryChange: PropTypes.func,
  onFieldChange: PropTypes.func,
};
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
  showField: '',
  showQuery: '',
  sort: '[]',
  total: '0',
};

describe('With Search Component', () => {
  let wrapper;
  let SearchDummy;
  const props = { dispatch: stub() };
  const push = stub();
  const context = mockRouterContext(push);
  const childContextTypes = mockRouterContext(push);

  beforeEach(() => {
    SearchDummy = withSearch(DummyComponent);
    wrapper = mount(<SearchDummy dispatch={props.dispatch} />, { context, childContextTypes });
  });
  it('should render passed in component', () => {
    expect(wrapper.find('form').exists()).to.equal(true);
  });
  it('should change state on queryChange', () => {
    wrapper.find('input').simulate('change', { target: { value: 'candles' } });
    expect(wrapper.state().searchQuery.showQuery).to.equal('candles');
  });

  it('should change state on FieldChange', () => {
    expect(wrapper.state().searchQuery.queries.find(query => query.field === 'carrot')).to.equal(undefined);
    wrapper.find('select').simulate('change', { target: { value: 'carrot' } });
    expect(wrapper.state().searchQuery.queries.find(query => query.field === 'carrot')).to.eql({ query: '', field: 'carrot' });
  });

  it('should submit', () => {
    wrapper.setState({ searchQuery: testQuery });
    wrapper.find('form').simulate('submit');
    const path = `/search?${getQueryString(testQuery)}`;
    expect(context.router.push).to.have.been.calledWith(path);
  });
});
