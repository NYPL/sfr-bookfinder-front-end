import React from "react";
import { NextPageContext } from "next";
import Layout from "../components/Layout/Layout";
import Link from "../components/Link/Link";

const Error = ({ statusCode }) => {
  return (
    <Layout>
      <main className="main">
        <p>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
        </p>
        <p>
          Search&nbsp;
          <Link to="/">Digital Research Books Beta</Link>
          {"."}
        </p>
      </main>
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
