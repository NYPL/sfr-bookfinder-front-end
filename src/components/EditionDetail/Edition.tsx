import React from "react";
import { useRouter } from "next/router";

import { ApiEdition, EditionResult } from "~/src/types/EditionQuery";

import Link from "~/src/components/Link/Link";
import { InstanceCard } from "../InstanceCard/InstanceCard";
import { breadcrumbTitles } from "~/src/constants/labels";
import SearchHeader from "../SearchHeader/SearchHeader";
import { truncateStringOnWhitespace } from "~/src/util/Util";
import { MAX_TITLE_LENGTH } from "~/src/constants/editioncard";
import { Agent, Instance } from "~/src/types/DataModel";
import {
  Breadcrumbs,
  Heading,
  SimpleGrid,
  Template,
  ColorVariants,
  TemplateBreakout,
  TemplateContent,
  TemplateContentTop,
  TemplateContentPrimary,
  Toggle,
  ListTypes,
  List,
} from "@nypl/design-system-react-components";
import { ToggleSizes } from "@nypl/design-system-react-components";
import { HStack } from "@nypl/design-system-react-components";
import { HorizontalRule } from "@nypl/design-system-react-components";

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

  // Publisher
  const getPublishersList = (publishers: Agent[]): JSX.Element[] => {
    if (!publishers || publishers.length === 0) {
      return [
        <React.Fragment key="unavailable">
          Publisher Unavailable
        </React.Fragment>,
      ];
    }
    return publishers.map((publisher: Agent) => {
      return (
        <List
          type={ListTypes.Unordered}
          modifiers={["no-list-styling"]}
          key={publisher.name}
        >
          <li>{publisher.name}</li>
        </List>
      );
    });
  };

  // The Edition Data table
  const editionInfo = [
    {
      term: "Publication Date",
      definition: edition.publication_date
        ? edition.publication_date
        : "Unknown Date",
    },
    {
      term: "Publication Place",
      definition: edition.publication_place
        ? edition.publication_place
        : "Unknown Place",
    },
    { term: "Publisher(s)", definition: getPublishersList(edition.publishers) },
    ...(edition.edition_statement
      ? [{ term: "Edition Statement", definition: edition.edition_statement }]
      : []),
    ...(edition.languages && edition.languages.length > 0
      ? [
          {
            term: "Languages",
            definition: [
              <List
                key="Language-list"
                type={ListTypes.Unordered}
                modifiers={["no-list-styling"]}
              >
                {edition.languages.map((lang) => {
                  return (
                    <li key={`language-${lang.language}`}>{lang.language}</li>
                  );
                })}
              </List>,
            ],
          },
        ]
      : []),
  ];

  if (edition.table_of_contents) {
    editionInfo.push({
      term: "Table of Contents",
      definition: edition.table_of_contents,
    });
  }
  if (edition.extent) {
    editionInfo.push({
      term: "Extent",
      definition: edition.extent,
    });
  }
  if (edition.volume) {
    editionInfo.push({ term: "Volume", definition: edition.volume });
  }
  if (edition.summary) {
    editionInfo.push({ term: "Summary", definition: edition.summary });
  }

  return (
    <Template>
      <TemplateBreakout>
        <Breadcrumbs
          breadcrumbsData={[
            { url: "/", text: breadcrumbTitles.home },
            {
              url: `/work/${edition.work_uuid}`,
              text: truncateStringOnWhitespace(edition.title, MAX_TITLE_LENGTH),
            },
          ]}
          colorVariant={ColorVariants.Research}
        />
        <SearchHeader />
      </TemplateBreakout>

      <TemplateContent>
        <TemplateContentTop>
          {edition && (
            <Heading level={1} id="edition-title" blockName="page-title">
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
          {featuredInstance && (
            <>
              <Heading level={2} id="featured-edition">
                Featured Copy
              </Heading>

              <div id="featured-edition-card">
                <InstanceCard edition={edition} instance={featuredInstance} />
              </div>
            </>
          )}
        </TemplateContentTop>
        <TemplateContentPrimary>
          <div id="nypl-item-details">
            <HorizontalRule />
            <List listItems={editionInfo} title="Details" type="dl" />
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
            <SimpleGrid columns={1}>
              {edition.instances.map((instance) => (
                <InstanceCard
                  key={instance.instance_id}
                  edition={edition}
                  instance={instance}
                />
              ))}
            </SimpleGrid>
          </div>
        </TemplateContentPrimary>
      </TemplateContent>
    </Template>
  );
};

export default Edition;
