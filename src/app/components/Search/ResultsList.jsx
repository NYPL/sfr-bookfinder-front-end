import React from 'react';
import {
  isEmpty as _isEmpty,
} from 'underscore';
import Instances from './Instances';

const ResultsList = (results) => {
  console.log(results);
  if (_isEmpty(results.results)) {
    return null;
  }

  return (
    <div>
      <h2>Works</h2>
      <ul className="nypl-results-list">
        {
          results.results.map((result, i) => (
            <li className="nypl-results-item" tabIndex={i.toString()} key={i.toString()}>
              <h3>
                <a href={`/work/detail/${result._id}`}>
                  {result['_source'].title} &ndash; {result['_source'].entities[0].name}
                </a>
              </h3>
              <ul className="nypl-item-list">
                <Instances instances={result['_source'].instances} />
              </ul>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default ResultsList;
