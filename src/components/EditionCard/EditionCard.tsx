import React from "react";
import * as DS from "@nypl/design-system-react-components";
import Link from "../Link/Link";
import { WorkEdition } from "~/src/types/DataModel";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import { PLACEHOLDER_COVER_LINK } from "~/src/constants/editioncard";
import { useCookies } from "react-cookie";

export const EditionCard: React.FC<{ edition: WorkEdition; title: string }> = ({
  edition,
  title,
}) => {
  const [cookies] = useCookies(["nyplIdentityPatron"]);

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

  const ctas = (): JSX.Element => {
    // If a digital version exists, link directly
    if (readOnlineLink || downloadLink) {
      return (
        <>
          {readOnlineLink}
          {downloadLink}
        </>
      );
    }

    const hasEDD = edition.items.find((item) => {
      return item.links.find((link) => {
        return link.mediaType.includes("edd");
      });
    });

    // Offer EDD if available
    if (hasEDD) {
      console.log("got here");
      if (cookies.nyplIdentityPatron) {
        return <>Logged in, do request</>;
      } else {
        return (
          <>
            This may be available from NYPL,
            <Link
              to={`https://login.nypl.org/auth/login?redirect_uri=${window.location.href}`}
            >
              Log In
            </Link>
          </>
        );
      }
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
      ctas={ctas()}
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
