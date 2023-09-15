import React from "react";
import {
  Box,
  Heading,
  Hero,
  Link,
  useNYPLBreakpoints,
} from "@nypl/design-system-react-components";
import SearchForm from "~/src/components/SearchForm/SearchForm";
import CollectionList from "../CollectionList/CollectionList";
import { Opds2Feed } from "~/src/types/OpdsModel";
import DrbHero from "../DrbHero/DrbHero";
import DrbTemplate from "../DrbTemplate/DrbTemplate";

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

  const headerElement = (
    <>
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
    </>
  );

  const contentPrimaryElement = (
    <Box marginLeft="l" marginRight="l">
      <Heading level="two">Recently Added Collections</Heading>
      <CollectionList collections={collections} />
    </Box>
  );

  return (
    <DrbTemplate
      contentPrimary={contentPrimaryElement}
      header={headerElement}
    />
  );
};

export default LandingPage;
