import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import EBookList from './EBookList';

const EditionsList = ({
  work, eReaderUrl, referrer, max,
}) => {
  console.log('got to editionsList', work);
  const list = work.instances;
  if (!list || list.length === 0) {
    return null;
  }

  const getPublisher = (instance) => {
    let publisher = instance && instance.agents && instance.agents.find(agent => agent.roles.indexOf('publisher') > -1);
    publisher = publisher ? publisher.name : null;
    return publisher;
  };
  const getIsValid = instance => (instance.items && instance.items.length > 0)
    || (instance.pub_date && instance.pub_date_display)
    || instance.pub_place
    || getPublisher(instance);

  const filterValid = instances => instances.filter(instance => getIsValid(instance));
  const editionCount = work.edition_count || filterValid(list).length;

  const rights = instance => instance.rights
    && instance.rights.length > 0 //
    && instance.rights.map(right => right.rights_statement).join(', ');

  const languages = instance => instance.languages
    && instance.languages.length > 0 //
    && instance.languages.map(lang => lang.language).join(', ');
  return (
    <div>
      <table className="usa-table usa-table--borderless nypl-editions-table">
        <thead>
          <tr>
            <th scope="col">Publisher</th>
            <th scope="col">Place of Publication</th>
            <th scope="col">Year of Publication</th>
            <th scope="col">eBooks</th>
            <th scope="col">Language</th>
            <th scope="col">Rights</th>
          </tr>
        </thead>
        <tbody>
          {filterValid(list).map((instance, i) => {
            const publisher = getPublisher(instance);

            if (max && i >= max) {
              return null;
            }

            return (
              <tr key={i.toString()}>
                <td>{publisher}</td>
                <td>{instance.pub_place ? `${instance.pub_place}` : ''}</td>
                <td>{instance.pub_date ? `${instance.pub_date_display}` : ''}</td>
                <td className="nypl-editions-table-downloads">
                  {instance.items ? (
                    <EBookList
                      referrer={referrer}
                      ebooks={instance.items}
                      eReaderUrl={eReaderUrl}
                    />
                  ) : ''}
                </td>
                <td className="chunked">
                  <span title={languages(instance)}>{languages(instance)}</span>
                </td>
                <td className="chunked">
                  <span title={rights(instance)}>{rights(instance)}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {!!max && editionCount > max && (
        <div className="nypl-editions-view-all">
          <Link to={{ pathname: '/work', query: { workId: `${work.uuid}` }, hash: '#all-editions' }}>
            View All&nbsp;
            {editionCount}
            &nbsp;Editions
            {work.edition_range && (
              <span className="edition-range">
                &nbsp;From&nbsp;
                {work.edition_range}
              </span>
            )}
          </Link>
        </div>
      )}
    </div>
  );
};

EditionsList.propTypes = {
  work: PropTypes.objectOf(PropTypes.any),
  eReaderUrl: PropTypes.string,
  referrer: PropTypes.string,
  max: PropTypes.number,
};

EditionsList.defaultProps = {
  work: { instances: [] },
  eReaderUrl: '',
  referrer: '',
  max: 0,
};

export default EditionsList;
