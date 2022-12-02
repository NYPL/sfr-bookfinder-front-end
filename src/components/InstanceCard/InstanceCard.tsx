import React from "react";

import { Instance, WorkEdition } from "~/src/types/DataModel";
import {
  Card,
  CardActions,
  CardContent,
  CardHeading,
  useColorMode,
} from "@nypl/design-system-react-components";
import EditionCardUtils from "~/src/util/EditionCardUtils";
import Link from "../Link/Link";
import { useCookies } from "react-cookie";
import { NYPL_SESSION_ID } from "~/src/constants/auth";

// Creates an Instance card out of the Edition Year and Instance object
// Note: Edition Year only needs to be passed because `instance.publication_date`
// is not formatted in an easy to read manner
// the way that Edition.publication_year is.

export const InstanceCard: React.FC<{
  edition: WorkEdition;
  instance: Instance;
}> = (props) => {
  // cookies defaults to be undefined if not fonud
  const [cookies] = useCookies([NYPL_SESSION_ID]);
  const { colorMode } = useColorMode();

  const edition = props.edition;
  const instance: Instance = props.instance;
  const previewItem = EditionCardUtils.getPreviewItem(instance.items);

  return (
    <Card
      imageProps={{
        src: EditionCardUtils.getCover(edition.links, colorMode),
        size: "xsmall",
        aspectRatio: "original",
        alt: "Cover",
      }}
      layout="row"
      isBordered
      isAlignedRightActions
      id={`card-${instance.instance_id}`}
      p="s"
    >
      <CardHeading level="three">
        {edition.publication_date
          ? edition.publication_date
          : "Edition Year Unknown"}
      </CardHeading>
      <CardContent>
        <div>
          {EditionCardUtils.getPublisherAndLocation(
            instance.publication_place,
            instance.publishers
          )}
        </div>
        <div>{EditionCardUtils.getWorldCatElem(instance)}</div>
        <Link to="/license">{EditionCardUtils.getLicense(previewItem)}</Link>
      </CardContent>
      <CardActions display="flex" flexDir="column" whiteSpace="nowrap" gap={4}>
        {EditionCardUtils.getCtas(
          previewItem,
          instance.title,
          !!cookies[NYPL_SESSION_ID]
        )}
      </CardActions>
    </Card>
  );
};
