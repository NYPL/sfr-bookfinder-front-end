import React from 'react';
import PropTypes from 'prop-types';
import { Html5Entities } from 'html-entities';
import { Link } from 'react-router';
import { isEmpty as _isEmpty } from 'underscore';
import EBookList from '../List/EBookList';

const htmlEntities = new Html5Entities();
const elements = ['title', 'agents', 'instances', 'subjects', 'language'];
const sorting = ['title', 'language', 'agents', 'subjects', 'instances'];
export const labels = {
  title: 'Title',
  agents: 'Author, Creator, et al',
  instances: 'Items',
  language: 'Language',
  subjects: 'Subjects',
};

/**
 * Build a definition list of elements from a bibliographic record provided
 * by Elastisearch.
 *
 * @param {object} props
 */
export const DefinitionList = ({ eReaderUrl, data }) => {
  data.sort((a, b) => sorting.indexOf(a[0]) - sorting.indexOf(b[0]));
  const getIdentifier = author => (author.viaf && 'viaf') || (author.lcnaf && 'lcnaf') || 'name';
  const linkToAuthor = author => ({
    q: author[getIdentifier(author)],
    field: getIdentifier(author),
    showQuery: `"${author.name}"`,
    showField: 'author',
  });
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
    let list = [...entries];
    if (type === 'instances') {
      list = list.map((item) => {
        let publisher =
          item && item.agents && item.agents.find(i => i.roles.indexOf('publisher') > -1);
        publisher = publisher && publisher.name;
        return Object.assign({}, item, { publisher });
      });
    }
    switch (type) {
      case 'language':
        return (
          <ul>
            {list.map((entity, i) => (
              <li key={i.toString()}>{entity.language}</li>
            ))}
          </ul>
        );
      case 'agents':
        return (
          <ul>
            {list.map((entity, i) => (
              <li key={i.toString()}>
                <Link to={{ pathname: '/search', query: linkToAuthor(entity) }}>
                  {htmlEntities.decode(entity.name)}, {entity.roles.join(', ')}
                </Link>
                {(entity.birth_date_display || entity.death_date_display) && <span> (</span>}
                {entity.birth_date_display && <span>{entity.birth_date_display}</span>}
                {entity.death_date_display && <span> -- {entity.death_date_display}</span>}
                {(entity.birth_date_display || entity.death_date_display) && <span>) </span>}
                {entity.viaf && (
                  <a
                    target="_blank"
                    href={`https://viaf.org/viaf/${entity.viaf}`}
                    rel="noopener noreferrer"
                  >
                    (viaf)
                  </a>
                )}
                {entity.lcnaf && (
                  <a
                    target="_blank"
                    href={`http://id.loc.gov/authorities/names/${entity.lcnaf}.html`}
                    rel="noopener noreferrer"
                  >
                    (lcnaf)
                  </a>
                )}
              </li>
            ))}
          </ul>
        );

      case 'subjects':
        return (
          <ul>
            {list.map((subject, i) => (
              <li key={i.toString()}>
                <Link
                  to={{
                    pathname: '/search',
                    query: { q: `"${subject.subject}"`, field: 'subject' },
                  }}
                >
                  {Html5Entities.decode(subject.subject)}
                </Link>
              </li>
            ))}
          </ul>
        );

      case 'instances':
        return (
          <table className="nypl-basic-table">
            <thead>
              <tr>
                <th>eBooks</th>
                <th>Date of Publication</th>
                <th>Place of Publication</th>
                <th>Publisher</th>
              </tr>
            </thead>
            <tbody>
              {list.map((instance, i) => {
                const isValid =
                  (instance.items && instance.items.length > 0) ||
                  (instance.pub_date && instance.pub_date_display) ||
                  instance.pub_place ||
                  instance.publisher;
                if (!isValid) {
                  return null;
                }
                return (
                  <tr key={i.toString()}>
                    <td>
                      {instance.items ? (
                        <EBookList ebooks={instance.items} eReaderUrl={eReaderUrl} />
                      ) : (
                        ''
                      )}
                    </td>
                    <td>{instance.pub_date ? instance.pub_date_display : ''} </td>
                    <td>{instance.pub_place ? `${instance.pub_place}` : ''}</td>
                    <td>{instance.publisher}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );

      default:
        return null;
    }
  };

  /**
   * Wrapper function to handle building the HTML from the object given.
   *
   * @param {array} data
   * @return {string}
   */
  const getDefinitions = (defsData) => {
    if (!defsData || _isEmpty(defsData)) {
      return null;
    }

    const detailsObject = defsData.map(entry => ({
      term: entry[0],
      definition: Array.isArray(entry[1]) ? parseEntries(entry[0], entry[1]) : entry[1],
    }));

    return detailsObject.map(item =>
      (elements.includes(item.term)
        ? [<dt>{labels[item.term]}</dt>, <dd>{item.definition}</dd>]
        : null));
  };

  return <dl>{getDefinitions(data)}</dl>;
};

DefinitionList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  eReaderUrl: PropTypes.string,
};

DefinitionList.defaultProps = {
  data: [],
  eReaderUrl: '',
};

export default DefinitionList;
