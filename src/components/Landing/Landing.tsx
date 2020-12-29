import React from "react";
import { useRouter } from "next/router";
import * as DS from "@nypl/design-system-react-components";
import FeatureFlags from "dgx-feature-flags";
import SearchForm from "~/src/components/SearchForm/SearchForm";
import Subjects from "~/config/subjectListConfig";
import Breadcrumbs from "~/src/components/Breadcrumbs/Breadcrumbs";
import TotalWorks from "~/src/components/SearchForm/TotalWorks";

import config from "~/config/appConfig";
import Link from "~/src/components/Link/Link";

const LandingPage: React.FC<any> = () => {
  const router = useRouter();

  return (
    <div className="layout-container">
      <main id="mainContent" className="main">
        <div className="content-header">
          <Breadcrumbs location={router} />

          <div aria-label="Digital Research Books Beta" className="main-promo">
            <DS.SectionName>
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
                  <p className="hero__body-text">
                    Find millions of digital books for research from multiple
                    sources world-wide--all free to read, download, and keep. No
                    library card required. This is an early beta test, so we
                    want your feedback!{" "}
                    <DS.Link>
                      <Link to="/about">
                        <>Read more about the project</>
                      </Link>
                    </DS.Link>
                    .
                  </p>
                }
              />
            </DS.SectionName>

            <SearchForm />
            {
              // eslint-disable-next-line no-underscore-dangle
              FeatureFlags.store._isFeatureActive(
                config.booksCount.experimentName
              ) && <TotalWorks />
            }
          </div>

          <div className="content-primary search-examples">
            <DS.SectionTitle
              id="subject-browse-title"
              headingText="Search Examples"
            ></DS.SectionTitle>

            <DS.UnorderedList id="subject-list" blockName="list-iconLink">
              {Subjects.map((sub: any, idx: any) => (
                <DS.Link
                  // eslint-disable-next-line react/no-array-index-key
                  key={`subject-link${idx}`}
                >
                  <Link to={sub.url}>{sub.text}</Link>
                </DS.Link>
              ))}
            </DS.UnorderedList>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
