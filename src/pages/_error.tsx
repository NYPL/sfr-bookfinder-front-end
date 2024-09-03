import React, { useContext } from "react";
import { NextPageContext } from "next";
import Layout from "../components/Layout/Layout";
import Link from "../components/Link/Link";
import {
  Box,
  Button,
  Flex,
  Heading,
} from "@nypl/design-system-react-components";
import { FeedbackContext } from "../context/FeedbackContext";

const getHeading = (statusCode) => {
  if (statusCode === 500) {
    return "500 - Server Error";
  } else if (statusCode === 404) {
    return "404 - Page Not Found";
  } else if (statusCode === 400) {
    return "400 - Bad Request";
  } else {
    return "";
  }
};

const getDescription = (statusCode) => {
  if (statusCode === 500) {
    return "Oops! Something went wrong while loading this page.";
  } else if (statusCode === 404) {
    return "Oops! We couldn't find the page you were looking for.";
  } else if (statusCode === 400) {
    return "We weren't able to process your request.";
  } else {
    return "";
  }
};

const Error = ({ statusCode }) => {
  const { onOpen } = useContext(FeedbackContext);
  return (
    <Layout>
      <Flex
        alignItems="center"
        flexDir="column"
        textAlign="center"
        role="alert"
      >
        <Heading marginTop="l" marginBottom="s">
          {getHeading(statusCode)}
        </Heading>
        <Box>{getDescription(statusCode)}</Box>
        <Box>
          Please try again or{" "}
          <Button
            buttonType="text"
            display="inline-block"
            id="contact-button"
            onClick={onOpen}
            size="large"
            padding="0"
          >
            contact us
          </Button>{" "}
          if the error persists.
        </Box>
        <Box width="fit-content" marginTop="xl" marginBottom="xxl">
          <Link to="/" linkType="buttonPrimary">
            Back to DRB homepage
          </Link>
        </Box>
      </Flex>
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
