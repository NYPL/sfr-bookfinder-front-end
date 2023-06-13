import React from "react";
import { Button, Icon } from "@nypl/design-system-react-components";
import CollectionUtils from "~/src/util/CollectionUtils";
import Link from "~/src/components/Link/Link";
import { OpdsLink } from "~/src/types/OpdsModel";
import { formatUrl } from "~/src/util/Util";
import { trackEvent } from "~/src/lib/Analytics";

const DownloadLink: React.FC<{ links: OpdsLink[]; title: string }> = ({
  links,
  title,
}) => {
  const selectedLink = CollectionUtils.getDownloadLink(links);

  if (!selectedLink) return null;

  const formattedUrl = formatUrl(selectedLink.href);

  const trackDownloadCta = () => {
    trackEvent({
      section: `${title}`,
      text: "Download",
      destination: `${formattedUrl}`,
    });
  };

  if (selectedLink && selectedLink.href) {
    return (
      <Link to={`${formattedUrl}`} linkType="action">
        <Button
          id="download-button"
          buttonType="secondary"
          onClick={() => {
            trackDownloadCta();
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
        </Button>
      </Link>
    );
  }
};

export default DownloadLink;
