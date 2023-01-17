import React from "react";
import {
  Box,
  Breadcrumbs,
  Footer,
  Heading,
  Hero,
  Link,
  Template,
  TemplateBreakout,
  TemplateContent,
  TemplateContentPrimary,
  TemplateContentTop,
  TemplateFooter,
} from "@nypl/design-system-react-components";
import SearchForm from "~/src/components/SearchForm/SearchForm";
import { defaultBreadcrumbs } from "~/src/constants/labels";
import CollectionList from "../CollectionList/CollectionList";
import { Opds2Feed } from "~/src/types/OpdsModel";

const LandingPage: React.FC<{ collections?: Opds2Feed }> = ({
  collections,
}) => {
  const subHeader = (
    <span>
      Find millions of digital books for research from multiple sources
      world-wide--all free to read, download, and keep. No library card
      required. This is an early beta test, so we want your feedback!{" "}
      <Link href="/about" _hover={{ color: "ui.white" }} color="ui.white">
        Read more about the project
      </Link>
      .
    </span>
  );
  return (
    <Template>
      <TemplateBreakout>
        <Breadcrumbs
          breadcrumbsType="research"
          breadcrumbsData={defaultBreadcrumbs}
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
          subHeaderText={subHeader}
        />
      </TemplateBreakout>
      <TemplateContent>
        <TemplateContentTop>
          Search the World's Research Collections
          <SearchForm />
        </TemplateContentTop>
        <TemplateContentPrimary>
          <Box marginLeft="l" marginRight="l">
            <Heading level="two">Recently Added Collections</Heading>
            <CollectionList collections={collections} />
          </Box>
        </TemplateContentPrimary>
      </TemplateContent>
      <TemplateFooter>
        <Footer />
      </TemplateFooter>
    </Template>
  );
};

export default LandingPage;
