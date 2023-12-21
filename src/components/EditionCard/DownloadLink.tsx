import { Box, Button, Icon } from "@nypl/design-system-react-components";
import React from "react";
import Link from "~/src/components/Link/Link";
import { trackCtaClick } from "~/src/lib/adobe/Analytics";
import { ItemLink } from "~/src/types/DataModel";
import { formatUrl } from "~/src/util/Util";

const DownloadLink: React.FC<{
  downloadLink: ItemLink;
  title: string;
}> = ({ downloadLink, title }) => {
  if (downloadLink && downloadLink.url) {
    const formattedUrl = formatUrl(downloadLink.url);
    const trackDownloadCta = () => {
      trackCtaClick({
        cta_section: `${title}`,
        cta_text: "Download",
        destination_url: `${formattedUrl}`,
      });
    };
    return (
      <Box>
        <Link to={`${formattedUrl}`} linkType="action">
          <Button
            width="100%"
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
      </Box>
    );
  }
};

export default DownloadLink;
