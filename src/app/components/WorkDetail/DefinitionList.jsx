import React from 'react';
import PropTypes from 'prop-types';
import { Html5Entities } from 'html-entities';
import * as DS from '@nypl/design-system-react-components';
import { Link } from 'react-router';
import { detailDefinitionLabels } from '../../constants/labels';
import {
  unique, flattenDeep, isEmpty, uniqueAndSortByFrequency,
} from '../../util/Util';
import EditionCard from '../Card/EditionCard';

const htmlEntities = new Html5Entities();

// provide the work item as an array
const elements = Object.keys(detailDefinitionLabels);

// extract unique language array from instances of a work item
const addLanguagestoWorkItem = work => work
  && work.editions
  && uniqueAndSortByFrequency(
    flattenDeep(
      work.editions.map(
        edition => edition.languages && edition.languages.length && edition.languages.map(language => language.language),
      ),
    ),
  );

// Get List of Authors and their Roles
const getAuthorsList = (agents) => {
  if (!agents || !agents.length) return null;

  const authorsList = agents.map((agent) => {
    const authorLabel = `${agent.name}${agent.roles.map(role => `, ${role} `)}`;
    return (
      <Link
        to={{ pathname: '/search', query: EditionCard.getLinkToAuthorSearch(agent) }}
        className="link"
      >
        {authorLabel}
      </Link>
    );
  });

  if (authorsList && authorsList.length) {
    return authorsList.map((authorItem, i) => (
      <li key={`author-${i.toString()}`}>{authorItem}</li>
    ));
  }
  return <li key="author-no-author">Author Unavailable</li>;
};
/**
 * Build a definition list of elements from a bibliographic record provided
 * by Elastisearch.
 *
 * @param {object} props
 */
export const DefinitionList = ({ work }) => {
  console.log("work", work);
  /**
   * Convert JSON object to array for parsing detail elements into
   * a definition list for display.
   *
   * @param {object} work
   * @return {string|null}
   */
  const workDetailsObject = workObj => Object.keys(workObj).map(key => [key, workObj[key]]);

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
  const parseEntries = (type, entries, workObj) => {
    const list = entries ? [...entries] : [];
    switch (type) {
      case 'language':
        return (
          <ul className="definitions-languages">
            {list.map((language, i) => <li key={`language${i.toString()}`}>{language}</li>)}
          </ul>
        );
      case 'agents':
        return (
          <ul className="definitions-authors">
            {getAuthorsList(list, 'definitionList-author')}
          </ul>
        );

      case 'subjects':
        return (
          <ul className="definitions-subjects">
            {unique(list, 'subject')
              .sort((a, b) => (a.subject && b.subject && a.subject.toLowerCase() < b.subject.toLowerCase() ? -1 : 1))
              .map((subject, i) => (
                <li key={`subject${i.toString()}`}>
                  <DS.UnderlineLink>
                    <Link
                      to={{
                        pathname: '/search',
                        query: { queries: `[{"query": "${subject.subject}", "field": "subject"}]` },
                      }}
                    >
                      {htmlEntities.decode(subject.subject)}
                    </Link>
                  </DS.UnderlineLink>
                </li>
              ))}
          </ul>
        );
      case 'identifiers':
        return (
          <ul className="sfr-inline-list definitions-identifiers">
            {list
              .sort((a, b) => (a.id_type < b.id_type ? -1 : 1))
              .map((identifier, i) => (
                <li key={`identifiers${i.toString()}`}>{`${identifier.id_type}: ${identifier.identifier}; `}</li>
              ))}
          </ul>
        );
      case 'measurements':
        return (
          <ul className="sfr-inline-list definitions-measurements">
            {list
              .sort((a, b) => (a.value < b.value ? 1 : -1))
              .map((measurement, i) => (
                <li key={`measurements${i.toString()}`}>{`${measurement.quantity}: ${measurement.value}; `}</li>
              ))}
          </ul>
        );
      case 'series':
        return (
          <span className="definitions-series">
            {entries}
            {workObj.series_position && ` ${workObj.series_position}`}
          </span>
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
  const getDefinitions = (workObj) => {
    let defsData;
    const languageList = addLanguagestoWorkItem(workObj);
    if (languageList) {
      defsData = workDetailsObject({ ...workObj, ...{ language: languageList } });
    } else {
      defsData = workDetailsObject({ ...workObj });
    }
    defsData.sort((a, b) => elements.indexOf(a[0]) - elements.indexOf(b[0]));
    if (!defsData || isEmpty(defsData)) {
      return null;
    }
    console.log("defsData", defsData);

    return (
      <table className="nypl-details-table">
        <tbody>
          {defsData.map(
            (entry, i) => elements.includes(entry[0]) && entry[1] && (
              <tr key={`entry${i.toString()}`}>
                <th scope="row">{detailDefinitionLabels[entry[0]]}</th>
                <td>{parseEntries(entry[0], entry[1], workObj)}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h3 className="work-details-tag bold">
        <a id="work-details">Details</a>
      </h3>
      {getDefinitions(work)}
    </div>
  );
};

DefinitionList.propTypes = {
  work: PropTypes.objectOf(PropTypes.any),
};

DefinitionList.defaultProps = {
  work: {},
};

export default DefinitionList;
