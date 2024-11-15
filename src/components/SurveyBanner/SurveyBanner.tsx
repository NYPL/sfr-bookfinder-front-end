import React from "react";
import { Banner, Text } from "@nypl/design-system-react-components";
import Link from "../Link/Link";

const SurveyBanner: React.FC = () => {
  return (
    <Banner
      type="informative"
      content={
        <>
          <Text noSpace>
            Do you use Digital Research Books at the Library? Help us learn
            about your experiences by{" "}
            <Link to="https://www.surveymonkey.com/r/8B37XDL">
              taking a short survey.
            </Link>
          </Text>
        </>
      }
      marginBottom="l"
    />
  );
};

export default SurveyBanner;
