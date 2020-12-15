import React from "react";
// @ts-expect-error ts-migrate(2614) FIXME: Module '"../../../node_modules/next/link"' has no ... Remove this comment to see the full error message
import { Link } from "next/link";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../../../appConfig' or its ... Remove this comment to see the full error message
import appConfig from "../../../../appConfig";

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
              Digital Research Books Beta
            </Link>
            {"."}
          </p>
        </div>
      </div>
    </div>
  </main>
);

export default NotFound404;
