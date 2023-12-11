import React from "react";
import { OpdsLink } from "~/src/types/OpdsModel";
import Link from "~/src/components/Link/Link";

export const EddLink: React.FC<{
  eddLink: OpdsLink;
  isLoggedIn: boolean;
}> = ({ eddLink, isLoggedIn }) => {
  if (isLoggedIn) {
    return (
      <>
        <Link
          // Url starts with www
          to={`https://${eddLink.href}`}
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
        May be available via NYPL<br></br>
        <Link
          to={`https://login.nypl.org/auth/login?redirect_uri=${encodeURIComponent(
            window.location.href
          )}`}
          linkType="button"
        >
          Log in to request scan
        </Link>
      </>
    );
  }
};

export default EddLink;
