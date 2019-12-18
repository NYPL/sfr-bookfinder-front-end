import React from 'react';
import { Html5Entities } from 'html-entities';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import EditionsList from '../List/EditionsList';
import AuthorsList from '../List/AuthorsList';
import BookSvg from '../Svgs/BookSvg';

const htmlEntities = new Html5Entities();

const chunk = (string, max) => (string.length > max ? `${string.slice(0, max)}&hellip;` : string);

const ResultsListItem = ({ item, eReaderUrl, referrer }) => (
  <li className="nypl-results-item">
    <div className="nypl-results-item-header">
      <div className="nypl-results-item-header-image">
        <BookSvg />
      </div>
      <div className="nypl-results-item-header-column">
        <h3>
          <Link
            to={{ pathname: '/work', query: { workId: `${item.uuid}` } }}
            title={htmlEntities.decode(item.title)}
          >
            {htmlEntities.decode(chunk(item.title, 150))}
          </Link>
        </h3>
        {item.subtitle && <div>{item.subtitle}</div>}
        {item.agents
        && item.agents.length > 0 //
          && item.agents.filter(agent => agent.roles && agent.roles.indexOf('author') > -1).length > 0 && (
            <div className="nypl-results-item-author">
              By
              <AuthorsList
                agents={item.agents}
                max={1}
                roleFilter="author"
              />
            </div>
        )}
      </div>
    </div>

    <EditionsList
      referrer={referrer}
      eReaderUrl={eReaderUrl}
      work={item}
      max={3}
    />
  </li>
);

ResultsListItem.propTypes = {
  referrer: PropTypes.string,
  eReaderUrl: PropTypes.string,
  item: PropTypes.objectOf(PropTypes.any),
};

ResultsListItem.defaultProps = {
  referrer: '',
  eReaderUrl: '',
  item: { instances: [] },
};

ResultsListItem.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
};

export default ResultsListItem;
