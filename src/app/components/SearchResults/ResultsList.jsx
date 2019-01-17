import React from 'react';
import { Link } from 'react-router';
import {
  isEmpty as _isEmpty,
} from 'underscore';
import ResultsRow from './ResultsRow';

const ResultsList = (props) => {
  if (_isEmpty(props.results)) {
    return null;
  }

  const showWorkDetail = (event, workId) => {
    event.preventDefault();

    props.actions.fetchWork(workId);
  };

  return (
    <div>
      <h2>Works</h2>
      <ul className="nypl-results-list">
        {props.results.map((result, i) => (
            <li className="nypl-results-item" key={i.toString()}>
              <h3>
                <Link onClick={event => showWorkDetail(event, result['_source'].uuid)} to={{ pathname: '/work', query: { workId: `${result['_source'].uuid}` } }}>
                  {result['_source'].title} &ndash; {result['_source'].entities[0].name}
                </Link>
              </h3>
              <ResultsRow rows={result['_source'].instances} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ResultsList;
