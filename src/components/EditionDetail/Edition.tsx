import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Breadcrumbs,
  BreadcrumbsTypes,
  Flex,
  Heading,
  HeadingLevels,
  HorizontalRule,
  SimpleGrid,
  Template,
  TemplateBreakout,
  TemplateContent,
  TemplateContentPrimary,
  TemplateContentTop,
  Toggle,
  ToggleSizes,
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
          breadcrumbsType={BreadcrumbsTypes.Research}
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
              <Heading level={HeadingLevels.One}>
                <Link
                  to={{
                    pathname: `/work/${edition.work_uuid}`,
                  }}
                  title={edition.title}
                  className="link link--no-underline"
                >
                  {edition.title}
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
          {edition.sub_title && (
            <div className="search-result-item__subtitle">
              {edition.sub_title}
            </div>
          )}
          <div className="content-primary">
            {featuredInstance && (
              <>
                <Heading level={HeadingLevels.Two} id="featured-edition">
                  Featured Copy
                </Heading>

                <div id="featured-edition-card">
                  <InstanceCard edition={edition} instance={featuredInstance} />
                </div>
              </>
            )}
          </div>
        </TemplateContentTop>
        <TemplateContentPrimary>
          <EditionDetailDefinitionList edition={edition} />
          <HorizontalRule bg="section.research.primary" />
          {edition.instances && (
            <Flex justify="space-between">
              <Heading
                level={HeadingLevels.Three}
                id="all-editions"
                className="all-editions-tag bold"
              >
                All Copies
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
