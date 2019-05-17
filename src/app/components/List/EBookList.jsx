import React from 'react';
import PropTypes from 'prop-types';
import { flatten as _flatten } from 'underscore';
import Dropdown from '../Form/Dropdown';

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
  const link = local && ebook && !download ? `${eReaderUrl}?url=${url}` : `${url}`;
  const linkText = ebook && !download ? 'Read Online' : 'Download';
  return <a href={`${link}`}>{`${linkText}`}</a>;
};
const generateOption = (link, eReaderUrl) => {
  const value = link.local && link.ebook && !link.download ? `${eReaderUrl}?url=${link.url}` : `${link.url}`;
  const label = link.label;
  let className;
  if (!link.local) {
    className = 'external';
  }
  return { value, label, className };
};

const onSelectChange = (e) => {
  global.window.location.href = e.value;
};

const linksArray = ({ ebooks, download }) => _flatten(ebooks.map(item => item.links)).filter(link => link.download === download);

const LinksSelector = ({ ebooks, download, eReaderUrl }) => {
  const linksList = linksArray({ ebooks, download });
  const options = linksList.map(link => Object.assign({}, generateOption(link, eReaderUrl)));
  // options.unshift({ value: '', label: 'Download' });
  return (
    <ul className="nypl-ebooks-list">
      {linksList.length > 1 && (
        <li>
          <Dropdown
            options={options}
            onChange={onSelectChange}
            placeholder={download ? 'Download' : 'Read Online'}
            value=""
          />
        </li>
      )}
      {linksList.length === 1
        && linksList.map((link, linkKey) => (
          <li key={`${linkKey.toString()}`}>{generateLink(link.url, eReaderUrl, link.local, link.download, link.ebook)}</li>
        ))}
    </ul>
  );
};

const EBookList = ({ ebooks, eReaderUrl }) => (
  <ul className="nypl-ebooks-list">
    <li>{LinksSelector({ ebooks, download: true, eReaderUrl })}</li>
    <li>{LinksSelector({ ebooks, download: false, eReaderUrl })}</li>
    {!eReaderUrl // ///////////
      && ebooks.map((item, ebookKey) => (
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

LinksSelector.propTypes = {
  ebooks: PropTypes.arrayOf(PropTypes.any),
  eReaderUrl: PropTypes.string,
  download: PropTypes.bool,
};

LinksSelector.defaultProps = {
  ebooks: [],
  eReaderUrl: '',
  download: false,
};

EBookList.propTypes = {
  ebooks: PropTypes.arrayOf(PropTypes.any),
  eReaderUrl: PropTypes.string,
};

EBookList.defaultProps = {
  ebooks: [],
  eReaderUrl: '',
};

export default EBookList;
