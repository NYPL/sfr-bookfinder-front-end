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
      <h3>Works</h3>
      <ul className="results-list">
        {
          results.results.map((result, i) => (
            <li tabIndex={i.toString()} key={i.toString()}>
              {result['_source'].title}
              <div className="instances">
                <Instances instances={result['_source'].instances} />
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default ResultsList;
