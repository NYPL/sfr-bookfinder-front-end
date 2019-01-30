import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { DefinitionList } from './DefinitionList';

const WorkDetail = (props) => {
  if (!props.detail) {
    return null;
  }
  const { detail } = props;

  /**
   * Convert JSON object to array for parsing detail elements into
   * a definition list for display.
   * @param {object} detailObject
   */
  const itemDetailsObject = (detailObject) => {
    return Object.keys(detailObject.item).map(key => (
      [key, detailObject.item[key]]
    ));
  };

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
              <DefinitionList data={itemDetailsObject(detail)} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
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
