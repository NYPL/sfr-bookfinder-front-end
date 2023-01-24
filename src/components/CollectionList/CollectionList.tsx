import React from "react";
import { Box, Link, SimpleGrid } from "@nypl/design-system-react-components";
import CollectionCard from "../CollectionCard/CollectionCard";
import { Opds2Feed } from "~/src/types/OpdsModel";

export const CollectionList: React.FC<{ collections: Opds2Feed }> = ({
  collections,
}) => {
  return (
    <Box>
      {collections ? (
        <>
          <SimpleGrid gap="l" columns={4}>
            {collections.groups.map((collection, index) => {
              if (index < 8)
                return <CollectionCard key={index} collection={collection} />;
            })}
          </SimpleGrid>
          {collections.groups.length > 8 && (
            <Link
              type="forwards"
              href="/collections"
              marginTop="m"
              float="right"
            >
              View All Collections
            </Link>
          )}
        </>
      ) : (
        "No collections available"
      )}
    </Box>
  );
};

export default CollectionList;
