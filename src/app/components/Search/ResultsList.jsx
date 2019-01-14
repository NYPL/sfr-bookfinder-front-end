import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  isEmpty as _isEmpty,
} from 'underscore';
import ResultsRow from './ResultsRow';
import { fetchWork } from '../../actions/SearchActions';

class ResultsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = props;
    this.showWorkDetail = this.showWorkDetail.bind(this);
  }

  showWorkDetail(event, workId) {
    event.preventDefault();

    this.state.fetchWork(workId);
  }

  render() {
    if (_isEmpty(this.props.results)) {
      return null;
    }

    return (
      <div>
        <h2>Works</h2>
        <ul className="nypl-results-list">
          {
            this.props.results.map((result, i) => (
              <li className="nypl-results-item" key={i.toString()}>
                <h3>
                  <Link onClick={event => this.showWorkDetail(event, result['_source'].ids[0].identifier)} to={{ pathname: '/work', query: { workId: `${result['_source'].ids[0].identifier}` } }}>
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
  results: PropTypes.array,
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
