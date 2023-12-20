import React from "react";

import { Instance, WorkEdition } from "~/src/types/DataModel";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeading,
  Flex,
} from "@nypl/design-system-react-components";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import Link from "../Link/Link";
import { useCookies } from "react-cookie";
import { NYPL_SESSION_ID } from "~/src/constants/auth";
import Ctas from "../EditionCard/Ctas";
import PublisherAndLocation from "../EditionCard/PublisherAndLocation";
import WorldCat from "./WorldCat";
import CardRequiredBadge from "../EditionCard/CardRequiredBadge";
import FeaturedEditionBadge from "../EditionCard/FeaturedEditionBadge";
import PhysicalEditionBadge from "../EditionCard/PhysicalEditionBadge";
import ScanAndDeliverBlurb from "../EditionCard/ScanAndDeliverBlurb";

// Creates an Instance card out of the Edition Year and Instance object
// Note: Edition Year only needs to be passed because `instance.publication_date`
// is not formatted in an easy to read manner
// the way that Edition.publication_year is.

export const InstanceCard: React.FC<{
  edition: WorkEdition;
  instance: Instance;
  isFeaturedEdition?: boolean;
}> = (props) => {
  // cookies defaults to be undefined if not fonud
  const [cookies] = useCookies([NYPL_SESSION_ID]);

  const edition = props.edition;
  const instance: Instance = props.instance;
  const isFeaturedEdition = props.isFeaturedEdition;
  const previewItem = EditionCardUtils.getPreviewItem(instance.items);
  const isPhysicalEdition = EditionCardUtils.isPhysicalEdition(previewItem);

  return (
    <Box
      border="1px"
      borderColor="ui.border.default"
      padding="s"
      paddingBottom="l"
      paddingRight="l"
    >
      <Flex gap="xs" flexDirection={{ base: "column", md: "row" }}>
        {isPhysicalEdition && <CardRequiredBadge />}
        {isFeaturedEdition && <FeaturedEditionBadge />}
      </Flex>
      <Card
        imageProps={{
          src: EditionCardUtils.getCover(edition.links),
          size: "xsmall",
          aspectRatio: "original",
          alt: "Cover",
        }}
        layout="row"
        isAlignedRightActions
        id={`card-${instance.instance_id}`}
        paddingTop="m"
      >
        <CardHeading
          level="h3"
          size="heading6"
          sx={{ span: { fontSize: "18px" } }}
        >
          <Flex alignItems="center">
            <span>
              {edition.publication_date
                ? edition.publication_date
                : "Edition Year Unknown"}
            </span>
            {isPhysicalEdition && <PhysicalEditionBadge />}
          </Flex>
        </CardHeading>
        <CardContent>
          <div>
            <PublisherAndLocation
              pubPlace={instance.publication_place}
              publishers={instance.publishers}
            />
          </div>
          <WorldCat instance={instance} />
          <Link to="/license">{EditionCardUtils.getLicense(previewItem)}</Link>
          {isPhysicalEdition && <ScanAndDeliverBlurb />}
        </CardContent>
        <CardActions
          display="flex"
          flexDir="column"
          whiteSpace="nowrap"
          gap="xs"
        >
          <Ctas
            item={previewItem}
            title={instance.title}
            isLoggedIn={!!cookies[NYPL_SESSION_ID]}
          />
        </CardActions>
      </Card>
    </Box>
  );
};
