import React from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DS from '@nypl/design-system-react-components';
import FeatureFlags from 'dgx-feature-flags';
import { join } from 'path';
import Breadcrumbs from '~/src/components/Breadcrumbs/Breadcrumbs';
import * as searchActions from '~/src/actions/SearchActions';
import { deepEqual } from '~/src/util/Util';
import EditionCard from '~/src/components/Card/EditionCard';
import SearchHeader from '~/src/components/SearchForm/SearchHeader';
import config from '~/config/appConfig';
import InstancesList from '~/src/components/List/InstancesList';
import { getQueryString } from '~/src/util/SearchQuery';
import EditionDetailDefinitionList from '~/src/components/Detail/EditionDetailDefinitionList';
import Link from '~/src/components/Link/Link';

// const scrollToHash = (hash) => {
//   const hashtag = hash && hash.replace(/#/, '');
//   if (hashtag) {
//     const element = global.document.getElementById(hashtag);
//     if (element) {
//       element.scrollIntoView();
//       element.focus();
//     }
//   }
// };

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
    const query = Router.query;
    this.setState({ shouldShowAll: query && query.showAll ? (query.showAll === 'true') : true });
    this.loadEdition(query, this.boundActions);
  }

  // componentDidUpdate(prevProps) {
  //   const query = Router.query;

  //   const editionId = query && query.editionId;
  //   const prevEditionId = prevProps.location && prevProps.location.query && prevProps.location.query.editionId;
  //   if (editionId && editionId !== prevEditionId) {
  //     this.loadEdition(query);
  //   } 
  //   // else if (hash) {
  //   //   scrollToHash(hash);
  //   // }
  // }

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
    const query = Router.query;
    if (query.showAll === 'false') {
      query.showAll = 'true';
      this.setState({ shouldShowAll: true });
    } else {
      query.showAll = 'false';
      this.setState({ shouldShowAll: false });
    }
    this.props.dispatch(searchActions.editionDetailRefinePost(query));
    const path = `/edition?${getQueryString(query)}`;
    Router.push(path);
  }

  loadEdition(query) {
    // global.window.scrollTo(0, 0);
    if (query && query.editionId) {
      this.props.dispatch(searchActions.fetchEdition(query));
    //   .then(() => {
    //     scrollToHash(hash);
    //   });
    // } 
    // else {
    //   this.props.router.push('/');
    }
  }

  render() {
    const edition = this.props.editionResult && this.props.editionResult.data;
    const isValidEdition = edition && edition.instances && !deepEqual(edition, EditionDetail.defaultProps.editionResult);
    const authorsList = edition
    && EditionCard.getAuthorsList(EditionCard.getPreferredAgent(edition.agents, 'author'), 'work-detail-header');

    const eReaderUrl = this.props.eReaderUrl;
    const referrer = `${this.props.location.pathname}${this.props.location.search}`;

    // eslint-disable-next-line no-underscore-dangle
    const shouldShowRequest = FeatureFlags.store._isFeatureActive(config.requestDigital.experimentName);

    return (
      <div className="layout-container">
        <main
          id="mainContent"
          className="main"
        >
          {isValidEdition
            && (
              <>
                <div className="content-header">
                  <Breadcrumbs
                    location={Router.location}
                    workDetail={{ uuid: edition.work_uuid, title: edition.title }}
                  />
                  <div>
                    <SearchHeader />
                  </div>
                </div>
                <div className="content-top">
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
                  {edition.sub_title && <div className="search-result-item__subtitle">{edition.sub_title}</div>}
                  {authorsList && authorsList.length && (
                  <span>
                        By
                    {' '}
                    {join(authorsList, ', ')}
                  </span>
                  )}
                </div>
                <div className="content-primary">
                  <DS.Heading
                    level={2}
                    id="featured-edition"
                    text="Featured Copy"
                  />
                  <div id="featured-edition-card">
                    {this.getInstanceCard(edition, eReaderUrl, referrer)}
                  </div>
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
      </div>
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