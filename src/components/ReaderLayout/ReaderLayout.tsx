import React, { useEffect } from "react";
import { Breadcrumbs, Icon } from "@nypl/design-system-react-components";
import { defaultBreadcrumbs } from "~/src/constants/labels";
import { ApiLink, LinkResult } from "~/src/types/LinkQuery";
import IFrameReader from "../IFrameReader/IFrameReader";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import Layout from "../Layout/Layout";
import * as gtag from "../../lib/Analytics";
import { formatUrl, truncateStringOnWhitespace } from "~/src/util/Util";
import { MAX_TITLE_LENGTH } from "~/src/constants/editioncard";
import dynamic from "next/dynamic";
import { MediaTypes } from "~/src/constants/mediaTypes";
import ReaderLogoSvg from "../Svgs/ReaderLogoSvg";
import useSWR from "swr";
import { fetchAndModifyManifest } from "./singlePDFUtils";
const WebReader = dynamic(() => import("@nypl/web-reader"), { ssr: false });
// This is how we can import a css file as a url. It's complex, but necessary
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import readiumBefore from "!file-loader!extract-loader!css-loader!@nypl/web-reader/dist/injectable-html-styles/ReadiumCSS-before.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import readiumDefault from "!file-loader!extract-loader!css-loader!@nypl/web-reader/dist/injectable-html-styles/ReadiumCSS-default.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import readiumAfter from "!file-loader!extract-loader!css-loader!@nypl/web-reader/dist/injectable-html-styles/ReadiumCSS-after.css";

import Link from "../Link/Link";
// import { addTocToManifest } from "@nypl/web-reader";
import Loading from "../Loading/Loading";

const origin =
  typeof window !== "undefined" && window.location?.origin
    ? window.location.origin
    : "";

const injectables = [
  {
    type: "style",
    url: `${origin}${readiumBefore}`,
  },
  {
    type: "style",
    url: `${origin}${readiumDefault}`,
  },
  {
    type: "style",
    url: `${origin}${readiumAfter}`,
  },
  {
    type: "style",
    url: `${origin}/fonts/opendyslexic/opendyslexic.css`,
    fontFamily: "opendyslexic",
  },
];

//The NYPL wrapper that wraps the Reader pages.
const ReaderLayout: React.FC<{
  linkResult: LinkResult;
  proxyUrl: string;
  backUrl: string;
}> = ({ linkResult, proxyUrl, backUrl }) => {
  const link: ApiLink = linkResult.data;
  const url = formatUrl(link.url);
  const edition = link.work.editions[0];
  const pdfWorkerSrc = `${origin}/pdf-worker/pdf.worker.min.js`;

  const isEmbed = MediaTypes.embed.includes(link.media_type);
  // const isRead = MediaTypes.read.includes(link.media_type);

  // const { data: modifiedManifestUrl, isLoading } = useSWR<string>(
  //   url,
  //   fetchAndModifyManifest(proxyUrl),
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );

  useEffect(() => {
    fetchAndModifyManifest(proxyUrl)(url).then((res) => console.log(res));
  });

  useEffect(() => {
    gtag.drbEvents("Read", `${link.work.title}`);
  }, [link]);

  // if (isLoading || !modifiedManifestUrl) return <Loading />;

  const BackButton = () => {
    return (
      //Apends design system classname to use Design System Link.
      <Link to={backUrl} className="nypl-ds logo-link">
        <Icon decorative className="logo-link__icon">
          <ReaderLogoSvg />
        </Icon>
        <span className="logo-link__label">Back to Digital Research Books</span>
      </Link>
    );
  };

  if (isEmbed) {
    return (
      <Layout>
        <Breadcrumbs
          breadcrumbsType="research"
          breadcrumbsData={[
            ...defaultBreadcrumbs,
            {
              url: `/work/${edition.work_uuid}`,
              text: truncateStringOnWhitespace(edition.title, MAX_TITLE_LENGTH),
            },
            {
              url: `/edition/${edition.edition_id}`,
              text: EditionCardUtils.editionYearText(edition),
            },
          ]}
        />
        <IFrameReader url={link.url} />
      </Layout>
    );
  }

  return null;

  // return (
  //   <WebReader
  //     webpubManifestUrl={url}
  //     proxyUrl={proxyUrl}
  //     pdfWorkerSrc={pdfWorkerSrc}
  //     headerLeft={<BackButton />}
  //     injectablesFixed={injectables}
  //   />
  // );
};

export default ReaderLayout;
