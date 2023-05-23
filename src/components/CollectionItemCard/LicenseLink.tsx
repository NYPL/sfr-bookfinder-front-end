import React from "react";
import { Rights } from "~/src/types/DataModel";
import Link from "~/src/components/Link/Link";

const LicenseLink: React.FC<{ rights: Rights }> = ({ rights }) => {
  return (
    <Link to="/license">
      {rights ? `License: ${rights.rightsStatement}` : "License: Unknown"}
    </Link>
  );
};

export default LicenseLink;
