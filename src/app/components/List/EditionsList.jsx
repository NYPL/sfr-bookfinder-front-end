import React from 'react';
import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import EditionCard from '../Card/EditionCard';


class EditionsList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.getAllEditionsData = this.getEditionCardList.bind(this);
  }

  getEditionCardList(work, eReaderUrl, referrer) {
    return work.editions.map(
      (edition, index) => {
        const showRequestButton = this.props.getRequestEditionButton(edition);
        const editionData = EditionCard.getEditionData(work, edition, eReaderUrl, referrer, showRequestButton);
        return (
          <DS.EditionCard
            id={`"editions-list-"${index}`}
            // eslint-disable-next-line react/no-array-index-key
            key={`"editions-list-"${index}`}
            coverUrl={editionData.coverUrl}
            editionHeadingElement={editionData.editionYearHeading}
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
