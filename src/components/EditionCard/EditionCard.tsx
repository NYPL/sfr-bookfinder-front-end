import React from "react";
import * as DS from "@nypl/design-system-react-components";
import Link from "../Link/Link";
import { WorkEdition } from "~/src/types/DataModel";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import { PLACEHOLDER_COVER_LINK } from "~/src/constants/editioncard";

export const EditionCard: React.FC<{ edition: WorkEdition; title: string }> = ({
  edition,
  title,
}) => {
  const previewItem = edition && edition.items ? edition.items[0] : undefined;
  const readOnlineLink = EditionCardUtils.getReadOnlineLink(previewItem);

  const editionYearElem = (edition: WorkEdition) => {
    const editionDisplay = EditionCardUtils.editionYearText(edition);
    const editionElem = edition ? (
      <Link
        to={{
          pathname: `/edition/${edition.edition_id}`,
        }}
      >
        {editionDisplay}
      </Link>
    ) : (
      <>{editionDisplay}</>
    );
    return editionElem;
  };
  const downloadLink = EditionCardUtils.getDownloadLink(previewItem, title);

  const coverUrl = EditionCardUtils.getCover(edition.links);

  return (
    <DS.Card
      id={`card-${edition.edition_id}`}
      heading={<h3>{editionYearElem(edition)}</h3>}
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
          edition.publishers
        )}
      </div>
      <div>{EditionCardUtils.getLanguageDisplayText(edition)}</div>
      <Link to="/license">{EditionCardUtils.getLicense(previewItem)}</Link>
    </DS.Card>
  );
};

export default EditionCard;
