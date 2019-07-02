import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DefinitionList } from './DefinitionList';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import * as searchActions from '../../actions/SearchActions';
import WorkHeader from './WorkHeader';
import EditionsList from '../List/EditionsList';
import SearchForm from '../SearchForm/SearchForm';
import { getQueryString } from '../../search/query';
import { deepEqual, isEmpty } from '../../util/Util';

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
    const { query } = this.props.location;
    const workId = query && query.workId;
    const prevWorkId = prevProps.location && prevProps.location.query && prevProps.location.query.workId;
    if (workId && workId !== prevWorkId) {
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
    if (!work || isEmpty(work) || deepEqual(work, WorkDetail.defaultProps.work)) {
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

    const breadcrumbLinks = (searchQuery, workItem) => {
      const links = [];
      if (workItem) {
        links.push({
          href: `/work?workId=${workItem.uuid}`,
          text: 'Work Details',
        });
      }
      return links;
    };

    return (
      <main
        id="mainContent"
        className="main-content grid-container padding-0"
      >
        <div className="grid-row">
          <div className="sfr-header-wrapper tablet:grid-col-12">
            <Breadcrumbs
              links={breadcrumbLinks(this.props.searchQuery, work)}
              pageType="details"
              onClickHandler={handleReset}
            />
            <SearchForm
              history={history}
              {...this.boundActions}
            />
            <div className="grid-col-10 sfr-center margin-y-3">
              {this.props.searchQuery && this.props.searchQuery.query && (
                <Link to={`/search?${getQueryString(this.props.searchQuery)}`}>Back to Search Results</Link>
              )}
            </div>
          </div>
          <div className="tablet:grid-col-10 sfr-center margin-top-3 margin-bottom-6">
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
              {work.instances && (
                <h3
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                  tabIndex="0"
                  id="all-editions"
                  className="all-editions-tag bold"
                >
                  All Editions
                </h3>
              )}
              <EditionsList
                eReaderUrl={this.props.eReaderUrl}
                work={work}
                max={0}
              />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

WorkDetail.propTypes = {
  work: PropTypes.objectOf(PropTypes.any),
  searchQuery: PropTypes.objectOf(PropTypes.any),
  eReaderUrl: PropTypes.string,
  dispatch: PropTypes.func,
  location: PropTypes.objectOf(PropTypes.any),
};

WorkDetail.defaultProps = {
  work: { instances: [] },
  searchQuery: {},
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
});

export default connect(
  mapStateToProps,
  null,
)(withRouter(WorkDetail));
