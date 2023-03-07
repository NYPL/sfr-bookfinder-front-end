import React from "react";
import { Box, SimpleGrid } from "@nypl/design-system-react-components";
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
                return (
                  <CollectionCard
                    key={"collection-card-" + index}
                    collection={collection}
                  />
                );
            })}
          </SimpleGrid>
          {/* todo: Add in a future iteration of collections (SFR-1637)
          {collections.groups.length > 8 && (
            <Link
              type="forwards"
              href="/collections"
              marginTop="m"
              float="right"
            >
              View All Collections
            </Link>
          )} */}
        </>
      ) : (
        "No collections available"
      )}
    </Box>
  );
};

export default CollectionList;
