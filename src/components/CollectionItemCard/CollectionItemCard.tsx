import React from "react";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeading,
} from "@nypl/design-system-react-components";
import Link from "../Link/Link";
import { useCookies } from "react-cookie";
import { NYPL_SESSION_ID } from "~/src/constants/auth";
import { OpdsPublication } from "~/src/types/OpdsModel";
import CollectionUtils from "~/src/util/CollectionUtils";
import {
  MAX_PLACE_LENGTH,
  MAX_PUBLISHER_NAME_LENGTH,
} from "~/src/constants/editioncard";
import { truncateStringOnWhitespace } from "~/src/util/Util";

// Creates an Collection item card out of the collectionItem object
export const CollectionItemCard: React.FC<{
  collectionItem: OpdsPublication;
}> = ({ collectionItem }) => {
  // cookies defaults to be undefined if not fonud
  const [cookies] = useCookies([NYPL_SESSION_ID]);

  const EditionYear = () => {
    const editionDisplay =
      `${collectionItem.metadata.published} Edition` ?? "Edition Year Unknown";
    return collectionItem ? (
      <Link
        to={{
          pathname: collectionItem.links.find(
            (link) => link.rel === "alternate"
          ).href,
        }}
      >
        {editionDisplay}
      </Link>
    ) : (
      <>{editionDisplay}</>
    );
  };

  const PublisherAndLocation = ({ pubPlace, publisher }) => {
    const publisherDisplayLocation = (pubPlace: string) => {
      return pubPlace
        ? ` in ${truncateStringOnWhitespace(pubPlace, MAX_PLACE_LENGTH)}`
        : "";
    };

    const publisherDisplayText = (publisher: string) => {
      if (!publisher) return "";
      return ` by ${truncateStringOnWhitespace(
        publisher,
        MAX_PUBLISHER_NAME_LENGTH
      )}`;
    };

    const displayLocation = publisherDisplayLocation(pubPlace);
    const displayName = publisherDisplayText(publisher);
    if (!displayLocation && !displayName)
      return <>Publisher and Location Unknown</>;
    const publisherText = `Published${displayLocation}${displayName}`;
    return <>{publisherText}</>;
  };

  // Language Display
  const LanguageDisplayText = ({ language }) => {
    if (language) {
      const languageText = `Languages: ${language}`;
      return <>{languageText}</>;
    }
    return <>Languages: Undetermined</>;
  };

  // Rights
  const License = ({ rights }) => {
    return rights ? (
      <>License: {rights.rightsStatement}</>
    ) : (
      <>License: Unknown</>
    );
  };

  const Ctas = ({ links, title, isLoggedIn }) => {
    const readOnlineLink = CollectionUtils.getReadOnlineLink(links);
    const downloadLink = CollectionUtils.getDownloadLink(links, title);

    // If a digital version exists, link directly
    if (readOnlineLink || downloadLink) {
      return (
        <>
          <Box>{readOnlineLink}</Box>
          <Box>{downloadLink}</Box>
        </>
      );
    }

    const eddLink = links
      ? links.find(
          (link) =>
            link.identifier === "requestable" || link.identifier === "catalog"
        )
      : undefined;

    // Offer EDD if available
    if (eddLink !== undefined) {
      const eddElement = CollectionUtils.getEddLinkElement(eddLink, isLoggedIn);
      return <>{eddElement}</>;
    }

    return <>{CollectionUtils.getNoLinkElement(false)}</>;
  };

  return (
    <Card
      imageProps={{
        src: CollectionUtils.getCover(collectionItem),
        size: "xsmall",
        aspectRatio: "original",
        alt: "Cover",
      }}
      layout="row"
      isBordered
      isAlignedRightActions
      id={`card-${CollectionUtils.getId(collectionItem.links)}`}
      p="s"
    >
      <CardHeading level="three">
        <EditionYear />
      </CardHeading>
      <CardContent>
        <Box>
          <PublisherAndLocation
            pubPlace={collectionItem.metadata.locationCreated}
            publisher={collectionItem.metadata.publisher}
          />
        </Box>
        <Box>
          <LanguageDisplayText language={collectionItem.metadata.language} />
        </Box>
        <Link to="/license">
          <License rights={collectionItem.metadata.rights} />
        </Link>
      </CardContent>
      <CardActions display="flex" flexDir="column" whiteSpace="nowrap" gap={4}>
        <Ctas
          links={collectionItem.links}
          title={collectionItem.metadata.title}
          isLoggedIn={!!cookies[NYPL_SESSION_ID]}
        />
      </CardActions>
    </Card>
  );
};
