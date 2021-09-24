import React, { useEffect } from "react";
import * as DS from "@nypl/design-system-react-components";
import { breadcrumbTitles } from "~/src/constants/labels";
import { ApiLink, LinkResult } from "~/src/types/LinkQuery";
import IFrameReader from "../IFrameReader/IFrameReader";
import WebpubViewer from "../WebpubViewer/WebpubViewer";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import Layout from "../Layout/Layout";
import * as gtag from "../../lib/Analytics";
import { truncateStringOnWhitespace } from "~/src/util/Util";
import { MAX_TITLE_LENGTH } from "~/src/constants/editioncard";

//The NYPL wrapper that wraps the Reader pages.
const ReaderLayout: React.FC<{ linkResult: LinkResult }> = (props) => {
  const link: ApiLink = props.linkResult.data;

  const edition = link.work.editions[0];

  const isRead = link.flags.reader;
  // const isEmbed = link.flags.embed;
  // remove when embed is ready
  const isEmbed = !isRead;

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
      {isRead && <WebpubViewer url={link.url} />}
    </>
  );
};

export default ReaderLayout;
