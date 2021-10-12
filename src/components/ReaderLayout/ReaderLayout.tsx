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
import Link from "~/src/components/Link/Link";
import WebpubViewer from "../WebpubViewer/WebpubViewer";
import { MediaTypes } from "~/src/constants/mediaTypes";
const WebReader = dynamic(() => import("@nypl/web-reader"), { ssr: false });
import "@nypl/web-reader/dist/esm/index.css";
// This is how we can import a css file as a url. It's complex, but necessary
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cssInjectableUrl from '!file-loader?{"publicPath":"/_next/static","outputPath":"static"}!extract-loader!css-loader!@nypl/web-reader/dist/injectable-html-styles.css';

const origin =
  typeof window !== "undefined" && window.location?.origin
    ? window.location.origin
    : "";

const injectables = [
  {
    type: "style",
    url: `${origin}${cssInjectableUrl}`,
  },
  {
    type: "style",
    url: `${origin}/fonts/opendyslexic/opendyslexic.css`,
    fontFamily: "opendyslexic",
  },
];

//The NYPL wrapper that wraps the Reader pages.
const ReaderLayout: React.FC<{ linkResult: LinkResult; proxyUrl: string }> = (
  props
) => {
  const readerVersion = process.env["NEXT_PUBLIC_READER_VERSION"];

  const link: ApiLink = props.linkResult.data;
  const proxyUrl = props.proxyUrl;
  const url = formatUrl(link.url);
  const edition = link.work.editions[0];

  const isEmbed =
    readerVersion && readerVersion === "v2"
      ? link.flags.embed
      : MediaTypes.embed.includes(link.media_type);
  const isRead =
    readerVersion && readerVersion === "v2"
      ? link.flags.reader
      : MediaTypes.read.includes(link.media_type);

  useEffect(() => {
    gtag.drbEvents("Read", `${link.work.title}`);
  }, [link]);

  const BackButton = () => {
    return (
      //Apeends design system classname to use Design System Link.
      <span className="nypl-ds">
        <Link to="/">Back to Digital Research Books</Link>
      </span>
    );
  };

  const webreaderContent =
    readerVersion && readerVersion === "v2" ? (
      <div className="layout-container nypl--research">
        <WebReader
          webpubManifestUrl={url}
          proxyUrl={proxyUrl}
          pdfWorkerSrc={`${origin}/pdf-worker/pdf.worker.min.js`}
          injectables={injectables}
          headerLeft={<BackButton />}
        />
      </div>
    ) : (
      <WebpubViewer url={link.url} />
    );

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
      {isRead && webreaderContent}
    </>
  );
};

export default ReaderLayout;
