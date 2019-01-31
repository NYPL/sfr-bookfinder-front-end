import React from 'react';
import {
  isEmpty as _isEmpty,
} from 'underscore';
import EBookList from '../List/EBookList';

const ResultsRow = (rows) => {
  if (_isEmpty(rows.rows)) {
    return null;
  }

  const items = rows.rows.map(item => (
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
              <EBookList ebooks={element.ebooks} />
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
