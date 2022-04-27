import React from "react";
import { useRouter } from "next/router";
import {
  Breadcrumbs,
  BreadcrumbsTypes,
  Heading,
  HeadingLevels,
  SimpleGrid,
  Template,
  TemplateBreakout,
  TemplateContent,
  Toggle,
  ToggleSizes,
  HorizontalRule,
  Box,
  TemplateContentTop,
  TemplateContentPrimary,
  Flex,
} from "@nypl/design-system-react-components";
import { joinArrayOfElements } from "~/src/util/Util";
import { EditionCard } from "~/src/components/EditionCard/EditionCard";
import WorkDetailDefinitionList from "~/src/components/WorkDetailDefinitionList/WorkDetailDefinitionList";
import { ApiWork, WorkResult } from "~/src/types/WorkQuery";
import { defaultBreadcrumbs } from "~/src/constants/labels";
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
          breadcrumbsType={BreadcrumbsTypes.Research}
          breadcrumbsData={defaultBreadcrumbs}
        />
        <SearchHeader />
      </TemplateBreakout>

      <TemplateContent>
        <TemplateContentTop>
          <Box>
            <Heading level={HeadingLevels.One} id="work-title">
              {work.title}
            </Heading>

            {work.sub_title && <Box>{work.sub_title}</Box>}
            {authorsList && authorsList.length && (
              <Box>By {joinArrayOfElements(authorsList, ", ")}</Box>
            )}
          </Box>
          {featuredEdition && (
            <>
              <Box>
                <Heading level={HeadingLevels.Two} id="featured-edition">
                  Featured Edition
                </Heading>
              </Box>
              <Box>
                <EditionCard
                  edition={featuredEdition}
                  title={work.title}
                ></EditionCard>
              </Box>
            </>
          )}
        </TemplateContentTop>
        <TemplateContentPrimary>
          <WorkDetailDefinitionList work={work} />
          <HorizontalRule bg="section.research.primary" />
          <Box id="nypl-item-details">
            {work.editions && (
              <>
                <Flex justify="space-between">
                  <Heading level={HeadingLevels.Three} id="all-editions">
                    All Editions
                  </Heading>

                  <Toggle
                    labelText="Show only items currently available online"
                    size={ToggleSizes.Small}
                    isChecked={router.query.showAll === "false"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      toggleShowAll(e)
                    }
                    id="show-all-toggle"
                  />
                </Flex>
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
          </Box>
        </TemplateContentPrimary>
      </TemplateContent>
    </Template>
  );
};

export default WorkDetail;
