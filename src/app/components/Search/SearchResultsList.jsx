import React from 'react';
import { connect } from 'react-redux';

const SearchResultsList = ({ results }) => (
  <div className="results-list">
    <div className="results-header"><h3>{resultsList}</h3></div>
    <div className="results-metadata"></div>
    <div className="results-table"></div>
  </div>
);

export default connect(
  null,
  null,
)(SearchResultsList);
