import React, { useState } from "react";
import { useRouter } from "next/router";
import { formatUrl } from "~/src/util/Util";
import Loading from "../Loading/Loading";

const IFrameReader: React.FC<any> = () => {
  const router = useRouter();
  const bookUrl = router.query.bookUrl;
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loading />}
      {bookUrl && (
        <iframe
          className="iframe-reader"
          onLoad={() => setLoading(false)}
          allowFullScreen
          src={`${formatUrl(bookUrl)}`}
          title="Ebook Frame"
        />
      )}
    </>
  );
};

export default IFrameReader;
