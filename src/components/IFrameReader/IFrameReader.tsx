import React from "react";
import { useRouter } from "next/router";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { formatUrl } from "~/src/util/Util";

const IFrameReader: React.FC<any> = () => {
  console.log("iframereader called");
  const router = useRouter();
  const bookUrl = router.query.bookUrl;

  return (
    <span>
      <Breadcrumbs />
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
