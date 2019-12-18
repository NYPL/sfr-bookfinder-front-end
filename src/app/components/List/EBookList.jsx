import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Dropdown from '../../libraries/react-dropdown-aria';
import { flattenDeep, unique, formatUrl } from '../../util/Util';

/**
 * Create a URL for that conforms to the webpub-reader streamed format
 * @param {string} url
 * @param {string} eReaderUrl
 */
const generateStreamedReaderUrl = (url, eReaderUrl, referrer) => {
  const base64BookUrl = Buffer.from(formatUrl(url)).toString('base64');
  const encodedBookUrl = encodeURIComponent(`${base64BookUrl}`);
  const encodedReaderUrl = encodeURI(eReaderUrl);

  let combined = `${eReaderUrl}/readerNYPL/?url=${encodedReaderUrl}/pub/${encodedBookUrl}/manifest.json`;
  if (referrer) {
    combined += `#${referrer}`;
  }
  return combined;
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
 * @param {string} eReaderUrl
 * @param {boolean} local
 * @param {boolean} download
 * @param {boolean} ebook
 * @return {string}
 */
const generateLink = (url, eReaderUrl, local, download, ereader, ebook, referrer) => {
  const encodedUrl = generateStreamedReaderUrl(url, eReaderUrl);
  const link = local && ebook && ereader && !download ? `${encodedUrl}` : formatUrl(url);
  if (ebook && !download) {
    return (
      <Link to={{ pathname: '/read-online', query: { url: link } }}>
        {'Read Online'}
      </Link>
    );
  }
  return <a href={`${link}`}>Download</a>;
};

// generates an array of options for the dropdown
const generateOption = (link, download, eReaderUrl, referrer) => {
  const encodedUrl = generateStreamedReaderUrl(link.url, eReaderUrl, referrer);
  const url = link.local && link.ebook && link.eReader && download ? `${eReaderUrl}?url=${encodedUrl}` : formatUrl(link.url);
  const uniqueId = link.unique_id;
  const label = link.label;
  let className;
  if (!link.local) {
    className = 'external';
  }
  return {
    value: label,
    url,
    uniqueId,
    title: url,
    local: link.local,
    ariaLabel: label,
    className,
  };
};

const onSelectChange = (value, eReaderUrl, download, options, referrer) => {
  const match = options.find(option => option.value === value);
  if (match) {
    if (download) {
      global.window.location.href = formatUrl(match.url);
    } else if (match.local) {
      const encodedUrl = generateStreamedReaderUrl(match.url, eReaderUrl, referrer);
      global.window.location.href = `${window.location.origin}/read-online?url=${encodeURI(encodedUrl)}`;
    } else {
      global.window.location.href = `${window.location.origin}/read-online?url=${formatUrl(match.url)}`;
    }
  }
};

const arrowRenderer = (open) => {
  const arrowClass = open ? 'arrow arrow-up' : 'arrow';
  return <i className={arrowClass} />;
};

// gets all links from all ebooks
// If EReader, returns link
// If not, it classifies them on download
const linksArray = ({ ebooks, download }) => unique(
  flattenDeep(ebooks.filter(item => item.links).map(item => item.links)) //
    .filter(link => link.ereader === true || (link.local === false && link.download === download)), //
  'url',
);

// render the dropdown and/or the link to the ebook, classifed by download true or false
const LinksSelector = ({
  ebooks, download, eReaderUrl, referrer,
}) => {
  const linksList = linksArray({ ebooks, download });
  const options = linksList.map(link => Object.assign({}, generateOption(link, download, eReaderUrl, referrer)));
  return (
    <ul className="nypl-ebooks-list">
      {linksList.length > 1 && (
        <li className="ebooks-list-dropdown">
          <Dropdown
            options={options}
            setSelected={e => onSelectChange(e, eReaderUrl, download, options, referrer)}
            placeholder={download ? 'Download' : 'Read Online'}
            selectedOption=""
            buttonClassName=""
            arrowRenderer={arrowRenderer}
          />
        </li>
      )}
      {linksList.length === 1
        && linksList.map((link, linkKey) => (
          <li key={`${linkKey.toString()}`}>
            {generateLink(link.url, eReaderUrl, link.local, download, link.ereader, link.ebook, referrer)}
          </li>
        ))}
    </ul>
  );
};

const EBookList = ({ referrer, ebooks, eReaderUrl }) => (
  <div>
    <ul className="nypl-ebooks-list">
      <li>
        {LinksSelector({
          ebooks, download: false, eReaderUrl, referrer,
        })}

      </li>
      <li>
        {LinksSelector({
          ebooks, download: true, eReaderUrl, referrer,
        })}

      </li>
    </ul>
  </div>
);

LinksSelector.propTypes = {
  referrer: PropTypes.string,
  ebooks: PropTypes.arrayOf(PropTypes.any),
  eReaderUrl: PropTypes.string,
  download: PropTypes.bool,
};

LinksSelector.defaultProps = {
  referrer: '',
  ebooks: [],
  eReaderUrl: '',
  download: false,
};

EBookList.propTypes = {
  referrer: PropTypes.string,
  ebooks: PropTypes.arrayOf(PropTypes.any),
  eReaderUrl: PropTypes.string,
};

EBookList.defaultProps = {
  referrer: '',
  ebooks: [],
  eReaderUrl: '',
};

export default EBookList;
