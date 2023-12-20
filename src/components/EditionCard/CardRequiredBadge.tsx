import React from "react";
import { StatusBadge } from "@nypl/design-system-react-components";

const CardRequiredBadge: React.FC = () => {
  return (
    <StatusBadge level="high" width={{ base: "100%", md: "fit-content" }}>
      Library Card Required
    </StatusBadge>
  );
};

export default CardRequiredBadge;
