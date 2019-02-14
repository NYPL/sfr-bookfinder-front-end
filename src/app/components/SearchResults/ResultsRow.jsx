import React from 'react';
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

  const items = props.rows.map(item => (
    {
      ebooks: (item.items) ? item.items : [],
      pub_date: (item.pub_date) ? parseInt(item.pub_date) : null,
      pub_place: (item.pub_place) ? item.pub_place : null,
      publisher: (item.publisher) ? item.publisher : null,
    }
  ));

  return (
    <ul className="nypl-items-list">
      {
        items.map((element, key) => (
          <li className="nypl-results-item" key={key.toString()}>
            <div className="nypl-results-description">
              {(element.ebooks) ? <EBookList ebooks={element.ebooks} eReaderUrl={props.eReaderUrl} /> : ''}
              <span className="nypl-results-date">{element.pub_date}</span>
              <span className="nypl-results-place">{element.pub_place}</span>
              <span className="nypl-results-publisher">{element.publisher}</span>
              <span className="nypl-results-info">{element.language}</span>
            </div>
          </li>
        ))
      }
    </ul>
  );
};

export default ResultsRow;
