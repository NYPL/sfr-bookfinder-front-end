import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DS from '@nypl/design-system-react-components';
import FeatureFlags from 'dgx-feature-flags';
import { join } from 'path';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import * as searchActions from '../../actions/SearchActions';
import { deepEqual } from '../../util/Util';
import EditionCard from '../Card/EditionCard';
import SearchHeader from '../SearchForm/SearchHeader';
import config from '../../../../appConfig';
import InstancesList from '../List/InstancesList';
import { getQueryString } from '../../search/query';
import EditionDetailDefinitionList from './EditionDetailDefinitionList';

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

class EditionDetail extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      shouldShowAll: true, ...props,
    };
    this.toggleReadOnline = this.toggleReadOnline.bind(this);
    this.boundActions = bindActionCreators(searchActions, dispatch);
  }

  componentDidMount() {
    const { query, hash } = this.props.location;
    if (query) {
      this.setState({ shouldShowAll: query && query.showAll ? (query.showAll === 'true') : true });
      this.loadEdition(query, hash, this.boundActions);
    }
  }

  componentDidUpdate(prevProps) {
    const { query, hash } = this.props.location;
    const editionId = query && query.editionId;
    const prevEditionId = prevProps.location && prevProps.location.query && prevProps.location.query.editionId;
    if (editionId && editionId !== prevEditionId) {
      this.loadEdition(editionId, hash);
    } else if (hash) {
      scrollToHash(hash);
    }
  }

  getInstanceCard(edition, eReaderUrl, referrer) {
    if (!edition.instances || !edition.instances[0]) return null;
    const featuredInstance = edition.instances[0];
    const editionYearHeadingElement = <>{EditionCard.editionYearText(edition)}</>;
    const featuredInstanceData = EditionCard.getInstanceData(edition, featuredInstance,
      eReaderUrl, referrer, this.getRequestEditionButton(featuredInstance));
    return (
      <DS.EditionCard
        id="featured-card"
        coverUrl={featuredInstanceData.coverUrl}
        editionHeadingElement={editionYearHeadingElement}
        editionInfo={featuredInstanceData.editionInfo}
        readOnlineLink={featuredInstanceData.readOnlineLink}
        downloadLink={featuredInstanceData.downloadLink}
        noLinkElement={featuredInstanceData.noLinkElement}
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

  toggleReadOnline() {
    const query = this.props.location.query;
    if (query.showAll === 'false') {
      query.showAll = 'true';
      this.setState({ shouldShowAll: true });
    } else {
      query.showAll = 'false';
      this.setState({ shouldShowAll: false });
    }
    this.props.dispatch(searchActions.editionDetailRefinePost(query));
    const path = `/edition?${getQueryString(query)}`;
    this.props.router.push(path);
  }

  loadEdition(query, hash) {
    global.window.scrollTo(0, 0);
    this.props.dispatch(searchActions.fetchEdition(query)).then(() => {
      scrollToHash(hash);
    });
  }

  render() {
    const { router } = this.context;
    const edition = this.props.editionResult && this.props.editionResult.data;
    const isValidEdition = edition && edition.instances && !deepEqual(edition, EditionDetail.defaultProps.editionResult);
    const authorsList = edition
    && EditionCard.getAuthorsList(EditionCard.getPreferredAgent(edition.agents, 'author'), 'work-detail-header');

    const eReaderUrl = this.props.eReaderUrl;
    const referrer = `${this.props.location.pathname}${this.props.location.search}`;

    // eslint-disable-next-line no-underscore-dangle
    const shouldShowRequest = FeatureFlags.store._isFeatureActive(config.requestDigital.experimentName);

    return (
      <DS.Container>
        <main
          id="mainContent"
        >
          {isValidEdition
            && (
              <>
                <Breadcrumbs
                  router={router}
                  location={this.props.location}
                  workDetail={{ uuid: edition.work_uuid, title: edition.title }}
                />
                <div>
                  <SearchHeader />
                </div>
                <div>
                  <div className="nypl-item-header">
                    {edition
                      && (
                        <DS.Heading
                          level={1}
                          id="edition-title"
                          blockName="page-title"
                        >
                          <Link
                            to={{ pathname: '/work', query: { workId: `${edition.work_uuid}`, recordType: 'editions', showAll: true } }}
                            title={edition.title}
                            className="link link--no-underline"
                          >
                            {edition.title}
                          </Link>
                        </DS.Heading>
                      )
                    }
                    {edition.subtitle && <div className="search-result-item__subtitle">{edition.subtitle}</div>}
                    {authorsList && authorsList.length && (
                      <span>
                        By
                        {' '}
                        {join(authorsList, ', ')}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <DS.Heading
                    level={2}
                    id="featured-edition"
                    text="Featured Copy"
                  />
                </div>
                <div>
                  <div>
                    {this.getInstanceCard(edition, eReaderUrl, referrer)}
                  </div>
                </div>
                <div>
                  <div id="nypl-item-details">
                    <EditionDetailDefinitionList
                      edition={edition}
                      dispatch={this.props.dispatch}
                      context={this.context}
                    />
                    {edition.instances && (
                      <div className="all-instances-header">
                        <h3
                          tabIndex="-1"
                          id="all-editions"
                          className="all-editions-tag bold"
                        >
                          All Copies
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
                    <InstancesList
                      referrer={referrer}
                      eReaderUrl={this.props.eReaderUrl}
                      edition={edition}
                      max={0}
                      getRequestEditionButton={shouldShowRequest ? this.getRequestEditionButton : undefined}
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

EditionDetail.propTypes = {
  editionResult: PropTypes.objectOf(PropTypes.any),
  eReaderUrl: PropTypes.string,
  router: PropTypes.objectOf(PropTypes.any),
  dispatch: PropTypes.func,
  location: PropTypes.objectOf(PropTypes.any),
};

EditionDetail.defaultProps = {
  editionResult: {},
  eReaderUrl: '',
  router: {},
  dispatch: () => { },
  location: {},
};

EditionDetail.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
  editionResult: state.editionResult && state.editionResult.edition,
});

EditionDetail.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

export default connect(
  mapStateToProps,
  null,
)(withRouter(EditionDetail));
