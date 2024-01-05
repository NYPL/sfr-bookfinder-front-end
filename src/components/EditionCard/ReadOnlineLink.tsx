import { Box } from "@nypl/design-system-react-components";
import React from "react";
import Link from "~/src/components/Link/Link";
import { ItemLink } from "~/src/types/DataModel";

// "Read Online" button should only show up if the link was flagged as "reader" or "embed"
const ReadOnlineLink: React.FC<{
  readOnlineLink: ItemLink;
  isLoggedIn: boolean;
  title: string;
}> = ({ readOnlineLink, isLoggedIn, title }) => {
  let linkText = "Read Online";
  let linkUrl: any = {
    pathname: `/read/${readOnlineLink.link_id}`,
  };

  if (readOnlineLink.flags.nypl_login && !isLoggedIn) {
    linkText = "Log in to read online";
    linkUrl = `https://login.nypl.org/auth/login?redirect_uri=${encodeURIComponent(
      window.location.href
    )}`;
  }

  return (
    readOnlineLink && (
      <Box>
        <Link
          to={linkUrl}
          linkType="button"
          aria-label={`${title} Read Online`}
        >
          {linkText}
        </Link>
      </Box>
    )
  );
};

export default ReadOnlineLink;
