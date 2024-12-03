import React from "react";
import { Banner, Text } from "@nypl/design-system-react-components";
import Link from "../Link/Link";

const SurveyBanner: React.FC = () => {
  return (
    <Banner
      type="recommendation"
      content={
        <>
          <Text>Tell us about your experience by taking a short survey.</Text>
          <Link to="https://www.surveymonkey.com/r/8B37XDL">
            <Text noSpace fontWeight={500}>
              Take the survey
            </Text>
          </Link>
        </>
      }
      heading="Do you use Digital Research Books?"
      marginBottom="l"
    />
  );
};

export default SurveyBanner;
