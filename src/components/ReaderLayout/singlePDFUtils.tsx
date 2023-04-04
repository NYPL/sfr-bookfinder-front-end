import { Fetcher } from "swr";
import { addTocToManifest } from "@nypl/web-reader";
/**
 * This is a function we will use to get the resource through a given proxy url.
 * It will eventually be passed to the web reader instead of passing a proxy url directly.
 */
const getProxiedResource = (proxyUrl?: string) => async (href: string) => {
  // Generate the resource URL using the proxy
  const url: string = proxyUrl
    ? `${proxyUrl}${encodeURIComponent(href)}`
    : href;

  console.log("proxyUrl", proxyUrl);
  const response = await fetch(url, { mode: "cors" });
  const array = new Uint8Array(await response.arrayBuffer());

  if (!response.ok) {
    throw new Error("Response not Ok for URL: " + url);
  }
  console.log("Array: ", array);
  return array;
};

export const fetchAndModifyManifest =
  (proxyUrl: string): Fetcher<string, string> =>
  async (url) => {
    console.log("isServer? ", typeof document);
    const pdfWorkerSrc = `${origin}/pdf-worker/pdf.worker.min.js`;
    const response = await fetch(url);
    const manifest = await response.json();
    const modifiedManifest = await addTocToManifest(
      manifest,
      getProxiedResource(proxyUrl),
      pdfWorkerSrc
    );
    console.log("modifiedManifest", modifiedManifest);
    const syntheticUrl = URL.createObjectURL(
      new Blob([JSON.stringify(modifiedManifest)])
    );
    console.log("syntheticUrl", syntheticUrl);
    return syntheticUrl;
  };
