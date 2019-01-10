import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../stores/ReduxStore';
import { SearchForm } from './SearchForm';
import SearchResultsList from './SearchResultsList';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = store.getState();
  }

  render() {
    return (
      <div className="wrapper">
        <SearchForm />
        <SearchResultsList />
      </div>
    );
  }
}

SearchPage.propTypes = {
  page: PropTypes.string,
};

SearchPage.defaultProps = {
  page: '1',
};

SearchPage.contextTypes = {
  router: PropTypes.object,
};

export default SearchPage;
