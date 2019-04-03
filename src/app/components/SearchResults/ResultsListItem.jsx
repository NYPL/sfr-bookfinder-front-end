import React from 'react';
import { Html5Entities } from 'html-entities';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import EditionsList from '../List/EditionsList';
import AuthorsList from '../List/AuthorsList';

const htmlEntities = new Html5Entities();

const ResultsListItem = ({ item, eReaderUrl }) => (
  <li className="nypl-results-item">
    <div className="nypl-results-item-header">
      <div className="nypl-results-item-header-image">image</div>
      <div className="nypl-results-item-header-column">
        <h3>
          <Link to={{ pathname: '/work', query: { workId: `${item.uuid}` } }}>
            {htmlEntities.decode(item.title)}
          </Link>
        </h3>
        {item.agents && item.agents.length > 0 && (
          <span className="nypl-results-item-author">
            By
            <AuthorsList agents={item.agents} />
          </span>
        )}
      </div>
    </div>

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
