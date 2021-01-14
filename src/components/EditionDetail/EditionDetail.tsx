import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import * as DS from "@nypl/design-system-react-components";
import FeatureFlags from "dgx-feature-flags";
import { join } from "path";

import {
  ApiEdition,
  EditionQuery,
  EditionResult,
} from "~/src/types/EditionQuery";

import Breadcrumbs from "~/src/components/Breadcrumbs/Breadcrumbs";
import { deepEqual } from "~/src/util/Util";
import { EditionCardUtils } from "~/src/components/EditionCard/EditionCard";
import EditionDetailDefinitionList from "~/src/components/Detail/EditionDetailDefinitionList";
import Link from "~/src/components/Link/Link";
import SearchForm from "../SearchForm/SearchForm";
import { WorkEdition } from "../../types/DataModel";
import { InstanceCard } from "../InstanceCard/InstanceCard";

// const scrollToHash = (hash) => {
//   const hashtag = hash && hash.replace(/#/, '');
//   if (hashtag) {
//     const element = global.document.getElementById(hashtag);
//     if (element) {
//       element.scrollIntoView();
//       element.focus();
//     }
//   }
// };

const EditionDetail: React.FC<{ editionResult: EditionResult }> = (props) => {
  const router = useRouter();

  if (!props.editionResult) return <>Loading</>;
  const { pathname, query } = router;
  const edition: ApiEdition = props.editionResult.data;

  const authorsList = EditionCardUtils.getAuthorsList(
    EditionCardUtils.getPreferredAgent(edition.agents, "author"),
    "work-detail-header"
  );

  const featuredInstance = edition.instances[0];

  const toggleShowAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push({
      pathname,
      query: {
        ...query,
        showAll: !e.target.checked,
      },
    });
  };

  return (
    <div className="layout-container">
      <main id="mainContent" className="main">
        <div className="content-header">
          <Breadcrumbs />

          <SearchForm />
        </div>

        <div className="content-top">
          {edition && (
            <DS.Heading level={1} id="edition-title" blockName="page-title">
              <Link
                to={{
                  pathname: `/work/${edition.work_uuid}`,
                  query: {
                    recordType: "editions",
                    showAll: true,
                  },
                }}
                title={edition.title}
                className="link link--no-underline"
              >
                {edition.title}
              </Link>
            </DS.Heading>
          )}

          {edition.sub_title && (
            <div className="search-result-item__subtitle">
              {edition.sub_title}
            </div>
          )}
          {authorsList && authorsList.length && (
            <span>By {join(authorsList, ", ")}</span>
          )}
        </div>

        <div className="content-primary">
          <DS.Heading level={2} id="featured-edition" text="Featured Copy" />

          <div id="featured-edition-card">
            <InstanceCard
              editionYear={edition.publication_date}
              instance={featuredInstance}
            />
          </div>

          <div id="nypl-item-details">
            <EditionDetailDefinitionList edition={edition} />
            {edition.instances && (
              <div className="all-instances-header">
                <h3
                  // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
                  tabIndex="-1"
                  id="all-editions"
                  className="all-editions-tag bold"
                >
                  All Copies
                </h3>

                <DS.Checkbox
                  name="show-all"
                  checkboxId="show-all-editions"
                  labelOptions={{
                    id: "show-all-label",

                    labelContent: (
                      <>Show only items currently available online</>
                    ),
                  }}
                  checked={router.query.showAll === "false"}
                  onChange={(e) => toggleShowAll(e)}
                />
              </div>
            )}
            <DS.List
              type={DS.ListTypes.Unordered}
              modifiers={["no-list-styling"]}
            >
              {edition.instances.map((instance) => (
                <li>
                  <InstanceCard
                    editionYear={edition.publication_date}
                    instance={instance}
                  />
                </li>
              ))}
            </DS.List>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditionDetail;
