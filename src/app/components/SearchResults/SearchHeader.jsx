import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Form/Select';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { getQueryString } from '../../search/query';

const pageList = (perPage = 10, total) => {
  const totalPages = Math.floor(total / perPage) + 1;
  const list = [];
  for (let i = 1; i <= totalPages; i += 1) {
    list.push(i);
  }
  return list;
};

class SearchHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    const { metadata, searchQuery } = this.props;
    const submit = () => {
      const path = `/search?${getQueryString(this.state.searchQuery)}`;
      this.props.router.push(path);
    };
    const onChangePage = (e) => {
      const newPage = e.target.value - 1;
      this.props.userQuery(Object.assign({}, searchQuery, { page: newPage }));
      this.setState(prevState => Object.assign({}, prevState, { page: newPage }));
      submit();
    };
    const onChangePerPage = (e) => {
      const newPerPage = e.target.value;
      this.props.userQuery(Object.assign({}, searchQuery, { per_page: newPerPage }));
      this.setState(prevState => Object.assign({}, prevState, { per_page: newPerPage }));
      submit();
    };
    return (
      <form className="usa-form grid-container padding-0 search-header">
        <div className="grid-row">
          <div className="grid-col">Items per page</div>
          <div className="grid-col">Sort By</div>
          <div className="grid-col">&nbsp;</div>
          <div className="grid-col">Page</div>
          <div className="grid-col">&nbsp;</div>
        </div>
        <div className="grid-row">
          <Select
            id="items-by-page"
            selectClass="sfr-select-input usa-select"
            className="grid-col nypl-search-input"
            options={[10, 25, 50]}
            label=""
            labelClass="usa-label"
            value={searchQuery.per_page}
            onChange={onChangePerPage}
            onBlur={onChangePerPage}
          />
          <Select
            id="sort-by"
            selectClass="sfr-select-input usa-select"
            className="grid-col nypl-search-input"
            options={['Relevance', 'Alphabetically']}
            label=""
            labelClass="usa-label"
          />
          <div className="grid-col sfr-header-border">First Previous</div>
          <Select
            id="page-select"
            selectClass="sfr-select-input usa-select"
            className="grid-col nypl-search-input"
            options={pageList(searchQuery.per_page, metadata.total)}
            label=""
            labelClass="usa-label"
            value={searchQuery.page}
            onChange={onChangePage}
            onBlur={onChangePage}
          />

          <div className="grid-col sfr-header-border">Next Last</div>
        </div>
      </form>
    );
  }
}

SearchHeader.propTypes = {
  metadata: PropTypes.objectOf(PropTypes.any),
  searchQuery: searchQueryPropTypes,
  userQuery: PropTypes.func,
  searchPost: PropTypes.func,
};

SearchHeader.defaultProps = {
  metadata: {},
  searchQuery: initialSearchQuery,
  userQuery: () => {},
  searchPost: () => {},
};

export default SearchHeader;
