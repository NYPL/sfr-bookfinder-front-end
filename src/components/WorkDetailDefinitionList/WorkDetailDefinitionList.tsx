import React from "react";
import * as DS from "@nypl/design-system-react-components";

import Link from "~/src/components/Link/Link";
import { unique, flattenDeep, uniqueAndSortByFrequency } from "~/src/util/Util";
import { Agent, ApiWork, Language, Subject } from "~/src/types/DataModel";
import EditionCardUtils from "~/src/util/EditionCardUtils";

// extract unique language array from instances of a work item
const getLanguagesForWork = (work: any) =>
  work &&
  work.editions &&
  uniqueAndSortByFrequency(
    flattenDeep(
      work.editions.map(
        (edition: any) =>
          edition.languages &&
          edition.languages.length &&
          edition.languages.map(
            (language: Language) => language && language.language
          )
      )
    )
  );

export const getAgentsList = (
  agents: Agent[],
  agentType: "publisher" | "author"
) => {
  const noAgentAvailable =
    agentType === "publisher" ? (
      <>Publisher Unavailable</>
    ) : (
      <>Author Unavailable</>
    );

  if (!agents || !agents.length) return noAgentAvailable;

  const getAgentText = (agent: Agent) => {
    return `${agent.name},${agent.roles.map((role: any) => ` ${role}`)}`;
  };

  // Authors should link to author search, publishers should not link to any search
  return (
    <DS.List type={DS.ListTypes.Unordered} modifiers={["no-list-styling"]}>
      {agents.map((agent: Agent, i: number) => {
        if (agentType === "publisher") {
          return <li key={`agent-${i.toString()}`}>{getAgentText(agent)}</li>;
        } else {
          return (
            <li key={`agent-${i.toString()}`}>
              <Link
                to={{
                  pathname: "/search",
                  query: EditionCardUtils.getLinkToAuthorSearch(agent),
                }}
              >
                {getAgentText(agent)}
              </Link>
            </li>
          );
        }
      })}
    </DS.List>
  );
};

const WorkDetailDefinitionList: React.FC<{ work: ApiWork }> = ({ work }) => {
  const languages = getLanguagesForWork(work);
  return (
    <div>
      <DS.Heading level={3}>Details</DS.Heading>
      <dl className="nypl-details-table">
        {work.alt_titles && work.alt_titles.length && (
          <>
            <dt>Alternative Titles</dt>
            <dd>
              <DS.List
                type={DS.ListTypes.Unordered}
                modifiers={["no-list-styling"]}
              >
                {work.alt_titles.map((title: string, i: number) => (
                  <li key={`alt-title-${i}`}>
                    <Link
                      to={{
                        pathname: "/search",
                        query: {
                          queries: `[{"query": "${title}", "field": "title"}]`,
                        },
                      }}
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </DS.List>
            </dd>
          </>
        )}
        {work.series && (
          <>
            <dt>Series</dt>

            <dd>
              {work.series}
              {work.series_position && ` ${work.series_position}`}
            </dd>
          </>
        )}
        <dt>Authors</dt>
        <dd>
          <ul className="definitions definitions-authors">
            {getAgentsList(work.agents, "author")}
          </ul>
        </dd>
        {work.subjects && work.subjects.length > 0 && (
          <>
            <dt>Subjects</dt>
            <dd>
              <DS.List
                type={DS.ListTypes.Unordered}
                modifiers={["no-list-styling"]}
              >
                {unique(work.subjects, "subject")
                  .sort((a: any, b: any) =>
                    a.subject &&
                    b.subject &&
                    a.subject.toLowerCase() < b.subject.toLowerCase()
                      ? -1
                      : 1
                  )
                  .map((subject: Subject, i: number) => (
                    <li key={`subject${i.toString()}`}>
                      <Link
                        to={{
                          pathname: "/search",
                          query: {
                            queries: `[{"query": "${subject.subject}", "field": "subject"}]`,
                          },
                        }}
                      >
                        {subject.subject}
                      </Link>
                    </li>
                  ))}
              </DS.List>
            </dd>
          </>
        )}
        {languages && languages.length > 0 && (
          <>
            <dt>Languages</dt>
            <dd>
              <ul className="definitions definitions-languages">
                {languages.map((language, i) => (
                  <li key={`language${i.toString()}`}>{language}</li>
                ))}
              </ul>
            </dd>
          </>
        )}
      </dl>
    </div>
  );
};

export default WorkDetailDefinitionList;
