import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { isEmpty as _isEmpty } from 'underscore';
import { DefinitionList } from './DefinitionList';

class WorkDetail extends React.Component {

  /**
   * Convert JSON object to array for parsing detail elements into
   * a definition list for display.
   * @param {object} detailObject
   * @return {string|null}
   */
  itemDetailsObject(detailObject) {
    return Object.keys(detailObject.item).map(key => (
      [key, detailObject.item[key]]
    ));
  };

  render() {
    if (!this.props.detail && _isEmpty(this.props.detail)) {
      throw new Error('Detail element in props is missing or empty');
    }
    const { detail } = this.props;

    return (
      <main id="mainContent">
        <div className="nypl-page-header">
          <nav aria-label="Breadcrumbs" className="nypl-breadcrumbs" />
        </div>
        <div className="nypl-full-width-wrapper">
          <div className="nypl-row">
            <div className="nypl-column-full">
              <h2>Work Detail</h2>
              <div id="nypl-item-details">
                <DefinitionList
                  data={this.itemDetailsObject(detail)}
                  eReaderUrl={this.props.eReaderUrl}
                />
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
