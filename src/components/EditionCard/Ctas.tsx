import React from "react";
import { ApiItem } from "~/src/types/DataModel";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import DownloadLink from "./DownloadLink";
import EddLink from "./EddLink";
import ReadOnlineLink from "./ReadOnlineLink";

const Ctas: React.FC<{
  item: ApiItem | undefined;
  title: string;
  isLoggedIn: boolean;
}> = ({ item, title, isLoggedIn }) => {
  const readOnlineLink = EditionCardUtils.getReadOnlineLink(item);
  const downloadLink = EditionCardUtils.selectDownloadLink(item);

  if (readOnlineLink || downloadLink) {
    return (
      <>
        {readOnlineLink && (
          <ReadOnlineLink
            readOnlineLink={readOnlineLink}
            isLoggedIn={isLoggedIn}
            title={title}
          />
        )}
        {downloadLink && (
          <DownloadLink
            downloadLink={downloadLink}
            title={title}
            isLoggedIn={isLoggedIn}
          />
        )}
      </>
    );
  }

  const eddLink =
    item && item.links ? item.links.find((link) => link.flags.edd) : undefined;

  // Offer EDD if available
  if (eddLink !== undefined) {
    return <EddLink eddLink={eddLink} isLoggedIn={isLoggedIn} />;
  }

  return <>Not yet available</>;
};

export default Ctas;
