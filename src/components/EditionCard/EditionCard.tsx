import React from "react";
import * as DS from "@nypl/design-system-react-components";
import Link from "../Link/Link";
import {
  ApiItem,
  EditionCardItem,
  ItemLink,
  WorkEdition,
} from "~/src/types/DataModel";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import { PLACEHOLDER_COVER_LINK } from "~/src/constants/editioncard";

export const EditionCard: React.FC<{ edition: WorkEdition }> = (props) => {
  const edition: WorkEdition = props.edition;
  const previewItem = edition && edition.items ? edition.items[0] : undefined;
  const readOnlineLink = EditionCardUtils.getReadOnlineLink(
    edition.edition_id,
    previewItem
  );

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
  const downloadLink = EditionCardUtils.getDownloadLink(previewItem);

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
    </DS.Card>
  );
};

export default EditionCard;
