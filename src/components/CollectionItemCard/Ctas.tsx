import React from "react";
import { CardActions } from "@nypl/design-system-react-components";
import { OpdsLink } from "~/src/types/OpdsModel";
import ReadOnlineLink from "~/src/components/CollectionItemCard/ReadOnlineLink";
import DownloadLink from "~/src/components/CollectionItemCard/DownloadLink";
import EddLink from "~/src/components/CollectionItemCard/EddLink";
import CollectionUtils from "~/src/util/CollectionUtils";

const Ctas: React.FC<{
  links: OpdsLink[];
  title: string;
  isLoggedIn: boolean;
}> = ({ links, title, isLoggedIn }) => {
  const eddLink = CollectionUtils.getEddLink(links);

  return (
    <CardActions display="flex" flexDir="column" whiteSpace="nowrap" gap={4}>
      {links ? (
        <>
          {/* If a digital version exists, link directly */}
          <ReadOnlineLink links={links} />
          <DownloadLink links={links} title={title} />
          {eddLink && <EddLink eddLink={eddLink} isLoggedIn={isLoggedIn} />}
        </>
      ) : (
        "Not yet available"
      )}
    </CardActions>
  );
};

export default Ctas;
