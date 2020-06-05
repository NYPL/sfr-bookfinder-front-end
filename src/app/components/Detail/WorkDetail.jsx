import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DS from '@nypl/design-system-react-components';
import FeatureFlags from 'dgx-feature-flags';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import * as searchActions from '../../actions/SearchActions';
import EditionsList from '../List/EditionsList';
import { deepEqual, checkFeatureFlagActivated, joinArrayOfElements } from '../../util/Util';
import EditionCard from '../Card/EditionCard';
import SearchHeader from '../SearchForm/SearchHeader';
import RequestDigital from '../Feedback/RequestDigital';
import featureFlagConfig from '../../../../featureFlagConfig';
import { getQueryString } from '../../search/query';
import config from '../../../../appConfig';
import WorkDetailDefinitionList from './WorkDetailDefinitionList';

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
    this.state = {
      shouldShowAll: 'true', requestedEdition: null, isFeatureFlagsActivated: {}, ...props,
    };
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.getRequestEditionButton = this.getRequestEditionButton.bind(this);
    this.toggleReadOnline = this.toggleReadOnline.bind(this);
    this.boundActions = bindActionCreators(searchActions, dispatch);
  }

  componentDidMount() {
    const { location } = this.props;
    const { query, hash } = location;
    this.setState({ shouldShowAll: query && query.showAll ? (query.showAll === 'true') : 'true' });
    this.loadWork(query, hash, this.boundActions);
    FeatureFlags.store.listen(this.onFeatureFlagsChange.bind(this));

    checkFeatureFlagActivated(
      featureFlagConfig.featureFlagList, this.state.isFeatureFlagsActivated,
    );
  }

  componentDidUpdate(prevProps) {
    const { query, hash } = this.props.location;
    const workId = query && query.workId;
    const prevWorkId = prevProps.location && prevProps.location.query && prevProps.location.query.workId;
    if (workId && workId !== prevWorkId) {
      this.loadWork(query, hash);
    } else if (hash) {
      scrollToHash(hash);
    }
  }

  onFeatureFlagsChange() {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ featureFlagsStore: FeatureFlags.store.getState() });
  }

  getEditionCard(work, eReaderUrl, referrer) {
    if (!work.editions[0]) return null;
    const getFirstReadableEdition = work.editions.find(edition => edition.items
      && edition.items.length && edition.items[0].links && edition.items[0].links.length);
    const featuredEditionData = EditionCard.getEditionData(work, getFirstReadableEdition,
      eReaderUrl, referrer, this.getRequestEditionButton(getFirstReadableEdition));
    return (
      <DS.EditionCard
        id="featured-card"
        coverUrl={featuredEditionData.coverUrl}
        editionHeadingElement={featuredEditionData.editionYearHeading}
        editionInfo={featuredEditionData.editionInfo}
        readOnlineLink={featuredEditionData.readOnlineLink}
        downloadLink={featuredEditionData.downloadLink}
        noLinkElement={featuredEditionData.noLinkElement}
      />
    );
  }

  getRequestDigital(work) {
    return (
      <RequestDigital
        closeForm={this.closeForm}
        requestedWork={work}
        requestedEdition={this.state.requestedEdition}
      />
    );
  }

  getRequestEditionButton(edition) {
    return (
      <a
        role="link"
        tabIndex="0"
        className="link request-digital-link"
        onKeyDown={(event) => { if (event.keyCode === 13) { this.openForm(edition); } }}
        onClick={() => this.openForm(edition)}
      >
        Request Digitization
      </a>
    );
  }

  openForm(requestedEdition) {
    this.setState({ requestedEdition });
  }

  closeForm() {
    this.setState({ requestedEdition: null });
  }

  loadWork(query, hash) {
    global.window.scrollTo(0, 0);
    if (query && query.workId) {
      this.props.dispatch(searchActions.fetchWork(query)).then(() => {
        scrollToHash(hash);
      });
    } else {
      this.props.router.push('/');
    }
  }

  toggleReadOnline() {
    const query = this.props.location.query;
    // query params are expressed as strings
    // but are stored in state as booleans to simplify Checkbox.isSelected
    if (query.showAll === 'true') {
      query.showAll = 'false';
      this.setState({ shouldShowAll: false });
    } else if (query.showAll) {
      query.showAll = 'true';
      this.setState({ shouldShowAll: true });
    } else {
      // No showAll in query
      query.showAll = 'false';
      this.setState({ shouldShowAll: false });
    }
    this.props.dispatch(searchActions.detailRefinePost(query));
    const path = `/work?${getQueryString(query)}`;
    this.props.router.push(path);
  }

  render() {
    const { router } = this.context;
    const work = this.props.workResult ? this.props.workResult.data : null;
    const isValidWork = work && work.editions && !deepEqual(work, WorkDetail.defaultProps.workResult);
    const authorsList = work && EditionCard.getAuthorsList(EditionCard.getPreferredAgent(work.agents, 'author'), 'work-detail-header');

    const eReaderUrl = this.props.eReaderUrl;
    const referrer = this.props.location.pathname + this.props.location.search;
    // eslint-disable-next-line no-underscore-dangle
    const shouldShowRequest = FeatureFlags.store._isFeatureActive(config.requestDigital.experimentName);
    return (
      <div className="layout-container">
        {this.state.requestedEdition && this.getRequestDigital(work)}
        <main
          id="mainContent"
          className="main"
        >
          <div className="content-header">
            <Breadcrumbs
              router={router}
              location={this.props.location}
            />
            <div>
              <SearchHeader />
            </div>
          </div>
          {isValidWork
            && (
              <div className="content-primary">
                <div className="nypl-item-header">
                  {work
                    && (
                      <DS.Heading
                        level={1}
                        id="work-title"
                        blockName="page-title"
                        text={work.title}
                      />
                    )
                  }
                  {work.sub_title && <div className="search-result-item__subtitle">{work.sub_title}</div>}
                  {authorsList && authorsList.length && (
                    <span>
                      By
                        {' '}
                      {joinArrayOfElements(authorsList, ', ')}
                    </span>
                  )}
                </div>
                <div>
                  <DS.Heading
                    level={2}
                    id="featured-edition"
                    text="Featured Edition"
                  />
                </div>
                <div>
                  <div>
                    {this.getEditionCard(work, eReaderUrl, referrer)}
                  </div>
                </div>
                <div>
                  <div id="nypl-item-details">
                    <WorkDetailDefinitionList
                      work={work}
                      dispatch={this.props.dispatch}
                      context={this.context}
                    />
                    {work.editions && (
                      <div className="all-editions-header">
                        <h3
                          tabIndex="-1"
                          id="all-editions"
                          className="all-editions-tag bold"
                        >
                          All Editions
                        </h3>
                        <DS.Checkbox
                          name="show-all"
                          checkboxId="show-all-editions"
                          labelOptions={{
                            id: 'show-all-label',
                            labelContent: <>Show only items currently available online</>,
                          }}
                          isSelected={!this.state.shouldShowAll}
                          onChange={this.toggleReadOnline}
                        />
                      </div>
                    )}
                    <EditionsList
                      referrer={referrer}
                      eReaderUrl={this.props.eReaderUrl}
                      work={work}
                      max={0}
                      getRequestEditionButton={shouldShowRequest ? this.getRequestEditionButton : undefined}
                    />
                  </div>
                </div>
              </div>
            )
          }
        </main>
      </div>
    );
  }
}

WorkDetail.propTypes = {
  workResult: PropTypes.objectOf(PropTypes.any),
  eReaderUrl: PropTypes.string,
  router: PropTypes.objectOf(PropTypes.any),
  dispatch: PropTypes.func,
  location: PropTypes.objectOf(PropTypes.any),
};

WorkDetail.defaultProps = {
  workResult: {},
  eReaderUrl: '',
  router: {},
  dispatch: () => { },
  location: {},
};

WorkDetail.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
  workResult: state.workResult && state.workResult.work,
});

WorkDetail.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

export default connect(
  mapStateToProps,
  null,
)(withRouter(WorkDetail));
