import React from 'react';
import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import { getAuthorsList, getPreferredAgent } from '../Card/EditionCard';

const WorkHeader = ({ data }) => {
  const authorsList = getAuthorsList(getPreferredAgent(data.agents, 'author'));

  return (
    <div className="nypl-item-header">
      {data
      && (
      <DS.Heading
        level={1}
        id="work-title"
        blockName="page-title"
        text={data.title}
      />
      )
      }
      { data.subtitle && <div className="search-result-item__subtitle">{data.subtitle}</div> }
      { authorsList && authorsList.length && (
      <span>
        By
        {' '}
        {authorsList}
      </span>
      )}
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
