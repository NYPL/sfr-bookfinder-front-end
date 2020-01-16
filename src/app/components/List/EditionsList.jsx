import React from 'react';
import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import {
  editionYearElem, getCover, getLanguageDisplayText, getLicense, getReadOnlineLink, getDownloadLink, getPublisherAndLocation,
} from '../SearchResults/ResultsList';

const getAllEditionsData = (editions, origin, eReaderUrl, referrer) => editions.map((edition) => {
  const editionYearHeadingElement = editionYearElem(edition);
  const editionItem = edition && edition.items ? edition.items[0] : undefined;

  return {
    editionYearHeading: editionYearHeadingElement,
    publisherAndLocation: getPublisherAndLocation(edition),
    coverUrl: getCover(edition),
    language: getLanguageDisplayText(edition),
    license: getLicense(editionItem),
    readOnlineLink: getReadOnlineLink(origin, editionItem, eReaderUrl, referrer),
    downloadLink: getDownloadLink(editionItem),
  };
});

class EditionsList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { loaded: false };
  }

  componentDidMount() {
    this.setState({ loaded: true });
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
      <DS.EditionsList editions={getAllEditionsData(editions, origin, eReaderUrl, referrer)} />
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
