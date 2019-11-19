import React from 'react';
import PropTypes from 'prop-types';

const SearchButton = ({
  id, className, onClick, value, buttonClassName, ariaLabel,
}) => (
  <div className={className}>
    <button
      id={id}
      className={buttonClassName}
      onClick={onClick}
      type="submit"
      aria-label={ariaLabel}
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
  ariaLabel: PropTypes.string,
};

SearchButton.defaultProps = {
  id: 'search-button',
  value: 'Search',
  className: '',
  buttonClassName: '',
  ariaLabel: '',
  onClick: () => { },
};

export default SearchButton;
