import React from "react";

import Layout from "~/src/components/Layout/Layout";
import Landing from "../components/Landing/Landing";

const LandingPage: React.FC<any> = () => {
  return (
    <Layout>
      <Landing />
    </Layout>
  );
};

export default LandingPage;
