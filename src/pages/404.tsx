import React from "react";
import Layout from "../components/Layout/Layout";
import Link from "../components/Link/Link";

const NotFound404 = () => (
  <Layout>
    <h1>404 Not Found</h1>

    <p>We&apos;re sorry...</p>

    <p>The page you were looking for doesn&apos;t exist.</p>

    <p>
      Search&nbsp;
      <Link to="/">Digital Research Books Beta</Link>
      {"."}
    </p>
  </Layout>
);

export default NotFound404;
