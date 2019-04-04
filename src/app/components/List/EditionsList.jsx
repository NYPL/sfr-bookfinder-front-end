import React from 'react';
import PropTypes from 'prop-types';
import EBookList from './EBookList';

const EditionsList = ({ list, eReaderUrl, alone }) => {
  const getPublisher = (instance) => {
    let publisher =
      instance &&
      instance.agents &&
      instance.agents.find(agent => agent.roles.indexOf('publisher') > -1);
    publisher = publisher ? publisher.name : null;
    return publisher;
  };
  const getIsValid = instance =>
    (instance.items && instance.items.length > 0) ||
    (instance.pub_date && instance.pub_date_display) ||
    instance.pub_place ||
    getPublisher(instance);

  const filterValid = instances => instances.filter(l => getIsValid(l));

  return (
    <div>
      <table className="nypl-editions-table">
        <thead>
          <tr>
            <th>Publisher</th>
            <th>Place of Publication</th>
            <th>Year of Publication</th>
            <th>eBooks</th>
            <th>Language</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {filterValid(list).map((instance, i) => {
            const publisher = getPublisher(instance);

            if (alone && i > 0) {
              return null;
            }

            return (
              <tr key={i.toString()}>
                <td>{publisher}</td>
                <td>{instance.pub_place ? `${instance.pub_place}` : ''}</td>
                <td>{instance.pub_date ? instance.pub_date_display : ''} </td>
                <td className="nypl-editions-table-downloads">
                  {instance.items ? (
                    <EBookList ebooks={instance.items} eReaderUrl={eReaderUrl} />
                  ) : (
                    ''
                  )}
                </td>
                <td>
                  {instance.language &&
                    instance.language.length > 0 &&
                    instance.language.map(lang => lang.language).join(' ,')}
                </td>
                <td>View Detail</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {alone && filterValid(list).length > 1 && (
        <div className="nypl-editions-view-all">View All {filterValid(list).length} Editions</div>
      )}
    </div>
  );
};

EditionsList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any),
  eReaderUrl: PropTypes.string,
  alone: PropTypes.bool,
};
EditionsList.defaultProps = {
  list: [],
  eReaderUrl: '',
  alone: true,
};

export default EditionsList;
