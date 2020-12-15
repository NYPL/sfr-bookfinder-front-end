import React from 'react';
import { bindActionCreators } from 'redux';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { connect } from 'react-redux';
import * as searchActions from '../../actions/SearchActions';

type OwnTotalWorksProps = {
    totalWorks?: {
        [key: string]: any;
    };
    dispatch?: (...args: any[]) => any;
};

type TotalWorksProps = OwnTotalWorksProps & typeof TotalWorks.defaultProps;


class TotalWorks extends React.Component<TotalWorksProps> {
  static defaultProps = {
      totalWorks: { data: { counts: { works: 0 } } },
      dispatch: () => { },
  };

  boundActions: any;

  constructor(props: TotalWorksProps) {
    super(props);
    const { dispatch } = props;
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div>
        {totalWorks && (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
const mapStateToProps = (state: any) => ({
  totalWorks: state.totalWorks
});

export default connect(mapStateToProps, null)(TotalWorks);
