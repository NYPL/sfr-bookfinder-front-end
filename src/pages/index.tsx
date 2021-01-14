import React from "react";

import Layout from "~/src/components/Layout/Layout";
import LandingPage from "../components/Landing/Landing";

const Landing: React.FC<any> = () => {
  return (
    <Layout>
      <LandingPage />
    </Layout>
  );
};

export default Landing;
