import React from "react";
import Link from "~/src/components/Link/Link";

import * as DS from "@nypl/design-system-react-components";

import { EditionCard } from "~/src/components/EditionCard/EditionCard";
import { ApiWork } from "~/src/types/DataModel";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import EmptySearchSvg from "../Svgs/EmptySearchSvg";

export const getEditionsLinkElement = (result: any) =>
  result.edition_count > 1 ? (
    <Link
      className="link"
      to={{
        pathname: `work/${result.uuid}`,
        query: { showAll: true },
        hash: "#all-editions",
      }}
    >
      {`View All ${result.edition_count} Editions`}
    </Link>
  ) : undefined;

const ResultsList: React.FC<{ works: ApiWork[] }> = ({ works }) => {
  if (works.length === 0) {
    return (
      <div>
        <EmptySearchSvg />
        <span>
          No results were found. Please try a different keyword or fewer
          filters.
        </span>
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
                  query: {
                    recordType: "editions",
                    showAll: true,
                  },
                }}
                className="link link--no-underline"
              >
                {EditionCardUtils.generateDisplayTitle(work.title)}
              </Link>
            </DS.Heading>
            <span>{EditionCardUtils.getSubtitle(work.sub_title)}</span>
            {EditionCardUtils.getAuthorsList(work.agents, "author") && (
              <span>
                By {EditionCardUtils.getAuthorsList(work.agents, "author")}{" "}
              </span>
            )}
            <EditionCard edition={previewEdition} />
            {/* TODO: Feature flag -- Citations
            {shouldShowCitations && (
              <APACitation
                title={citationData.title}
                subTitle={citationData.sub_title}
                agents={citationData.agents}
                publicationYear={citationData.publication_year}
                edition={citationData.edition}
                volume={citationData.volume}
                sourceLink={citationData.sourceLink.link}
                isGovernmentDoc={citationData.isGovernmentDoc}
              />
            )} */}
            <div className="editions-link">{getEditionsLinkElement(work)}</div>
          </li>
        );
      })}
    </DS.List>
  );
};

export default ResultsList;
