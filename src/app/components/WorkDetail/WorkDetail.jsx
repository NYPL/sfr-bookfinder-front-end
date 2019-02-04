import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { DefinitionList } from './DefinitionList';

class WorkDetail extends React.Component {
  constructor(props, context) {
    super(props);
    this.props = props;
    this.context = context;
  }

  /**
   * Convert JSON object to array for parsing detail elements into
   * a definition list for display.
   * @param {object} detailObject
   */
  itemDetailsObject(detailObject) {
    return Object.keys(detailObject.item).map(key => (
      [key, detailObject.item[key]]
    ));
  };

  render() {
    if (!this.props.detail) {
      return null;
    }
    const { detail } = this.props;

    return (
      <main id="mainContent">
        <div className="nypl-page-header">
          <div className="breadcrumb" />
        </div>
        <div className="nypl-full-width-wrapper">
          <div className="nypl-row">
            <div className="nypl-column-full">
              <h2>Work Detail</h2>
              <div id="nypl-item-details">
                <DefinitionList data={this.itemDetailsObject(detail)} eReaderUrl={this.props.eReaderUrl} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

WorkDetail.propTypes = {
  eReaderUrl: PropTypes.string,
};

WorkDetail.defaultProps = {
  eReaderUrl: '',
};

const mapStateToProps = (state, ownProps) => {
  return { 
    detail: state.workDetail,
  };
};

export default connect(
  mapStateToProps,
  null,
)(withRouter(WorkDetail));
