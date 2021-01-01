import { Instance } from "~/src/types/DataModel";
import { EditionCardUtils } from "../EditionCard/EditionCard";
import * as DS from "@nypl/design-system-react-components";
import Link from "../Link/Link";

// Creates an Instance card out of the Edition Year and Instance object
// Note: Edition Year only needs to be passed because `instance.publication_date`
// is not formatted in an easy to read manner
// the way that Edition.publication_year is.

export const InstanceCard: React.FC<{
  editionYear: string;
  instance: Instance;
}> = (props) => {
  const instance: Instance = props.instance;
  const previewItem =
    instance && instance.items ? instance.items[0] : undefined;

  const readOnlineLink = EditionCardUtils.getReadOnlineLink(
    instance.edition_id,
    previewItem
  );

  const downloadLink = EditionCardUtils.getDownloadLink(previewItem);

  return (
    <DS.Card
      id={`card-${instance.id}`}
      heading={<div>{props.editionYear}</div>}
      image={
        <DS.Image
          src={EditionCardUtils.getCover(instance.covers)}
          alt={`Cover for Edition ${EditionCardUtils.editionYearText(
            props.editionYear
          )}`}
        ></DS.Image>
      }
      ctas={
        readOnlineLink || downloadLink ? (
          <>
            {readOnlineLink}
            {downloadLink}
          </>
        ) : (
          //TODO feature flags: Request button
          <>{EditionCardUtils.getNoLinkElement(false)}</>
        )
      }
    >
      <div>
        {EditionCardUtils.getPublisherAndLocation(
          instance.publication_place,
          instance.agents
        )}
      </div>
      <div>{EditionCardUtils.getWorldCatElem(instance)}</div>
      <DS.Link>
        <Link to="/license">{EditionCardUtils.getLicense(previewItem)}</Link>
      </DS.Link>
    </DS.Card>
  );
};
