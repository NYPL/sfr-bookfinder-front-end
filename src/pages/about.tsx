/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import * as DS from "@nypl/design-system-react-components";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Link/Link' or... Remove this comment to see the full error message
import Link from "~/src/components/Link/Link";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Breadcrumbs/B... Remove this comment to see the full error message
import Breadcrumbs from '~/src/components/Breadcrumbs/Breadcrumbs';

type OwnProps = {
    location?: {
        [key: string]: any;
    };
};

type Props = OwnProps & typeof About.defaultProps;

class About extends React.Component<Props> {

static defaultProps = {
    location: {},
};

static contextTypes = {
    router: PropTypes.objectOf(PropTypes.any),
};

//   componentDidMount() {
//     global.window.scrollTo(0, 0);
//   }

  render() {
    const { router } = this.context;

    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="layout-container">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <main className="main">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="content-header">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Breadcrumbs router={router} location={this.props.location} />
          </div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="content-primary">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <DS.Heading
              level={1}
              id="page-title-heading"
              blockName="page-title"
            >
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <span>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <span className="rn-section-title__emphasis">
                  Digital Research Books
                </span>{" "}
                Beta
              </span>
            </DS.Heading>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <p>
              Digital Research Books Beta is an experimental project, now in
              early Beta testing, that collects digital versions of research
              books from many different sources, including Open Access
              publications, into one convenient place to search.
            </p>

            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <p>
              All the materials in Digital Research Books Beta are completely
              free to read and most of them you can download and keep, with no
              library card required. The books are either in the{" "}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Link to="/license">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <a>public domain</a>
              </Link>
              , with no restrictions on your use of them, or under{" "}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Link to="/license">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <a>Creative Commons licences</a>
              </Link>{" "}
              that may have some conditions, but only on redistribution or
              adaptation.
            </p>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <p>
              In addition to collecting these digital editions, we group all the
              editions of the same title together as a single “work.” For
              instance there are many editions of{" "}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <DS.Link>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Link to="/work?recordType=editions&workId=e34d73df-f32b-49e1-8fdf-151db2a7806a&showAll=true">
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <a>
                    Mary Wollstonecraft’s A Vindication of the Rights of Woman
                  </a>
                </Link>
              </DS.Link>
              , many of them available digitally. We group them all together
              under a single search result and try to make the differences
              between them--years when and places where they were published, for
              instance--easy to understand.
            </p>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <DS.Heading
              level={2}
              id="sources-and-data-heading"
              blockName="page-title"
              text="Sources and Data"
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <p>
              The material in Digital Research Books Beta are drawn from several
              public sources, mainly{" "}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <DS.Link href="https://www.hathitrust.org/">HathiTrust</DS.Link>,{" "}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <DS.Link href="https://doabooks.org/">
                The Directory of Open Access Books
              </DS.Link>
              , and{" "}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <DS.Link href="http://www.gutenberg.org/">
                Project Gutenberg
              </DS.Link>
              . We are continuously adding more books from these and other
              sources. We then cross-reference them with library records from
              NYPL and{" "}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <DS.Link href="https://www.worldcat.org/">WorldCat</DS.Link>,
              using OCLC’s experimental{" "}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <DS.Link href="http://classify.oclc.org/classify2/">
                Classify
              </DS.Link>{" "}
              service to make connections between different editions of the same
              work.
            </p>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <DS.Heading
              level={2}
              id="beta-testing-heading"
              blockName="page-title"
              text="What does Beta Testing mean?"
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <p>
              It means that this is a work-in-progress. We are constantly
              working on the interface and trying new ideas to deal with the
              data. If you visit repeatedly, sometimes it may look different. If
              you search for the same thing often, the results may
              change--hopefully for the better as we refine how the search
              works. There may be errors. The cross-referencing is automated and
              based on millions of library records including some that are
              inaccurate. Part of what we are exploring is how to detect and
              adjust mistakes, and how to make sure we don’t introduce any new
              ones.
            </p>

            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <p>
              It also means that the project may change radically. We may change
              the URL. We may learn that a different approach is necessary. We
              may learn that it isn’t useful enough to anyone to continue. If
              you find books in Digital Research Books Beta that are especially
              useful to you, you should download a copy so that you have one no
              matter what becomes of this project.
            </p>

            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <p>
              Most of all, it means your feedback is important! Most pages have
              a feedback button in the bottom right corner. We want to know what
              you think. If there are things you like or dislike, if there’s a
              feature missing, if you find an error please tell us in the
              feedback!
            </p>
          </div>
        </main>
      </div>
    );
  }
}

export default About;
