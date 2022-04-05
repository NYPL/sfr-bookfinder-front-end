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
          breadcrumbsType={BreadcrumbsTypes.Research}
          breadcrumbsData={[{ url: "/", text: breadcrumbTitles.home }]}
        />
        <div
          aria-label="Digital Research Books Beta"
          className="hero-container"
        >
          <Hero
            heroType={HeroTypes.SecondaryResearch}
            heading={
              <Heading
                level={HeadingLevels.One}
                id="1"
                text="Digital Research Books Beta"
              />
            }
            subHeaderText={subHeader}
          />
        </div>
      </TemplateBreakout>
      <TemplateContent>
        <TemplateContentTop>
          <Heading level={HeadingLevels.Two}>
            Search the World's Research Collections
          </Heading>
          <SearchForm />
          <p className="advanced-search-message">
            Use{" "}
            <Link to="/advanced-search" className="link">
              Advanced Search
            </Link>{" "}
            to narrow your results.
          </p>
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
