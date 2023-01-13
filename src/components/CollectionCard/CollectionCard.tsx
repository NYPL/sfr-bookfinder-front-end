import React from "react";
import {
  Card,
  CardContent,
  CardHeading,
  Box,
  Heading,
  Text,
} from "@nypl/design-system-react-components";
import Link from "../Link/Link";
import { PLACEHOLDER_COVER_LINK } from "~/src/constants/editioncard";
import { Opds2Feed } from "~/src/types/OpdsModel";
import CollectionUtils from "~/src/util/CollectionUtils";

export const CollectionCard: React.FC<{ collection: Opds2Feed }> = ({
  collection,
}) => {
  const collectionTitleElem = (collection: Opds2Feed) => {
    const collectionElem = collection ? (
      <Link
        to={{
          pathname: collection.links[0].href,
        }}
      >
        {collection.metadata.title}
      </Link>
    ) : (
      <>{collection.metadata.title}</>
    );
    return collectionElem;
  };

  const coverUrl = CollectionUtils.getCover(collection);
  const collectionId = CollectionUtils.getId(collection.links);

  return (
    <Card
      id={`card-${collectionId}`}
      layout="column"
      imageProps={{
        src: coverUrl,
        alt:
          coverUrl === PLACEHOLDER_COVER_LINK
            ? "Placeholder Cover"
            : `Cover for ${collection.metadata.title}`,
        size: "xsmall",
        aspectRatio: "twoByOne",
      }}
      mainActionLink={"/collection/" + collectionId}
      isBordered
      width="264px"
      minHeight="405px"
    >
      <CardHeading level="one" size="callout" id="stack1-heading1">
        <Text size="caption" isUppercase>
          <b>Collection</b>
        </Text>
        {collectionTitleElem(collection)}
      </CardHeading>
      <CardContent>
        <Box>
          <Heading level="one" size="callout">
            {collection.metadata.numberOfItems + " Items"}
          </Heading>
          <Text>{collection.metadata.description}</Text>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CollectionCard;
