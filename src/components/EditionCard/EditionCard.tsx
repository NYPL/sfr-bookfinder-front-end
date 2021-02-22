import React from "react";
import { gaUtils } from "dgx-react-ga";
import { Html5Entities } from "html-entities";
import * as DS from "@nypl/design-system-react-components";
import Link from "../Link/Link";
import { WorkEdition } from "~/src/types/DataModel";
import EditionCardUtils from "~/src/util/EditionCardUtils";

const htmlEntities = new Html5Entities();

export const EditionCard: React.FC<{ edition: WorkEdition }> = (props) => {
  const edition: WorkEdition = props.edition;
  const previewItem = edition && edition.items ? edition.items[0] : undefined;

  const readOnlineLink = EditionCardUtils.getReadOnlineLink(
    edition.id,
    previewItem
  );

  const downloadLink = EditionCardUtils.getDownloadLink(previewItem);

  const editionYear = EditionCardUtils.editionYearElem(edition);
  return (
    <DS.Card
      id={`card-${edition.id}`}
      heading={<h3>{editionYear}</h3>}
      image={
        <DS.Image
          src={EditionCardUtils.getCover(edition.covers)}
          alt={`Cover for ${EditionCardUtils.editionYearText(edition)}`}
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
          edition.publication_place,
          edition.agents
        )}
      </div>
      <div>{EditionCardUtils.getLanguageDisplayText(edition)}</div>
      <Link to="/license">{EditionCardUtils.getLicense(previewItem)}</Link>
    </DS.Card>
  );
};

export default EditionCard;
