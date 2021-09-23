import React, { useEffect } from "react";
import * as DS from "@nypl/design-system-react-components";
import { breadcrumbTitles } from "~/src/constants/labels";
import { ApiLink, LinkResult } from "~/src/types/LinkQuery";
import { MediaTypes } from "~/src/constants/mediaTypes";
import IFrameReader from "../IFrameReader/IFrameReader";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import Layout from "../Layout/Layout";
import * as gtag from "../../lib/Analytics";
import { formatUrl, truncateStringOnWhitespace } from "~/src/util/Util";
import { MAX_TITLE_LENGTH } from "~/src/constants/editioncard";
import dynamic from "next/dynamic";
const WebReader = dynamic(() => import("@nypl/web-reader"), { ssr: false });

//The NYPL wrapper that wraps the Reader pages.
const ReaderLayout: React.FC<{ linkResult: LinkResult }> = (props) => {
  const link: ApiLink = props.linkResult.data;
  console.log("link", link);
  const url = formatUrl(link.url);
  const edition = link.work.editions[0];

  const isEmbed = MediaTypes.embed.includes(link.media_type);
  const isRead = MediaTypes.read.includes(link.media_type);

  // //TODO: Temporary hack
  // const blah =
  //   "https://drb-files-qa.s3.amazonaws.com/epubs/" +
  //   link.url.split("/epubs/")[1];
  // const url = blah.split("META-INF")[0] + "/manifest.json";
  // console.log("url", url);
  // useEffect(() => {
  //   gtag.drbEvents("Read", `${link.work.title}`);
  // }, [link]);

  return (
    <>
      {isEmbed && (
        <Layout>
          <DS.Breadcrumbs
            breadcrumbs={[
              { url: "/", text: breadcrumbTitles.home },
              {
                url: `/work/${edition.work_uuid}`,
                text: truncateStringOnWhitespace(
                  edition.title,
                  MAX_TITLE_LENGTH
                ),
              },
              {
                url: `/edition/${edition.edition_id}`,
                text: EditionCardUtils.editionYearText(edition),
              },
            ]}
          />
          <IFrameReader url={link.url} />
        </Layout>
      )}
      {isRead && (
        <WebReader
          webpubManifestUrl={url}
          proxyUrl={"https://cors-anywhere.herokuapp.com/"}
          //TODO: put the proxy request in a root api call
          // proxyUrl={"https://drb-api-qa.nypl.org/utils/proxy?proxy_url="}
        />
      )}
    </>
  );
};

export default ReaderLayout;
