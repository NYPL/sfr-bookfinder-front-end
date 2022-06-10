import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Breadcrumbs,
  Flex,
  Heading,
  HorizontalRule,
  SimpleGrid,
  Template,
  TemplateBreakout,
  TemplateContent,
  TemplateContentPrimary,
  TemplateContentTop,
  Toggle,
} from "@nypl/design-system-react-components";

import { ApiEdition, EditionResult } from "~/src/types/EditionQuery";

import EditionDetailDefinitionList from "~/src/components/EditionDetailDefinitionList/EditionDetailDefinitionList";
import Link from "~/src/components/Link/Link";
import { InstanceCard } from "../InstanceCard/InstanceCard";
import { defaultBreadcrumbs } from "~/src/constants/labels";
import SearchHeader from "../SearchHeader/SearchHeader";
import { truncateStringOnWhitespace } from "~/src/util/Util";
import { MAX_TITLE_LENGTH } from "~/src/constants/editioncard";
import { Instance } from "~/src/types/DataModel";

const Edition: React.FC<{ editionResult: EditionResult; backUrl?: string }> = (
  props
) => {
  const router = useRouter();

  if (!props.editionResult) return <>Loading</>;
  const { pathname, query } = router;
  const featuredItemId = query.featured as string;
  const edition: ApiEdition = props.editionResult.data;

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

  return (
    <Template>
      <TemplateBreakout>
        <Breadcrumbs
          breadcrumbsType="research"
          breadcrumbsData={[
            ...defaultBreadcrumbs,
            {
              url: `/work/${edition.work_uuid}`,
              text: truncateStringOnWhitespace(edition.title, MAX_TITLE_LENGTH),
            },
          ]}
        />
        <SearchHeader />
      </TemplateBreakout>

      <TemplateContent>
        <TemplateContentTop>
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
          {edition.work_authors && edition.work_authors.length && (
            <Box>
              By <span>{edition.work_authors.join(", ")}</span>
            </Box>
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
        </TemplateContentTop>
        <TemplateContentPrimary>
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
        </TemplateContentPrimary>
      </TemplateContent>
    </Template>
  );
};

export default Edition;
