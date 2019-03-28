import React from 'react';
import { Html5Entities } from 'html-entities';
import { isArray as _isArray } from 'underscore';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import ResultsRow from './ResultsRow';

const htmlEntities = new Html5Entities();

const ResultsListItem = ({ item, eReaderUrl }) => (
  <li className="nypl-results-item">
    <h3>
      <Link to={{ pathname: '/work', query: { workId: `${item.uuid}` } }}>
        {htmlEntities.decode(item.title)}
        {item.entities && _isArray(item.entities) ? ` – ${item.entities[0].name}` : ''}
      </Link>
    </h3>
    <ResultsRow rows={item.instances} eReaderUrl={eReaderUrl} />
  </li>
);

ResultsListItem.propTypes = {
  eReaderUrl: PropTypes.string,
  item: PropTypes.objectOf(PropTypes.any),
};

ResultsListItem.defaultProps = {
  eReaderUrl: '',
  item: null,
};

ResultsListItem.contextTypes = {
  router: PropTypes.object,
};

export default ResultsListItem;
