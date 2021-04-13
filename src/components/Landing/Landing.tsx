import React from "react";
import * as DS from "@nypl/design-system-react-components";
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
    <main className="main">
      <div className="content-header">
        <DS.Breadcrumbs
          breadcrumbs={[{ url: "/", text: breadcrumbTitles.home }]}
        />
        <div
          aria-label="Digital Research Books Beta"
          className="hero-container"
        >
          <DS.Hero
            heroType={DS.HeroTypes.Secondary}
            heading={
              <DS.Heading
                level={1}
                id="1"
                text="Digital Research Books Beta"
                blockName="hero"
              />
            }
            subHeaderText={subHeader}
          />
        </div>
      </div>
      <div className="content-primary">
        <div className="searchbar-container">
          <div className="searchbar">
            <div className="bar-content">
              <DS.Heading level={2}>
                Search the World's Research Collections
              </DS.Heading>
              <SearchForm />
            </div>
            <p className="advanced-search-message">
              Use{" "}
              <Link to="/advanced-search" className="link">
                Advanced Search
              </Link>{" "}
              to narrow your results.
            </p>
          </div>
        </div>
      </div>
      <div className="content-primary search-examples">
        <DS.Heading level={2}>Search Examples</DS.Heading>

        <DS.List type={DS.ListTypes.Unordered} id="subject-list">
          {Subjects.map((sub: any) => (
            <li key={`subject-link-${sub.url}`}>
              <Link to={sub.url}>{sub.text}</Link>
            </li>
          ))}
        </DS.List>
      </div>
    </main>
  );
};

export default LandingPage;
