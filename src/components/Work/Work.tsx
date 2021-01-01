import React from "react";
import { useRouter } from "next/router";
import * as DS from "@nypl/design-system-react-components";
import Breadcrumbs from "~/src/components/Breadcrumbs/Breadcrumbs";
import { joinArrayOfElements } from "~/src/util/Util";
import {
  EditionCard,
  EditionCardUtils,
} from "~/src/components/Card/EditionCard";
import WorkDetailDefinitionList from "~/src/components/Detail/WorkDetailDefinitionList";
import { WorkQuery, WorkResult } from "~/src/types/WorkQuery";
import { ApiWork } from "~/src/types/DataModel";
import SearchForm from "../SearchForm/SearchForm";

//TODO: Scroll to hash removed, needs to be re-added
// const scrollToHash = (hash) => {
//   const hashtag = hash && hash.replace(/#/, '');
//   if (hashtag) {
//     const element = global.document.getElementById(hashtag);
//     if (element) {
//       element.scrollIntoView();
//       element.focus();
//     }
//   }
// };

const WorkDetail: React.FC<{ workResult: WorkResult }> = (props) => {
  console.log("props", props);
  const router = useRouter();

  //TODO: Loading
  if (!props.workResult) return <>Loading</>;

  const { pathname, query } = router;

  const work: ApiWork = props.workResult.data;

  //Edition Card Preprossing
  const authorsList = EditionCardUtils.getAuthorsList(
    EditionCardUtils.getPreferredAgent(work.agents, "author"),
    "work-detail-header"
  );

  const firstReadableEdition = work.editions.find(
    (edition: any) =>
      edition.items &&
      edition.items.length &&
      edition.items[0].links &&
      edition.items[0].links.length
  );

  const toggleShowAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push({
      pathname,
      query: {
        ...query,
        showAll: !e.target.checked,
      },
    });
  };

  return (
    <div className="layout-container">
      {/* TODO RequestDigital {this.state.requestedEdition && this.getRequestDigital(work)} */}

      <main id="mainContent" className="main">
        <div className="content-header">
          <Breadcrumbs />

          <SearchForm />
        </div>

        <div className="content-primary">
          <div className="nypl-item-header">
            <DS.Heading level={1} id="work-title" blockName="page-title">
              {work.title}
            </DS.Heading>

            {work.sub_title && (
              <div className="search-result-item__subtitle">
                {work.sub_title}
              </div>
            )}
            {authorsList && authorsList.length && (
              <span>By {joinArrayOfElements(authorsList, ", ")}</span>
            )}
          </div>

          <div>
            <DS.Heading level={2} id="featured-edition">
              Featured Edition
            </DS.Heading>
          </div>

          <div>
            <EditionCard edition={firstReadableEdition}></EditionCard>
          </div>

          <div id="nypl-item-details">
            <WorkDetailDefinitionList work={work} />
            {work.editions && (
              <>
                <div className="all-editions-header">
                  <h3
                    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
                    tabIndex="-1"
                    id="all-editions"
                    className="all-editions-tag bold"
                  >
                    All Editions
                  </h3>

                  <DS.Checkbox
                    name="show-all"
                    checkboxId="show-all-editions"
                    labelOptions={{
                      id: "show-all-label",

                      labelContent: (
                        <>Show only items currently available online</>
                      ),
                    }}
                    isSelected={router.query.showAll === "false"}
                    onChange={(e) => toggleShowAll(e)}
                  />
                </div>
                <DS.List
                  type={DS.ListTypes.Unordered}
                  modifiers={["no-list-styling"]}
                >
                  {work.editions.map((edition) => (
                    <li>
                      <EditionCard edition={edition}></EditionCard>
                    </li>
                  ))}
                </DS.List>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkDetail;
