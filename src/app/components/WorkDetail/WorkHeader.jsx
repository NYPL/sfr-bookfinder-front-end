import React from 'react';
import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import AuthorsList from '../List/AuthorsList';
import { getPreferredAgent } from '../SearchResults/ResultsList';

const WorkHeader = ({ data }) => {
  console.log('workHeader data', data);
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
      {/** TODO: don't show if authors list empty */}
      <span>
        By
        {' '}
        <AuthorsList agents={getPreferredAgent(data.agents, 'author')} />
      </span>
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
