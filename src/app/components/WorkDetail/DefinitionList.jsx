import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { isEmpty as _isEmpty } from 'underscore';
import EBookList from '../List/EBookList';
import { searchPost, userQuery, selectedField } from '../../actions/SearchActions';

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
export const DefinitionList = ({
  dispatch, eReaderUrl, data, context,
}) => {
  data.sort((a, b) => sorting.indexOf(a[0]) - sorting.indexOf(b[0]));
  /**
   * onClick handler for browse searches.
   *
   * @param {object} event
   * @param {string} query
   * @param {string} field
   */
  const newSearchRequest = (event, query, field) => {
    event.preventDefault();

    dispatch(userQuery(query));
    dispatch(selectedField(field));
    dispatch(searchPost(query, field))
      .then(() => {
        context.router.push(`/search?q=${query}&field=${field}`);
      });
  };

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
        let publisher = item && item.agents && item.agents.find(i => i.roles.indexOf('publisher') > -1);
        publisher = publisher && publisher.name;
        return Object.assign({}, item, { publisher });
      });
    }
    switch (type) {
      case 'language':
        return (
          <ul>
            {list.map((entity, i) => (
              <li key={i.toString()}>
                {entity.language}
              </li>
            ))}
          </ul>
        );
      case 'agents':
        return (
          <ul>
            {list.map((entity, i) => (
              <li key={i.toString()}>
                <Link
                  onClick={event => newSearchRequest(event, `\"${entity.name}\"`, 'author')}
                  to={{ pathname: '/search', query: { q: `\"${entity.name}\"`, field: 'author' } }}
                >{entity.name}, {entity.roles.join(', ')}
                </Link>
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
                  onClick={event => newSearchRequest(event, `\"${subject.subject}\"`, 'subject')}
                  to={{ pathname: '/search', query: { q: `\"${subject.subject}\"`, field: 'subject' } }}
                >{subject.subject}
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
                const isValid = (instance.items && instance.items.length > 0) ||
                (instance.pub_date && instance.pub_date_display) || instance.pub_place
                || instance.publisher;
                if (!isValid) {
                  return null;
                }
                return (
                  <tr key={i.toString()}>
                    <td>{(instance.items) ?
                      <EBookList
                        ebooks={instance.items}
                        eReaderUrl={eReaderUrl}
                      /> : ''}
                    </td>
                    <td>{instance.pub_date ? instance.pub_date_display : ''} </td>
                    <td>{(instance.pub_place) ? `${instance.pub_place}` : ''}</td>
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

    const detailsObject = defsData.map(entry => (
      {
        term: entry[0],
        definition: (Array.isArray(entry[1])) ? parseEntries(entry[0], entry[1]) : entry[1],
      }
    ));

    return detailsObject.map(item =>
      ((elements.includes(item.term)) ? ([
        (<dt>{labels[item.term]}</dt>),
        (<dd>{item.definition}</dd>),
      ]) : null));
  };

  return (<dl>{getDefinitions(data)}</dl>);
};

DefinitionList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  eReaderUrl: PropTypes.string,
  dispatch: PropTypes.func,
  context: PropTypes.objectOf(PropTypes.any),
};

DefinitionList.defaultProps = {
  data: [],
  eReaderUrl: '',
  dispatch: () => {},
  context: {},
};

export default DefinitionList;
