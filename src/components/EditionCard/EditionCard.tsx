import React from "react";
import * as DS from "@nypl/design-system-react-components";
import Link from "../Link/Link";
import { ApiItem, WorkEdition } from "~/src/types/DataModel";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import { PLACEHOLDER_COVER_LINK } from "~/src/constants/editioncard";
import { useCookies } from "react-cookie";
import { MediaTypes } from "~/src/constants/mediaTypes";

const NYPL_SESSION_ID = "nyplIdentityPatron";

export const EditionCard: React.FC<{ edition: WorkEdition; title: string }> = ({
  edition,
  title,
}) => {
  const [cookies] = useCookies([NYPL_SESSION_ID]);

  const previewItem = edition && edition.items ? edition.items[0] : undefined;

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

  const coverUrl = EditionCardUtils.getCover(edition.links);

  const ctas = (item: ApiItem | undefined, title: string): JSX.Element => {
    const readOnlineLink = EditionCardUtils.getReadOnlineLink(item);
    const downloadLink = EditionCardUtils.getDownloadLink(item, title);

    // If a digital version exists, link directly
    if (readOnlineLink || downloadLink) {
      return (
        <>
          {readOnlineLink}
          {downloadLink}
        </>
      );
    }

    const eddLink =
      item && item.links
        ? item.links.find((link) => {
            return MediaTypes.edd.includes(link.mediaType);
          })
        : undefined;

    // Offer EDD if available
    if (eddLink !== undefined) {
      const eddElement = EditionCardUtils.gedEddLink(
        eddLink,
        cookies[NYPL_SESSION_ID]
      );
      return <>{eddElement}</>;
    }

    return <>{EditionCardUtils.getNoLinkElement(false)}</>;
  };

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
      ctas={ctas(previewItem, title)}
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
