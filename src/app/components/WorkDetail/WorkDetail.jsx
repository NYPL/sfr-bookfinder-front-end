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

const scrollToHash = (hash) => {
  const hashtag = hash && hash.replace(/#/, '');
  if (hashtag) {
    const element = global.document.getElementById(hashtag);
    if (element) {
      element.scrollIntoView();
      element.focus();
    }
  }
};

class WorkDetail extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;

    this.boundActions = bindActionCreators(searchActions, dispatch);
  }

  componentDidMount() {
    const { query, hash } = this.props.location;
    const workId = query && query.workId;
    this.loadWork(workId, hash);
  }

  componentDidUpdate(prevProps) {
    const { query, hash } = this.props.location;
    const workId = query && query.workId;
    const prevWorkId = prevProps.location && prevProps.location.query && prevProps.location.query.workId;
    if (workId && workId !== prevWorkId) {
      this.loadWork(workId, hash);
    } else if (hash) {
      scrollToHash(hash);
    }
  }

  loadWork(workId, hash) {
    global.window.scrollTo(0, 0);
    this.fetchWork(workId).then(() => {
      scrollToHash(hash);
    });
  }

  fetchWork(workId) {
    return this.props.dispatch(searchActions.fetchWork(workId));
  }

  render() {
    const work = this.props.work ? this.props.work.data : null;
    if (!work || isEmpty(work) || deepEqual(work, WorkDetail.defaultProps.work)) {
      return null;
    }
    const { history } = this.context;
    const referrer = this.props.location.pathname + this.props.location.search;

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
            <div className="sfr-center">
              <SearchForm
                isHomePage={false}
                history={history}
                {...this.boundActions}
              />
            </div>
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
                referrer={referrer}
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
                  tabIndex="-1"
                  id="all-editions"
                  className="all-editions-tag bold"
                >
                  All Editions
                </h3>
              )}
              <EditionsList
                referrer={referrer}
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
  temp: PropTypes.objectOf(PropTypes.any),
  work: PropTypes.objectOf(PropTypes.any),
  searchQuery: PropTypes.objectOf(PropTypes.any),
  eReaderUrl: PropTypes.string,
  dispatch: PropTypes.func,
  location: PropTypes.objectOf(PropTypes.any),
};

WorkDetail.defaultProps = {
  temp: {},
  work: { data: { instances: [] } },
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
