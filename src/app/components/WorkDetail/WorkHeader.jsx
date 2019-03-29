import React from 'react';
import PropTypes from 'prop-types';
import { Html5Entities } from 'html-entities';
import { Link } from 'react-router';

const htmlEntities = new Html5Entities();

const WorkHeader = ({ data }) => {
  const getIdentifier = author => (author.viaf && 'viaf') || (author.lcnaf && 'lcnaf') || 'name';

  const linkToAuthor = author => ({
    q: author[getIdentifier(author)],
    field: getIdentifier(author),
    showQuery: `"${author.name}"`,
    showField: 'author',
  });

  const getAuthor = agents => (
    <ul>
      {agents.map((entity, i) => (
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
  return (
    <div className="nypl-item-header">
      <div className="nypl-item-header-image">imagen</div>
      <div className="nypl-item-header-column">
        <div className="nypl-item-header-title">{data.title}</div>
        <div className="nypl-item-header-author">By {getAuthor(data.agents)}</div>
      </div>
    </div>
  );
};

WorkHeader.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
};
WorkHeader.defaultProps = {
  data: {},
};

export default WorkHeader;
