import React from "react";
import * as DS from "@nypl/design-system-react-components";
import Link from "../Link/Link";
import { WorkEdition } from "~/src/types/DataModel";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import { PLACEHOLDER_COVER_LINK } from "~/src/constants/editioncard";
import { useCookies } from "react-cookie";
import { NYPL_SESSION_ID } from "~/src/constants/auth";

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
      ctas={EditionCardUtils.getCtas(
        previewItem,
        title,
        !!cookies[NYPL_SESSION_ID]
      )}
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
