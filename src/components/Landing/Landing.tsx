import React from "react";
import {
  Breadcrumbs,
  ColorVariants,
  Heading,
  HeadingLevels,
  Hero,
  HeroTypes,
  List,
  TemplateContent,
  TemplateBreakout,
  TemplateContentPrimary,
  TemplateContentTop,
  Template,
} from "@nypl/design-system-react-components";
import SearchForm from "~/src/components/SearchForm/SearchForm";
import Subjects from "~/config/subjectListConfig";
import Link from "~/src/components/Link/Link";
import { breadcrumbTitles } from "~/src/constants/labels";

const LandingPage: React.FC<any> = () => {
  const subHeader = (
    <div className="hero__body-text">
      Find millions of digital books for research from multiple sources
      world-wide--all free to read, download, and keep. No library card
      required. This is an early beta test, so we want your feedback!{" "}
      <Link to="/about">Read more about the project</Link>.
    </div>
  );
  return (
    <Template>
      <TemplateBreakout>
        <Breadcrumbs
          breadcrumbsData={[{ url: "/", text: breadcrumbTitles.home }]}
          colorVariant={ColorVariants.Research}
        />
        <Hero
          heroType={HeroTypes.SecondaryResearch}
          heading={
            <Heading
              level={HeadingLevels.One}
              id="research-hero"
              text="Digital Research Books Beta"
            />
          }
          subHeaderText={subHeader}
        />
      </TemplateBreakout>
      <TemplateContent>
        <TemplateContentTop>
          <Heading level={2}>Search the World's Research Collections</Heading>
          <SearchForm />
        </TemplateContentTop>
        <TemplateContentPrimary>
          <Heading level={2}>Search Examples</Heading>
          <List id="nypl-list" noStyling title="Search Examples List" type="ul">
            {Subjects.map((sub: any) => (
              <li key={`subject-link-${sub.url}`}>
                <Link to={sub.url}>{sub.text}</Link>
              </li>
            ))}
          </List>
        </TemplateContentPrimary>
      </TemplateContent>
    </Template>
  );
};

export default LandingPage;
