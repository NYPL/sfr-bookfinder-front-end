import React from "react";
import { OpdsLink } from "~/src/types/OpdsModel";
import Link from "~/src/components/Link/Link";

export const EddLink: React.FC<{
  eddLink: OpdsLink;
  isLoggedIn: boolean;
  title: string;
}> = ({ eddLink, isLoggedIn, title }) => {
  if (isLoggedIn) {
    return (
      <>
        <Link
          // Url starts with www
          to={`https://${eddLink.href}`}
          linkType="button"
          target="_blank"
          aria-label={`Request scan for ${title}`}
        >
          Request Scan
        </Link>
      </>
    );
  } else {
    return (
      <>
        <Link
          to={`https://login.nypl.org/auth/login?redirect_uri=${encodeURIComponent(
            window.location.href
          )}`}
          linkType="button"
          aria-label={`Log in to request scan for ${title}`}
        >
          Log in to request scan
        </Link>
      </>
    );
  }
};

export default EddLink;
