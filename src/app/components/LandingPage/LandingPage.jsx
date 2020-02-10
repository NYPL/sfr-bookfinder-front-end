import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
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
      <DS.Container>
        <main id="mainContent">
          <Breadcrumbs
            router={router}
            location={this.props.location}
          />
          <div
            aria-label="ResearchNow"
          >
            <div className="grid-row">
              <div className="sfr-center">
                <DS.HeaderImgRight
                  headerId="ResearchNow-Main-Header"
                  isImageDecorative
                  pageTitleText="ResearchNow"
                  imgUrl="https://placeimg.com/200/100/arch"
                  bodyText={(
                    <p>
                      Find millions of free digital books from the world’s research libraries
                    </p>
                  )}
                />
              </div>
            </div>
            <div className="grid-row">
              <div className="sfr-center">
                <SearchForm />
                {
                // eslint-disable-next-line no-underscore-dangle
                FeatureFlags.store._isFeatureActive(config.booksCount.experimentName)
                && <TotalWorks />
              }
              </div>
            </div>
            <div className="grid-row">
              <div className="sfr-center">
                <DS.IconLinkList
                  titleText="Browse By Subject"
                  titleId="subject-browse-list"
                  textLinks={Subjects}
                />
              </div>
            </div>
          </div>
        </main>
      </DS.Container>
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
