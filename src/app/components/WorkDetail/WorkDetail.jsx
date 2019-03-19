import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { isEmpty as _isEmpty } from 'underscore';
import { DefinitionList } from './DefinitionList';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import * as searchActions from '../../actions/SearchActions';

class WorkDetail extends React.Component {

  componentDidMount() {
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

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

  /**
   * onClick handler for resetting state for the request back to the home page
   * to return the user to a new search.
   *
   * @param {object} event
   */
  handleReset(event) {
    event.preventDefault();

    searchActions.resetSearch();
    this.context.router.push('/');
  }

  render() {
    if (!this.props.work && _isEmpty(this.props.work)) {
      throw new Error('Work prop is missing or empty');
    }
    const { work } = this.props;

    return (
      <main id="mainContent">
        <div className="nypl-full-width-wrapper">
          <div className="nypl-page-header">
            <Breadcrumbs
              links={[
                {
                  href: `/search?q=${this.props.searchQuery}&field=${this.props.searchField}`,
                  text: 'Search Results',
                },
                {
                  href: `/work?workId=${work.uuid}`,
                  text: 'Work Details',
                },
              ]}
              pageType="details"
              onClickHandler={this.handleReset.bind(this)}
            />
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
  searchQuery: PropTypes.string,
  searchField: PropTypes.string,
  eReaderUrl: PropTypes.string,
};

WorkDetail.defaultProps = {
  work: {},
  searchQuery: '',
  searchField: '',
  eReaderUrl: '',
};

WorkDetail.contextTypes = {
  router: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => (
  {
    work: state.workDetail && state.workDetail.work,
    searchQuery: state.userQuery || ownProps.searchQuery,
    searchField: state.selectedField || ownProps.searchField,
  }
);

export default connect(
  mapStateToProps,
  null,
)(withRouter(WorkDetail));
