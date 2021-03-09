import React, { useEffect, useState } from "react";
import * as DS from "@nypl/design-system-react-components";
import { breadcrumbTitles } from "~/src/constants/labels";
import { useRouter } from "next/router";
import {
  ApiEdition,
  EditionQuery,
  EditionResult,
} from "~/src/types/EditionQuery";
import { editionFetcher } from "~/src/lib/api/SearchApi";

//The NYPL wrapper that wraps the Reader pages.
const ReaderLayout: React.FC<any> = ({ children }) => {
  const router = useRouter();
  const editionId = router.query.editionId;
  const [bookUrl, setBookUrl] = useState(router.query.bookUrl);
  const [edition, setEdition] = useState<ApiEdition>(null);

  useEffect(() => {
    async function fetchEdition(query) {
      const editionQuery: EditionQuery = {
        editionIdentifier: query,
      };
      const edition: EditionResult = await editionFetcher(editionQuery);
      setEdition(edition.data);
    }
    if (bookUrl && editionId) {
      setBookUrl(bookUrl);
      fetchEdition(editionId);
    }
  }, [bookUrl, editionId]);

  return (
    <>
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
      {children}
    </>
  );
};

export default ReaderLayout;
