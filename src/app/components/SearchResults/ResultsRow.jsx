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
        items.map((element, key) => {
          const isValid = (element.ebooks && element.ebooks.length > 0) ||
          element.pub_date || element.pub_place || element.publisher || element.language;
          if (!isValid) { return null; }
          return (
            <li className="nypl-results-item" key={key.toString()}>
              <div className="nypl-results-description">
                {(element.ebooks) ? <EBookList ebooks={element.ebooks} eReaderUrl={props.eReaderUrl} /> : ''}
                { element.pub_date &&
                  <span className="nypl-results-date">{element.pub_date}</span>
                }
                { element.pub_place &&
                  <span className="nypl-results-place">{element.pub_place}</span>
                }
                { element.publisher &&
                  <span className="nypl-results-publisher">{element.publisher}</span>
                }
                { element.language &&
                  <span className="nypl-results-info">{element.language}</span>
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
