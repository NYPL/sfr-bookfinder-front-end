import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { formatUrl } from '../../util/Util';


class EBookViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props = props;
  }

  componentDidMount() {
    this.parseQueryToState(this.props.location.query.url);
  }

  parseQueryToState(url) {
    this.setState({ bookUrl: url });
  }

  render() {
    const bookUrl = this.state.bookUrl;

    return (
      <span>
        {bookUrl
      && (
      <iframe
        allowFullScreen
        scrolling="no"
        src={`${formatUrl(bookUrl)}`}
        title="Ebook Frame"
      />
      ) }
      </span>
    );
  }
}


EBookViewer.propTypes = {
  location: PropTypes.objectOf(PropTypes.any),
};

EBookViewer.defaultProps = {
  location: {},
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, null)(withRouter(EBookViewer));
