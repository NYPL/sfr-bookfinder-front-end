import React from "react";
import { Icon } from "@nypl/design-system-react-components";
import CollectionUtils from "~/src/util/CollectionUtils";
import Link from "~/src/components/Link/Link";
import { OpdsLink } from "~/src/types/OpdsModel";
import * as gtag from "~/src/lib/Analytics";
import { formatUrl } from "~/src/util/Util";

const DownloadLink: React.FC<{ links: OpdsLink[]; title: string }> = ({
  links,
  title,
}) => {
  const selectedLink = CollectionUtils.getDownloadLink(links);

  if (selectedLink && selectedLink.href) {
    return (
      <Link
        to={`${formatUrl(selectedLink.href)}`}
        linkType="action"
        onClick={() => {
          gtag.drbEvents("Download", `${title}`);
        }}
      >
        <Icon
          name="download"
          align="left"
          size="small"
          decorative
          iconRotation="rotate0"
        />
        Download PDF
      </Link>
    );
  }
};

export default DownloadLink;
