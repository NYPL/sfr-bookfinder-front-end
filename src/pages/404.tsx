import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Link/Link' or... Remove this comment to see the full error message
import Link from "~/src/components/Link/Link";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/config/appConfig' or its cor... Remove this comment to see the full error message
import appConfig from "~/config/appConfig";

const NotFound404 = () => (
  <main id="mainContent" className="main-content not-found-404">
    <div className="nypl-full-width-wrapper">
      <div>
        <div className="nypl-column-three-quarters">
          <h1>404 Not Found</h1>

          <p>We&apos;re sorry...</p>

          <p>The page you were looking for doesn&apos;t exist.</p>

          <p>
            Search&nbsp;
            <Link to={`${appConfig.baseUrl}/`}>
              <a>Digital Research Books Beta</a>
            </Link>
            {"."}
          </p>
        </div>
      </div>
    </div>
  </main>
);

export default NotFound404;
