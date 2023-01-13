import React from "react";
import { Box, Flex, Link } from "@nypl/design-system-react-components";
import CollectionCard from "../CollectionCard/CollectionCard";
import { Opds2Feed } from "~/src/types/OpdsModel";

export const CollectionList: React.FC<{ collections: Opds2Feed }> = ({
  collections,
}) => {
  return (
    <Box>
      <Flex wrap="wrap" gap="l">
        {collections.groups.map((collection, index) => {
          if (index < 8)
            return <CollectionCard key={index} collection={collection} />;
        })}
        {collections.groups.length > 8 && (
          <Link
            type="forwards"
            href="/collections"
            marginTop="m"
            marginLeft="auto"
          >
            View All Collections
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default CollectionList;
