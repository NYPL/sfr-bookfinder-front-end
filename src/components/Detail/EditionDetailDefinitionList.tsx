import React from "react";
import { Html5Entities } from "html-entities";
import * as DS from "@nypl/design-system-react-components";
import { editionDetailDefinitionLabels } from "../../constants/labels";
import { isEmpty } from "~/src/util/Util";

const htmlEntities = new Html5Entities();

// provide the work item as an array
const elements = Object.keys(editionDetailDefinitionLabels);

// Get List of Publishers and their Roles
const getPublishersList = (agents: any) => {
  if (!agents || !agents.length) return null;

  const publisherList = agents.map((agent: any) => {
    const authorLabel = `${agent.name}${agent.roles.map(
      (role: any) => `, ${role} `
    )}`;
    return <>{authorLabel}</>;
  });

  if (publisherList && publisherList.length) {
    return publisherList.map((authorItem: any, i: any) => (
      <li key={`publisher-${i.toString()}`}>{authorItem}</li>
    ));
  }

  return <li key="publisher-no-publisher">Publisher Unavailable</li>;
};

type OwnEditionDetailDefinitionListProps = {
  edition?: {
    [key: string]: any;
  };
};

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'EditionDetailDefinitionListProps' circ... Remove this comment to see the full error message
type EditionDetailDefinitionListProps = OwnEditionDetailDefinitionListProps &
  typeof EditionDetailDefinitionList.defaultProps;
/**
 * Build a definition list of elements from a bibliographic record provided
 * by Elastisearch.
 *
 * @param {object} props
 */
// @ts-expect-error ts-migrate(7022) FIXME: 'EditionDetailDefinitionList' implicitly has type ... Remove this comment to see the full error message
export const EditionDetailDefinitionList = ({
  edition,
}: EditionDetailDefinitionListProps) => {
  /**
   * Convert JSON object to array for parsing detail elements into
   * a definition list for display.
   *
   * @param {object} edition
   * @return {string|null}
   */
  const editionDetailsObject = (edObj: any) =>
    Object.keys(edObj).map((key) => [key, edObj[key]]);

  /**
   * Handle elements with array values as definitions. Authorities are linked to
   * /search as new general searches with URL parameters. Items are mapped to a table
   * with a row for each edition.
   *
   * Links to author and subject searches have their query terms wrapped in quotes to
   * enforce phrase searching to perform an exact match. This may change when we
   * introduce identifiers for authors (viaf) and subjects.
   *
   * @param {string} type
   * @param {array} entries
   * @return {string|null}
   */
  const parseEntries = (type: any, entries: any) => {
    const list = entries ? [...entries] : [];

    switch (type) {
      case "agents":
        return (
          <ul className="definitions-publishers">
            {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2. */}
            {getPublishersList(list, "definitionList-publisher")}
          </ul>
        );
      case "language":
        return (
          <ul className="definitions-languages">
            {list.map((language, i) => (
              <li key={`language${i.toString()}`}>{language}</li>
            ))}
          </ul>
        );

      default:
        return Array.isArray(entries)
          ? entries.map((entry) => htmlEntities.decode(entry)).join(", ")
          : htmlEntities.decode(entries);
    }
  };
  /**
   * Wrapper function to handle building the HTML from the object given.
   *
   * @param {array} data
   * @return {string}
   */
  const getDefinitions = (editionObj: any) => {
    let defsData;
    const languageList = editionObj.languages.map(
      (language: any) => language.language
    );
    if (languageList) {
      defsData = editionDetailsObject({
        ...editionObj,
        ...{ language: languageList },
      });
    } else {
      defsData = editionDetailsObject({ ...editionObj });
    }
    defsData.sort((a, b) => elements.indexOf(a[0]) - elements.indexOf(b[0]));
    if (!defsData || isEmpty(defsData)) {
      return null;
    }
    return (
      <dl className="nypl-details-table">
        {defsData.map(
          (entry, i) =>
            elements.includes(entry[0]) &&
            entry[1] && (
              <React.Fragment key={`"entry"${i.toString()}`}>
                {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
                <dt>{editionDetailDefinitionLabels[entry[0]]}</dt>

                <dd>{parseEntries(entry[0], entry[1])}</dd>
              </React.Fragment>
            )
        )}
      </dl>
    );
  };

  
  return (
    <div>
      <DS.Heading level={3} id="work-details">
        Details
      </DS.Heading>
      {getDefinitions(edition)}
    </div>
  );
};

EditionDetailDefinitionList.defaultProps = {
  edition: {},
};

export default EditionDetailDefinitionList;
