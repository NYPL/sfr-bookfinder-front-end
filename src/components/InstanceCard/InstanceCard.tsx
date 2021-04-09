import React from "react";

import { Instance, WorkEdition } from "~/src/types/DataModel";
import * as DS from "@nypl/design-system-react-components";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import Link from "../Link/Link";

// Creates an Instance card out of the Edition Year and Instance object
// Note: Edition Year only needs to be passed because `instance.publication_date`
// is not formatted in an easy to read manner
// the way that Edition.publication_year is.

export const InstanceCard: React.FC<{
  edition: WorkEdition;
  instance: Instance;
}> = (props) => {
  const edition = props.edition;
  const instance: Instance = props.instance;
  const previewItem =
    instance && instance.items ? instance.items[0] : undefined;

  const readOnlineLink = EditionCardUtils.getReadOnlineLink(previewItem);
  const downloadLink = EditionCardUtils.getDownloadLink(previewItem);

  return (
    <DS.Card
      id={`card-${instance.instance_id}`}
      heading={
        <DS.Heading level={3}>
          {edition.publication_date
            ? edition.publication_date
            : "Edition Year Unknown"}
        </DS.Heading>
      }
      image={
        <DS.Image
          src={EditionCardUtils.getCover(edition.links)}
          alt={"Cover"}
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
          instance.publishers
        )}
      </div>
      <div>{EditionCardUtils.getWorldCatElem(instance)}</div>
      <Link to="/license">
        {EditionCardUtils.getLicense(previewItem.rights)}
      </Link>
    </DS.Card>
  );
};
