import React from "react";
import { useRouter } from "next/router";
import {
  Breadcrumbs,
  BreadcrumbsTypes,
  Heading,
  HeadingLevels,
  HorizontalRule,
  HStack,
  List,
  ListTypes,
  Template,
  TemplateBreakout,
  TemplateContent,
  TemplateContentPrimary,
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

const Edition: React.FC<{ editionResult: EditionResult }> = (props) => {
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

        {edition.sub_title && (
          <div className="search-result-item__subtitle">
            {edition.sub_title}
          </div>
        )}
      </TemplateContent>

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

        <TemplateContentPrimary>
          <div id="nypl-item-details">
            <HorizontalRule />
            <EditionDetailDefinitionList edition={edition} />
            <HorizontalRule />
            {edition.instances && (
              <HStack>
                <h3
                  tabIndex={-1}
                  id="all-editions"
                  className="all-editions-tag bold"
                >
                  All Copies
                </h3>

                <Toggle
                  labelText="Show only items currently available online"
                  size={ToggleSizes.Small}
                  isChecked={router.query.showAll === "false"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    toggleShowAll(e)
                  }
                />
              </HStack>
            )}
            <List type={ListTypes.Unordered}>
              {edition.instances.map((instance) => (
                <li key={instance.instance_id}>
                  <InstanceCard edition={edition} instance={instance} />
                </li>
              ))}
            </List>
          </div>
        </TemplateContentPrimary>
      </div>
    </Template>
  );
};

export default Edition;
