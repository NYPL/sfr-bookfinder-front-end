import React from 'react';
import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import EditionCard from '../Card/EditionCard';
import { joinArrayOfElements } from '../../util/Util';

const WorkHeader = ({ data }) => {
  const authorsList = EditionCard.getAuthorsList(EditionCard.getPreferredAgent(data.agents, 'author'));

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
        {joinArrayOfElements(authorsList, ', ')}
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
