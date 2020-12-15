import React from 'react';
import * as DS from '@nypl/design-system-react-components';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Card/EditionCard' was resolved to '/Use... Remove this comment to see the full error message
import EditionCard from '../Card/EditionCard';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/util/Util' or its corres... Remove this comment to see the full error message
import { joinArrayOfElements } from '~/src/util/Util';

type OwnProps = {
    data?: {
        [key: string]: any;
    };
};

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof WorkHeader.defaultProps;

// @ts-expect-error ts-migrate(7022) FIXME: 'WorkHeader' implicitly has type 'any' because it ... Remove this comment to see the full error message
const WorkHeader = ({ data }: Props) => {
  const authorsList = EditionCard.getAuthorsList(EditionCard.getPreferredAgent(data.agents, 'author'), 'work-detail-header');

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="nypl-item-header">
      {data
      && (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <DS.Heading
        level={1}
        id="work-title"
        blockName="page-title"
        text={data.title}
      />
      )
      }
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      { data.subtitle && <div className="search-result-item__subtitle">{data.subtitle}</div> }
      { authorsList && authorsList.length && (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <span>
        By
        {' '}
        {joinArrayOfElements(authorsList, ', ')}
      </span>
      )}
    </div>
  );
};
WorkHeader.defaultProps = {
  data: {},
};

export default WorkHeader;
