import React from 'react';
import PropTypes from 'prop-types';

const downloadLabels = {
  external_view: 'Read Online',
  pdf_download: 'Download',
};

/**
 * Create a link defaulting to an ebook "download" unless
 * the ebook is hosted by us (link has our S3 bucket pattern)
 * which shows a link to our eReader with the S3 bucket URL as
 * a query parameter.
 * NOTE: Project Gutenberg, I believe, has an initial cookie set
 * before you can directly download items. So if no cookie exists,
 * you're directed to their site first which can be confusing.
 * @param {string} url
 * @return {string}
 */
const generateLink = (url, eReaderUrl, relType) => {
  let link = `${url}`;
  let linkText = downloadLabels[relType] || 'Download';

  if (url && url.includes('simplye')) {
    link = `${eReaderUrl}?url=${url}`;
    linkText = 'Read Online';
  }

  return <a href={`${link}`}>{`${linkText}`}</a>;
};

const EBookList = ({ ebooks, eReaderUrl }) => (
  <ul className="nypl-ebooks-list">
    {ebooks.map((item, ebookKey) =>
      item.links.map((link, linkKey) => (
        <li key={`${ebookKey.toString()}-${linkKey.toString()}`}>
          {generateLink(link.url, eReaderUrl, link.rel_type)}
        </li>
      )))}
  </ul>
);

EBookList.propTypes = {
  ebooks: PropTypes.arrayOf(PropTypes.any),
  eReaderUrl: PropTypes.string,
};

EBookList.defaultProps = {
  ebooks: [],
  eReaderUrl: '',
};

export default EBookList;
