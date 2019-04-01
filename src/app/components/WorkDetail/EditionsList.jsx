import React from 'react';
import PropTypes from 'prop-types';
import EBookList from '../List/EBookList';

const EditionsList = ({ list, eReaderUrl, alone }) => (
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
        {list.map((instance, i) => {
          let publisher =
            instance &&
            instance.agents &&
            instance.agents.find(agent => agent.roles.indexOf('publisher') > -1);
          publisher = publisher ? publisher.name : '';

          const isValid =
            (instance.items && instance.items.length > 0) ||
            (instance.pub_date && instance.pub_date_display) ||
            instance.pub_place ||
            instance.publisher;
          if (!isValid) {
            return null;
          }
          if (alone && i > 0) {
            return null;
          }
          return (
            <tr key={i.toString()}>
              <td>{publisher}</td>
              <td>{instance.pub_place ? `${instance.pub_place}` : ''}</td>
              <td>{instance.pub_date ? instance.pub_date_display : ''} </td>
              <td>
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
    {alone && <div>View All {list.length} Editions</div>}
  </div>
);

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
