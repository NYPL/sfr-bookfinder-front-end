import React, { useRef } from "react";
import PropTypes from "prop-types";
// @ts-expect-error ts-migrate(2614) FIXME: Module '"../../../node_modules/next/link"' has no ... Remove this comment to see the full error message
import { Link } from "next/link";
import { bindActionCreators } from "redux";
import * as DS from "@nypl/design-system-react-components";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/actions/SearchActions' o... Remove this comment to see the full error message
import * as searchActions from "~/src/actions/SearchActions";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/constants/editioncard' o... Remove this comment to see the full error message
import { MAX_TITLE_LENGTH } from "~/src/constants/editioncard";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Card/EditionC... Remove this comment to see the full error message
import EditionCard from "~/src/components/Card/EditionCard";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/util/Util' or its corres... Remove this comment to see the full error message
import { truncateStringOnWhitespace } from "~/src/util/Util";

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'title' implicitly has an 'any' type.
const getLinkFromWork = (title, uuid) => {
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
    url: `/work?workId=${uuid}`,
    text: `${breadcrumbTitle}`,
  };
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'workDetail' implicitly has an 'any' typ... Remove this comment to see the full error message
export const getBreadcrumbLinks = (workDetail, editionDetail) => {
  const links = [];
  if (workDetail && workDetail.uuid) {
    links.push(getLinkFromWork(workDetail.title, workDetail.uuid));
  }

  if (editionDetail && editionDetail.id) {
    const editionYear = EditionCard.editionYearText(editionDetail);
    links.push({
      url: `/edition?editionId=${editionDetail.id}`,
      text: `${editionYear}`,
    });
  }
  return links;
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'location' implicitly has an 'any' type.
export const getCrumbTrail = (location, links, handleReset) => {
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

type BreadcrumbsProps = {
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

// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'props'.
const Breadcrumbs =props: BreadcrumbsProps => {
  const boundActions = useRef();
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'props'.
  const links = getBreadcrumbLinks(props.workDetail, props.editionDetail);

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  const handleReset = event => {
    event.preventDefault();
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    boundActions.current.resetSearch();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'Router'.
    Router.push("/");
  };

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'props'.
  console.log("blah", getCrumbTrail(props.location, links, handleReset));
  return <DS.Breadcrumbs breadcrumbs={getCrumbTrail(props.location, links, handleReset)} />;
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
