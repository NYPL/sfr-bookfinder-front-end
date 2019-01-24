import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import appConfig from '../../../../appConfig';

const ebookUrl = appConfig.ereader[process.env.APP_ENV];
const elements = ['title', 'entities', 'instances', 'rights_stmt', 'language', 'subjects'];

const DefinitionList = (data) => {
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
                  <td>{(instance.items) ? parseEbooks(instance.items) : ''}</td>
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

  const parseEbooks = (ebooks) => {
    const pathArray = ebook.url.split('/');
    const linkRef = (ebook.url )
    return (
      <ul className="nypl-items-list">
        {ebooks.map((ebook, i) => (
            <li key={i.toString()}>
            <a href={`${ebookUrl}?url=${ebook.url}`}>Read Online</a> [{ebook.epub_path.split('/').pop()}]<br />
          </li>
        ))}
      </ul>
    );
  };

  const getDefinitions = (details) => {
    console.log(details.data);
    const detailsObject = details.data.map(entry => (
      {
        term: entry[0],
        definition: (Array.isArray(entry[1])) ? parseEntries(entry[0], entry[1]) : entry[1],
      }
    ));

    return detailsObject.map((item) => {
      if (elements.includes(item.term)) {
        return ([
          (<dt>{item.term}</dt>),
          (<dd>{item.definition}</dd>),
        ]);
      }
    });
  };

  return (<dl>{getDefinitions(data)}</dl>);
};

DefinitionList.propTypes = {
  data: PropTypes.array,
};

export default DefinitionList;
