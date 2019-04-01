import React from 'react';
import PropTypes from 'prop-types';
import AuthorsList from './AuthorsList';

const WorkHeader = ({ data }) => (
  <div className="nypl-item-header">
    <div className="nypl-item-header-image">imagen</div>
    <div className="nypl-item-header-column">
      <div className="nypl-item-header-title">{data.title}</div>
      <div className="nypl-item-header-author">
        By <AuthorsList agents={data.agents} />
      </div>
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
