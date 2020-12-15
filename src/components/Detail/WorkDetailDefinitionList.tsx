import React from 'react';
import { Html5Entities } from 'html-entities';
import * as DS from '@nypl/design-system-react-components';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Link/Link' or... Remove this comment to see the full error message
import Link from '~/src/components/Link/Link';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/constants/labels' or its... Remove this comment to see the full error message
import { workDetailDefinitionLabels } from '~/src/constants/labels';
import {
  unique, flattenDeep, isEmpty, uniqueAndSortByFrequency,
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/util/Util' or its corres... Remove this comment to see the full error message
} from '~/src/util/Util';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Card/EditionC... Remove this comment to see the full error message
import EditionCard from '~/src/components/Card/EditionCard';

const htmlEntities = new Html5Entities();

// provide the work item as an array
const elements = Object.keys(workDetailDefinitionLabels);

// extract unique language array from instances of a work item
const addLanguagestoWorkItem = (work: any) => work
  && work.editions
  && uniqueAndSortByFrequency(
    flattenDeep(
      work.editions.map(
        (edition: any) => edition.languages && edition.languages.length && edition.languages.map((language: any) => language.language),
      ),
    ),
  );

// Get List of Authors and their Roles
const getAuthorsList = (agents: any) => {
  if (!agents || !agents.length) return null;

  const authorsList = agents.map((agent: any) => {
    const authorLabel = `${agent.name}${agent.roles.map((role: any) => `, ${role} `)}`;
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Link
        key={agent.name}
        to={{ pathname: '/search', query: EditionCard.getLinkToAuthorSearch(agent) }}
        className="link"
      >
        {authorLabel}
      </Link>
    );
  });

  if (authorsList && authorsList.length) {
    return authorsList.map((authorItem: any, i: any) => (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <li key={`author-${i.toString()}`}>{authorItem}</li>
    ));
  }
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <li key="author-no-author">Author Unavailable</li>;
};

type OwnWorkDetailDefinitionListProps = {
    work?: {
        [key: string]: any;
    };
};

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'WorkDetailDefinitionListProps' circula... Remove this comment to see the full error message
type WorkDetailDefinitionListProps = OwnWorkDetailDefinitionListProps & typeof WorkDetailDefinitionList.defaultProps;
/**
 * Build a definition list of elements from a bibliographic record provided
 * by Elastisearch.
 *
 * @param {object} props
 */
// @ts-expect-error ts-migrate(7022) FIXME: 'WorkDetailDefinitionList' implicitly has type 'an... Remove this comment to see the full error message
export const WorkDetailDefinitionList = ({ work }: WorkDetailDefinitionListProps) => {
  /**
   * Convert JSON object to array for parsing detail elements into
   * a definition list for display.
   *
   * @param {object} work
   * @return {string|null}
   */
  const workDetailsObject = (workObj: any) => Object.keys(workObj).map(key => [key, workObj[key]]);

  /**
   * Handle elements with array values as definitions. Authorities are linked to
   * /search as new general searches with URL parameters. Items are mapped to a table
   * with a row for each edition.
   *
   * Links to author and subject searches have their query terms wrapped in quotes to
   * enforce phrase searching to perform an exact match. This may change when we
   * introduce identifiers for authors (viaf) and subjects.
   *
   * @param {string} type
   * @param {array} entries
   * @return {string|null}
   */
  const parseEntries = (type: any, entries: any, workObj: any) => {
    const list = entries ? [...entries] : [];
    switch (type) {
      case 'language':
        return (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <ul className="definitions definitions-languages">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {list.map((language, i) => <li key={`language${i.toString()}`}>{language}</li>)}
          </ul>
        );
      case 'agents':
        return (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <ul className="definitions definitions-authors">
            {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2. */}
            {getAuthorsList(list, 'definitionList-author')}
          </ul>
        );

      case 'subjects':
        return (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <ul className="definitions definitions-subjects">
            {unique(list, 'subject')
              .sort((a: any, b: any) => (a.subject && b.subject && a.subject.toLowerCase() < b.subject.toLowerCase() ? -1 : 1))
              .map((subject: any, i: any) => (
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <li key={`subject${i.toString()}`}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <DS.Link>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Link
                      to={{
                        pathname: '/search',
                        query: { queries: `[{"query": "${subject.subject}", "field": "subject"}]`, showQueries: `[{"query": "${subject.subject}", "field": "subject"}]` },
                      }}
                    >
                      {htmlEntities.decode(subject.subject)}
                    </Link>
                  </DS.Link>
                </li>
              ))}
          </ul>
        );
      case 'series':
        return (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className="definitions definitions-series">
            {entries}
            {workObj.series_position && ` ${workObj.series_position}`}
          </div>
        );
      default:
        return (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className="definitiions">
            {Array.isArray(entries) ? entries.map(entry => htmlEntities.decode(entry)).join(', ') : htmlEntities.decode(entries)}
          </div>
        );
    }
  };

  /**
   * Wrapper function to handle building the HTML from the object given.
   *
   * @param {array} data
   * @return {string}
   */
  const getDefinitions = (workObj: any) => {
    let defsData;
    const languageList = addLanguagestoWorkItem(workObj);
    if (languageList) {
      defsData = workDetailsObject({ ...workObj, ...{ language: languageList } });
    } else {
      defsData = workDetailsObject({ ...workObj });
    }
    defsData.sort((a, b) => elements.indexOf(a[0]) - elements.indexOf(b[0]));
    if (!defsData || isEmpty(defsData)) {
      return null;
    }

    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <dl className="nypl-details-table">
        {defsData.map(
          (entry, i) => elements.includes(entry[0]) && entry[1] && (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <React.Fragment key={`"entry"${i.toString()}`}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <dt>{workDetailDefinitionLabels[entry[0]]}</dt>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <dd>{parseEntries(entry[0], entry[1], workObj)}</dd>
          </React.Fragment>
          ),
        )}
      </dl>
    );
  };

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <h3 className="work-details-tag bold">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <a id="work-details">Details</a>
      </h3>
      {getDefinitions(work)}
    </div>
  );
};

WorkDetailDefinitionList.defaultProps = {
  work: {},
};

export default WorkDetailDefinitionList;
