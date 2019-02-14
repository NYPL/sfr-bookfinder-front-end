import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import {
  isEmpty as _isEmpty,
} from 'underscore';
import ResultsRow from './ResultsRow';

/**
 * ResultsList presents search results as a "grouped" list of books
 * with their associated editions provided by the ResultsRow component.
 * Each result displays a title and author element linked to its companion
 * detailed view.
 *
 * @returns {string|null}
 */
class ResultsList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.showWorkDetail = this.showWorkDetail.bind(this);
  }

  showWorkDetail(event, workId) {
    event.preventDefault();

    this.props.fetchWork(workId)
      .then(() => {
        this.context.router.push(`/work?workId=${workId}`);
      });
  }

  render() {
    if (_isEmpty(this.props.results)) {
      return null;
    }

    return (
      <div className="nypl-results">
        <div className="nypl-results-header">
          <h2>Search Results</h2>
        </div>
        <ul className="nypl-results-list">
          {this.props.results.map((result, i) => (
              <li className="nypl-results-item" key={i.toString()}>
                <h3>
                  <Link onClick={event => this.showWorkDetail(event, result['_source'].uuid)} to={{ pathname: '/work', query: { workId: `${result['_source'].uuid}` } }}>
                    {result['_source'].title}{(result['_source'].entities && Array.isArray(result['_source'].entities)) ? ` – ${result['_source'].entities[0].name}` : ''}
                  </Link>
                </h3>
                <ResultsRow rows={result['_source'].instances} eReaderUrl={this.props.eReaderUrl} />
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

ResultsList.propTypes = {
  eReaderUrl: PropTypes.string,
};

ResultsList.defaultProps = {
  eReaderUrl: '',
};

ResultsList.contextTypes = {
  router: PropTypes.object,
};

export default ResultsList;
