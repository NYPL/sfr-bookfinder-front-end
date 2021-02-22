import React from "react";
import { useRouter } from "next/router";
import * as DS from "@nypl/design-system-react-components";
import { join } from "path";

import { ApiEdition, EditionResult } from "~/src/types/EditionQuery";

import EditionDetailDefinitionList from "~/src/components/Detail/EditionDetailDefinitionList";
import Link from "~/src/components/Link/Link";
import { InstanceCard } from "../InstanceCard/InstanceCard";
import { breadcrumbTitles } from "~/src/constants/labels";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import SearchHeader from "../SearchHeader/SearchHeader";

const Edition: React.FC<{ editionResult: EditionResult }> = (props) => {
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
          <DS.Breadcrumbs
            breadcrumbs={[
              { url: "/", text: breadcrumbTitles.home },
              { url: `/work/${edition.work_uuid}`, text: edition.title },
            ]}
          />
          <SearchHeader></SearchHeader>
        </div>

        <div className="content-top">
          {edition && (
            <DS.Heading level={1} id="edition-title" blockName="page-title">
              <Link
                to={{
                  pathname: `/work/${edition.work_uuid}`,
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
          <DS.Heading level={2} id="featured-edition">
            Featured Copy
          </DS.Heading>

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
                <li key={instance.id}>
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

export default Edition;
