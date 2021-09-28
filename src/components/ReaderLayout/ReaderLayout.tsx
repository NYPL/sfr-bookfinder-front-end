import React, { useEffect } from "react";
import * as DS from "@nypl/design-system-react-components";
import { breadcrumbTitles } from "~/src/constants/labels";
import { ApiLink, LinkResult } from "~/src/types/LinkQuery";
import IFrameReader from "../IFrameReader/IFrameReader";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import Layout from "../Layout/Layout";
import * as gtag from "../../lib/Analytics";
import { formatUrl, truncateStringOnWhitespace } from "~/src/util/Util";
import { MAX_TITLE_LENGTH } from "~/src/constants/editioncard";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const WebReader = dynamic(() => import("@nypl/web-reader"), { ssr: false });
//The NYPL wrapper that wraps the Reader pages.
const ReaderLayout: React.FC<{ linkResult: LinkResult, proxyUrl: string }> = (props) => {
  const router = useRouter();
  const origin = router.basePath;
  const link: ApiLink = props.linkResult.data;
  const proxyUrl = props.proxyUrl;
  const url = formatUrl(link.url);
  const edition = link.work.editions[0];

  const isEmbed = link.flags.embed;
  const isRead = link.flags.reader;

  useEffect(() => {
    gtag.drbEvents("Read", `${link.work.title}`);
  }, [link]);

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
          proxyUrl={proxyUrl}
          pdfWorkerSrc={`${origin}/pdf-worker/pdf.worker.min.js`}
        />
      )}
    </>
  );
};

export default ReaderLayout;
