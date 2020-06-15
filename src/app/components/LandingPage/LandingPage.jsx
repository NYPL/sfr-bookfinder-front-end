import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router';
import * as DS from '@nypl/design-system-react-components';
import FeatureFlags from 'dgx-feature-flags';
import SearchForm from '../SearchForm/SearchForm';
import Subjects from '../../../../subjectListConfig';
import * as searchActions from '../../actions/SearchActions';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { checkFeatureFlagActivated } from '../../util/Util';
import TotalWorks from '../SearchForm/TotalWorks';

import featureFlagConfig from '../../../../featureFlagConfig';
import config from '../../../../appConfig';
/**
 * Container class providing the Redux action creators
 * to its child components. State data is passed along
 * including params set in location.
 *
 * Accessibility Note: Creates the <main> element for all
 * search pages with the corresponding <h1>.
 */
class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = { ...props, isFeatureFlagsActivated: {} };

    this.boundActions = bindActionCreators(searchActions, dispatch);
  }

  componentDidMount() {
    this.boundActions.resetSearch();
    FeatureFlags.store.listen(this.onFeatureFlagsChange.bind(this));

    checkFeatureFlagActivated(
      featureFlagConfig.featureFlagList, this.state.isFeatureFlagsActivated,
    );
  }

  componentWillUnmount() {
    FeatureFlags.store.unlisten(this.onFeatureFlagsChange.bind(this));
  }

  onFeatureFlagsChange() {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ featureFlagsStore: FeatureFlags.store.getState() });
  }

  render() {
    const { router } = this.context;

    return (
      <div className="layout-container">
        <main
          id="mainContent"
          className="main"
        >
          <div className="content-header">
            <Breadcrumbs
              router={router}
              location={this.props.location}
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
                  subHeaderText={(
                    <p className="hero__body-text">
                  Find millions of digital books for research
                  from multiple sources world-wide--all free to read, download, and keep. No library card required.
                  This is an early beta test, so we want your feedback!
                      {' '}
                      <DS.Link><Link to="/about">Read more about the project</Link></DS.Link>
                  .
                    </p>
                )}
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
                    href={sub.url}
                  >
                    {sub.text}
                  </DS.Link>
                ))}
              </DS.UnorderedList>
            </div>
          </div>
        </main>
      </div>
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
