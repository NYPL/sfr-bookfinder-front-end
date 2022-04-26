import React from "react";
import {
  Breadcrumbs,
  BreadcrumbsTypes,
  Heading,
  HeadingLevels,
  Hero,
  HeroTypes,
  List,
  ListTypes,
  Template,
  TemplateBreakout,
  TemplateContent,
  TemplateContentPrimary,
  TemplateContentTop,
} from "@nypl/design-system-react-components";
import SearchForm from "~/src/components/SearchForm/SearchForm";
import Subjects from "~/config/subjectListConfig";
import Link from "~/src/components/Link/Link";
import { defaultBreadcrumbs } from "~/src/constants/labels";

const LandingPage: React.FC<any> = () => {
  const subHeader = (
    <div className="hero__body-text">
      Find millions of digital books for research from multiple sources
      world-wide--all free to read, download, and keep. No library card
      required. This is an early beta test, so we want your feedback!{" "}
      <Link to="/about" color="ui.white">
        Read more about the project
      </Link>
      .
    </div>
  );
  return (
    <Template>
      <TemplateBreakout>
        <Breadcrumbs
          breadcrumbsType={BreadcrumbsTypes.Research}
          breadcrumbsData={defaultBreadcrumbs}
        />
        <div
          aria-label="Digital Research Books Beta"
          className="hero-container"
        >
          <Hero
            backgroundColor="section.research.primary"
            heroType={HeroTypes.Tertiary}
            heading={
              <Heading level={HeadingLevels.One} id="tertiary-hero">
                <>
                  Digital Research Books <sup>Beta</sup>
                </>
              </Heading>
            }
            subHeaderText={subHeader}
          />
        </div>
      </TemplateBreakout>
      <TemplateContent>
        <TemplateContentTop>
          Search the World's Research Collections
          <SearchForm />
        </TemplateContentTop>
        <TemplateContentPrimary>
          <Heading level={HeadingLevels.Two}>Search Examples</Heading>

          <List type={ListTypes.Unordered} id="subject-list">
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
