import React from 'react';
import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import EditionCard from '../Card/EditionCard';


class EditionsList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.getAllEditionsData = this.getAllEditionsData.bind(this);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    this.setState({ loaded: true });
  }

  getAllEditionsData(work, editions, origin, eReaderUrl, referrer) {
    /* eslint-disable-next-line no-underscore-dangle */
    return editions.map(
      (edition) => {
        const showRequestButton = this.props.getRequestEditionButton(edition);
        return EditionCard.getEditionData(edition, origin, eReaderUrl, referrer, showRequestButton);
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
    const origin = this.state.loaded ? window.location.origin : '';

    return (
      <DS.EditionsList editions={this.getAllEditionsData(work, editions, origin, eReaderUrl, referrer)} />
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
