import React from 'react';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/stores/InitialState' or ... Remove this comment to see the full error message
import { initialSearchQuery, searchQueryPropTypes } from '~/src/stores/InitialState';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/util/Util' or its corres... Remove this comment to see the full error message
import { getNumberOfPages } from '~/src/util/Util';

type OwnProps = {
    totalItems?: number;
    searchQuery?: searchQueryPropTypes;
};

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof ResultsMetadata.defaultProps;

/**
 * Present basic search metadata about the current search or a "no results"
 * statement.
 * @param {object} props
 * @return {string}
 */
// @ts-expect-error ts-migrate(7022) FIXME: 'ResultsMetadata' implicitly has type 'any' becaus... Remove this comment to see the full error message
const ResultsMetadata = ({ searchQuery, totalItems }: Props) => {
  let message = 'Viewing 0 items';
  const totalPages = getNumberOfPages(totalItems, searchQuery.per_page);
  const firstElement = (Number(searchQuery.per_page || 10) * Number(searchQuery.page || 0) || 0) + 1;
  let lastElement = Number(searchQuery.per_page || 10) * (Number(searchQuery.page || 0) + 1) || 10;
  if (searchQuery.page >= totalPages - 1 && lastElement > totalItems) {
    lastElement = totalItems;
  }
  if (totalItems > 0) {
    message = `Viewing ${firstElement.toLocaleString()} - ${lastElement.toLocaleString()} of ${totalItems.toLocaleString()} items`;
  }

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <span>
      {message}
    </span>
  );
};

ResultsMetadata.defaultProps = {
  totalItems: 0,
  searchQuery: initialSearchQuery,
};

export default ResultsMetadata;
