import React from 'react';

import { Header, navConfig } from '@nypl/dgx-header-component';
import Footer from '@nypl/dgx-react-footer';
// import SearchForm from '../Search/SearchForm';
import SearchResultsList from '../Search/SearchResultsList';

class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

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
            <div className="breadcrumb">
              &nbsp;
            </div>
          </div>
          <div className="nypl-full-width-wrapper">
            <div className="nypl-row">
              <div className="nypl-column-full">
                <h1 className="nypl-heading">ResearchNow</h1>
              </div>
            </div>
            <div className="nypl-row">
              <div className="nypl-column-full">
                <div id="tagline">
                  Search the world's research collections and more for digital books you
                  can use right now.
                </div>
              </div>
            </div>
            <div className="nypl-row">
              <div className="nypl-column-full">
                <SearchResultsList />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Application;
