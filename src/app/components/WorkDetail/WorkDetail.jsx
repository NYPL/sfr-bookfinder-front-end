import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DS from '@nypl/design-system-react-components';
import { DefinitionList } from './DefinitionList';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import * as searchActions from '../../actions/SearchActions';
import WorkHeader from './WorkHeader';
import EditionsList from '../List/EditionsList';
import { deepEqual } from '../../util/Util';
import EditionCard from '../Card/EditionCard';
import SearchHeader from '../SearchForm/SearchHeader';

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

const getEditionCard = (work, origin, eReaderUrl, referrer) => {
  if (!work.editions[0]) return null;
  const getFirstReadableEdition = work.editions.find(edition => edition.items
    && edition.items.length && edition.items[0].links && edition.items[0].links.length);
  const featuredEditionData = EditionCard.getEditionData(getFirstReadableEdition, origin, eReaderUrl, referrer);
  return (
    <DS.EditionCard
      id="featured-card"
      coverUrl={featuredEditionData.coverUrl}
      editionHeadingElement={featuredEditionData.editionYearHeading}
      editionInfo={[featuredEditionData.publisherAndLocation, featuredEditionData.language, featuredEditionData.license]}
      readOnlineLink={featuredEditionData.readOnlineLink}
      downloadLink={featuredEditionData.downloadLink}
    />
  );
};

class WorkDetail extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = { ...props, loaded: false };
    this.boundActions = bindActionCreators(searchActions, dispatch);
  }

  componentDidMount() {
    const { query, hash } = this.props.location;
    const workId = query && query.workId;
    this.loadWork(workId, hash, this.boundActions);
    this.setState({ loaded: true });
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
    this.props.dispatch(searchActions.fetchWork(workId)).then(() => {
      scrollToHash(hash);
      this.setState({ loaded: true });
    });
  }

  render() {
    const { router, history } = this.context;
    const work = this.props.workResult ? this.props.workResult.data : null;
    const isValidWork = work && work.editions && !deepEqual(work, WorkDetail.defaultProps.workResult);
    const eReaderUrl = this.props.eReaderUrl;
    const referrer = this.props.location.pathname + this.props.location.search;
    const origin = this.state.loaded ? window.location.origin : '';

    return (
      <DS.Container>
        <main
          id="mainContent"
        >
          <Breadcrumbs
            router={router}
            location={this.props.location}
            searchQuery={this.props.searchQuery}
          />
          <div className="grid-row">
            <div className="sfr-center">
              <SearchHeader />
            </div>
          </div>
          { isValidWork
          && (
          <>
            <div className="grid-row">
              <div className="nypl-item-header">
                <WorkHeader data={work} />
              </div>
            </div>
            <div className="grid-row">
              <DS.Heading
                level={2}
                id="featured-edition"
                text="Featured Edition"
              />
            </div>
            <div className="grid-row">
              <div className="sfr-center">
                {getEditionCard(work, origin, eReaderUrl, referrer)}
              </div>
            </div>
            <div className="grid-row">
              <div id="nypl-item-details">
                <DefinitionList
                  work={work}
                  dispatch={this.props.dispatch}
                  context={this.context}
                />
                {work.editions && (
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
          </>
          )
          }
        </main>
      </DS.Container>
    );
  }
}

WorkDetail.propTypes = {
  workResult: PropTypes.objectOf(PropTypes.any),
  searchQuery: PropTypes.objectOf(PropTypes.any),
  eReaderUrl: PropTypes.string,
  dispatch: PropTypes.func,
  location: PropTypes.objectOf(PropTypes.any),
};

WorkDetail.defaultProps = {
  workResult: { data: { instances: [] } },
  searchQuery: {},
  eReaderUrl: '',
  dispatch: () => { },
  location: {},
};

WorkDetail.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = (state, ownProps) => ({
  workResult: state.workResult && state.workResult.work,
  searchQuery: state.searchQuery || ownProps.searchQuery,
});

WorkDetail.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

export default connect(
  mapStateToProps,
  null,
)(withRouter(WorkDetail));
