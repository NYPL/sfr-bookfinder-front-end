import React, { useEffect } from "react";
import * as DS from "@nypl/design-system-react-components";
import { breadcrumbTitles } from "~/src/constants/labels";
import { ApiLink, LinkResult } from "~/src/types/LinkQuery";
import { MediaTypes } from "~/src/constants/mediaTypes";
import IFrameReader from "../IFrameReader/IFrameReader";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import Layout from "../Layout/Layout";
import * as gtag from "../../lib/Analytics";
import { truncateStringOnWhitespace } from "~/src/util/Util";
import { MAX_TITLE_LENGTH } from "~/src/constants/editioncard";
import useWebReader from "@nypl/web-reader/dist/";
//The NYPL wrapper that wraps the Reader pages.
const ReaderLayout: React.FC<{ linkResult: LinkResult }> = (props) => {
  const link: ApiLink = props.linkResult.data;
  console.log("link", link);

  const edition = link.work.editions[0];

  const isEmbed = MediaTypes.embed.includes(link.media_type);
  const isRead = MediaTypes.read.includes(link.media_type);

  useEffect(() => {
    gtag.drbEvents("Read", `${link.work.title}`);
  }, [link]);

  const reader: any = useWebReader({
    webpubManifestUrl: link.url,
  });
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
        <>
          {/* eg. keep default header, but change its background */}
          {/* <ReaderNav {...reader} className="bg-blue" /> */}
          {/* we can add custom prev/next page buttons */}
          <button onClick={reader.handleNextPage}>Next</button>
          <button onClick={reader.handlePrevPage}>Prev</button>
          {/* you will receive content from the reader to render wherever you want */}
          {reader.content}
          {/* use the default footer */}
          {/* <ReaderFooter {...reader} /> */}
        </>
      )}
    </>
  );
};

export default ReaderLayout;
