import React from "react";
import * as DS from "@nypl/design-system-react-components";
import FeatureFlags from "dgx-feature-flags";
import SearchForm from "~/src/components/SearchForm/SearchForm";
import Subjects from "~/config/subjectListConfig";
import TotalWorks from "~/src/components/TotalWorks/TotalWorks";

import config from "~/config/appConfig";
import Link from "~/src/components/Link/Link";
import { breadcrumbTitles } from "~/src/constants/labels";

const LandingPage: React.FC<any> = () => {
  return (
    <main className="main">
      <div className="content-header">
        <DS.Breadcrumbs
          breadcrumbs={[{ url: "/", text: breadcrumbTitles.home }]}
        />
        <div aria-label="Digital Research Books Beta" className="main-promo">
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
            subHeaderText={
              <div className="hero__body-text">
                Find millions of digital books for research from multiple
                sources world-wide--all free to read, download, and keep. No
                library card required. This is an early beta test, so we want
                your feedback!{" "}
                <DS.Link>
                  <Link to="/about">
                    <>Read more about the project</>
                  </Link>
                </DS.Link>
                .
              </div>
            }
          />
        </div>
      </div>
      <div className="content-primary">
        <div className="searchbar">
          <DS.Heading level={2}>
            Search the World's Research Collections
          </DS.Heading>
          <SearchForm />
          <p>
            Use{" "}
            <Link to="/advanced-search" className="link">
              Advanced Search
            </Link>{" "}
            to narrow your results.
          </p>
        </div>
        {
          // eslint-disable-next-line no-underscore-dangle
          FeatureFlags.store._isFeatureActive(
            config.booksCount.experimentName
          ) && <TotalWorks totalWorks={0} />
        }
      </div>
      <div className="content-primary search-examples">
        <DS.Heading level={2}>Search Examples</DS.Heading>

        <DS.List
          type={DS.ListTypes.Unordered}
          id="subject-list"
          modifiers={["no-list-styling"]}
        >
          {Subjects.map((sub: any) => (
            <li key={`subject-link-${sub.url}`}>
              <DS.Link>
                <Link to={sub.url}>{sub.text}</Link>
              </DS.Link>
            </li>
          ))}
        </DS.List>
      </div>
    </main>
  );
};

export default LandingPage;
