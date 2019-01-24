import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component {
  render() {
    return (
      <main>
        <div className="home" id="mainContent">
          <div className="nypl-homepage-hero">
            <div className="nypl-full-width-wrapper">
              <div className="nypl-row">
                <div className="nypl-column-full">
                  <h1>Research Now</h1>
                </div>
              </div>

              <div className="nypl-row">
                <div className="nypl-column-full">
                  <Link to={{ pathname: '/search' }}>Start your search</Link>
                </div>
              </div>

              <div className="nypl-row">
                <div className="nypl-column-full">
                  <p className="nypl-lead">
                    Search the world&apos;s research collections and more for digital books you
                    can use right now.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
