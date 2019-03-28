import React from 'react';
import { Html5Entities } from 'html-entities';
import { isArray as _isArray } from 'underscore';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import ResultsRow from './ResultsRow';

const htmlEntities = new Html5Entities();

const getAuthor = (item) => {
  if (item.agents && _isArray(item.agents) && item.agents.length > 0) {
    const agent = item.agents.find(i => i.roles.indexOf('author') > -1);
    if (agent) {
      return ` – ${agent.name}`;
    }
  }
  return '';
};

const ResultsListItem = ({ item, eReaderUrl }) => (
  <li className="nypl-results-item">
    <h3>
      <Link to={{ pathname: '/work', query: { workId: `${item.uuid}` } }}>
        {htmlEntities.decode(item.title)}
        {getAuthor(item)}
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
