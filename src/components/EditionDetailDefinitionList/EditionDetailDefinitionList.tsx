import React from "react";
import * as DS from "@nypl/design-system-react-components";
import { ApiEdition } from "~/src/types/EditionQuery";
import { Agent } from "~/src/types/DataModel";

// Publisher
const getPublishersList = (publishers: Agent[]): JSX.Element[] => {
  if (!publishers || publishers.length === 0) return null;
  return publishers.map((publisher: Agent) => {
    return (
      <DS.List
        type={DS.ListTypes.Unordered}
        modifiers={["no-list-styling"]}
        key={publisher.name}
      >
        <li>{publisher.name}</li>
      </DS.List>
    );
  });
};

export const EditionDetailDefinitionList: React.FC<{ edition: ApiEdition }> = ({
  edition,
}) => {
  return (
    <div>
      <DS.Heading level={3} id="work-details">
        Details
      </DS.Heading>
      <dl className="nypl-details-table">
        <dt>Publication Date</dt>
        <dd>
          {edition.publication_date ? edition.publication_date : "Unknown Date"}
        </dd>

        <dt>Publication Place</dt>
        <dd>
          {edition.publication_place
            ? edition.publication_place
            : "Unknown Place"}
        </dd>
        <dt>Publisher(s)</dt>
        <dd>{getPublishersList(edition.publishers)}</dd>

        {edition.edition_statement && (
          <>
            <dt>Edition Statement</dt>
            <dd>{edition.edition_statement}</dd>
          </>
        )}
        {edition.languages && edition.languages.length > 0 && (
          <>
            <dt>Languages</dt>
            <dd>
              <DS.List
                type={DS.ListTypes.Unordered}
                modifiers={["no-list-styling"]}
              >
                {edition.languages.map((lang) => {
                  return (
                    <li key={`language-${lang.language}`}>{lang.language}</li>
                  );
                })}
              </DS.List>
            </dd>
          </>
        )}
        {edition.table_of_contents && (
          <>
            <dt>Table of Contents</dt>
            <dd>{edition.table_of_contents}</dd>
          </>
        )}
        {edition.extent && (
          <>
            <dt>Extent</dt>
            <dd>{edition.extent}</dd>
          </>
        )}
        {edition.volume && (
          <>
            <dt>Volume</dt>
            <dd>{edition.volume}</dd>
          </>
        )}
        {edition.summary && (
          <>
            <dt>Summary</dt>
            <dd>{edition.summary}</dd>
          </>
        )}
      </dl>
    </div>
  );
};

export default EditionDetailDefinitionList;
