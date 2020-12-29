import React from "react";
import FeatureFlags from "dgx-feature-flags";
import * as DS from "@nypl/design-system-react-components";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/config/featureFlagConfig' or... Remove this comment to see the full error message
import featureFlagConfig from "~/config/featureFlagConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/util/Util' or its corres... Remove this comment to see the full error message
import { checkFeatureFlagActivated } from "~/src/util/Util";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Card/EditionC... Remove this comment to see the full error message
import EditionCard from "~/src/components/Card/EditionCard";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Citations/for... Remove this comment to see the full error message
import CitationFormatter from "~/src/components/Citations/formatCitation";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Citations/APA... Remove this comment to see the full error message
import APACitation from "~/src/components/Citations/APACitation";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/config/appConfig' or its cor... Remove this comment to see the full error message
import config from "~/config/appConfig";

type OwnProps = {
  work?: {
    [key: string]: any;
  };
  eReaderUrl?: string;
  referrer?: string;
  getRequestEditionButton?: (...args: any[]) => any;
};

type State = any;

type Props = OwnProps & typeof EditionsList.defaultProps;

class EditionsList extends React.Component<Props, State> {
  static defaultProps = {
    work: { instances: [] },
    eReaderUrl: "",
    referrer: "",
    getRequestEditionButton: () => {},
  };

  getAllEditionsData: any;

  constructor(props: Props) {
    super(props);
    // @ts-expect-error ts-migrate(2540) FIXME: Cannot assign to 'props' because it is a read-only... Remove this comment to see the full error message
    this.props = props;

    this.state = { isFeatureFlagsActivated: {} };

    this.getAllEditionsData = this.getEditionCardList.bind(this);
    this.onFeatureFlagsChange = this.onFeatureFlagsChange.bind(this);
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

  getEditionCardList(work: any, eReaderUrl: any, referrer: any) {
    return work.editions.map((edition: any, index: any) => {
      const showRequestButton = this.props.getRequestEditionButton(edition);
      const editionData = EditionCard.getEditionData(
        work,
        edition,
        eReaderUrl,
        referrer,
        showRequestButton
      );
      const citationData = CitationFormatter.getCitationData(work, edition);

      // eslint-disable-next-line no-underscore-dangle
      const shouldShowCitations = FeatureFlags.store._isFeatureActive(
        config.displayCitations.experimentName
      );

      return (
        // eslint-disable-next-line react/no-array-index-key
        <div key={`"editions-list-"${index}`}>
          <DS.EditionCard
            id={`"editions-list-"${index}`}
            coverUrl={editionData.coverUrl}
            editionHeadingElement={editionData.editionYearHeading}
            editionInfo={editionData.editionInfo}
            readOnlineLink={editionData.readOnlineLink}
            downloadLink={editionData.downloadLink}
            noLinkElement={editionData.noLinkElement}
          ></DS.EditionCard>
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
    const { work, eReaderUrl, referrer } = this.props;

    const editions = work.editions;
    if (!editions || editions.length === 0) {
      return null;
    }

    return (
      // <>{this.getEditionCardList(work, eReaderUrl, referrer)}</>

      <DS.UnorderedList>
        {this.getEditionCardList(work, eReaderUrl, referrer)}
      </DS.UnorderedList>
    );
  }
}

export default EditionsList;
