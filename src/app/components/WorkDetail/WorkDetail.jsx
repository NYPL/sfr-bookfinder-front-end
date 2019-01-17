import React from 'react';
import { Link } from 'react-router';
import {
  isEmpty as _isEmpty,
} from 'underscore';
import appConfig from '../../../../appConfig';

const WorkDetail = (props) => {
  if (!props.detail) {
    return null;
  }

  const { item } = props.detail;
  const ebookUrl = appConfig.ereader[process.env.APP_ENV];

  const parseEntities = (entities) => {
    return (
      <ul>
        {entities.map((entity, i) => (
          <li key={i.toString()}>
            <Link to={{ pathname: '/', query: { author: `${entity.name}` } }}>{entity.name}, {entity.role}</Link>
          </li>
        ))}
      </ul>
    );
  };

  const parseSubjects = (subjects) => {
    return (
      <ul>
        {subjects.map((subject, i) => (
          <li key={i.toString()}>
            <Link to={{ pathname: '/', query: { subject: `${subject.subject}` } }}>{subject.subject}</Link>
          </li>
        ))}
      </ul>
    );
  };

  const parseEbooks = (ebooks) => {
    return (
      <div className="ebook-links">
        {ebooks.map((ebook, i) => (
          <span key={i.toString()}>
            <Link to={{ pathname: `${ebookUrl}`, query: { url: `${ebook.url}` } }}>{ebook.epub_path.split('/').pop()}</Link><br />
          </span>
        ))}
      </div>
    );
  };

  const parseInstances = (instances) => {
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
          {instances.map((instance, i) => (
            <tr key={i.toString()}>
              <td>{(instances.items) ? parseEbooks(instance.items) : ''}</td>
              <td>{instance.pub_date}</td>
              <td>{(instance.pub_place) ? `Place of publication: ${instance.pub_place}` : ''}</td>
              <td>{instance.publisher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="nypl-row">
      <div className="nypl-column-full">
        <h2>Work Detail</h2>
        <div id="nypl-item-details">
          <dl>
            <dt>Title</dt>
            <dd>
              {item.title}
            </dd>
            <dt>Authors, Creators, et al</dt>
            <dd>
              {parseEntities(item.entities)}
            </dd>
            <dt>Subjects</dt>
            <dd className="subject-listing">
              {parseSubjects(item.subjects)}
            </dd>
            <dt className="list-multi-control">Items</dt>
            <dd className="multi-item-list">
              {parseInstances(item.instances)}
            </dd>
            <dt>Rights Statement</dt>
            <dd>
              {item.rights_stmt}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;
