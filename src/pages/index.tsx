import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router, { withRouter } from 'next/router';
import * as DS from '@nypl/design-system-react-components';
import FeatureFlags from 'dgx-feature-flags';
import SearchForm from '~/src/components/SearchForm/SearchForm';
import Subjects from '~/config/subjectListConfig';
import * as searchActions from '~/src/actions/SearchActions';
import Breadcrumbs from '~/src/components/Breadcrumbs/Breadcrumbs';
import { checkFeatureFlagActivated } from '~/src/util/Util';
import TotalWorks from '~/src/components/SearchForm/TotalWorks';

import featureFlagConfig from '~/config/featureFlagConfig';
import config from '~/config/appConfig';
import Layout from '~/src/components/Application/Layout';
import Link from '~/src/components/Link/Link';


class LandingPage extends React.Component {
  
  constructor(props) {
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
        <main
          id="mainContent"
          className="main"
        >
           <div className="content-header"> 
           <Breadcrumbs
              location={Router.location}
            />
            <div
              aria-label="Digital Research Books Beta"
              className="main-promo"
            >
              <DS.SectionName>
                <DS.Hero
                  heroType={DS.HeroTypes.Secondary}
                  heading={(
                    <DS.Heading
                      level={1}
                      id="1"
                      text="Digital Research Books Beta"
                      blockName="hero"
                    />
                )}
                  subHeaderText={
                    <p className="hero__body-text">
                  Find millions of digital books for research
                  from multiple sources world-wide--all free to read, download, and keep. No library card required.
                  This is an early beta test, so we want your feedback!
                      {' '}
                      <DS.Link><Link to="/about"><>Read more about the project</></Link></DS.Link> 
                  .
                    </p>
                }
                />
              </DS.SectionName>
              <SearchForm />
              {
                // eslint-disable-next-line no-underscore-dangle
                FeatureFlags.store._isFeatureActive(config.booksCount.experimentName)
                && <TotalWorks />
              }

            </div>
            <div className="content-primary search-examples">
              <DS.SectionTitle
                id="subject-browse-title"
                headingText="Search Examples"
              >
              </DS.SectionTitle>
              <DS.UnorderedList
                id="subject-list"
                blockName="list-iconLink"
              >
                {Subjects.map((sub, idx) => (
                  <DS.Link
                      // eslint-disable-next-line react/no-array-index-key
                    key={`subject-link${idx}`}
                  >
                    <Link to={sub.url}>
                      {sub.text}
                    </Link>
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

LandingPage.propTypes = {
  dispatch: PropTypes.func,
  location: PropTypes.objectOf(PropTypes.any),
};

LandingPage.defaultProps = {
  dispatch: () => { },
  location: {},
};

LandingPage.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = (state, ownProps) => ({
  searchResults: state.searchResults || ownProps.searchResults,
  searchQuery: state.searchQuery || ownProps.searchQuery,
});

export default connect(
  mapStateToProps,
  null,
)(withRouter(LandingPage));

