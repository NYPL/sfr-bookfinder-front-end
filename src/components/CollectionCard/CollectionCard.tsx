import React from "react";
import {
  Card,
  CardContent,
  CardHeading,
  Box,
  Heading,
  Text,
} from "@nypl/design-system-react-components";
import { PLACEHOLDER_COVER_LINK } from "~/src/constants/editioncard";
import { Opds2Feed } from "~/src/types/OpdsModel";
import CollectionUtils from "~/src/util/CollectionUtils";

export const CollectionCard: React.FC<{ collection: Opds2Feed }> = ({
  collection,
}) => {
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
        aspectRatio: "twoByOne",
      }}
      mainActionLink={collection.links[0].href}
      isBordered
      width="264px"
      minHeight="405px"
      sx={{
        "a > h2": {
          color: "ui.link.primary",
          textDecoration: "underline",
        },
        "h1 > a": {
          textDecoration: "none",
          _hover: {
            p: { color: "initial" },
            h2: { color: "ui.link.secondary" },
          },
        },
      }}
    >
      <CardHeading level="one" id="stack1-heading1">
        <Text size="caption" isUppercase>
          <b>Collection</b>
        </Text>
        <Heading size="tertiary">{collection.metadata.title}</Heading>
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
