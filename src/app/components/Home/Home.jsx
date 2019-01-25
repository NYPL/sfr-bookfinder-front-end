import React from 'react';
import { withRouter } from 'react-router';
import SearchContainer from '../SearchContainer/SearchContainer';

class Home extends React.Component {
  render() {
    return (
      <SearchContainer />
    );
  }
}

export default withRouter(Home);
