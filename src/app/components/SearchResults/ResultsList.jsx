/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router';

import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import FeatureFlags from 'dgx-feature-flags';
import EmptySearchSvg from '../Svgs/EmptySearchSvg';
import { isEmpty, joinArrayOfElements, checkFeatureFlagActivated } from '../../util/Util';

import EditionCard from '../Card/EditionCard';

import featureFlagConfig from '../../../../featureFlagConfig';
import config from '../../../../appConfig';
import RequestDigital from '../Feedback/RequestDigital';

export const getEditionsLinkElement = result => (result.edition_count > 1 ? (
  <Link
    className="link"
    to={{ pathname: '/work', query: { workId: `${result.uuid}` }, hash: '#all-editions' }}
  >
    {`View All ${result.edition_count} Editions`}
  </Link>
) : undefined);

/**
 * ResultsList takes the response and calls Design System's SearchResultsList
 * with the correctly formatted properties
 *
 * @returns {string|null}
 */
class ResultsList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.formatAllResultsData = this.formatAllResultsData.bind(this);
    this.state = {
      loaded: false, isFeatureFlagsActivated: {}, requestedWork: null, requestedEdition: null,
    };
  }

  componentDidMount() {
    this.setState({ loaded: true });
    FeatureFlags.store.listen(this.onFeatureFlagsChange.bind(this));

    checkFeatureFlagActivated(
      featureFlagConfig.featureFlagList, this.state.isFeatureFlagsActivated,
    );
  }

  onFeatureFlagsChange() {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ featureFlagsStore: FeatureFlags.store.getState() });
  }

  openForm(requestedWork, requestedEdition) {
    this.setState({ requestedWork, requestedEdition });
  }

  closeForm() {
    this.setState({ requestedWork: null, requestedEdition: null });
  }

  formatAllResultsData(results, origin, eReaderUrl, referrer) {
    const shouldShowRequest = FeatureFlags.store._isFeatureActive(config.requestDigital.experimentName);

    return results.map((result, index) => {
      const showRequestButton = shouldShowRequest ? (
        <a
          role="link"
          tabIndex="0"
          className="link"
          onKeyDown={(event) => { if (event.keyCode === 13) { this.openForm(result, result.editions[0]); } }}
          onClick={() => this.openForm(result, result.editions[0])}
        >
        Request Digitization
        </a>
      ) : undefined;

      const titleElement = EditionCard.generateTitleLinkElem(result.title, result.uuid);
      const authorLinkElement = EditionCard.getAuthorsList(EditionCard.getPreferredAgent(result.agents, 'author'), `${result.uuid}-author`);
      // TODO: Editions Link Page
      const allEditionsLink = getEditionsLinkElement(result);

      const previewEdition = result.editions && result.editions[0];

      return {
        id: `search-result-${result.uuid}`,
        resultIndex: index,
        titleElement,
        subtitle: EditionCard.getSubtitleText(result.sub_title),
        authorElement: authorLinkElement ? joinArrayOfElements(authorLinkElement, ', ') : undefined,
        editionInfo: EditionCard.getEditionData(previewEdition, origin, eReaderUrl, referrer, showRequestButton),
        editionsLinkElement: allEditionsLink,
      };
    });
  }

  render() {
    const { eReaderUrl, results } = this.props;
    const referrer = this.context.router ? this.context.router.location.pathname + this.context.router.location.search : undefined;
    const origin = this.state.loaded ? window.location.origin : '';
    if (isEmpty(this.props.results)) {
      return (
        <div className="grid-row margin-3">
          <EmptySearchSvg className="grid-col-1" />
          <div className="grid-col-9 margin-x-3 margin-y-2">
            <span>No results were found. Please try a different keyword or fewer filters.</span>
          </div>
        </div>

      );
    }

    return (
      <>
        {this.state.requestedWork && (
        <RequestDigital
          closeForm={this.closeForm}
          requestedWork={this.state.requestedWork}
          requestedEdition={this.state.requestedEdition}
        />
        )}
        <DS.SearchResultsList
          searchResults={this.formatAllResultsData(results, origin, eReaderUrl, referrer)}
        >
        </DS.SearchResultsList>
      </>
    );
  }
}

ResultsList.propTypes = {
  eReaderUrl: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.any),
};

ResultsList.defaultProps = {
  eReaderUrl: '',
  results: [],
};

ResultsList.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
};

export default ResultsList;
