import React from "react";
import Link from "~/src/components/Link/Link";

import * as DS from "@nypl/design-system-react-components";

import { EditionCard } from "~/src/components/EditionCard/EditionCard";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import EmptySearchSvg from "../Svgs/EmptySearchSvg";
import { truncateStringOnWhitespace } from "~/src/util/Util";
import { MAX_TITLE_LENGTH } from "~/src/constants/editioncard";
import { ApiWork } from "~/src/types/WorkQuery";

export const getEditionsLinkElement = (work: ApiWork) => {
  const editionCount = work.edition_count;
  return editionCount > 1 ? (
    <Link
      className="link"
      to={{
        pathname: `work/${work.uuid}`,
        query: { showAll: true },
        hash: "#all-editions",
      }}
    >
      {`View All ${editionCount} Editions`}
    </Link>
  ) : undefined;
};

const ResultsList: React.FC<{ works: ApiWork[] }> = ({ works }) => {
  if (works.length === 0) {
    return (
      <div className="no-results">
        <EmptySearchSvg className="no-results-item" />
        <div className="no-results-item">
          No results were found. Please try a different keyword or fewer
          filters.
        </div>
      </div>
    );
  }
  return (
    <DS.List type={DS.ListTypes.Unordered} modifiers={["no-list-styling"]}>
      {works.map((work) => {
        const previewEdition = work.editions && work.editions[0];

        return (
          <li key={`search-result-${work.uuid}`} className="search-result">
            <DS.Heading level={2}>
              <Link
                to={{
                  pathname: `/work/${work.uuid}`,
                }}
                className="link link--no-underline"
              >
                {truncateStringOnWhitespace(work.title, MAX_TITLE_LENGTH)}
              </Link>
            </DS.Heading>
            <span>{EditionCardUtils.getSubtitle(work.sub_title)}</span>
            {EditionCardUtils.getAuthorsList(work.authors) && (
              <span>By {EditionCardUtils.getAuthorsList(work.authors)} </span>
            )}
            <EditionCard edition={previewEdition} title={work.title} />
            <div className="editions-link">{getEditionsLinkElement(work)}</div>
          </li>
        );
      })}
    </DS.List>
  );
};

export default ResultsList;
