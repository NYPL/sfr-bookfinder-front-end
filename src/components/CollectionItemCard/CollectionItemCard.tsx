import React from "react";
import { Card, CardContent } from "@nypl/design-system-react-components";
import { useCookies } from "react-cookie";
import { NYPL_SESSION_ID } from "~/src/constants/auth";
import { OpdsPublication } from "~/src/types/OpdsModel";
import CollectionUtils from "~/src/util/CollectionUtils";
import Ctas from "~/src/components/CollectionItemCard/Ctas";
import EditionYear from "~/src/components/CollectionItemCard/EditionYear";
import PublisherAndLocation from "~/src/components/CollectionItemCard/PublisherAndLocation";
import LicenseLink from "~/src/components/CollectionItemCard/LicenseLink";
import LanguageDisplayText from "~/src/components/CollectionItemCard/LanguageDisplayText";

// Creates an Collection item card out of the collectionItem object
export const CollectionItemCard: React.FC<{
  collectionItem: OpdsPublication;
}> = ({ collectionItem }) => {
  // cookies defaults to be undefined if not fonud
  const [cookies] = useCookies([NYPL_SESSION_ID]);
  const { links, metadata } = collectionItem;
  const {
    locationCreated,
    published,
    rights,
    language,
    title,
    publisher,
  } = metadata;

  return (
    <Card
      imageProps={{
        src: CollectionUtils.getCover(collectionItem),
        size: "xsmall",
        aspectRatio: "original",
        alt: "Cover",
      }}
      layout="row"
      isBordered
      isAlignedRightActions
      id={`card-${CollectionUtils.getId(collectionItem.links)}`}
      p="s"
    >
      <EditionYear links={links} published={published} />
      <CardContent>
        <PublisherAndLocation
          pubPlace={locationCreated}
          publisher={publisher}
        />
        <LanguageDisplayText language={language} />
        <LicenseLink rights={rights} />
      </CardContent>
      <Ctas
        links={links}
        title={title}
        isLoggedIn={!!cookies[NYPL_SESSION_ID]}
      />
    </Card>
  );
};
