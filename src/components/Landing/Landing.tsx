import React from "react";
import {
  Breadcrumbs,
  Heading,
  Hero,
  Link,
  List,
  Template,
  TemplateBreakout,
  TemplateContent,
  TemplateContentPrimary,
  TemplateContentTop,
} from "@nypl/design-system-react-components";
import SearchForm from "~/src/components/SearchForm/SearchForm";
import Subjects from "~/config/subjectListConfig";
import { defaultBreadcrumbs } from "~/src/constants/labels";

const LandingPage: React.FC<any> = () => {
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
          <Heading level="two">Search Examples</Heading>

          <List type="ul" id="subject-list">
            {Subjects.map((sub: any) => (
              <li key={`subject-link-${sub.url}`}>
                <Link href={sub.url}>{sub.text}</Link>
              </li>
            ))}
          </List>
        </TemplateContentPrimary>
      </TemplateContent>
    </Template>
  );
};

export default LandingPage;
