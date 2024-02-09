import { Box, Icon } from "@nypl/design-system-react-components";
import { useRouter } from "next/router";
import React from "react";
import Link from "~/src/components/Link/Link";
import { trackCtaClick } from "~/src/lib/adobe/Analytics";
import { fulfillFetcher } from "~/src/lib/api/SearchApi";
import { ItemLink } from "~/src/types/DataModel";
import { formatUrl } from "~/src/util/Util";

const DownloadLink: React.FC<{
  downloadLink: ItemLink;
  title: string;
  isLoggedIn: boolean;
  loginCookie?: string;
}> = ({ downloadLink, title, isLoggedIn, loginCookie }) => {
  const router = useRouter();
  if (downloadLink && downloadLink.url) {
    let linkText = "Download PDF";
    let linkUrl = formatUrl(downloadLink.url);

    const handleOnClick = async (e) => {
      if (linkUrl.includes("/fulfill/")) {
        e.preventDefault();
        const redirectUrl = await fulfillFetcher(linkUrl, loginCookie);
        router.push(redirectUrl);
      }
      trackCtaClick({
        cta_section: `${title}`,
        cta_text: "Download",
        destination_url: `${linkUrl}`,
      });
    };

    if (downloadLink.flags.nypl_login && !isLoggedIn) {
      linkText = "Log in to download PDF";
      linkUrl = `https://login.nypl.org/auth/login?redirect_uri=${encodeURIComponent(
        window.location.href
      )}`;
    }

    return (
      <Box>
        <Link
          to={`${linkUrl}`}
          linkType="buttonSecondary"
          onClick={(e) => handleOnClick(e)}
          aria-label={`${title} Download PDF`}
        >
          <Icon
            name="download"
            align="left"
            size="small"
            decorative
            iconRotation="rotate0"
          />
          {linkText}
        </Link>
      </Box>
    );
  }
};

export default DownloadLink;
