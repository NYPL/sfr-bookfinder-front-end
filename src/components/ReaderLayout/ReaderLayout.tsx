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
const WebReader = dynamic(() => import("@nypl/web-reader"), { ssr: false });
// This is how we can import a css file as a url. It's complex, but necessary
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cssInjectableUrl from '!file-loader?{"publicPath":"/_next/static","outputPath":"static"}!extract-loader!css-loader!@nypl/web-reader/dist/injectable-html-styles.css';
import Link from "../Link/Link";

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
const ReaderLayout: React.FC<{
  linkResult: LinkResult;
  proxyUrl: string;
  backUrl: string;
}> = (props) => {
  const link: ApiLink = props.linkResult.data;
  const proxyUrl = props.proxyUrl;
  const url = formatUrl(link.url);
  const edition = link.work.editions[0];

  const isEmbed = MediaTypes.embed.includes(link.media_type);
  const isRead = MediaTypes.read.includes(link.media_type);

  useEffect(() => {
    gtag.drbEvents("Read", `${link.work.title}`);
  }, [link]);

  const BackButton = () => {
    return (
      //Apends design system classname to use Design System Link.
      <Link to={props.backUrl} className="nypl-ds logo-link">
        <Icon decorative className="logo-link__icon">
          <ReaderLogoSvg />
        </Icon>
        <span className="logo-link__label">Back to Digital Research Books</span>
      </Link>
    );
  };

  return (
    <>
      {isEmbed && (
        <Layout>
          <Breadcrumbs
            breadcrumbsType="research"
            breadcrumbsData={[
              ...defaultBreadcrumbs,
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
          headerLeft={<BackButton />}
          injectables={injectables}
        />
      )}
    </>
  );
};

export default ReaderLayout;
