import React from 'react';
import {
  isEmpty as _isEmpty,
} from 'underscore';
import ResultsRow from './ResultsRow';

const ResultsList = (results) => {
  if (_isEmpty(results.results)) {
    return null;
  }

  return (
    <div>
      <h2>Works</h2>
      <ul className="nypl-results-list">
        {
          results.results.map((result, i) => (
            <li className="nypl-results-item" key={i.toString()}>
              <h3>
                <a href={`/work/detail/${result._id}`}>
                  {result['_source'].title} &ndash; {result['_source'].entities[0].name}
                </a>
              </h3>
              <ResultsRow rows={result['_source'].instances} />
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default ResultsList;
