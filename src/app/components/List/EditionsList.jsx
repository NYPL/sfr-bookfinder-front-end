import React from 'react';
import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import FeatureFlags from 'dgx-feature-flags';
import EditionCard from '../Card/EditionCard';

import { checkFeatureFlagActivated } from '../../util/Util';
import featureFlagConfig from '../../../../featureFlagConfig';
import config from '../../../../appConfig';

const getAllEditionsData = (editions, origin, eReaderUrl, referrer, shouldShowRequest) => editions.map(
  edition => EditionCard.getEditionData(edition, origin, eReaderUrl, referrer, shouldShowRequest),
);

class EditionsList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { loaded: false, isFeatureFlagsActivated: {} };
  }

  componentDidMount() {
    this.setState({ loaded: true });
    FeatureFlags.store.listen(this.onFeatureFlagsChange.bind(this));

    checkFeatureFlagActivated(
      featureFlagConfig.featureFlagList, this.state.isFeatureFlagsActivated,
    );
  }

  onFeatureFlagsChange() {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ featureFlagsStore: FeatureFlags.store.getState() });
  }

  render() {
    const {
      work, eReaderUrl, referrer,
    } = this.props;

    const editions = work.editions;
    if (!editions || editions.length === 0) {
      return null;
    }
    const origin = this.state.loaded ? window.location.origin : '';
    // eslint-disable-next-line no-underscore-dangle
    const shouldShowRequest = FeatureFlags.store._isFeatureActive(config.requestDigital.experimentName);

    return (
      <DS.EditionsList editions={getAllEditionsData(editions, origin, eReaderUrl, referrer, shouldShowRequest)} />
    );
  }
}

EditionsList.propTypes = {
  work: PropTypes.objectOf(PropTypes.any),
  eReaderUrl: PropTypes.string,
  referrer: PropTypes.string,
};

EditionsList.defaultProps = {
  work: { instances: [] },
  eReaderUrl: '',
  referrer: '',
};

export default EditionsList;
