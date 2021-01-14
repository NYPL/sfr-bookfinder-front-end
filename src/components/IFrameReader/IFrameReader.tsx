import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as DS from "@nypl/design-system-react-components";
import { formatUrl } from "~/src/util/Util";
import { breadcrumbTitles } from "~/src/constants/labels";
import { editionFetcher } from "~/src/lib/api/SearchApi";
import {
  ApiEdition,
  EditionQuery,
  EditionResult,
} from "~/src/types/EditionQuery";

const IFrameReader: React.FC<any> = () => {
  const router = useRouter();
  const [bookUrl, setBookUrl] = useState(null);
  const [edition, setEdition] = useState<ApiEdition>(null);

  useEffect(() => {
    console.log("editionId", router.query);
    async function fetchEdition(query) {
      console.log("router query", query);
      const editionQuery: EditionQuery = {
        editionIdentifier: query,
      };
      const edition: EditionResult = await editionFetcher(editionQuery);
      console.log("edition", edition);
      setEdition(edition.data);
    }

    setBookUrl(router.query.bookUrl);
    fetchEdition(router.query.editionId);
  }, []);

  return (
    <span>
      {edition && (
        <DS.Breadcrumbs
          breadcrumbs={[
            { url: "/", text: breadcrumbTitles.home },
            { url: `/work/${edition.work_id}`, text: edition.title },
            {
              url: `/edition/${edition.id}`,
              text: `${edition.publication_date} edition`,
            },
          ]}
        />
      )}
      <span>
        {bookUrl && (
          <iframe
            allowFullScreen
            src={`${formatUrl(bookUrl)}`}
            title="Ebook Frame"
          />
        )}
      </span>
    </span>
  );
};

export default IFrameReader;
