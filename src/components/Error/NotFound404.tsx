import React from 'react';
// @ts-expect-error ts-migrate(2614) FIXME: Module '"../../../node_modules/next/link"' has no ... Remove this comment to see the full error message
import { Link } from 'next/link';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../../../appConfig' or its ... Remove this comment to see the full error message
import appConfig from '../../../../appConfig';

const NotFound404 = () => (
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <main
    id="mainContent"
    className="main-content not-found-404"
  >
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <div className="nypl-full-width-wrapper">
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="nypl-column-three-quarters">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <h1>404 Not Found</h1>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <p>We&apos;re sorry...</p>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <p>The page you were looking for doesn&apos;t exist.</p>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <p>
            Search&nbsp;
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Link to={`${appConfig.baseUrl}/`}>Digital Research Books Beta</Link>
            {'.'}
          </p>
        </div>
      </div>
    </div>
  </main>
);

export default NotFound404;
