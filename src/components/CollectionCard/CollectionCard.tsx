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
    >
      <CardHeading
        level="h3"
        size="heading5"
        id="stack1-heading1"
        overline="Collection"
      >
        {truncateStringOnWhitespace(
          collection.metadata.title,
          MAX_COLLECTION_TITLE_LENGTH
        )}
      </CardHeading>
      <CardContent>
        <Box>
          <Heading level="h1" size="heading6">
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
