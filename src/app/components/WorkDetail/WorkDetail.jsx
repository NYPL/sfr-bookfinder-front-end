import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty as _isEmpty, isEqual as _isEqual } from 'underscore';
import { DefinitionList } from './DefinitionList';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import * as searchActions from '../../actions/SearchActions';
import WorkHeader from './WorkHeader';
import EditionsList from '../List/EditionsList';
import SearchForm from '../SearchForm/SearchForm';

class WorkDetail extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;

    this.boundActions = bindActionCreators(searchActions, dispatch);
  }

  componentDidMount() {
    global.window.scrollTo(0, 0);
    this.loadWork();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      global.window.scrollTo(0, 0);
      this.loadWork();
    }
  }

  loadWork() {
    const { query } = this.props.location;
    const workId = query && query.workId;

    if (workId) {
      this.props.dispatch(searchActions.fetchWork(workId));
    }
  }

  render() {
    const { work } = this.props;
    if (!work || _isEmpty(work) || _isEqual(work, WorkDetail.defaultProps.work)) {
      return null;
    }
    const { history } = this.context;

    /**
     * onClick handler for resetting state for the request back to the home page
     * to return the user to a new search.
     *
     * @param {object} event
     */
    const handleReset = (event) => {
      event.preventDefault();

      this.boundActions.resetSearch();
      this.context.router.push('/');
    };

    return (
      <main id="mainContent">
        <div className="nypl-full-width-wrapper">
          <div className="search-wrapper">
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
                onClickHandler={handleReset}
              />
            </div>
            <SearchForm
              history={history}
              {...this.boundActions}
            />
          </div>
          <div className="nypl-row">
            <div className="nypl-column-full">
              <div className="nypl-item-header">
                <WorkHeader data={work} />
              </div>

              <div id="nypl-item-details">
                <EditionsList
                  eReaderUrl={this.props.eReaderUrl}
                  work={work}
                  max={1}
                />
                <DefinitionList
                  work={work}
                  dispatch={this.props.dispatch}
                  context={this.context}
                />
                <h3 className="all-editions-tag bold">
                  <a id="all-editions">All Editions</a>
                </h3>
                <EditionsList
                  eReaderUrl={this.props.eReaderUrl}
                  work={work}
                  max={0}
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
  work: PropTypes.objectOf(PropTypes.any),
  searchQuery: PropTypes.string,
  searchField: PropTypes.string,
  eReaderUrl: PropTypes.string,
  dispatch: PropTypes.func,
  location: PropTypes.objectOf(PropTypes.any),
};

WorkDetail.defaultProps = {
  work: { instances: [] },
  searchQuery: '',
  searchField: '',
  eReaderUrl: '',
  dispatch: () => {},
  location: {},
};

WorkDetail.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = (state, ownProps) => ({
  work: state.workDetail && state.workDetail.work,
  searchQuery: state.searchQuery || ownProps.searchQuery,
  searchField: state.searchField || ownProps.searchField,
});

export default connect(
  mapStateToProps,
  null,
)(withRouter(WorkDetail));
