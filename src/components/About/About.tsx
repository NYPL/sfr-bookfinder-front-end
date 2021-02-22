import React from "react";
import * as DS from "@nypl/design-system-react-components";
import Link from "~/src/components/Link/Link";
import { breadcrumbTitles } from "~/src/constants/labels";

const About: React.FC = () => {
  return (
    <div className="layout-container">
      <main className="main">
        <div className="content-header">
          <DS.Breadcrumbs
            breadcrumbs={[{ url: "/", text: breadcrumbTitles.home }]}
          />
        </div>

        <div className="content-primary">
          <DS.Heading level={1} id="page-title-heading" blockName="page-title">
            <span>
              <span className="rn-section-title__emphasis">
                Digital Research Books
              </span>{" "}
              Beta
            </span>
          </DS.Heading>

          <p>
            Digital Research Books Beta is an experimental project, now in early
            Beta testing, that collects digital versions of research books from
            many different sources, including Open Access publications, into one
            convenient place to search.
          </p>

          <p>
            All the materials in Digital Research Books Beta are completely free
            to read and most of them you can download and keep, with no library
            card required. The books are either in the{" "}
            <Link to="/license">public domain</Link>, with no restrictions on
            your use of them, or under{" "}
            <Link to="/license">Creative Commons licences</Link> that may have
            some conditions, but only on redistribution or adaptation.
          </p>

          <p>
            In addition to collecting these digital editions, we group all the
            editions of the same title together as a single “work.” For instance
            there are many editions of{" "}
            <Link to="/work/e34d73df-f32b-49e1-8fdf-151db2a7806a">
              Mary Wollstonecraft’s A Vindication of the Rights of Woman
            </Link>
            , many of them available digitally. We group them all together under
            a single search result and try to make the differences between
            them--years when and places where they were published, for
            instance--easy to understand.
          </p>

          <DS.Heading
            level={2}
            id="sources-and-data-heading"
            blockName="page-title"
            text="Sources and Data"
          />

          <p>
            The material in Digital Research Books Beta are drawn from several
            public sources, mainly{" "}
            <DS.Link href="https://www.hathitrust.org/">HathiTrust</DS.Link>,{" "}
            <DS.Link href="https://doabooks.org/">
              The Directory of Open Access Books
            </DS.Link>
            , and{" "}
            <DS.Link href="http://www.gutenberg.org/">
              Project Gutenberg
            </DS.Link>
            . We are continuously adding more books from these and other
            sources. We then cross-reference them with library records from NYPL
            and <DS.Link href="https://www.worldcat.org/">WorldCat</DS.Link>,
            using OCLC’s experimental{" "}
            <DS.Link href="http://classify.oclc.org/classify2/">
              Classify
            </DS.Link>{" "}
            service to make connections between different editions of the same
            work.
          </p>

          <DS.Heading
            level={2}
            id="beta-testing-heading"
            blockName="page-title"
            text="What does Beta Testing mean?"
          />

          <p>
            It means that this is a work-in-progress. We are constantly working
            on the interface and trying new ideas to deal with the data. If you
            visit repeatedly, sometimes it may look different. If you search for
            the same thing often, the results may change--hopefully for the
            better as we refine how the search works. There may be errors. The
            cross-referencing is automated and based on millions of library
            records including some that are inaccurate. Part of what we are
            exploring is how to detect and adjust mistakes, and how to make sure
            we don’t introduce any new ones.
          </p>

          <p>
            It also means that the project may change radically. We may change
            the URL. We may learn that a different approach is necessary. We may
            learn that it isn’t useful enough to anyone to continue. If you find
            books in Digital Research Books Beta that are especially useful to
            you, you should download a copy so that you have one no matter what
            becomes of this project.
          </p>

          <p>
            Most of all, it means your feedback is important! Most pages have a
            feedback button in the bottom right corner. We want to know what you
            think. If there are things you like or dislike, if there’s a feature
            missing, if you find an error please tell us in the feedback!
          </p>
        </div>
      </main>
    </div>
  );
};

export default About;
