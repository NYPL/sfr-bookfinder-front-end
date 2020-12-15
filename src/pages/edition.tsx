import React from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DS from '@nypl/design-system-react-components';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'dgx-... Remove this comment to see the full error message
import FeatureFlags from 'dgx-feature-flags';
import { join } from 'path';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Breadcrumbs/B... Remove this comment to see the full error message
import Breadcrumbs from '~/src/components/Breadcrumbs/Breadcrumbs';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/actions/SearchActions' o... Remove this comment to see the full error message
import * as searchActions from '~/src/actions/SearchActions';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/util/Util' or its corres... Remove this comment to see the full error message
import { deepEqual } from '~/src/util/Util';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Card/EditionC... Remove this comment to see the full error message
import EditionCard from '~/src/components/Card/EditionCard';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/SearchForm/Se... Remove this comment to see the full error message
import SearchHeader from '~/src/components/SearchForm/SearchHeader';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/config/appConfig' or its cor... Remove this comment to see the full error message
import config from '~/config/appConfig';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/List/Instance... Remove this comment to see the full error message
import InstancesList from '~/src/components/List/InstancesList';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/util/SearchQuery' or its... Remove this comment to see the full error message
import { getQueryString } from '~/src/util/SearchQuery';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Detail/Editio... Remove this comment to see the full error message
import EditionDetailDefinitionList from '~/src/components/Detail/EditionDetailDefinitionList';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Link/Link' or... Remove this comment to see the full error message
import Link from '~/src/components/Link/Link';

type OwnEditionDetailProps = {
    editionResult?: {
        [key: string]: any;
    };
    eReaderUrl?: string;
    router?: {
        [key: string]: any;
    };
    dispatch?: (...args: any[]) => any;
    location?: {
        [key: string]: any;
    };
};

type EditionDetailState = any;

type EditionDetailProps = OwnEditionDetailProps & typeof EditionDetail.defaultProps;

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

class EditionDetail extends React.Component<EditionDetailProps, EditionDetailState> {
  static defaultProps = {
      editionResult: {},
      eReaderUrl: '',
      router: {},
      dispatch: () => { },
      location: {},
  };

  static contextTypes = {
      router: PropTypes.objectOf(PropTypes.any),
      history: PropTypes.objectOf(PropTypes.any),
  };

  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'contextTypes'.
  static contextTypes = {
      router: PropTypes.objectOf(PropTypes.any),
      history: PropTypes.objectOf(PropTypes.any),
  };

  boundActions: any;
  openForm: any;

  constructor(props: EditionDetailProps) {
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
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
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

  getInstanceCard(edition: any, eReaderUrl: any, referrer: any) {
    if (!edition.instances || !edition.instances[0]) return null;
    const featuredInstance = edition.instances[0];
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    const editionYearHeadingElement = <>{EditionCard.editionYearText(edition)}</>;
    const featuredInstanceData = EditionCard.getInstanceData(edition, featuredInstance,
      eReaderUrl, referrer, this.getRequestEditionButton(featuredInstance));
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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

  getRequestEditionButton(edition: any) {
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <a
        role="link"
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
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

  loadEdition(query: any) {
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
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="layout-container">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <main
          id="mainContent"
          className="main"
        >
          {isValidEdition
            && (
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="content-header">
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Breadcrumbs
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'location' does not exist on type 'Single... Remove this comment to see the full error message
                    location={Router.location}
                    workDetail={{ uuid: edition.work_uuid, title: edition.title }}
                  />
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <div>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <SearchHeader />
                  </div>
                </div>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="content-top">
                  {edition
                      && (
                        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <DS.Heading
                          level={1}
                          id="edition-title"
                          blockName="page-title"
                        >
                          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  {edition.sub_title && <div className="search-result-item__subtitle">{edition.sub_title}</div>}
                  {authorsList && authorsList.length && (
                  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <span>
                        By
                    {' '}
                    {join(authorsList, ', ')}
                  </span>
                  )}
                </div>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="content-primary">
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <DS.Heading
                    level={2}
                    id="featured-edition"
                    text="Featured Copy"
                  />
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <div id="featured-edition-card">
                    {this.getInstanceCard(edition, eReaderUrl, referrer)}
                  </div>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <div id="nypl-item-details">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <EditionDetailDefinitionList
                      edition={edition}
                      dispatch={this.props.dispatch}
                      context={this.context}
                    />
                    {edition.instances && (
                      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <div className="all-instances-header">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <h3
                          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
                          tabIndex="-1"
                          id="all-editions"
                          className="all-editions-tag bold"
                        >
                          All Copies
                        </h3>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <DS.Checkbox
                          name="show-all"
                          checkboxId="show-all-editions"
                          labelOptions={{
                            id: 'show-all-label',
                            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            labelContent: <>Show only items currently available online</>,
                          }}
                          isSelected={!this.state.shouldShowAll}
                          onChange={this.toggleReadOnline}
                        />
                      </div>
                    )}
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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

const mapStateToProps = (state: any) => ({
  editionResult: state.editionResult && state.editionResult.edition
});

export default connect(
  mapStateToProps,
  null,
// @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'typeof EditionDetail' is not ass... Remove this comment to see the full error message
)(withRouter(EditionDetail));
