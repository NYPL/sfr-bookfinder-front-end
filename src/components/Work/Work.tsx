import React from "react";
import { useRouter } from "next/router";
import {
  Breadcrumbs,
  Heading,
  SimpleGrid,
  Template,
  TemplateBreakout,
  TemplateContent,
  Toggle,
  HorizontalRule,
  Box,
  TemplateContentTop,
  TemplateContentPrimary,
  Flex,
  Text,
  Card,
  CardActions,
  CardContent,
  CardHeading,
} from "@nypl/design-system-react-components";
import {
  joinArrayOfElements,
  truncateStringOnWhitespace,
} from "~/src/util/Util";
import { EditionCard } from "~/src/components/EditionCard/EditionCard";
import WorkDetailDefinitionList from "~/src/components/WorkDetailDefinitionList/WorkDetailDefinitionList";
import { ApiWork, WorkResult } from "~/src/types/WorkQuery";
import { defaultBreadcrumbs } from "~/src/constants/labels";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import SearchHeader from "../SearchHeader/SearchHeader";
import { WorkEdition } from "~/src/types/DataModel";
import Link from "../Link/Link";
import { MAX_TITLE_LENGTH } from "~/src/constants/editioncard";
import { PLACEHOLDER_LINK } from "~/src/constants/collection";

const WorkDetail: React.FC<{ workResult: WorkResult; backUrl?: string }> = (
  props
) => {
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
          breadcrumbsType="research"
          breadcrumbsData={[
            ...defaultBreadcrumbs,
            {
              url: `/work/${work.uuid}`,
              text: truncateStringOnWhitespace(work.title, MAX_TITLE_LENGTH),
            },
          ]}
        />
        <SearchHeader />
      </TemplateBreakout>

      <TemplateContent>
        <TemplateContentTop>
          <Box>
            <Flex direction={{ base: "column", md: "row" }}>
              <Heading level="one" id="work-title">
                {work.title}
              </Heading>
              {props.backUrl && (
                <Box
                  whiteSpace={{ md: "nowrap" }}
                  lineHeight="calc(1.1 * var(--nypl-fontSizes-heading-primary))"
                  pl={{ md: "s" }}
                >
                  <Link to={props.backUrl}>Back to search results</Link>
                </Box>
              )}
            </Flex>
            {work.sub_title && <Box>{work.sub_title}</Box>}
            {authorsList && authorsList.length && (
              <Box>By {joinArrayOfElements(authorsList, "")}</Box>
            )}
          </Box>
          {featuredEdition && (
            <>
              <Box>
                <Heading level="two" id="featured-edition">
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
          {work.inCollections && work.inCollections.length > 0 && (
            <Card
              imageProps={{
                alt: "Placeholder Cover",
                aspectRatio: "threeByTwo",
                isAtEnd: true,
                size: "large",
                src: PLACEHOLDER_LINK,
              }}
              isCentered
              backgroundColor="ui.gray.x-light-cool"
              layout="row"
              marginTop="l"
              padding="s"
            >
              <CardHeading size="primary" id="row-heading">
                <Text size="caption" isUppercase marginTop="xs">
                  <b>Part of Collection</b>
                </Text>
                <Box marginTop="m" marginBottom="m">
                  {work.inCollections[0].title}
                </Box>
              </CardHeading>
              <CardContent marginBottom="l">
                <Box>{work.inCollections[0].description}</Box>
              </CardContent>
              <CardActions width="165px">
                <Link
                  linkType="button"
                  to={"/collection/" + work.inCollections[0].uuid}
                >
                  Browse Collection
                </Link>
              </CardActions>
            </Card>
          )}
        </TemplateContentTop>
        <TemplateContentPrimary>
          <WorkDetailDefinitionList work={work} />
          <HorizontalRule bg="section.research.primary" />
          <Box id="nypl-item-details">
            {work.editions && (
              <>
                <Flex justify="space-between">
                  <Heading level="three" id="all-editions">
                    All Editions
                  </Heading>

                  <Toggle
                    labelText="Show only items currently available online"
                    size="small"
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
