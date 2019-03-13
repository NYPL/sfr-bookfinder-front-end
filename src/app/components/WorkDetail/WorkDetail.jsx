import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { isEmpty as _isEmpty } from 'underscore';
import { DefinitionList } from './DefinitionList';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

class WorkDetail extends React.Component {

  /**
   * Convert JSON object to array for parsing detail elements into
   * a definition list for display.
   *
   * @param {object} work
   * @return {string|null}
   */
  workDetailsObject(work) {
    return Object.keys(work).map(key => (
      [key, work[key]]
    ));
  };

  render() {
    if (!this.props.work && _isEmpty(this.props.work)) {
      throw new Error('Work prop is missing or empty');
    }
    const { work } = this.props;
    // Rewind to previous results page query and parse for Breadcrumbs.
    const resultsQuery = this.props.location.history.query;
    console.log('History?', resultsQuery);

    return (
      <main id="mainContent">
        <div className="nypl-full-width-wrapper">
          <div className="nypl-page-header">
            <Breadcrumbs query={resultsQuery} type="details" />
          </div>
          <div className="nypl-row">
            <div className="nypl-column-full">
              <h2>Work Detail</h2>
              <div id="nypl-item-details">
                <DefinitionList
                  data={this.workDetailsObject(work)}
                  eReaderUrl={this.props.eReaderUrl}
                  dispatch={this.props.dispatch}
                  context={this.context}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

WorkDetail.propTypes = {
  work: PropTypes.object,
  query: PropTypes.string,
  eReaderUrl: PropTypes.string,
};

WorkDetail.defaultProps = {
  work: {},
  query: '',
  eReaderUrl: '',
};

WorkDetail.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  console.log('state in detail', state);
  return {
    work: state.workDetail && state.workDetail.work,
    query: state.setQuery,
  };
};

export default connect(
  mapStateToProps,
  null,
)(withRouter(WorkDetail));
