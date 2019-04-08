import React from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from '@nypl/dgx-svg-icons';

const SearchButton = ({
  id, className, onClick, value,
}) => (
  <button id={id} className={`${className}`} onClick={onClick} type="submit" aria-controls="results-description">
    {value}
    <SearchIcon />
  </button>
);

SearchButton.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

SearchButton.defaultProps = {
  id: 'nypl-omnisearch-button',
  value: 'Search',
  className: '',
  onClick: () => {},
};

export default SearchButton;
