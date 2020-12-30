/* eslint-disable no-underscore-dangle */
import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Link/Link' or... Remove this comment to see the full error message
import Link from "~/src/components/Link/Link";

import PropTypes from "prop-types";
import * as DS from "@nypl/design-system-react-components";
import FeatureFlags from "dgx-feature-flags";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Svgs/EmptySea... Remove this comment to see the full error message
import EmptySearchSvg from "~/src/components/Svgs/EmptySearchSvg";
import {
  isEmpty,
  joinArrayOfElements,
  checkFeatureFlagActivated,
  // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/util/Util' or its corres... Remove this comment to see the full error message
} from "~/src/util/Util";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Card/EditionC... Remove this comment to see the full error message
import EditionCard from "~/src/components/Card/EditionCard";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Citations/for... Remove this comment to see the full error message
import CitationFormatter from "~/src/components/Citations/formatCitation";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Citations/APA... Remove this comment to see the full error message
import APACitation from "~/src/components/Citations/APACitation";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/config/featureFlagConfig' or... Remove this comment to see the full error message
import featureFlagConfig from "~/config/featureFlagConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/config/appConfig' or its cor... Remove this comment to see the full error message
import config from "~/config/appConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Feedback/Requ... Remove this comment to see the full error message
import RequestDigital from "~/src/components/RequestDigital/RequestDigital";

export const getEditionsLinkElement = (result: any) =>
  result.edition_count > 1 ? (
    <Link
      className="link"
      to={{
        pathname:`work/${result.uuid}`,
        hash: "#all-editions",
      }}
    >
      {`View All ${result.edition_count} Editions`}
    </Link>
  ) : undefined;

type OwnResultsListProps = {
  eReaderUrl?: string;
  results?: any[];
};

type ResultsListState = any;

type ResultsListProps = OwnResultsListProps & typeof ResultsList.defaultProps;

/**
 * ResultsList takes the response and calls Design System's UnorderedList with Search Result objects
 * with the correctly formatted properties
 *
 * @returns {string|null}
 */
class ResultsList extends React.Component<ResultsListProps, ResultsListState> {
  static defaultProps = {
    eReaderUrl: "",
    results: [],
  };

  static contextTypes = {
    router: PropTypes.objectOf(PropTypes.any),
  };

  constructor(props: ResultsListProps) {
    super(props);
    // @ts-expect-error ts-migrate(2540) FIXME: Cannot assign to 'props' because it is a read-only... Remove this comment to see the full error message
    this.props = props;
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.formatAllResultsData = this.formatAllResultsData.bind(this);
    this.state = {
      isFeatureFlagsActivated: {},
      requestedWork: null,
      requestedEdition: null,
    };
  }

  componentDidMount() {
    FeatureFlags.store.listen(this.onFeatureFlagsChange.bind(this));

    checkFeatureFlagActivated(
      featureFlagConfig.featureFlagList,
      this.state.isFeatureFlagsActivated
    );
  }

  onFeatureFlagsChange() {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ featureFlagsStore: FeatureFlags.store.getState() });
  }

  openForm(requestedWork: any, requestedEdition: any) {
    this.setState({ requestedWork, requestedEdition });
  }

  closeForm() {
    this.setState({ requestedWork: null, requestedEdition: null });
  }

  formatAllResultsData(results: any, eReaderUrl: any, referrer: any) {
    const shouldShowRequest = FeatureFlags.store._isFeatureActive(
      config.requestDigital.experimentName
    );
    const shouldShowCitations = FeatureFlags.store._isFeatureActive(
      config.displayCitations.experimentName
    );

    return results.map((result: any, index: any) => {
      const showRequestButton = shouldShowRequest ? (
        <a
          role="link"
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
          tabIndex="0"
          className="link request-digital-link"
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              this.openForm(result, result.editions[0]);
            }
          }}
          onClick={() => this.openForm(result, result.editions[0])}
        >
          Request Digitization
        </a>
      ) : undefined;

      const titleElement = EditionCard.generateTitleLinkElem(result);
      const authorLinkElement = EditionCard.getAuthorsList(
        EditionCard.getPreferredAgent(result.agents, "author"),
        `${result.uuid}-author`
      );
      const allEditionsLink = getEditionsLinkElement(result);
      const previewEdition = result.editions && result.editions[0];

      const citationData = CitationFormatter.getCitationData(
        result,
        result.editions ? result.editions[0] : {}
      );

      return (
        <div key={`search-result-${result.uuid}`}>
          <DS.SearchResultItem
            id={`search-result-${result.uuid}`}
            resultIndex={index}
            headingContent={titleElement}
            subtitleContent={EditionCard.getSubtitle(result.sub_title)}
            authorLinkElement={
              authorLinkElement
                ? joinArrayOfElements(authorLinkElement, ", ")
                : undefined
            }
            editionInfo={EditionCard.getEditionData(
              result,
              previewEdition,
              eReaderUrl,
              referrer,
              showRequestButton
            )}
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element | undefined' is not assignable to ty... Remove this comment to see the full error message
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
    const referrer = this.context.router
      ? this.context.router.location.pathname +
        this.context.router.location.search
      : undefined;
    if (isEmpty(this.props.results)) {
      return (
        <div className="grid-row margin-3">
          <EmptySearchSvg className="grid-col-1" />

          <div className="grid-col-9 margin-x-3 margin-y-2">
            <span>
              No results were found. Please try a different keyword or fewer
              filters.
            </span>
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

export default ResultsList;
