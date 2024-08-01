import React from "react";
import { StatusBadge } from "@nypl/design-system-react-components";

const FeaturedEditionBadge: React.FC = () => {
  return (
    <StatusBadge
      type="recommendation"
      width={{ base: "100%", md: "fit-content" }}
    >
      FEATURED EDITION
    </StatusBadge>
  );
};

export default FeaturedEditionBadge;
