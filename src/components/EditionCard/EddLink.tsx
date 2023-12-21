import React from "react";
import Link from "~/src/components/Link/Link";
import { ItemLink } from "~/src/types/DataModel";

const EddLink: React.FC<{
  eddLink: ItemLink;
  isLoggedIn: boolean;
}> = ({ eddLink, isLoggedIn }) => {
  if (isLoggedIn) {
    return (
      <>
        <Link
          // Url starts with www
          to={`https://${eddLink.url}`}
          linkType="button"
          target="_blank"
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
        >
          Log in to request scan
        </Link>
      </>
    );
  }
};

export default EddLink;
