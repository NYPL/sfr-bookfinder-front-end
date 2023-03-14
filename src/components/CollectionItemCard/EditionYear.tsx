import React from "react";
import { CardHeading } from "@nypl/design-system-react-components";
import Link from "~/src/components/Link/Link";
import { OpdsLink } from "~/src/types/OpdsModel";
import CollectionUtils from "~/src/util/CollectionUtils";

const EditionYear: React.FC<{ published: number; links: OpdsLink[] }> = ({
  published,
  links,
}) => {
  const editionDisplay = published
    ? `${published} Edition`
    : "Edition Year Unknown";
  const editionLink = CollectionUtils.getEditionLink(links);
  return (
    <CardHeading level="three">
      {editionLink ? (
        <Link
          to={{
            pathname: editionLink.href,
          }}
        >
          {editionDisplay}
        </Link>
      ) : (
        { editionDisplay }
      )}
    </CardHeading>
  );
};

export default EditionYear;
