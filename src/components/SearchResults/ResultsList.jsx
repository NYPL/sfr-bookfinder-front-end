/* eslint-disable no-underscore-dangle */
import React from 'react';
import Link from "~/src/components/Link/Link";

import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import FeatureFlags from 'dgx-feature-flags';
import EmptySearchSvg from '~/src/components/Svgs/EmptySearchSvg';
import { isEmpty, joinArrayOfElements, checkFeatureFlagActivated } from '~/src/util/Util';

import EditionCard from '~/src/components/Card/EditionCard';
import CitationFormatter from '~/src/components/Citations/formatCitation';
import APACitation from '~/src/components/Citations/APACitation';

import featureFlagConfig from '~/config/featureFlagConfig';
import config from '~/config/appConfig';
import RequestDigital from '~/src/components/Feedback/RequestDigital';

export const getEditionsLinkElement = result => (result.edition_count > 1 ? (
  <Link
    className="link"
    to={{ pathname: '/work', query: { workId: `${result.uuid}` }, hash: '#all-editions' }}
  >
   {`View All ${result.edition_count} Editions`}
  </Link>
) : undefined);

/**
 * ResultsList takes the response and calls Design System's UnorderedList with Search Result objects
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
      isFeatureFlagsActivated: {}, requestedWork: null, requestedEdition: null,
    };
  }

  componentDidMount() {
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

  formatAllResultsData(results, eReaderUrl, referrer) {
    const shouldShowRequest = FeatureFlags.store._isFeatureActive(config.requestDigital.experimentName);
    const shouldShowCitations = FeatureFlags.store._isFeatureActive(config.displayCitations.experimentName);

    return results.map((result, index) => {
      const showRequestButton = shouldShowRequest ? (
        <a
          role="link"
          tabIndex="0"
          className="link request-digital-link"
          onKeyDown={(event) => { if (event.keyCode === 13) { this.openForm(result, result.editions[0]); } }}
          onClick={() => this.openForm(result, result.editions[0])}
        >
        Request Digitization
        </a>
      ) : undefined;

      const titleElement = EditionCard.generateTitleLinkElem(result);
      const authorLinkElement = EditionCard.getAuthorsList(EditionCard.getPreferredAgent(result.agents, 'author'), `${result.uuid}-author`);
      const allEditionsLink = getEditionsLinkElement(result);
      const previewEdition = result.editions && result.editions[0];

      const citationData = CitationFormatter.getCitationData(result, result.editions ? result.editions[0] : {});

      return (
        <div
          key={`search-result-${result.uuid}`}
        >
          <DS.SearchResultItem
            id={`search-result-${result.uuid}`}
            resultIndex={index}
            headingContent={titleElement}
            subtitleContent={EditionCard.getSubtitle(result.sub_title)}
            authorLinkElement={authorLinkElement ? joinArrayOfElements(authorLinkElement, ', ') : undefined}
            editionInfo={EditionCard.getEditionData(result, previewEdition, eReaderUrl, referrer, showRequestButton)}
            editionsLinkElement={allEditionsLink}
          />
          {shouldShowCitations && (
            <APACitation
              title={citationData.title}
              subTitle={citationData.sub_title}
              agents={citationData.agents}
              publicationYear={citationData.publication_year}
              edition={citationData.edition}
              volume={citationData.volume}
              sourceLink={citationData.sourceLink.link}
              isGovernmentDoc={citationData.isGovernmentDoc}
            />
          )}
        </div>
      );
    });
  }

  render() {
    const { eReaderUrl, results } = this.props;
    const referrer = this.context.router ? this.context.router.location.pathname + this.context.router.location.search : undefined;
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
        <DS.UnorderedList>
          {this.formatAllResultsData(results, eReaderUrl, referrer)}
        </DS.UnorderedList>
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