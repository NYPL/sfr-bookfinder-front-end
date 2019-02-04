import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { isEmpty as _isEmpty } from 'underscore';
import EBookList from '../List/EBookList';

const elements = ['title', 'entities', 'instances', 'subjects', 'rights_stmt', 'language'];
export const labels = {
  title: 'Title',
  entities: 'Author, Creator, et al',
  instances: 'Items',
  rights_stmt: 'Rights Statement',
  language: 'Language',
  subjects: 'Subjects',
};

/**
 * Build a definition list of elements from a bibliographic record provided
 * by Elastisearch.
 * @param {object} props
 */
export const DefinitionList = (props) => {

  /**
   * Handle elements with array values as definitions. Authorities are linked to
   * /search as new general searches with URL parameters. Items are mapped to a table
   * with a row for each edition.
   * @param {string} type
   * @param {array} entries
   */
  const parseEntries = (type, entries) => {
    switch (type) {
      case 'entities':
        return (
          <ul>
            {entries.map((entity, i) => (
              <li key={i.toString()}>
                <Link to={{ pathname: '/search', query: { q: `${entity.name}`, field: 'author' } }}>{entity.name}, {entity.role}</Link>
              </li>
            ))}
          </ul>
        );

      case 'subjects':
        return (
          <ul>
            {entries.map((subject, i) => (
              <li key={i.toString()}>
                <Link to={{ pathname: '/search', query: { q: `${subject.subject}`, field: 'subject' } }}>{subject.subject}</Link>
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
              {entries.map((instance, i) => (
                <tr key={i.toString()}>
                  <td>{(instance.items) ? <EBookList ebooks={instance.items} eReaderUrl={props.eReaderUrl} /> : ''}</td>
                  <td>{instance.pub_date}</td>
                  <td>{(instance.pub_place) ? `Place of publication: ${instance.pub_place}` : ''}</td>
                  <td>{instance.publisher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      default:
        return null;
    }
  };

  /**
   * Wrapper function to handle building the HTML from the object given.
   * @param {array} data
   */
  const getDefinitions = (data) => {
    if (!data || _isEmpty(data)) {
      return null;
    }

    const detailsObject = data.map(entry => (
      {
        term: entry[0],
        definition: (Array.isArray(entry[1])) ? parseEntries(entry[0], entry[1]) : entry[1],
      }
    ));

    return detailsObject.map((item) => {
      if (elements.includes(item.term)) {
        return ([
          (<dt>{labels[item.term]}</dt>),
          (<dd>{item.definition}</dd>),
        ]);
      }
    });
  };

  return (<dl>{getDefinitions(props.data)}</dl>);
};

DefinitionList.propTypes = {
  data: PropTypes.array,
  eReaderUrl: PropTypes.string,
};

export default DefinitionList;
