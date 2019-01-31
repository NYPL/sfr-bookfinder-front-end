import React from 'react';
import appConfig from '../../../../appConfig';

const ebookUrl = appConfig.ereader[process.env.APP_ENV];

/**
 * Create a link defaulting to a ebook "download" unless
 * the ebook is hosted by us (link has our S3 bucket pattern)
 * which shows a link to our eReader with the S3 bucket URL as
 * a query parameter.
 * @param {string} url
 * @return {string}
 */
const generateLink = (url) => {
  let link = `${url}`;
  let linkText = 'Download';

  if (url.includes('simplye')) {
    link = `${ebookUrl}?url=${url}`;
    linkText = 'Read Online';
  }

  return (
    <a href={`${link}`}>{`${linkText}`}</a>
  );
};

const EBookList = (ebooks) => {
  return (
    <ul className="nypl-items-list">
      {ebooks.ebooks.map((ebook, ebookKey) => (
        <li key={ebookKey.toString()}>
          {generateLink(ebook.url)} [{ebook.epub_path.split('/').pop()}]
        </li>
      ))}
    </ul>
  );
};

export default EBookList;
