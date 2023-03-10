import React, { useState } from "react";
import {
  Box,
  Breadcrumbs,
  Flex,
  Footer,
  Form,
  Heading,
  Hero,
  HorizontalRule,
  Pagination,
  SimpleGrid,
  Template,
  TemplateBreakout,
  TemplateContent,
  TemplateContentPrimary,
  TemplateContentTop,
  TemplateFooter,
} from "@nypl/design-system-react-components";
import { collectionSortMap } from "~/src/constants/sorts";
import {
  toApiCollectionQuery,
  toLocationQuery,
} from "~/src/util/apiConversion";
import { defaultBreadcrumbs } from "~/src/constants/labels";
import { truncateStringOnWhitespace } from "~/src/util/Util";
import { MAX_TITLE_LENGTH } from "~/src/constants/editioncard";
import {
  CollectionQuery,
  CollectionQueryDefaults,
  CollectionResult,
} from "~/src/types/CollectionQuery";
import CollectionUtils from "~/src/util/CollectionUtils";
import ResultsSorts from "../ResultsSorts/ResultsSorts";
import { useRouter } from "next/router";
import { CollectionItemCard } from "../CollectionItemCard/CollectionItemCard";
import Link from "../Link/Link";
import Loading from "../Loading/Loading";

const Collection: React.FC<{
  collectionQuery: CollectionQuery;
  collectionResult: CollectionResult;
}> = ({ collectionQuery, collectionResult }) => {
  const router = useRouter();
  const [currentCollectionQuery, setCollectionQuery] = useState({
    ...CollectionQueryDefaults,
    ...collectionQuery,
  });

  if (!collectionResult) return <Loading />;

  const collectionId = CollectionUtils.getId(collectionResult.links);

  const collectionMetadata = collectionResult.metadata;
  const itemsPerPage = collectionMetadata.itemsPerPage;
  const totalItems = collectionMetadata.numberOfItems;
  const lastPageLink =
    collectionResult.links[collectionResult.links.length - 1].href;
  const lastPage = parseInt(
    lastPageLink.substring(lastPageLink.indexOf("=") + 1)
  );
  const firstElement = (collectionMetadata.currentPage - 1) * itemsPerPage + 1;
  const lastElement =
    currentCollectionQuery.page <= lastPage
      ? collectionMetadata.currentPage * itemsPerPage
      : totalItems;

  const pageCount = Math.ceil(
    collectionMetadata.numberOfItems / currentCollectionQuery.perPage
  );

  const getSortValue = () => {
    const sortValue = Object.keys(collectionSortMap).find(
      (key) => collectionSortMap[key].field === currentCollectionQuery.sort
    );
    return collectionSortMap[sortValue];
  };

  const sendCollectionQuery = async (collectionQuery: CollectionQuery) => {
    router.push({
      pathname: `/collection/${collectionQuery.identifier}`,
      query: toLocationQuery(toApiCollectionQuery(collectionQuery)),
    });
  };

  const onChangePerPage = (e) => {
    e.preventDefault();
    const newPage = 0;
    const newPerPage = e.target.value;
    if (newPerPage !== currentCollectionQuery.perPage) {
      const newCollectionQuery: CollectionQuery = Object.assign(
        {},
        currentCollectionQuery,
        {
          page: newPage,
          perPage: newPerPage,
        }
      );
      setCollectionQuery(newCollectionQuery);
      sendCollectionQuery(newCollectionQuery);
    }
  };

  const onChangeSort = (e) => {
    e.preventDefault();
    if (
      e.target.value !==
      Object.keys(collectionSortMap).find(
        (key) => collectionSortMap[key].field === currentCollectionQuery.sort
      )
    ) {
      const newCollectionQuery: CollectionQuery = Object.assign(
        {},
        currentCollectionQuery,
        {
          sort: collectionSortMap[e.target.value].field,
        }
      );
      setCollectionQuery(newCollectionQuery);
      sendCollectionQuery(newCollectionQuery);
    }
  };

  const onPageChange = (select: number) => {
    const newCollectionQuery: CollectionQuery = Object.assign(
      {},
      currentCollectionQuery,
      {
        page: select,
      }
    );
    setCollectionQuery(newCollectionQuery);
    sendCollectionQuery(newCollectionQuery);
  };

  return (
    <Template>
      <TemplateBreakout>
        <Breadcrumbs
          breadcrumbsType="research"
          breadcrumbsData={[
            ...defaultBreadcrumbs,
            {
              url: `/collection/${collectionId}`,
              text: truncateStringOnWhitespace(
                collectionMetadata.title,
                MAX_TITLE_LENGTH
              ),
            },
          ]}
        />
        <Hero
          backgroundColor="section.research.primary"
          heroType="tertiary"
          heading={
            <Heading level="one" id="tertiary-hero">
              <>
                Digital Research Books <sup>Beta</sup>
              </>
            </Heading>
          }
        />
      </TemplateBreakout>

      <TemplateContent>
        <TemplateContentTop>
          <Heading size="primary" marginBottom="xl">
            {`Collection - ${collectionMetadata.title}`}
          </Heading>
          <Heading size="secondary" marginBottom="l">
            About this collection
          </Heading>
          <Box>{collectionMetadata.description}</Box>
        </TemplateContentTop>
        <TemplateContentPrimary>
          <HorizontalRule bg="section.research.primary" marginBottom="xl" />
          <Heading size="secondary">In this collection</Heading>
          <Flex justify="space-between" marginBottom="xl" align="center">
            <Heading level="two" size="tertiary" noSpace>
              {totalItems > 0
                ? `Viewing ${firstElement.toLocaleString()} - ${
                    totalItems < lastElement
                      ? totalItems.toLocaleString()
                      : lastElement.toLocaleString()
                  } of ${totalItems.toLocaleString()} items`
                : "Viewing 0 items"}
            </Heading>
            <Form id="results-sorts-form">
              <ResultsSorts
                perPage={currentCollectionQuery.perPage}
                sort={getSortValue()}
                sortMap={collectionSortMap}
                onChangePerPage={(e) => onChangePerPage(e)}
                onChangeSort={(e) => onChangeSort(e)}
              />
            </Form>
          </Flex>
          <SimpleGrid columns={1} gap="l">
            {collectionResult.publications.map((pub, c) => {
              return (
                <Box key={`collection-item-${c}`}>
                  <Heading level="two" marginBottom="xs">
                    <Link
                      to={{
                        pathname: pub.links.find(
                          (link) => link.rel === "alternate"
                        ).href,
                      }}
                      className="link link--no-underline"
                    >
                      {truncateStringOnWhitespace(
                        pub.metadata.title,
                        MAX_TITLE_LENGTH
                      )}
                    </Link>
                  </Heading>
                  {pub.metadata.subtitle && (
                    <Box marginBottom="xs">{pub.metadata.subtitle}</Box>
                  )}
                  {CollectionUtils.getAuthor(pub.metadata.creator) && (
                    <Box marginBottom="xs">
                      By {CollectionUtils.getAuthor(pub.metadata.creator)}{" "}
                    </Box>
                  )}
                  <CollectionItemCard collectionItem={pub}></CollectionItemCard>
                </Box>
              );
            })}
          </SimpleGrid>
          <Pagination
            pageCount={pageCount}
            initialPage={collectionMetadata.currentPage}
            onPageChange={(e) => onPageChange(e)}
            __css={{ paddingTop: "m" }}
          />
        </TemplateContentPrimary>
      </TemplateContent>
      <TemplateFooter>
        <Footer />
      </TemplateFooter>
    </Template>
  );
};

export default Collection;
