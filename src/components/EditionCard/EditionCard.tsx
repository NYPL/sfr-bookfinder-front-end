import React from "react";
import { gaUtils } from "dgx-react-ga";
import { Html5Entities } from "html-entities";
import * as DS from "@nypl/design-system-react-components";
import {
  MAX_TITLE_LENGTH,
  MAX_PUBLISHER_NAME_LENGTH,
  MAX_SUBTITILE_LENGTH,
  PLACEHOLDER_COVER_LINK,
} from "../../constants/editioncard";
import { formatUrl, truncateStringOnWhitespace } from "../../util/Util";
import Link from "../Link/Link";
import {
  WorkEdition,
  Item,
  ItemLink,
  Cover,
  Agent,
} from "~/src/types/DataModel";
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
      heading={editionYear}
      image={
        <DS.Image
          src={EditionCardUtils.getCover(edition.covers)}
          alt={`Cover for Edition ${EditionCardUtils.editionYearText(edition)}`}
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
      <DS.Link>
        <Link to="/license">{EditionCardUtils.getLicense(previewItem)}</Link>
      </DS.Link>
    </DS.Card>
  );
};

export default EditionCard;
