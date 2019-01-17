import React from 'react';

import { Header, navConfig } from '@nypl/dgx-header-component';
import Footer from '@nypl/dgx-react-footer';
import SearchContainer from '../SearchContainer/SearchContainer';

class Application extends React.Component {
  render() {
    return (
      <div className="app-wrapper">
        <Header
          skipNav={{ target: 'mainContent' }}
          navData={navConfig.current}
          urlType="absolute"
        />
        <main id="mainContent">
          {
            // Replace the following with your code. The #mainContent ID is needed for an
            // accessible skip nav from the Header component.
          }
          <div className="nypl-page-header">
            <div className="breadcrumb"></div>
          </div>
          <div className="nypl-full-width-wrapper">
            <div className="nypl-row">
              <div className="nypl-column-full">
                <h1 className="nypl-heading">ResearchNow</h1>
              </div>
            </div>
            <SearchContainer />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Application;
