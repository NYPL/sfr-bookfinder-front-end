import React from "react";
import { OpdsLink } from "~/src/types/OpdsModel";
import CollectionUtils from "~/src/util/CollectionUtils";
import { formatUrl } from "~/src/util/Util";
import Link from "~/src/components/Link/Link";

// "Read Online" button should only show up if the link was flagged as "reader" or "embed"
const ReadOnlineLink: React.FC<{ links: OpdsLink[] }> = ({ links }) => {
  const localLink = CollectionUtils.getReadLink(links, "readable");
  const embeddedLink = CollectionUtils.getReadLink(links, "embedable");

  // Prefer local link over embedded link
  const readOnlineLink = localLink ?? embeddedLink;

  if (!readOnlineLink) return null;

  return (
    <Link
      to={{
        pathname: formatUrl(readOnlineLink.href),
      }}
      linkType="button"
    >
      Read Online
    </Link>
  );
};

export default ReadOnlineLink;
