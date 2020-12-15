import React from 'react';
import PropTypes from 'prop-types';
import { Html5Entities } from 'html-entities';
import * as DS from '@nypl/design-system-react-components';
import Link from '~/src/components/Link/Link';
import { workDetailDefinitionLabels } from '~/src/constants/labels';
import {
  unique, flattenDeep, isEmpty, uniqueAndSortByFrequency,
} from '~/src/util/Util';
import EditionCard from '~/src/components/Card/EditionCard';

const htmlEntities = new Html5Entities();

// provide the work item as an array
const elements = Object.keys(workDetailDefinitionLabels);

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
        key={agent.name}
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
export const WorkDetailDefinitionList = ({ work }) => {
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
          <ul className="definitions definitions-languages">
            {list.map((language, i) => <li key={`language${i.toString()}`}>{language}</li>)}
          </ul>
        );
      case 'agents':
        return (
          <ul className="definitions definitions-authors">
            {getAuthorsList(list, 'definitionList-author')}
          </ul>
        );

      case 'subjects':
        return (
          <ul className="definitions definitions-subjects">
            {unique(list, 'subject')
              .sort((a, b) => (a.subject && b.subject && a.subject.toLowerCase() < b.subject.toLowerCase() ? -1 : 1))
              .map((subject, i) => (
                <li key={`subject${i.toString()}`}>
                  <DS.Link>
                    <Link
                      to={{
                        pathname: '/search',
                        query: { queries: `[{"query": "${subject.subject}", "field": "subject"}]`, showQueries: `[{"query": "${subject.subject}", "field": "subject"}]` },
                      }}
                    >
                      {htmlEntities.decode(subject.subject)}
                    </Link>
                  </DS.Link>
                </li>
              ))}
          </ul>
        );
      case 'series':
        return (
          <div className="definitions definitions-series">
            {entries}
            {workObj.series_position && ` ${workObj.series_position}`}
          </div>
        );
      default:
        return (
          <div className="definitiions">
            {Array.isArray(entries) ? entries.map(entry => htmlEntities.decode(entry)).join(', ') : htmlEntities.decode(entries)}
          </div>
        );
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

    return (
      <dl className="nypl-details-table">
        {defsData.map(
          (entry, i) => elements.includes(entry[0]) && entry[1] && (
          <React.Fragment key={`"entry"${i.toString()}`}>
            <dt>{workDetailDefinitionLabels[entry[0]]}</dt>
            <dd>{parseEntries(entry[0], entry[1], workObj)}</dd>
          </React.Fragment>
          ),
        )}
      </dl>
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

WorkDetailDefinitionList.propTypes = {
  work: PropTypes.objectOf(PropTypes.any),
};

WorkDetailDefinitionList.defaultProps = {
  work: {},
};

export default WorkDetailDefinitionList;