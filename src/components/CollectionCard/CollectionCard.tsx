import React from "react";
import {
  Card,
  CardContent,
  CardHeading,
  Box,
  Heading,
  Text,
} from "@nypl/design-system-react-components";
import { Opds2Feed } from "~/src/types/OpdsModel";
import CollectionUtils from "~/src/util/CollectionUtils";
import { truncateStringOnWhitespace } from "~/src/util/Util";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_COLLECTION_TITLE_LENGTH,
  PLACEHOLDER_LINK,
} from "~/src/constants/collection";

export const CollectionCard: React.FC<{ collection: Opds2Feed }> = ({
  collection,
}) => {
  const collectionId = CollectionUtils.getId(collection.links);

  return (
    <Card
      id={`card-${collectionId}`}
      layout="column"
      imageProps={{
        src: PLACEHOLDER_LINK,
        alt: `Cover for ${collection.metadata.title}`,
        aspectRatio: "twoByOne",
      }}
      mainActionLink={collection.links[0].href}
      isBordered
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
        <Text size="caption" isUppercase marginTop="xs" marginBottom="xxs">
          <b>Collection</b>
        </Text>
        <Heading size="tertiary" minHeight="55px">
          {truncateStringOnWhitespace(
            collection.metadata.title,
            MAX_COLLECTION_TITLE_LENGTH
          )}
        </Heading>
      </CardHeading>
      <CardContent>
        <Box>
          <Heading level="one" size="callout">
            {collection.metadata.numberOfItems + " Items"}
          </Heading>
          <Text>
            {truncateStringOnWhitespace(
              collection.metadata.description,
              MAX_DESCRIPTION_LENGTH
            )}
          </Text>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CollectionCard;
