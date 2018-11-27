import { Link } from 'react-router';

import appConfig from '../../../../appConfig';

const NotFound404 = () => {
  return (
    <main id="mainContent" className="not-found-404">
      <div className="nypl-full-width-wrapper">
        <div className="nypl-row">
          <div className="nypl-column-three-quarters">
            <h1>404 Not Found</h1>
            <p>We're sorry...</p>
            <p>The page you were looking for doesn't exist.</p>
            <p>
              Search <Link to={`${appConfig.baseUrl}/`}>
              ResearchNow</Link>.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound404;
