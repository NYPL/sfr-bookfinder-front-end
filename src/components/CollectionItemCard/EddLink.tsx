import React from "react";
import { Box } from "@nypl/design-system-react-components";
import { SCAN_AND_DELIVER_LINK } from "~/src/constants/links";
import { OpdsLink } from "~/src/types/OpdsModel";
import Link from "~/src/components/Link/Link";

export const EddLink: React.FC<{
  eddLink: OpdsLink;
  isLoggedIn: boolean;
}> = ({ eddLink, isLoggedIn }) => {
  if (isLoggedIn) {
    return (
      <>
        <Box whiteSpace="initial">You can request a partial scan via NYPL</Box>
        <Link to={SCAN_AND_DELIVER_LINK} target="_blank">
          Scan and Deliver
        </Link>
        <Link
          // Url starts with www
          to={`https://${eddLink.href}`}
          linkType="button"
          target="_blank"
        >
          Request
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
          Log in for options
        </Link>
      </>
    );
  }
};

export default EddLink;
