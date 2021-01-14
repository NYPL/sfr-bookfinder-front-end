import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

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
    dispatch: () => {},
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

  // getBookTotals() {
  //   this.props.dispatch(searchActions.fetchTotalWorks());
  // }

  render() {
    const { totalWorks } = this.props;

    return (
      <div>
        {totalWorks && (
          <span>Total number of works: {totalWorks.data.counts.works}</span>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state: any) => ({
  totalWorks: state.totalWorks,
});

export default connect(mapStateToProps, null)(TotalWorks);
