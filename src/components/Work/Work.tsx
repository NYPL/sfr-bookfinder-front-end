import React from "react";
import { useRouter } from "next/router";
import {
  Heading,
  SimpleGrid,
  Toggle,
  HorizontalRule,
  Box,
  Flex,
  Card,
  CardActions,
  CardContent,
  CardHeading,
  TemplateAppContainer,
} from "@nypl/design-system-react-components";
import {
  joinArrayOfElements,
  truncateStringOnWhitespace,
} from "~/src/util/Util";
import { EditionCard } from "~/src/components/EditionCard/EditionCard";
import WorkDetailDefinitionList from "~/src/components/WorkDetailDefinitionList/WorkDetailDefinitionList";
import { ApiWork, WorkResult } from "~/src/types/WorkQuery";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import SearchHeader from "../SearchHeader/SearchHeader";
import { WorkEdition } from "~/src/types/DataModel";
import Link from "../Link/Link";
import { MAX_TITLE_LENGTH } from "~/src/constants/editioncard";
import { PLACEHOLDER_LINK } from "~/src/constants/collection";
import DrbBreakout from "../DrbBreakout/DrbBreakout";

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

  const breakoutElement = (
    <DrbBreakout
      breadcrumbsData={[
        {
          url: `/work/${work.uuid}`,
          text: truncateStringOnWhitespace(work.title, MAX_TITLE_LENGTH),
        },
      ]}
    >
      <SearchHeader />
    </DrbBreakout>
  );

  const contentTopElement = (
    <>
      <Box>
        <Flex direction={{ base: "column", md: "row" }}>
          <Heading level="h1" size="heading2" id="work-title">
            {work.title}
          </Heading>
          {props.backUrl && (
            <Box
              whiteSpace={{ md: "nowrap" }}
              lineHeight="calc(1.1 * var(--nypl-fontSizes-heading-primary))"
              pl={{ md: "s" }}
            >
              <Link to={props.backUrl} linkType="backwards">
                Back to search results
              </Link>
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
            <Heading level="h2" size="heading4" id="featured-edition">
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
          <CardHeading
            level="h2"
            id="row-heading"
            overline="Part of Collection"
          >
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
    </>
  );

  const contentPrimaryElement = (
    <>
      <WorkDetailDefinitionList work={work} />
      <HorizontalRule bg="section.research.primary" />
      <Box id="nypl-item-details">
        {work.editions && (
          <>
            <Flex justify="space-between">
              <Heading level="h2" size="heading5" id="all-editions">
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
    </>
  );
  return (
    <TemplateAppContainer
      breakout={breakoutElement}
      contentTop={contentTopElement}
      contentPrimary={contentPrimaryElement}
    />
  );
};

export default WorkDetail;
