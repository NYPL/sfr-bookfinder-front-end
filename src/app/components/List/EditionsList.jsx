import React from 'react';
import PropTypes from 'prop-types';
import FeatureFlags from 'dgx-feature-flags';
import featureFlagConfig from '../../../../featureFlagConfig';
import { checkFeatureFlagActivated } from '../../util/Util';
import * as DS from '@nypl/design-system-react-components';
import EditionCard from '../Card/EditionCard';
import FormattedAPACitation from '../Citations/APACitation';

import config from '../../../../appConfig';


class EditionsList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = { isFeatureFlagsActivated: {} };

    this.getAllEditionsData = this.getEditionCardList.bind(this);
    this.onFeatureFlagsChange = this.onFeatureFlagsChange.bind(this);
  }

  componentDidMount() {
    FeatureFlags.store.listen(this.onFeatureFlagsChange.bind(this));

    checkFeatureFlagActivated(
      featureFlagConfig.featureFlagList, this.state.isFeatureFlagsActivated,
    );
  }

  onFeatureFlagsChange() {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ featureFlagsStore: FeatureFlags.store.getState() });
  }

  getEditionCardList(work, eReaderUrl, referrer) {
    return work.editions.map(
      (edition, index) => {
        const showRequestButton = this.props.getRequestEditionButton(edition);
        const editionData = EditionCard.getEditionData(work, edition, eReaderUrl, referrer, showRequestButton);

        const shouldShowCitations = FeatureFlags.store._isFeatureActive(config.displayCitations.experimentName);
        const citationElement = shouldShowCitations ? (
          <FormattedAPACitation
            work={work}
            edition={edition}
          />
        ) : undefined;

        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`"editions-list-"${index}`}>
            <DS.EditionCard
              id={`"editions-list-"${index}`}
              coverUrl={editionData.coverUrl}
              editionHeadingElement={editionData.editionYearHeading}
              editionInfo={editionData.editionInfo}
              readOnlineLink={editionData.readOnlineLink}
              downloadLink={editionData.downloadLink}
              noLinkElement={editionData.noLinkElement}
            >
            </DS.EditionCard>
            {citationElement} 
          </div>
        );
      },
    );
  }

  render() {
    const {
      work, eReaderUrl, referrer,
    } = this.props;

    const editions = work.editions;
    if (!editions || editions.length === 0) {
      return null;
    }

    return (
      // <>{this.getEditionCardList(work, eReaderUrl, referrer)}</>
      <DS.UnorderedList>{this.getEditionCardList(work, eReaderUrl, referrer)}</DS.UnorderedList>
    );
  }
}

EditionsList.propTypes = {
  work: PropTypes.objectOf(PropTypes.any),
  eReaderUrl: PropTypes.string,
  referrer: PropTypes.string,
  getRequestEditionButton: PropTypes.func,
};

EditionsList.defaultProps = {
  work: { instances: [] },
  eReaderUrl: '',
  referrer: '',
  getRequestEditionButton: () => {},
};

export default EditionsList;
