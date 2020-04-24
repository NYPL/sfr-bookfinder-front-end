import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DS from '@nypl/design-system-react-components';
import FeatureFlags from 'dgx-feature-flags';
import { DefinitionList } from './DefinitionList';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import * as searchActions from '../../actions/SearchActions';
import WorkHeader from './WorkHeader';
import EditionsList from '../List/EditionsList';
import { deepEqual, checkFeatureFlagActivated } from '../../util/Util';
import EditionCard from '../Card/EditionCard';
import SearchHeader from '../SearchForm/SearchHeader';
import RequestDigital from '../Feedback/RequestDigital';
import featureFlagConfig from '../../../../featureFlagConfig';
import config from '../../../../appConfig';

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
    this.state = { requestedEdition: null, isFeatureFlagsActivated: {}, ...props };
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.getRequestEditionButton = this.getRequestEditionButton.bind(this);
    this.boundActions = bindActionCreators(searchActions, dispatch);
  }

  componentDidMount() {
    const { query, hash } = this.props.location;
    const editionId = query && query.editionId;
    this.loadEdition(editionId, hash, this.boundActions);
    FeatureFlags.store.listen(this.onFeatureFlagsChange.bind(this));

    checkFeatureFlagActivated(
      featureFlagConfig.featureFlagList, this.state.isFeatureFlagsActivated,
    );
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

  onFeatureFlagsChange() {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ featureFlagsStore: FeatureFlags.store.getState() });
  }

  getInstanceCard(edition, eReaderUrl, referrer) {
    if (!edition.instances || !edition.instances[0]) return null;
    const featuredInstance = edition.instances[0];
    const featuredEditionData = EditionCard.getInstanceData(edition, featuredInstance,
      eReaderUrl, referrer, this.getRequestEditionButton(getFirstReadableEdition));
    return (
      <DS.EditionCard
        id="featured-card"
        coverUrl={featuredInstance.coverUrl}
        editionHeadingElement={featuredInstance.editionYearHeading}
        editionInfo={[featuredInstance.publisherAndLocation, featuredInstance.language, featuredInstance.license]}
        readOnlineLink={featuredInstance.readOnlineLink}
        downloadLink={featuredInstance.downloadLink}
        noLinkElement={featuredInstance.noLinkElement}
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

  loadEdition(editionId, hash) {
    console.log('edition loading');
    global.window.scrollTo(0, 0);
    this.props.dispatch(searchActions.fetchEdition(editionId)).then(() => {
      scrollToHash(hash);
    });
  }

  render() {
    console.log('props', this.props);
    const { router } = this.context;
    const edition = this.props.editionResult && this.props.editionResult.data;
    const isValidEdition = edition && edition.instances && !deepEqual(edition, EditionDetail.defaultProps.editionResult);
    const eReaderUrl = this.props.eReaderUrl;
    const referrer = this.props.location.pathname + this.props.location.search;

    // eslint-disable-next-line no-underscore-dangle
    const shouldShowRequest = FeatureFlags.store._isFeatureActive(config.requestDigital.experimentName);

    return (
      <DS.Container>
        {this.state.requestedEdition && this.getRequestDigital(edition)}
        <main
          id="mainContent"
        >
          <Breadcrumbs
            router={router}
            location={this.props.location}
          />
          <div>
            <SearchHeader />
          </div>
          { isValidEdition
          && (
          <>
            <div>
              <div className="nypl-item-header">
                <WorkHeader data={edition} />
              </div>
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
                {this.getInstanceCard(edition, eReaderUrl, referrer)}
              </div>
            </div>
            <div>
              <div id="nypl-item-details">
                <DefinitionList
                  work={edition}
                  dispatch={this.props.dispatch}
                  context={this.context}
                />
                {edition.instances && (
                <h3
                  tabIndex="-1"
                  id="all-editions"
                  className="all-editions-tag bold"
                >
                All Editions
                </h3>
                )}
                <div>Instance list</div>
                <EditionsList
                  referrer={referrer}
                  eReaderUrl={this.props.eReaderUrl}
                  work={edition}
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
  dispatch: PropTypes.func,
  location: PropTypes.objectOf(PropTypes.any),
};

EditionDetail.defaultProps = {
  editionResult: {},
  eReaderUrl: '',
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
