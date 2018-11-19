import React from 'react';

import { Header, navConfig } from '@nypl/dgx-header-component';
import Footer from '@nypl/dgx-react-footer';
import SearchForm from '../Search/SearchForm';
import Store from '../../stores/Store';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
  }

  render() {
    return (
      <div className="app-wrapper">
        <Header
          skipNav={{ target: 'mainContent' }}
          navData={navConfig.current}
          urlType='absolute'
        />
        <main id="mainContent">
          {
            // Replace the following with your code. The #mainContent ID is needed for an
            // accessible skip nav from the Header component.
          }
          <div className="nypl-page-header">
            <div className="breadcrumb">
              {/* <Breadcrumb /> */}
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
                <SearchForm />
                <div id="tagline">
                  Search the world's research collections and more for digital books you
                  can use right now.
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
