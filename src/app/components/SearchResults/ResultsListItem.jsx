import React from 'react';
import { Html5Entities } from 'html-entities';
import { isArray as _isArray } from 'underscore';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import ResultsRow from './ResultsRow';
import EditionsList from '../List/EditionsList';
import AuthorsList from '../List/AuthorsList';

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
      </Link>
    </h3>
    <span className="nypl-results-item-author">
      By
      <AuthorsList agents={item.agents} />
    </span>

    <EditionsList eReaderUrl={eReaderUrl} list={item.instances} alone />
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
