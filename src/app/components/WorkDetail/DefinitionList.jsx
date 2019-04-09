import React from 'react';
import PropTypes from 'prop-types';
import { Html5Entities } from 'html-entities';
import { Link } from 'react-router';
import { isEmpty as _isEmpty, isArray as _isArray } from 'underscore';
import AuthorsList from '../List/AuthorsList';

const htmlEntities = new Html5Entities();

export const labels = {
  // also provides sort
  summary: 'Summary',
  series: 'Series',
  agents: 'Author',
  subjects: 'Subject',
  date_created: 'Desta Created',
  issued_display: 'Date Issued',
  language: 'Language',
  rights: 'Rights',
  measurements: 'Measurements',
  identifiers: 'Identifiers',
};
const elements = Object.keys(labels);

/**
 * Build a definition list of elements from a bibliographic record provided
 * by Elastisearch.
 *
 * @param {object} props
 */
export const DefinitionList = ({ work }) => {
  /**
   * Convert JSON object to array for parsing detail elements into
   * a definition list for display.
   *
   * @param {object} work
   * @return {string|null}
   */
  const workDetailsObject = workObj => Object.entries(workObj);

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
    const list = [...entries];
    switch (type) {
      case 'language':
        return (
          <ul>
            {list.map((entity, i) => (
              <li key={`language${i.toString()}`}>{entity.language}</li>
            ))}
          </ul>
        );
      case 'agents':
        return <AuthorsList agents={list} />;

      case 'subjects':
        return (
          <ul>
            {list.map((subject, i) => (
              <li key={`subject${i.toString()}`}>
                <Link
                  to={{
                    pathname: '/search',
                    query: { q: `"${subject.subject}"`, field: 'subject' },
                  }}
                >
                  {htmlEntities.decode(subject.subject)}
                </Link>
              </li>
            ))}
          </ul>
        );
      case 'identifiers':
        return (
          <ul className="inline-list">
            {list.map((identifier, i) => (
              <li key={`identifiers${i.toString()}`}>{`${identifier.id_type}:${identifier.identifier}: `}</li>
            ))}
          </ul>
        );
      case 'measurements':
        return (
          <ul className="inline-list">
            {list.map((measurement, i) => (
              <li key={`measurements${i.toString()}`}>{`${measurement.quantity}:${measurement.value}; `}</li>
            ))}
          </ul>
        );
      case 'series':
        return (
          <span>
            {entries}
            {workObj.series_position && ` ${workObj.series_position}`}
          </span>
        );
      default:
        return _isArray(entries) ? entries.join(' ,') : entries;
    }
  };

  /**
   * Wrapper function to handle building the HTML from the object given.
   *
   * @param {array} data
   * @return {string}
   */
  const getDefinitions = (workObj) => {
    const defsData = workDetailsObject(workObj);
    defsData.sort((a, b) => elements.indexOf(a[0]) - elements.indexOf(b[0]));
    if (!defsData || _isEmpty(defsData)) {
      return null;
    }

    return (
      <table className="nypl-details-table">
        <tbody>
          {defsData.map(
            (entry, i) => elements.includes(entry[0]) && (
            <tr key={`entry${i.toString()}`}>
              <td>{labels[entry[0]]}</td>
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
      <h3 className="bold">Details</h3>
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
