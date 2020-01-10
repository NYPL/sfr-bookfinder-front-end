/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router';

import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import { title } from 'change-case';
import ResultsListItem from './ResultsListItem';
import EmptySearchSvg from '../Svgs/EmptySearchSvg';
import { isEmpty } from '../../util/Util';

/**
 * ResultsList presents search results as a "grouped" list of books
 * with their associated editions provided by the EditionsList component.
 * Each result displays a title and author element linked to its companion
 * detailed view.
 *
 * @returns {string|null}
 */
class ResultsList extends React.Component {
  constructor(props) {
    console.log('resultsList props ', props);

    super(props);
    this.props = props;
  }

  render() {
    if (isEmpty(this.props.results)) {
      return (
        <div className="grid-row margin-3">
          <EmptySearchSvg className="grid-col-1" />
          <div className="grid-col-9 margin-x-3 margin-y-2">
            <span>No results were found. Please try a different keyword or fewer filters.</span>
          </div>
        </div>
      );
    }
    const referrer = this.context.router ? this.context.router.location.pathname + this.context.router.location.search : undefined;


    const results = this.props.results.map((result, index) => {
      const titleContent = (
        <Link
          href="title-link-url"
          className="link link--no-underline"
        >
          {result.title}
        </Link>
      );

      const authorAgents = result.agents.filter(agent => agent.role === 'author');
      const authorLinkElement = (
        <Link
          to="author-url"
          className="link"
        >
          {/* TODO: better handling of multiple authors */}
          {authorAgents.map((authorAgent, idx) => {
            if (idx < authorAgents.length) {
              return `${authorAgent.name}, `;
            }
            return authorAgent.name;
          })}

        </Link>
      );
      const editionsElement = (
        <Link
          class="link"
          to="#allEditionsUrl"
        >
  View All
          {' '}
          {result.edition_count}
          {' '}
editions

        </Link>
      );
      return {
        id: `search-result-${result.uuid}`,
        resultIndex: { index },
        titleElement: titleContent,
        subtitle: result.subtitle,
        authorElement: authorLinkElement,
        editionInfo: {
          editionYearHeading: '2004 Edition',
          publisherAndLocation: 'Published in New York by Random House',
          coverUrl: 'https://placeimg.com/57/81/arch',
          language: 'Written in English',
          license: 'Under Creative Commons License',
          readOnlineLink: '#read-online',
          downloadLink: '#download',
        },
        editionsLinkElement: editionsElement,
      };
    });
    console.log('results', results);

    return (
      <DS.SearchResultsList searchResults={results}></DS.SearchResultsList>
    );
  }
}

ResultsList.propTypes = {
  eReaderUrl: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.any),
  fetchWork: PropTypes.func,
};

ResultsList.defaultProps = {
  eReaderUrl: '',
  results: [],
  fetchWork: () => { },
};

ResultsList.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
};

export default ResultsList;
