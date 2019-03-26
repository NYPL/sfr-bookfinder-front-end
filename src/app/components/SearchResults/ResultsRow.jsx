import React from 'react';
import PropTypes from 'prop-types';
import {
  isEmpty as _isEmpty,
} from 'underscore';
import EBookList from '../List/EBookList';

/**
 * Search results rows which display a list of editions of
 * a grouped bibliographic set of works under a single, uniform
 * title in ResultsList. Each row contains basic metadata about that
 * editions including links to eBooks.
 *
 * NOTE: No sorting logic has been applied after retrieval from ElasticSearch.
 *
 * @param {object} props
 * @return {string|null}
 */
const ResultsRow = (props) => {
  if (_isEmpty(props.rows)) {
    return null;
  }

  const items = props.rows.map((item) => {
    let publisher = item && item.agents && item.agents.find(i => i.roles.indexOf('publisher') > -1);
    publisher = publisher && publisher.name;
    return {
      ebooks: (item.items) ? item.items : [],
      pub_date: (item.pub_date_display) ? item.pub_date_display : null,
      pub_place: (item.pub_place) ? item.pub_place : null,
      publisher,
    };
  });

  return (
    <ul className="nypl-items-list">
      {
        items.map((item, key) => {
          const isValid = (item.ebooks && item.ebooks.length > 0) ||
          item.pub_date || item.pub_place || item.publisher || item.language;
          if (!isValid) { return null; }
          return (
            <li className="nypl-results-item" key={key.toString()}>
              <div className="nypl-results-description">
                {(item.ebooks) ? <EBookList ebooks={item.ebooks} eReaderUrl={props.eReaderUrl} /> : ''}
                { item.pub_date &&
                  <span className="nypl-results-date">{item.pub_date}</span>
                }
                { item.pub_place &&
                  <span className="nypl-results-place">{item.pub_place}</span>
                }
                { item.publisher &&
                  <span className="nypl-results-publisher">{item.publisher}</span>
                }
                { item.language &&
                  <span className="nypl-results-info">{item.language}</span>
                }
              </div>
            </li>
        );
})
      }
    </ul>
  );
};

ResultsRow.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object),
  eReaderUrl: PropTypes.string,
};

ResultsRow.defaultProps = {
  rows: [],
  eReaderUrl: '',
};

export default ResultsRow;
