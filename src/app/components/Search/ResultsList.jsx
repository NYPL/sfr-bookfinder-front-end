import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  isEmpty as _isEmpty,
} from 'underscore';
import ResultsRow from './ResultsRow';

class ResultsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = props;
    this.showWorkDetail = this.showWorkDetail.bind(this);
  }

  showWorkDetail(event) {
    event.preventDefault();
    console.log(this.event);

    this.state.fetchWork(this.location.query.workId);
  }

  render() {
    if (_isEmpty(this.results.results)) {
      return null;
    }

    return (
      <div>
        <h2>Works</h2>
        <ul className="nypl-results-list">
          {
            this.results.results.map((result, i) => (
              <li className="nypl-results-item" key={i.toString()}>
                <h3>
                  <Link onClick={showWorkDetail(event)} to={{ pathname: '/work', query: { workId: `${result['_source'].ids[0].identifier}` } }}>
                    {result['_source'].title} &ndash; {result['_source'].entities[0].name}
                  </Link>
                </h3>
                <ResultsRow rows={result['_source'].instances} />
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

ResultsList.defaultProps = {
  results: {},
  fetchWork: () => {},
};

ResultsList.propTypes = {
  results: PropTypes.object,
  fetchWork: PropTypes.func,
};

ResultsList.contextType = {
  router: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  fetchWork: (workId) => dispatch(fetchWork(workId)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ResultsList);
