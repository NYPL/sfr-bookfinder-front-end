import React from 'react';
import PropTypes from 'prop-types';
import { Html5Entities } from 'html-entities';
import { Link } from 'react-router';

const htmlEntities = new Html5Entities();

const getIdentifier = author => (author.viaf && 'viaf') || (author.lcnaf && 'lcnaf') || 'name';

const linkToAuthor = author => ({
  query: author[getIdentifier(author)],
  field: getIdentifier(author),
  showQuery: `"${author.name}"`,
  showField: 'author',
});
const birthDate = entity => (
  <span>
    {(entity.birth_date_display || entity.death_date_display) && <span> (</span>}
    {entity.birth_date_display && <span>{entity.birth_date_display}</span>}
    {entity.death_date_display && <span>{` --${entity.death_date_display}`}</span>}
    {(entity.birth_date_display || entity.death_date_display) && <span>) </span>}
  </span>
);

const filterAgents = (agents, max, roleFilter) => agents //
  .slice(0, max || agents.length)
  .filter(agent => !roleFilter || agent.roles.indexOf(roleFilter) > -1);

const AuthorsList = ({ agents, max, roleFilter }) => (
  <ul className="authors-list">
    {filterAgents(agents, max, roleFilter).map((entity, index, filteredAgents) => (
      <li key={`agents${index.toString()}`}>
        <Link to={{ pathname: '/search', query: linkToAuthor(entity) }}>
          {`${htmlEntities.decode(entity.name)}, ${entity.roles.join(', ')}`}
        </Link>
        {birthDate(entity)}
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
        {index + 1 < filteredAgents.length && <span>, </span>}
      </li>
    ))}
  </ul>
);

AuthorsList.propTypes = {
  agents: PropTypes.arrayOf(PropTypes.any),
  max: PropTypes.number,
  roleFilter: PropTypes.string,
};
AuthorsList.defaultProps = {
  agents: [],
  max: 0,
  roleFilter: null,
};

export default AuthorsList;
