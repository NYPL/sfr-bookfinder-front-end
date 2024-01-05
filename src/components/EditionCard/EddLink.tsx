import React from "react";
import Link from "~/src/components/Link/Link";
import { ItemLink } from "~/src/types/DataModel";

const EddLink: React.FC<{
  eddLink: ItemLink;
  isLoggedIn: boolean;
  title: string;
}> = ({ eddLink, isLoggedIn, title }) => {
  if (isLoggedIn) {
    return (
      <>
        <Link
          // Url starts with www
          to={`https://${eddLink.url}`}
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
          linkType="buttonSecondary"
          aria-label={`Log in to request scan for ${title}`}
        >
          Log in to request scan
        </Link>
      </>
    );
  }
};

export default EddLink;
