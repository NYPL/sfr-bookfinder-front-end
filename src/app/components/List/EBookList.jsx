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
 * @return {string}
 */
const generateLink = (url, eReaderUrl) => {
  let link = `${url}`;
  let linkText = 'Download';

  if (url && url.includes('simplye')) {
    link = `${eReaderUrl}?url=${url}`;
    linkText = 'Read Online';
  }

  return (
    <a href={`${link}`}>{`${linkText}`}</a>
  );
};

const EBookList = (props) => {
  return (
    <ul className="nypl-items-list">
      {props.ebooks.map((ebook, ebookKey) => (
        <li key={ebookKey.toString()}>
          {generateLink(ebook.url, props.eReaderUrl)} {(ebook.epub_path) ? [ebook.epub_path.split('/').pop()] : ''}
        </li>
      ))}
    </ul>
  );
};

EBookList.contextTypes = {
  eReaderUrl: PropTypes.string,
};

export default EBookList;
