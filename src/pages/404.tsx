import { TemplateAppContainer } from "@nypl/design-system-react-components";
import React from "react";
import DrbBreakout from "../components/DrbBreakout/DrbBreakout";
import Layout from "../components/Layout/Layout";
import Link from "../components/Link/Link";

const NotFound404 = () => {
  const contentPrimaryElement = (
    <>
      <h1>404 Not Found</h1>

      <p>We&apos;re sorry...</p>

      <p>The page you were looking for doesn&apos;t exist.</p>

      <p>
        Search&nbsp;
        <Link to="/">Digital Research Books Beta</Link>
        {"."}
      </p>
    </>
  );

  return (
    <Layout>
      <TemplateAppContainer
        breakout={<DrbBreakout />}
        contentPrimary={contentPrimaryElement}
      />
    </Layout>
  );
};

export default NotFound404;
