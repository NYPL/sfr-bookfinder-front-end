import React from 'react';
import PropTypes from 'prop-types';

const SearchButton = ({
  id, className, onClick, value,
}) => (
  <button
    id={id}
    className={`${className}`}
    onClick={onClick}
    type="submit"
    aria-controls="results-description"
  >
    <span className="usa-search-submit-text">
      {value}
    </span>
  </button>
);

SearchButton.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

SearchButton.defaultProps = {
  id: 'search-button',
  value: 'Search',
  className: '',
  onClick: () => {},
};

export default SearchButton;
