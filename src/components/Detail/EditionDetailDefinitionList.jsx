import React from 'react';
import PropTypes from 'prop-types';
import { Html5Entities } from 'html-entities';
import * as DS from '@nypl/design-system-react-components';
import { editionDetailDefinitionLabels } from '../../constants/labels';
import { isEmpty } from '~/src/util/Util';

const htmlEntities = new Html5Entities();

// provide the work item as an array
const elements = Object.keys(editionDetailDefinitionLabels);

// Get List of Publishers and their Roles
const getPublishersList = (agents) => {
  if (!agents || !agents.length) return null;

  const publisherList = agents.map((agent) => {
    const authorLabel = `${agent.name}${agent.roles.map(role => `, ${role} `)}`;
    return (
      <>{authorLabel}</>
    );
  });

  if (publisherList && publisherList.length) {
    return publisherList.map((authorItem, i) => (
      <li key={`publisher-${i.toString()}`}>{authorItem}</li>
    ));
  }
  return <li key="publisher-no-publisher">Publisher Unavailable</li>;
};
/**
 * Build a definition list of elements from a bibliographic record provided
 * by Elastisearch.
 *
 * @param {object} props
 */
export const EditionDetailDefinitionList = ({ edition }) => {
  /**
   * Convert JSON object to array for parsing detail elements into
   * a definition list for display.
   *
   * @param {object} edition
   * @return {string|null}
   */
  const editionDetailsObject = edObj => Object.keys(edObj).map(key => [key, edObj[key]]);

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
  const parseEntries = (type, entries) => {
    const list = entries ? [...entries] : [];

    switch (type) {
      case 'agents':
        return (
          <ul className="definitions-publishers">
            {getPublishersList(list, 'definitionList-publisher')}
          </ul>
        );
      case 'language':
        return (
          <ul className="definitions-languages">
            {list.map((language, i) => <li key={`language${i.toString()}`}>{language}</li>)}
          </ul>
        );

      default:
        return Array.isArray(entries) ? entries.map(entry => htmlEntities.decode(entry)).join(', ') : htmlEntities.decode(entries);
    }
  };
  /**
     * Wrapper function to handle building the HTML from the object given.
     *
     * @param {array} data
     * @return {string}
     */
  const getDefinitions = (editionObj) => {
    let defsData;
    const languageList = editionObj.languages.map(language => language.language);
    if (languageList) {
      defsData = editionDetailsObject({ ...editionObj, ...{ language: languageList } });
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
          (entry, i) => elements.includes(entry[0]) && entry[1] && (
            <React.Fragment key={`"entry"${i.toString()}`}>
              <dt>{editionDetailDefinitionLabels[entry[0]]}</dt>
              <dd>{parseEntries(entry[0], entry[1])}</dd>
            </React.Fragment>
          ),
        )}
      </dl>
    );
  };

  return (
    <div>
      <DS.Heading
        level={3}
        id="work-details"
      >
        Details
      </DS.Heading>
      {getDefinitions(edition)}
    </div>
  );
};

EditionDetailDefinitionList.propTypes = {
  edition: PropTypes.objectOf(PropTypes.any),
};

EditionDetailDefinitionList.defaultProps = {
  edition: {},
};

export default EditionDetailDefinitionList;
