//Read should have `application/pdf` as well but the reader doesn't support it yet
export const MediaTypes = {
  read: ["application/epub+xml", "application/webpub+json"],
  download: ["application/pdf", "application/epub+zip", "text/html"],
  edd: ["application/html+edd"],
  embed: ["text/html"],
  display: ["image/jpeg", "image/png"],
};
