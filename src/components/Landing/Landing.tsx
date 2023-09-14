import React from "react";
import {
  Box,
  Breadcrumbs,
  Heading,
  Hero,
  Link,
  Template,
  TemplateAboveHeader,
  TemplateBreakout,
  TemplateContent,
  TemplateContentPrimary,
  TemplateHeader,
  useNYPLBreakpoints,
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
    <Box
      sx={{
        a: {
          color: "ui.link.primary",
        },
      }}
    >
      <span>
        Find millions of digital books for research from multiple sources
        world-wide--all free to read, download, and keep. No library card
        required. This is an early beta test, so we want your feedback!{" "}
        <Link href="/about">Read more about the project</Link>.
      </span>
      <Box marginTop="s">
        <SearchForm />
      </Box>
    </Box>
  );

  const {
    isLargerThanMedium,
    isLargerThanMobile,
    isLargerThanLarge,
    isLargerThanXLarge,
  } = useNYPLBreakpoints();

  let backgroundImageSrc =
    "https://drb-files-qa.s3.amazonaws.com/hero/heroDesktop2x.jpg";
  if (isLargerThanXLarge) {
    backgroundImageSrc =
      "https://drb-files-qa.s3.amazonaws.com/hero/heroDesktop2x.jpg";
  } else if (isLargerThanLarge) {
    backgroundImageSrc =
      "https://drb-files-qa.s3.amazonaws.com/hero/heroDesktop.jpg";
  } else if (isLargerThanMedium) {
    backgroundImageSrc =
      "https://drb-files-qa.s3.amazonaws.com/hero/heroTabletLarge.jpg";
  } else if (isLargerThanMobile) {
    backgroundImageSrc =
      "https://drb-files-qa.s3.amazonaws.com/hero/heroTabletSmall.jpg";
  } else {
    backgroundImageSrc =
      "https://drb-files-qa.s3.amazonaws.com/hero/heroMobile.jpg";
  }

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
            backgroundImageSrc={backgroundImageSrc}
            foregroundColor="black"
            heroType="primary"
            heading={
              <Heading level="one" id="primary-hero">
                Search the World's Research Collections
              </Heading>
            }
            subHeaderText={subHeader}
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
    </Template>
  );
};

export default LandingPage;
