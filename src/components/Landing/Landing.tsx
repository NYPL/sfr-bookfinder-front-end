import React from "react";
import {
  Box,
  Breadcrumbs,
  // Footer,
  Heading,
  Hero,
  Link,
  Template,
  TemplateAboveHeader,
  TemplateBreakout,
  TemplateContent,
  TemplateContentPrimary,
  TemplateFooter,
  TemplateHeader,
} from "@nypl/design-system-react-components";
import SearchForm from "~/src/components/SearchForm/SearchForm";
import { defaultBreadcrumbs } from "~/src/constants/labels";
import CollectionList from "../CollectionList/CollectionList";
import { Opds2Feed } from "~/src/types/OpdsModel";
import DrbHero from "../DrbHero/DrbHero";

const LandingPage: React.FC<{ collections?: Opds2Feed }> = ({
  collections,
}) => {
  const subHeader = (
    <Box>
      <span>
        Find millions of digital books for research from multiple sources
        world-wide--all free to read, download, and keep. No library card
        required. This is an early beta test, so we want your feedback!{" "}
        <Link href="/about" color="ui.link.primary">
          Read more about the project
        </Link>
        .
      </span>
      <Box marginTop="s">
        <SearchForm />
      </Box>
    </Box>
  );
  return (
    <Template>
      <TemplateBreakout>
        <TemplateAboveHeader>
          <Breadcrumbs
            breadcrumbsType="research"
            breadcrumbsData={defaultBreadcrumbs}
          />
        </TemplateAboveHeader>
        <TemplateHeader>
          <DrbHero />
          <Hero
            backgroundColor="#E9E9E9"
            backgroundImageSrc="https://placeimg.com/2400/800/nature" // TODO: replace with image from Product team
            heroType="primary"
            heading={
              <Heading level="one" id="primary-hero">
                Search the World's Research Collections
              </Heading>
            }
            subHeaderText={subHeader}
            sx={{
              "> div": {
                color: "ui.black",
              },
              "div a": {
                color: "ui.link.primary",
              },
            }}
          />
        </TemplateHeader>
      </TemplateBreakout>
      <TemplateContent>
        <TemplateContentPrimary>
          <Box marginLeft="l" marginRight="l">
            <Heading level="two">Recently Added Collections</Heading>
            <CollectionList collections={collections} />
          </Box>
        </TemplateContentPrimary>
      </TemplateContent>
      <TemplateFooter>{/* <Footer /> */}</TemplateFooter>
    </Template>
  );
};

export default LandingPage;
