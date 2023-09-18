import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeading,
  Flex,
  Heading,
  HorizontalRule,
  SimpleGrid,
  Text,
  Toggle,
} from "@nypl/design-system-react-components";

import { ApiEdition, EditionResult } from "~/src/types/EditionQuery";

import EditionDetailDefinitionList from "~/src/components/EditionDetailDefinitionList/EditionDetailDefinitionList";
import Link from "~/src/components/Link/Link";
import { InstanceCard } from "../InstanceCard/InstanceCard";
import SearchHeader from "../SearchHeader/SearchHeader";
import {
  joinArrayOfElements,
  truncateStringOnWhitespace,
} from "~/src/util/Util";
import { MAX_TITLE_LENGTH } from "~/src/constants/editioncard";
import { Instance } from "~/src/types/DataModel";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import { PLACEHOLDER_LINK } from "~/src/constants/collection";
import DrbTemplate from "../DrbTemplate/DrbTemplate";

const Edition: React.FC<{ editionResult: EditionResult; backUrl?: string }> = (
  props
) => {
  const router = useRouter();

  if (!props.editionResult) return <>Loading</>;
  const { pathname, query } = router;
  const featuredItemId = query.featured as string;
  const edition: ApiEdition = props.editionResult.data;
  const authorsList = EditionCardUtils.getAuthorsList(edition.work_authors);

  const passedInFeaturedItem = featuredItemId
    ? edition.instances.find((instance) => {
        const itemIds: string[] = instance.items.map((item) => {
          return item.item_id.toString();
        });
        return itemIds.includes(featuredItemId);
      })
    : undefined;

  const featuredInstance = passedInFeaturedItem
    ? passedInFeaturedItem
    : edition.instances.find(
        (instance: Instance) =>
          instance.items &&
          instance.items.length &&
          instance.items[0].links &&
          instance.items[0].links.length
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

  const headerElement = <SearchHeader />;

  const contentTopElement = (
    <>
      <Flex direction={{ base: "column", md: "row" }}>
        {edition && (
          <Heading level="one">
            <Link
              to={{
                pathname: `/work/${edition.work_uuid}`,
              }}
              title={edition.work_title}
            >
              {edition.work_title}
            </Link>
          </Heading>
        )}
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
      {edition.sub_title && <Box>{edition.sub_title}</Box>}
      {authorsList && authorsList.length && (
        <Box>By {joinArrayOfElements(authorsList, "")}</Box>
      )}
      <Box>
        {featuredInstance && (
          <>
            <Heading level="two">Featured Copy</Heading>

            <Box>
              <InstanceCard edition={edition} instance={featuredInstance} />
            </Box>
          </>
        )}
      </Box>
      {edition.inCollections && edition.inCollections.length > 0 && (
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
              {edition.inCollections[0].title}
            </Box>
          </CardHeading>
          <CardContent marginBottom="l">
            <Box>{edition.inCollections[0].description}</Box>
          </CardContent>
          <CardActions width="165px">
            <Link
              linkType="button"
              to={"/collection/" + edition.inCollections[0].uuid}
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
      <EditionDetailDefinitionList edition={edition} />
      <HorizontalRule bg="section.research.primary" />
      {edition.instances && (
        <Flex justify="space-between">
          <Heading level="three">All Copies</Heading>

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
      )}
      <SimpleGrid columns={1} gap="s">
        {edition.instances.map((instance) => (
          <InstanceCard
            key={instance.instance_id}
            edition={edition}
            instance={instance}
          />
        ))}
      </SimpleGrid>
    </>
  );

  return (
    <DrbTemplate
      breadcrumbsData={[
        {
          url: `/work/${edition.work_uuid}`,
          text: truncateStringOnWhitespace(edition.title, MAX_TITLE_LENGTH),
        },
      ]}
      contentPrimary={contentPrimaryElement}
      contentTop={contentTopElement}
      header={headerElement}
    />
  );
};

export default Edition;
