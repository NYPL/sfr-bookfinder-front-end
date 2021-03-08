import React from "react";
import * as DS from "@nypl/design-system-react-components";
import Link from "../Link/Link";
import { WorkEdition } from "~/src/types/DataModel";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import { PLACEHOLDER_COVER_LINK } from "~/src/constants/editioncard";

export const EditionCard: React.FC<{ edition: WorkEdition }> = (props) => {
  const edition: WorkEdition = props.edition;
  const previewItem = edition && edition.items ? edition.items[0] : undefined;
  const readOnlineLink = EditionCardUtils.getReadOnlineLink(
    edition.id,
    previewItem
  );

  const downloadLink = EditionCardUtils.getDownloadLink(previewItem);
  const editionYear = EditionCardUtils.editionYearElem(edition);

  const coverUrl = EditionCardUtils.getCover(edition.covers);

  return (
    <DS.Card
      id={`card-${edition.id}`}
      heading={<h3>{editionYear}</h3>}
      image={
        <DS.Image
          src={coverUrl}
          alt={
            coverUrl === PLACEHOLDER_COVER_LINK
              ? "Placeholder Cover"
              : `Cover for ${EditionCardUtils.editionYearText(edition)}`
          }
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
      <Link to="/license">
        {EditionCardUtils.getLicense(previewItem && previewItem.rights)}
      </Link>
    </DS.Card>
  );
};

export default EditionCard;
