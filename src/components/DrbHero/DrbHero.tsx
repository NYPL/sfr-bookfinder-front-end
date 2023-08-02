import { Heading, Hero } from "@nypl/design-system-react-components";
import React from "react";

export const DrbHero: React.FC = () => {
  return (
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
  );
};

export default DrbHero;
