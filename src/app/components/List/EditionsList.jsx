import React from 'react';
import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import EditionCard from '../Card/EditionCard';


class EditionsList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.getAllEditionsData = this.getAllEditionsData.bind(this);
  }

  getAllEditionsData(work, origin, eReaderUrl, referrer) {
    return work.editions.map(
      (edition) => {
        const showRequestButton = this.props.getRequestEditionButton(edition);
        return EditionCard.getEditionData(work, edition, eReaderUrl, referrer, showRequestButton);
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
      <DS.EditionsList editions={this.getAllEditionsData(work, eReaderUrl, referrer)} />
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
