import { Box } from "@nypl/design-system-react-components";
import React from "react";
import Link from "~/src/components/Link/Link";
import { ItemLink } from "~/src/types/DataModel";

// "Read Online" button should only show up if the link was flagged as "reader" or "embed"
const ReadOnlineLink: React.FC<{ readOnlineLink: ItemLink }> = ({
  readOnlineLink,
}) => {
  return (
    readOnlineLink && (
      <Box>
        <Link
          to={{
            pathname: `/read/${readOnlineLink.link_id}`,
          }}
          linkType="button"
        >
          Read Online
        </Link>
      </Box>
    )
  );
};

export default ReadOnlineLink;
