import React, { useRef } from "react";
import PropTypes, { string } from "prop-types";
import { Link } from "next/link";
import { bindActionCreators } from "redux";
import * as DS from "@nypl/design-system-react-components";
import * as searchActions from "~/src/actions/SearchActions";
import { MAX_TITLE_LENGTH } from "~/src/constants/editioncard";
import EditionCard from "~/src/components/Card/EditionCard";
import { truncateStringOnWhitespace } from "~/src/util/Util";

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

const Breadcrumbs = props => {
  const boundActions = useRef();
  const links = getBreadcrumbLinks(props.workDetail, props.editionDetail);

  const handleReset = event => {
    event.preventDefault();
    boundActions.current.resetSearch();
    Router.push("/");
  };

  console.log("blah", getCrumbTrail(props.location, links, handleReset));
  return <DS.Breadcrumbs breadcrumbs={getCrumbTrail(props.location, links, handleReset)} />;
};

Breadcrumbs.propTypes = {
  location: PropTypes.objectOf(PropTypes.any),
  workDetail: PropTypes.shape({
    uuid: PropTypes.string,
    title: PropTypes.string,
  }),
  editionDetail: PropTypes.shape({
    id: PropTypes.string,
    publication_date: PropTypes.string,
  }),
  dispatch: PropTypes.func,
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
