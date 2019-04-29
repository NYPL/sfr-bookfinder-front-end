import React from 'react';
import PropTypes from 'prop-types';

const SearchButton = ({
  id, className, onClick, value, buttonClassName,
}) => (
  <div className={className}>
    <button
      id={id}
      className={buttonClassName}
      onClick={onClick}
      type="submit"
      aria-controls="results-description"
    >
      <span className="usa-search__submit-text">{value}</span>
    </button>
  </div>
);

SearchButton.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  onClick: PropTypes.func,
};

SearchButton.defaultProps = {
  id: 'search-button',
  value: 'Search',
  className: '',
  buttonClassName: '',
  onClick: () => {},
};

export default SearchButton;
