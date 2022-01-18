import React from "react";
import { useRouter } from "next/router";
import {
  Breadcrumbs,
  ColorVariants,
  Heading,
  SimpleGrid,
  Template,
  TemplateBreakout,
  TemplateContent,
  Toggle,
  ToggleSizes,
} from "@nypl/design-system-react-components";
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
    <Template>
      <TemplateBreakout>
        <Breadcrumbs
          colorVariant={ColorVariants.Research}
          breadcrumbsData={[{ url: "/", text: breadcrumbTitles.home }]}
        />
        <SearchHeader />
      </TemplateBreakout>

      <TemplateContent>
        <div className="nypl-item-header" role="alert">
          <Heading level={1} id="work-title">
            {work.title}
          </Heading>

          {work.sub_title && (
            <div className="search-result-item__subtitle">{work.sub_title}</div>
          )}
          {authorsList && authorsList.length && (
            <div className="authors-container">By {authorsList}</div>
          )}
        </div>

        <div>
          <Heading level={2} id="featured-edition">
            Featured Edition
          </Heading>
        </div>

        <div>
          <EditionCard
            edition={featuredEdition}
            title={work.title}
          ></EditionCard>
        </div>
        <hr />
        <WorkDetailDefinitionList work={work} />
        <hr />
        <div id="nypl-item-details">
          {work.editions && (
            <>
              <div className="all-editions-header">
                <Heading
                  level={3}
                  id="all-editions"
                  className="all-editions-tag bold"
                >
                  All Editions
                </Heading>

                <Toggle
                  labelText="Show only items currently available online"
                  size={ToggleSizes.Small}
                  isChecked={router.query.showAll === "false"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    toggleShowAll(e)
                  }
                />
              </div>
              <SimpleGrid columns={1}>
                {work.editions.map((edition: WorkEdition) => (
                  <EditionCard
                    key={edition.edition_id}
                    edition={edition}
                    title={work.title}
                  ></EditionCard>
                ))}
              </SimpleGrid>
            </>
          )}
        </div>
      </TemplateContent>
    </Template>
  );
};

export default WorkDetail;
