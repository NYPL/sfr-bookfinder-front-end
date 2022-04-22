import React from "react";
import {
  Card,
  CardContent,
  CardHeading,
  Grid,
  GridItem,
  HeadingLevels,
  ImageRatios,
  ImageSizes,
  LayoutTypes,
  Box,
} from "@nypl/design-system-react-components";
import Link from "../Link/Link";
import { WorkEdition } from "~/src/types/DataModel";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import { PLACEHOLDER_COVER_LINK } from "~/src/constants/editioncard";
import { useCookies } from "react-cookie";
import { NYPL_SESSION_ID } from "~/src/constants/auth";

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

  return (
    <Card
      id={`card-${edition.edition_id}`}
      layout={LayoutTypes.Row}
      imageProps={{
        src: coverUrl,
        alt:
          coverUrl === PLACEHOLDER_COVER_LINK
            ? "Placeholder Cover"
            : `Cover for ${EditionCardUtils.editionYearText(edition)}`,
        size: ImageSizes.ExtraSmall,
        aspectRatio: ImageRatios.Original,
      }}
      isCentered
      isBordered
    >
      <CardHeading level={HeadingLevels.Four} id="stack1-heading1">
        {editionYearElem(edition)}
      </CardHeading>
      <CardContent>
        <Grid
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap="32"
        >
          <GridItem colSpan={2}>
            {EditionCardUtils.getPublisherAndLocation(
              edition.publication_place,
              edition.publishers
            )}
            <Box>{EditionCardUtils.getLanguageDisplayText(edition)}</Box>
            <Link to="/license">
              {EditionCardUtils.getLicense(previewItem)}
            </Link>
          </GridItem>
          <GridItem colSpan={1}>
            {EditionCardUtils.getCtas(
              previewItem,
              title,
              !!cookies[NYPL_SESSION_ID]
            )}
          </GridItem>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EditionCard;
