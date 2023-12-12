import React from "react";
import {
  Card,
  CardContent,
  CardHeading,
  Box,
  CardActions,
  Flex,
} from "@nypl/design-system-react-components";
import Link from "../Link/Link";
import { WorkEdition } from "~/src/types/DataModel";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import { PLACEHOLDER_COVER_LINK } from "~/src/constants/editioncard";
import { useCookies } from "react-cookie";
import { NYPL_SESSION_ID } from "~/src/constants/auth";
import { PhysicalEditionBadge } from "./PhysicalEditionBadge";
import { ScanAndDeliverBlurb } from "./ScanAndDeliverBlurb";

export const EditionCard: React.FC<{ edition: WorkEdition; title: string }> = ({
  edition,
  title,
}) => {
  const [cookies] = useCookies([NYPL_SESSION_ID]);

  const previewItem = EditionCardUtils.getPreviewItem(edition.items);

  const editionYearElem = (edition: WorkEdition) => {
    const editionDisplay = EditionCardUtils.editionYearText(edition);

    const editionElem = edition ? (
      <Link
        to={{
          pathname: `/edition/${edition.edition_id}`,
          ...(previewItem
            ? { query: { featured: previewItem.item_id } }
            : null),
        }}
      >
        {editionDisplay}
      </Link>
    ) : (
      <>{editionDisplay}</>
    );
    return editionElem;
  };

  const coverUrl = EditionCardUtils.getCover(edition.links);
  const isPhysicalEdition = EditionCardUtils.isPhysicalEdition(previewItem);

  return (
    <Card
      id={`card-${edition.edition_id}`}
      layout="row"
      imageProps={{
        src: coverUrl,
        alt:
          coverUrl === PLACEHOLDER_COVER_LINK
            ? "Placeholder Cover"
            : `Cover for ${EditionCardUtils.editionYearText(edition)}`,
        size: "xsmall",
        aspectRatio: "original",
      }}
      isCentered
      isBordered
      isAlignedRightActions
      p="s"
      flexFlow={{ md: "column nowrap", lg: "row" }}
      alignItems={{ md: "flex-start", lg: "center" }}
      sx={{ ".card-right": { maxWidth: { base: "100%", md: "200px" } } }}
    >
      <CardHeading
        level="h3"
        size="heading6"
        id="stack1-heading1"
        sx={{
          span: {
            fontSize: "18px",
            a: {
              textDecoration: "none",
            },
          },
        }}
      >
        <Flex alignItems="center">
          <span>{editionYearElem(edition)}</span>
          {isPhysicalEdition && <PhysicalEditionBadge />}
        </Flex>
      </CardHeading>
      <CardContent>
        <Box>
          {EditionCardUtils.getPublisherAndLocation(
            edition.publication_place,
            edition.publishers
          )}
          <Box>{EditionCardUtils.getLanguageDisplayText(edition)}</Box>
          <Link to="/license">{EditionCardUtils.getLicense(previewItem)}</Link>
        </Box>
        {isPhysicalEdition && <ScanAndDeliverBlurb />}
      </CardContent>
      <CardActions display="flex" flexDir="column" whiteSpace="nowrap" gap={4}>
        {EditionCardUtils.getCtas(
          previewItem,
          title,
          !!cookies[NYPL_SESSION_ID]
        )}
      </CardActions>
    </Card>
  );
};

export default EditionCard;
