import React from "react";
import { StatusBadge } from "@nypl/design-system-react-components";

const FeaturedEditionBadge: React.FC = () => {
  return (
    <StatusBadge level="medium" width={{ base: "100%", md: "fit-content" }}>
      Featured Edition
    </StatusBadge>
  );
};

export default FeaturedEditionBadge;
