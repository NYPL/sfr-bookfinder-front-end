import React from "react";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeading,
} from "@nypl/design-system-react-components";
import Link from "../Link/Link";
import { useCookies } from "react-cookie";
import { NYPL_SESSION_ID } from "~/src/constants/auth";
import { OpdsPublication } from "~/src/types/OpdsModel";
import CollectionUtils from "~/src/util/CollectionUtils";

// Creates an Collection item card out of the collectionItem object
export const CollectionItemCard: React.FC<{
  collectionItem: OpdsPublication;
}> = (props) => {
  // cookies defaults to be undefined if not fonud
  const [cookies] = useCookies([NYPL_SESSION_ID]);

  const collection = props.collectionItem;

  const editionYearElem = () => {
    const editionDisplay =
      `${collection.metadata.published} Edition` ?? "Edition Year Unknown";

    const editionElem = collection ? (
      <Link
        to={{
          pathname: collection.links.find((link) => link.rel === "alternate")
            .href,
        }}
      >
        {editionDisplay}
      </Link>
    ) : (
      <>{editionDisplay}</>
    );
    return editionElem;
  };

  return (
    <Card
      imageProps={{
        src: CollectionUtils.getCover(collection),
        size: "xsmall",
        aspectRatio: "original",
        alt: "Cover",
      }}
      layout="row"
      isBordered
      isAlignedRightActions
      id={`card-${CollectionUtils.getId(collection.links)}`}
      p="s"
    >
      <CardHeading level="three">{editionYearElem()}</CardHeading>
      <CardContent>
        <Box>
          {CollectionUtils.getPublisherAndLocation(
            collection.metadata.locationCreated,
            collection.metadata.publisher
          )}
        </Box>
        <Box>
          {CollectionUtils.getLanguageDisplayText(collection.metadata.language)}
        </Box>
        <Link to="/license">
          {CollectionUtils.getLicense(collection.metadata.rights)}
        </Link>
      </CardContent>
      <CardActions display="flex" flexDir="column" whiteSpace="nowrap" gap={4}>
        {CollectionUtils.getCtas(
          collection.links,
          collection.metadata.title,
          !!cookies[NYPL_SESSION_ID]
        )}
      </CardActions>
    </Card>
  );
};
