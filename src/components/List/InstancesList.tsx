import React from "react";
import * as DS from "@nypl/design-system-react-components";
import EditionCard from "../Card/EditionCard";

type OwnProps = {
  edition?: {
    [key: string]: any;
  };
  eReaderUrl?: string;
  referrer?: string;
  getRequestEditionButton?: (...args: any[]) => any;
};

type Props = OwnProps & typeof InstancesList.defaultProps;

class InstancesList extends React.Component<Props> {
  static defaultProps = {
    edition: { instances: [] },
    eReaderUrl: "",
    referrer: "",
    getRequestEditionButton: () => {},
  };

  constructor(props: Props) {
    super(props);
    // @ts-expect-error ts-migrate(2540) FIXME: Cannot assign to 'props' because it is a read-only... Remove this comment to see the full error message
    this.props = props;

    this.getInstanceCardList = this.getInstanceCardList.bind(this);
  }

  getInstanceCardList(edition: any, eReaderUrl: any, referrer: any) {
    return edition.instances.map((instance: any, index: any) => {
      const showRequestButton = this.props.getRequestEditionButton(edition);

      const editionYearHeadingElement = (
        <>{EditionCard.editionYearText(edition)}</>
      );
      const editionData = EditionCard.getInstanceData(
        edition,
        instance,
        eReaderUrl,
        referrer,
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 5.
        showRequestButton
      );
      return (
        <DS.EditionCard
          id={`"instance-list-"${index}`}
          // eslint-disable-next-line react/no-array-index-key
          key={`"instance-list-"${index}`}
          coverUrl={editionData.coverUrl}
          editionHeadingElement={editionYearHeadingElement}
          editionInfo={editionData.editionInfo}
          readOnlineLink={editionData.readOnlineLink}
          downloadLink={editionData.downloadLink}
          noLinkElement={editionData.noLinkElement}
        ></DS.EditionCard>
      );
    });
  }

  render() {
    const { edition, eReaderUrl, referrer } = this.props;
    const instances = edition.instances;
    if (!instances || instances.length === 0) {
      return null;
    }

    return (
      <DS.UnorderedList>
        {this.getInstanceCardList(edition, eReaderUrl, referrer)}
      </DS.UnorderedList>
    );
  }
}

export default InstancesList;
