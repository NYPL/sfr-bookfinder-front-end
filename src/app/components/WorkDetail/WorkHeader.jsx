import React from 'react';
import PropTypes from 'prop-types';
import AuthorsList from '../List/AuthorsList';
import BookSvg from '../Svgs/BookSvg';

const WorkHeader = ({ data }) => (
    <div className="nypl-item-header">
      <div className="nypl-item-header-image">
        <BookSvg />
      </div>
      <div className="nypl-item-header-column">
        <div className="nypl-item-header-title">{data.title}</div>
        {data.subtitle && <div>{data.subtitle}</div>}
        {data.agents
      && data.agents.length > 0 //
        && data.agents.filter(agent => agent.roles && agent.roles.indexOf('author') > -1).length > 0 && (
          <div className="nypl-item-header-author">
            By&nbsp;
            <AuthorsList
              agents={data.agents}
              max={1}
              roleFilter="author"
            />
          </div>
        )}
      </div>
    </div>
  );

WorkHeader.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
};
WorkHeader.defaultProps = {
  data: {},
};

export default WorkHeader;
