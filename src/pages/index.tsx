import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Router, { withRouter } from "next/router";
import * as DS from "@nypl/design-system-react-components";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'dgx-... Remove this comment to see the full error message
import FeatureFlags from "dgx-feature-flags";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/SearchForm/Se... Remove this comment to see the full error message
import SearchForm from "~/src/components/SearchForm/SearchForm";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/config/subjectListConfig' or... Remove this comment to see the full error message
import Subjects from "~/config/subjectListConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/actions/SearchActions' o... Remove this comment to see the full error message
import * as searchActions from "~/src/actions/SearchActions";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Breadcrumbs/B... Remove this comment to see the full error message
import Breadcrumbs from "~/src/components/Breadcrumbs/Breadcrumbs";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/util/Util' or its corres... Remove this comment to see the full error message
import { checkFeatureFlagActivated } from "~/src/util/Util";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/SearchForm/To... Remove this comment to see the full error message
import TotalWorks from "~/src/components/SearchForm/TotalWorks";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/config/featureFlagConfig' or... Remove this comment to see the full error message
import featureFlagConfig from "~/config/featureFlagConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/config/appConfig' or its cor... Remove this comment to see the full error message
import config from "~/config/appConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Application/L... Remove this comment to see the full error message
import Layout from "~/src/components/Application/Layout";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Link/Link' or... Remove this comment to see the full error message
import Link from "~/src/components/Link/Link";

type OwnLandingPageProps = {
  dispatch?: (...args: any[]) => any;
  location?: {
    [key: string]: any;
  };
};

type LandingPageState = any;

type LandingPageProps = OwnLandingPageProps & typeof LandingPage.defaultProps;

class LandingPage extends React.Component<LandingPageProps, LandingPageState> {
  static defaultProps = {
    dispatch: () => {},
    location: {},
  };

  static contextTypes = {
    router: PropTypes.objectOf(PropTypes.any),
    history: PropTypes.objectOf(PropTypes.any),
  };

  boundActions: any;

  constructor(props: LandingPageProps) {
    super(props);
    this.state = { ...props, isFeatureFlagsActivated: {} };

    this.boundActions = bindActionCreators(searchActions, this.props.dispatch);
  }

  componentDidMount() {
    this.boundActions.resetSearch();
    // FeatureFlags.store.listen(this.onFeatureFlagsChange.bind(this));

    // checkFeatureFlagActivated(
    //   featureFlagConfig.featureFlagList, this.state.isFeatureFlagsActivated,
    // );
  }

  // componentWillUnmount() {
  //   FeatureFlags.store.unlisten(this.onFeatureFlagsChange.bind(this));
  // }

  // onFeatureFlagsChange() {
  //   // eslint-disable-next-line react/no-unused-state
  //   this.setState({ featureFlagsStore: FeatureFlags.store.getState() });
  // }

  render() {
    const router = Router;

    return (
      <Layout>
        <div className="layout-container">
          <main id="mainContent" className="main">
            <div className="content-header">
              <Breadcrumbs
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'location' does not exist on type 'Single... Remove this comment to see the full error message
                location={Router.location}
              />

              <div
                aria-label="Digital Research Books Beta"
                className="main-promo"
              >
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
                        Find millions of digital books for research from
                        multiple sources world-wide--all free to read, download,
                        and keep. No library card required. This is an early
                        beta test, so we want your feedback!{" "}
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
      </Layout>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  searchResults: state.searchResults || ownProps.searchResults,
  searchQuery: state.searchQuery || ownProps.searchQuery,
});

export default connect(
  mapStateToProps,
  null
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'typeof LandingPage' is not assig... Remove this comment to see the full error message
)(withRouter(LandingPage));
