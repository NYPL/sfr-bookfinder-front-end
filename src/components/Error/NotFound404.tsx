import React from 'react';
import { Link } from 'next/link';

import appConfig from '../../../../appConfig';

const NotFound404 = () => (
  <main
    id="mainContent"
    className="main-content not-found-404"
  >
    <div className="nypl-full-width-wrapper">
      <div>
        <div className="nypl-column-three-quarters">
          <h1>404 Not Found</h1>
          <p>We&apos;re sorry...</p>
          <p>The page you were looking for doesn&apos;t exist.</p>
          <p>
            Search&nbsp;
            <Link to={`${appConfig.baseUrl}/`}>Digital Research Books Beta</Link>
            {'.'}
          </p>
        </div>
      </div>
    </div>
  </main>
);

export default NotFound404;
