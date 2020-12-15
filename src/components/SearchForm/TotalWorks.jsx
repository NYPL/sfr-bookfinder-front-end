import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import * as searchActions from '../../actions/SearchActions';


class TotalWorks extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.boundActions = bindActionCreators(searchActions, dispatch);
  }

  componentDidMount() {
    this.getBookTotals();
  }

  getBookTotals() {
    this.props.dispatch(searchActions.fetchTotalWorks());
  }

  render() {
    const { totalWorks } = this.props;

    return (
      <div>
        {totalWorks && (
          <span>
            Total number of works:
            {' '}
            {totalWorks.data.counts.works}
          </span>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({ totalWorks: state.totalWorks });

TotalWorks.propTypes = {
  totalWorks: PropTypes.objectOf(PropTypes.any),
  dispatch: PropTypes.func,
};

TotalWorks.defaultProps = {
  totalWorks: { data: { counts: { works: 0 } } },
  dispatch: () => { },
};

export default connect(mapStateToProps, null)(TotalWorks);
