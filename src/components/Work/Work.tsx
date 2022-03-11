import React from "react";
import { useRouter } from "next/router";
import * as DS from "@nypl/design-system-react-components";
import { joinArrayOfElements } from "~/src/util/Util";
import { EditionCard } from "~/src/components/EditionCard/EditionCard";
import WorkDetailDefinitionList from "~/src/components/WorkDetailDefinitionList/WorkDetailDefinitionList";
import { ApiWork, WorkResult } from "~/src/types/WorkQuery";
import { breadcrumbTitles } from "~/src/constants/labels";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import SearchHeader from "../SearchHeader/SearchHeader";
import { WorkEdition } from "~/src/types/DataModel";

const WorkDetail: React.FC<{ workResult: WorkResult }> = (props) => {
  const router = useRouter();

  const { pathname, query } = router;
  const featuredEditionId = query.featured;

  const work: ApiWork = props.workResult.data;
  //Edition Card Preprocessing
  const authorsList = EditionCardUtils.getAuthorsList(work.authors);

  const passedInFeaturedEdition = featuredEditionId
    ? work.editions.find(
        (edition) => edition.edition_id === Number(featuredEditionId)
      )
    : undefined;

  const featuredEdition = passedInFeaturedEdition
    ? passedInFeaturedEdition
    : work.editions.find(
        (edition: WorkEdition) =>
          edition.items &&
          edition.items.length &&
          EditionCardUtils.getPreviewItem(edition.items) !== undefined
      );

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
      <div className="content-header">
        <DS.Breadcrumbs
          breadcrumbs={[{ url: "/", text: breadcrumbTitles.home }]}
        />
        <SearchHeader />
      </div>

      <div className="content-primary work-detail">
        <div className="nypl-item-header" role="alert">
          <DS.Heading level={1} id="work-title" blockName="page-title">
            {work.title}
          </DS.Heading>

          {work.sub_title && (
            <div className="search-result-item__subtitle">{work.sub_title}</div>
          )}
          {authorsList && authorsList.length && (
            <div className="authors-container">
              By {joinArrayOfElements(authorsList, ", ")}
            </div>
          )}
        </div>
        {featuredEdition && (
          <>
            <div>
              <DS.Heading level={2} id="featured-edition">
                Featured Edition
              </DS.Heading>
            </div>
            <div>
              <EditionCard
                edition={featuredEdition}
                title={work.title}
              ></EditionCard>
            </div>
          </>
        )}
        <hr />
        <WorkDetailDefinitionList work={work} />
        <hr />
        <div id="nypl-item-details">
          {work.editions && (
            <>
              <div className="all-editions-header">
                <DS.Heading
                  level={3}
                  id="all-editions"
                  className="all-editions-tag bold"
                >
                  All Editions
                </DS.Heading>

                <DS.Checkbox
                  name="show-all"
                  checkboxId="show-all-editions"
                  labelOptions={{
                    id: "show-all-label",

                    labelContent: (
                      <>Show only items currently available online</>
                    ),
                  }}
                  checked={query.showAll === "false"}
                  onChange={(e) => toggleShowAll(e)}
                />
              </div>
              <DS.List
                type={DS.ListTypes.Unordered}
                modifiers={["no-list-styling"]}
              >
                {work.editions.map((edition: WorkEdition) => (
                  <li key={edition.edition_id}>
                    <EditionCard
                      edition={edition}
                      title={work.title}
                    ></EditionCard>
                  </li>
                ))}
              </DS.List>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;
