import React from 'react';
import {
  isEmpty as _isEmpty,
} from 'underscore';
import appConfig from '../../../../appConfig';

const ResultsRow = (rows) => {
  if (_isEmpty(rows.rows)) {
    return null;
  }
  const appEnv = process.env.APP_ENV || 'production';
  const eReaderUrl = `${appConfig.ereader[appEnv]}?url=`;

  const items = rows.rows.map(item => (
    {
      ebooks: (item.items) ? item.items : [],
      pub_date: (item.pub_date) ? parseInt(item.pub_date) : null,
      pub_place: (item.pub_place) ? item.pub_place : null,
      publisher: (item.publisher) ? item.publisher : null,
      language: (item.language) ? item.language : null,
    }
  ));

  return (
    <ul className="nypl-item-list">
      {
        items.map((element, key) => (
          <li className="nypl-results-item" key={key.toString()}>
            <div className="nypl-results-description">
              <ul className="nypl-ebooks-list">
                {
                  element.ebooks &&
                  element.ebooks.map((ebook, ebookKey) => (
                    <li className="nypl-results-media" key={ebookKey.toString()}>
                      eBook: <a href={`${eReaderUrl}${ebook.url}`}> {ebook.url}</a>
                    </li>
                  ))
                }
                <br />
                <span className="nypl-results-date">{element.pub_date}</span>
                <span className="nypl-results-place">{element.pub_place}</span>
                <span className="nypl-results-publisher">{element.publisher}</span>
                <span className="nypl-results-info">{element.language}</span>
              </ul>
            </div>
          </li>
        ))
      }
    </ul>
  );
};

export default ResultsRow;
