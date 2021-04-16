import React from "react";
import * as DS from "@nypl/design-system-react-components";
import { breadcrumbTitles } from "~/src/constants/labels";
import { ApiLink, LinkResult } from "~/src/types/LinkQuery";
import { MediaTypes } from "~/src/constants/mediaTypes";
import IFrameReader from "../IFrameReader/IFrameReader";
import WebpubViewer from "../WebpubViewer/WebpubViewer";
import EditionCardUtils from "~/src/util/EditionCardUtils";

//The NYPL wrapper that wraps the Reader pages.
const ReaderLayout: React.FC<{ linkResult: LinkResult }> = (props) => {
  const link: ApiLink = props.linkResult.data;

  const edition = link.work.editions[0];

  const isEmbed = MediaTypes.embed.includes(link.media_type);
  const isRead = MediaTypes.read.includes(link.media_type);
  return (
    <>
      <DS.Breadcrumbs
        breadcrumbs={[
          { url: "/", text: breadcrumbTitles.home },
          {
            url: `/work/${link.work.uuid}`,
            text: edition.title,
          },
          {
            url: `/edition/${edition.edition_id}`,
            text: EditionCardUtils.editionYearText(edition),
          },
        ]}
      />
      {isEmbed && <IFrameReader url={link.url} />}
      {isRead && <WebpubViewer url={link.url} />}
    </>
  );
};

export default ReaderLayout;
