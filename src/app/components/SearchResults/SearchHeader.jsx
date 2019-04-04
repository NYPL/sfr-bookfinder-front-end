import React from 'react';
import PropTypes from 'prop-types';

const SearchHeader = ({ metadata }) => (
  <table className="search-header-table">
    <thead>
      <tr>
        <th>Items per page</th>
        <th>Sort by</th>
        <th />
        <th>Page</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <select>
            <option>{metadata.total}</option>
            <option>50</option>
            <option>100</option>
          </select>
        </td>
        <td>
          <select>
            <option>Relevance</option>
          </select>
        </td>
        <td>First Previous</td>
        <td>
          <select>
            <option>1 of 4</option>
          </select>
        </td>
        <td>Next Last</td>
      </tr>
    </tbody>
  </table>
);

SearchHeader.propTypes = {
  metadata: PropTypes.objectOf(PropTypes.any),
};

SearchHeader.defaultProps = {
  metadata: {},
};

export default SearchHeader;
