import { Flex, Icon, Text } from "@nypl/design-system-react-components";
import React from "react";
import Link from "../Link/Link";
import { SCAN_AND_DELIVER_LINK } from "~/src/constants/links";

export const ScanAndDeliverBlurb: React.FC = () => {
  return (
    <Flex alignItems="center" marginTop="s">
      <Icon name="errorOutline" size="small" />
      <Text size="caption" noSpace marginLeft="xxs">
        A partial scan of this edition can be requested via NYPL's{" "}
        <Link to={SCAN_AND_DELIVER_LINK}>Scan and Deliver</Link> service
      </Text>
    </Flex>
  );
};
