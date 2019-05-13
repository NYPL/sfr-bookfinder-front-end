import React from 'react';
import PropTypes from 'prop-types';

/**
 * Create a link defaulting to an ebook "download" unless
 * the ebook is hosted by us (link has our S3 bucket pattern)
 * which shows a link to our eReader with the S3 bucket URL as
 * a query parameter.
 * NOTE: Project Gutenberg, I believe, has an initial cookie set
 * before you can directly download items. So if no cookie exists,
 * you're directed to their site first which can be confusing.
 * @param {string} url
 * @param {string} eReaderUrl
 * @param {boolean} local
 * @param {boolean} download
 * @param {boolean} ebook
 * @return {string}
 */
const generateLink = (url, eReaderUrl, local, download, ebook) => {
  const link = (local && ebook && !download) ? `${eReaderUrl}?url=${url}` : `${url}`;
  const linkText = (ebook && !download) ? 'Read Online' : 'Download';
  return <a href={`${link}`}>{`${linkText}`}</a>;
};

const EBookList = ({ ebooks, eReaderUrl }) => (
  <ul>
    {ebooks.map((item, ebookKey) => (
      <li key={`${ebookKey.toString()}`}>
        <ul className="nypl-ebooks-list">
          {item.links.map((link, linkKey) => (
            <li key={`${ebookKey.toString()}-${linkKey.toString()}`}>
              {generateLink(link.url, eReaderUrl, link.local, link.download, link.ebook)}
            </li>
          ))}
        </ul>
      </li>
    ))}
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
