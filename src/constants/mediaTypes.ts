//Read should have `application/pdf` as well but the reader doesn't support it yet
export const MediaTypes = {
  read: ["application/epub+zip", "application/webpub+json", "application/pdf"],
  download: ["application/pdf"],
  edd: ["application/html+edd"],
  embed: ["text/html"],
  display: ["image/jpeg", "image/png"],
};
