import React from 'react';
import { isArray as _isArray } from 'underscore';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import ResultsRow from './ResultsRow';

class ResultsListItem extends React.Component {
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
    const result = this.props.item;
    return (
      <li className="nypl-results-item">
        <h3>
          <Link onClick={event => this.showWorkDetail(event, result.uuid)} to={{ pathname: '/work', query: { workId: `${result.uuid}` } }}>
            {result.title}{(result.entities && _isArray(result.entities)) ? ` – ${result.entities[0].name}` : ''}
          </Link>
        </h3>
        <ResultsRow rows={result.instances} eReaderUrl={this.props.eReaderUrl} />
      </li>
    );
  }
}

ResultsListItem.propTypes = {
  eReaderUrl: PropTypes.string,
  item: PropTypes.objectOf(PropTypes.any),
  fetchWork: PropTypes.func,
};

ResultsListItem.defaultProps = {
  eReaderUrl: '',
  item: null,
  fetchWork: () => {},
};

ResultsListItem.contextTypes = {
  router: PropTypes.object,
};

export default ResultsListItem;
