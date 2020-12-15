import React from 'react';
import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import EditionCard from '../Card/EditionCard';


class InstancesList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.getInstanceCardList = this.getInstanceCardList.bind(this);
  }

  getInstanceCardList(edition, eReaderUrl, referrer) {
    return edition.instances.map(
      (instance, index) => {
        const showRequestButton = this.props.getRequestEditionButton(edition);
        const editionYearHeadingElement = <>{EditionCard.editionYearText(edition)}</>;
        const editionData = EditionCard.getInstanceData(edition, instance, eReaderUrl, referrer, showRequestButton);
        return (
          <DS.EditionCard
            id={`"instance-list-"${index}`}
            // eslint-disable-next-line react/no-array-index-key
            key={`"instance-list-"${index}`}
            coverUrl={editionData.coverUrl}
            editionHeadingElement={editionYearHeadingElement}
            editionInfo={editionData.editionInfo}
            readOnlineLink={editionData.readOnlineLink}
            downloadLink={editionData.downloadLink}
            noLinkElement={editionData.noLinkElement}
          >
          </DS.EditionCard>
        );
      },
    );
  }

  render() {
    const {
      edition, eReaderUrl, referrer,
    } = this.props;
    const instances = edition.instances;
    if (!instances || instances.length === 0) {
      return null;
    }

    return (
      <DS.UnorderedList>{this.getInstanceCardList(edition, eReaderUrl, referrer)}</DS.UnorderedList>
    );
  }
}

InstancesList.propTypes = {
  edition: PropTypes.objectOf(PropTypes.any),
  eReaderUrl: PropTypes.string,
  referrer: PropTypes.string,
  getRequestEditionButton: PropTypes.func,
};

InstancesList.defaultProps = {
  edition: { instances: [] },
  eReaderUrl: '',
  referrer: '',
  getRequestEditionButton: () => {},
};

export default InstancesList;
