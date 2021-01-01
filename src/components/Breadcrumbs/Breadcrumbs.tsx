import React, { useRef } from "react";
import PropTypes from "prop-types";
// @ts-expect-error ts-migrate(2614) FIXME: Module '"../../../node_modules/next/link"' has no ... Remove this comment to see the full error message
import { Link } from "next/link";
import { bindActionCreators } from "redux";
import * as DS from "@nypl/design-system-react-components";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/actions/SearchActions' o... Remove this comment to see the full error message
import * as searchActions from "~/src/actions/SearchActions";
import { MAX_TITLE_LENGTH } from "~/src/constants/editioncard";
import { truncateStringOnWhitespace } from "~/src/util/Util";
import { EditionCardUtils } from "../EditionCard/EditionCard";

const getLinkFromWork = (title: any, uuid: any) => {
  const workTitle = title || "Title Unknown";

  const strippedSlashTitle =
    workTitle.indexOf("/") > 0
      ? workTitle.substring(0, workTitle.indexOf("/"))
      : workTitle;
  const breadcrumbTitle = truncateStringOnWhitespace(
    strippedSlashTitle,
    MAX_TITLE_LENGTH
  );
  return {
    url: `/work/${uuid}`,
    text: `${breadcrumbTitle}`,
  };
};

export const getBreadcrumbLinks = (workDetail: any, editionDetail: any) => {
  const links = [];
  if (workDetail && workDetail.uuid) {
    links.push(getLinkFromWork(workDetail.title, workDetail.uuid));
  }

  if (editionDetail && editionDetail.id) {
    const editionYear = EditionCardUtils.editionYearText(editionDetail);
    links.push({
      url: `/edition/${editionDetail.id}`,
      text: `${editionYear}`,
    });
  }
  return links;
};

export const getCrumbTrail = (location: any, links: any, handleReset: any) => {
  const homeLink = {
    url: "/",
    text: "Home",
    // <Link href="/">
    //   <a onClick={event => handleReset(event)}>Digital Research Books Beta</a>
    // </Link>
  };

  const crumbs = [homeLink];

  // TODO: Breadcrumb re-think
  // if (links && links.length && location && location.pathname !== "/") {
  //   console.log("links", links);
  //   // Add all the other links
  //   const additionalLinkElements = links.map((link) => {
  //     if (link.href) {
  //       return {
  //         url: link.href,
  //         text: link.text,
  //       };
  //     }
  //   });
  //   if (additionalLinkElements) {
  //     crumbs.push(...additionalLinkElements);
  //   }
  // }
  return crumbs;
};

type OwnBreadcrumbsProps = {
  location?: {
    [key: string]: any;
  };
  workDetail?: {
    uuid?: string;
    title?: string;
  };
  editionDetail?: {
    id?: string;
    publication_date?: string;
  };
  dispatch?: (...args: any[]) => any;
};

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'BreadcrumbsProps' circularly reference... Remove this comment to see the full error message
type BreadcrumbsProps = OwnBreadcrumbsProps & typeof Breadcrumbs.defaultProps;

// @ts-expect-error ts-migrate(7022) FIXME: 'Breadcrumbs' implicitly has type 'any' because it... Remove this comment to see the full error message
const Breadcrumbs = (props: BreadcrumbsProps) => {
  const boundActions = useRef();
  const links = getBreadcrumbLinks(props.workDetail, props.editionDetail);

  const handleReset = (event: any) => {
    event.preventDefault();
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    boundActions.current.resetSearch();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'Router'.
    Router.push("/");
  };

  console.log("blah", getCrumbTrail(props.location, links, handleReset));
  return (
    <DS.Breadcrumbs
      breadcrumbs={getCrumbTrail(props.location, links, handleReset)}
    />
  );
};

Breadcrumbs.defaultProps = {
  location: {},
  workDetail: {},
  editionDetail: {},
  dispatch: () => {},
};

Breadcrumbs.contextTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};

export default Breadcrumbs;
