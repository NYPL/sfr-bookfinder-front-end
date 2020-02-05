/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prefer-destructuring */
/* eslint-env mocha */
import { expect } from 'chai';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditionCard from '../../src/app/components/Card/EditionCard';
import results from '../fixtures/results-list.json';
import { PLACEHOLDER_COVER_LINK } from '../../src/app/constants/editioncard';

configure({ adapter: new Adapter() });

describe('Edition Card', () => {
  let component;
  const work = results.data.works[0];

  const viafAuthors = [
    {
      name: 'author1',
      sort_name: 'author 1',
      viaf: '57970242',
      lcnaf: 'n82142775',
      birth_date_display: '1804',
      death_date_display: '1864',
      roles: [
        'author',
      ],
    },
    {
      name: 'author2',
      sort_name: 'author 2',
      viaf: '57970242',
      lcnaf: 'n82142775',
      roles: [
        'editor',
        'author',
      ],
    },
  ];

  const agentsNoViaf = [
    {
      name: 'author1',
      sort_name: 'author 1',
      viaf: null,
      lcnaf: null,
      birth_date_display: '1804',
      death_date_display: '1864',
      roles: [
        'author',
      ],
    },
    {
      name: 'author2',
      sort_name: 'author 2',
      viaf: null,
      lcnaf: null,
      roles: [
        'editor',
        'author',
      ],
    },
  ];
  const mixedAuthors = [
    {
      name: 'author1',
      sort_name: 'author 1',
      viaf: null,
      lcnaf: null,
      birth_date_display: '1804',
      death_date_display: '1864',
      roles: [
        'author',
      ],
    },
    {
      name: 'author2',
      sort_name: 'author 2',
      viaf: '57970242',
      lcnaf: 'n82142775',
      roles: [
        'editor',
        'author',
      ],
    },
  ];

  const testEdition = {
    date_created: '2020-01-14T15:49:48.646Z',
    date_modified: '2020-01-14T15:49:48.646Z',
    id: 33282,
    publication_place: 'London',
    publication_date: '1852',
    edition: null,
    edition_statement: '[Another ed.].',
    volume: null,
    table_of_contents: null,
    extent: null,
    summary: null,
    work_id: 56071,
    languages: [],
    items: [],
    covers: [],
  };

  const testItem = {
    source: 'hathitrust',
    content_type: 'ebook',
    modified: '2020-01-04T00:34:35',
    drm: null,
    links: [],
    rights: null,
  };


  describe('gets Preferred Agent', () => {
    it('should return list of agents with viaf and correct row', () => {
      const agents = EditionCard.getPreferredAgent(viafAuthors, 'author');
      expect(agents.length).to.equal(2);
      expect(agents[0].name).to.equal('author1');
    });
    it('if no agent with viaf, should return first agent with correct role', () => {
      const agents = EditionCard.getPreferredAgent(agentsNoViaf, 'author');
      expect(agents.length).to.equal(1);
      expect(agents[0].name).to.equal('author1');
    });
    it('prefer agents with viaf', () => {
      const agents = EditionCard.getPreferredAgent(mixedAuthors, 'author');
      expect(agents.length).to.equal(1);
      expect(agents[0].name).to.equal('author2');
    });
    it('should return undefined if no suitable agents', () => {
      expect(EditionCard.getPreferredAgent(viafAuthors, 'baker')).to.be.undefined;
    });
  });

  describe('gets Edition Year', () => {
    it('If UUID is passed, it should display the year as a link', () => {
      component = mount(EditionCard.editionYearElem(work.editions[0], work.uuid));
      expect(component.find('a').text()).to.equal('1852 Edition');
    });

    it('if UUID is not passed, should display the year in plain text', () => {
      component = shallow(EditionCard.editionYearElem(work.editions[0]));
      expect(component.find('span').text()).to.equal('1852 Edition');
    });
  });

  describe('displays title with link', () => {
    it('should display the title in a Link', () => {
      component = shallow(EditionCard.generateTitleLinkElem('Test Title', work.uuid));
      expect(component.find('a').text()).to.equal('Test Title');
    });
    it('should truncate the title if it is too long', () => {
      const tooLongTitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consequat velit diam.';
      const truncatedTitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consequat veli...';
      component = shallow(EditionCard.generateTitleLinkElem(tooLongTitle, work.uuid));
      expect(component.find('a').text()).to.equal(truncatedTitle);
    });
    it("should display 'title unknown' when not passed a title", () => {
      component = shallow(EditionCard.generateTitleLinkElem(undefined, work.uuid));
      expect(component.find('a').text()).to.equal('Title Unknown');
    });
  });

  describe('getSubtitleText', () => {
    it('returns subtitle', () => {
      expect(EditionCard.getSubtitleText('Subtitle')).to.equal('Subtitle');
    });
    it('should truncate the subtitle if it is too long', () => {
      const tooLongSubtitle = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. '
        + 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis nato';
      const truncatedSubtitle = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. '
        + 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis nat...';
      expect(EditionCard.getSubtitleText(tooLongSubtitle)).to.equal(truncatedSubtitle);
    });
    it('should return nothing if no subtitle is found', () => {
      expect(EditionCard.getSubtitleText(undefined)).to.equal(undefined);
    });
  });

  describe('gets Author list', () => {
    before(() => { });
    it('should return a list of jsx links', () => {
      const authors = EditionCard.getAuthorsList(viafAuthors);
      expect(authors.length).to.equal(2);
      const firstAuthor = shallow(authors[0]);
      expect(firstAuthor.find('a').text()).to.equal('author1');
    });
    it('should return null if no authors are found', () => {
      expect(EditionCard.getAuthorsList([])).to.equal(null);
    });
  });

  describe('Get covers', () => {
    it('Should get non-temporary cover url', () => {
      testEdition.covers = [
        {
          url: 'http://not-local-url.com',
          media_type: 'image/jpeg',
          flags: {
            cover: true,
            temporary: true,
          },
        },
        {
          url: 'http://local-url.com',
          media_type: 'image/jpeg',
          flags: {
            cover: true,
            temporary: false,
          },
        },
      ];
      expect(EditionCard.getCover(testEdition)).to.equal(testEdition.covers[1].url);
    });
    it('Should get first non-temporary cover if multiple are passed', () => {
      testEdition.covers = [
        {
          url: 'http://first-local-url.com',
          media_type: 'image/jpeg',
          flags: {
            cover: true,
            temporary: false,
          },
        },
        {
          url: 'http://second-local-url.com',
          media_type: 'image/jpeg',
          flags: {
            cover: true,
            temporary: false,
          },
        },
      ];
      expect(EditionCard.getCover(testEdition)).to.equal(testEdition.covers[0].url);
    });
    it('should return placeholder cover url if only temporary covers are found', () => {
      testEdition.covers = [
        {
          url: 'http://not-local-url.com',
          media_type: 'image/jpeg',
          flags: {
            cover: true,
            temporary: true,
          },
        },
      ];
      expect(EditionCard.getCover(testEdition)).to.equal(PLACEHOLDER_COVER_LINK);
    });
    it('Should return placeholder cover url if no cover found', () => {
      testEdition.covers = null;
      expect(EditionCard.getCover(testEdition)).to.equal(PLACEHOLDER_COVER_LINK);
      testEdition.covers = [];
      expect(EditionCard.getCover(testEdition)).to.equal(PLACEHOLDER_COVER_LINK);
    });
  });

  describe('get publisher place', () => {
    it('Should return publisher location if available', () => {
      testEdition.publication_place = 'London';
      expect(EditionCard.publisherDisplayLocation(testEdition)).to.equal(' in London');
    });
    it('Should return undefined if publisher location is missing', () => {
      testEdition.publication_place = null;
      expect(EditionCard.publisherDisplayLocation(testEdition)).to.equal('');
    });
  });

  describe('get publisher name', () => {
    it('Should return publisher', () => {
      testEdition.agents = [{
        name: 'publisher 1',
        sort_name: 'publisher_1',
        viaf: '51542887',
        lcnaf: 'nr91006845',
        birth_date_display: '1661?',
        death_date_display: '1731',
        roles: [
          'publisher',
        ],
      }];
      const publishers = EditionCard.publisherDisplayText(testEdition);
      expect(publishers).to.equal(' by publisher 1');
    });
    it('Should truncate after first publisher', () => {
      testEdition.agents = [{
        name: 'publisher 1',
        sort_name: 'publisher_1',
        viaf: '51542887',
        lcnaf: 'nr91006845',
        birth_date_display: '1661?',
        death_date_display: '1731',
        roles: [
          'publisher',
        ],
      },
      {
        name: 'publisher 2',
        sort_name: 'publisher_2',
        viaf: '51542887',
        lcnaf: 'nr91006845',
        death_date_display: '1883',
        birth_date_display: '1817',
        roles: [
          'publisher',
        ],
      }];
      const publishers = EditionCard.publisherDisplayText(testEdition);
      expect(publishers).to.equal(' by publisher 1 + 1 more');
    });
    it('if no viaf publishers, should return first non-viaf publisher', () => {
      testEdition.agents = [{
        name: 'publisher 1',
        sort_name: 'publisher_1',
        viaf: null,
        lcnaf: null,
        birth_date_display: '1661?',
        death_date_display: '1731',
        roles: [
          'publisher',
        ],
      },
      {
        name: 'publisher 2',
        sort_name: 'publisher_2',
        viaf: null,
        lcnaf: null,
        death_date_display: '1883',
        birth_date_display: '1817',
        roles: [
          'publisher',
        ],
      }];
      const publishers = EditionCard.publisherDisplayText(testEdition);
      expect(publishers).to.equal(' by publisher 1');
    });
    it('truncate text if  too long', () => {
      testEdition.agents = [{
        name: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        sort_name: 'publisher_1',
        viaf: null,
        lcnaf: null,
        birth_date_display: '1661?',
        death_date_display: '1731',
        roles: [
          'publisher',
        ],
      }];
      const publishers = EditionCard.publisherDisplayText(testEdition);
      expect(publishers).to.equal(' by Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo lig...');
    });
    it('Should return undefined if no publishers are found', () => {
      testEdition.agents = null;
      const publishers = EditionCard.publisherDisplayText(testEdition);
      expect(publishers).to.equal('');
    });
  });

  describe('get publisher and location', () => {
    it('Should return string with publisher and location', () => {
      testEdition.agents = [{
        name: 'publisher 1',
        sort_name: 'publisher_1',
        viaf: '51542887',
        lcnaf: 'nr91006845',
        birth_date_display: '1661?',
        death_date_display: '1731',
        roles: [
          'publisher',
        ],
      }];
      testEdition.publication_place = 'London';
      const publisherAndLocation = EditionCard.getPublisherAndLocation(testEdition);
      expect(publisherAndLocation).to.equal('Published in London by publisher 1');
    });
    it('Should return string with publisher when location is undefined', () => {
      testEdition.agents = [{
        name: 'publisher 1',
        sort_name: 'publisher_1',
        viaf: '51542887',
        lcnaf: 'nr91006845',
        birth_date_display: '1661?',
        death_date_display: '1731',
        roles: [
          'publisher',
        ],
      }];
      testEdition.publication_place = null;
      const publisherAndLocation = EditionCard.getPublisherAndLocation(testEdition);
      expect(publisherAndLocation).to.equal('Published by publisher 1');
    });
    it('Should return string with location when publisher is not found', () => {
      testEdition.agents = [{
        name: 'publisher 1',
        sort_name: 'publisher_1',
        viaf: '51542887',
        lcnaf: 'nr91006845',
        birth_date_display: '1661?',
        death_date_display: '1731',
        roles: [
          'author',
        ],
      }];
      testEdition.publication_place = 'London';
      const publisherAndLocation = EditionCard.getPublisherAndLocation(testEdition);
      expect(publisherAndLocation).to.equal('Published in London');
    });
    it('Should return undefined when neither publisher nor location are defined', () => {
      testEdition.agents = [];
      testEdition.publication_place = null;
      const publisherAndLocation = EditionCard.getPublisherAndLocation(testEdition);
      expect(publisherAndLocation).to.equal(undefined);
    });
  });

  describe('get languages', () => {
    it('Should return provided languages', () => {
      testEdition.languages = [{ language: 'English' }, { language: 'French' }];
      expect(EditionCard.getLanguageDisplayText(testEdition)).to.equal('Languages: English, French');
    });

    it('Should return "Undetermined" if no languages found', () => {
      testEdition.languages = ['Not-A-Language'];
      expect(EditionCard.getLanguageDisplayText(testEdition)).to.equal('Languages: Undetermined');
    });

    it('Should return "Undetermined" if no languages found', () => {
      testEdition.languages = null;
      expect(EditionCard.getLanguageDisplayText(testEdition)).to.equal('Languages: Undetermined');
    });
  });

  describe('get license', () => {
    it('Should return License', () => {
      testItem.rights = [
        {
          license: 'public_domain',
          rights_statement: 'Public Domain',
        },
      ];
      expect(EditionCard.getLicense(testItem)).to.equal('License: Public Domain');
    });

    it('should return "License Unknown" if no license is found', () => {
      testItem.rights = null;
      expect(EditionCard.getLicense(testItem)).to.equal('License: Unknown');
    });
  });

  describe('get download url', () => {
    it('should return a link if one exists and is downloadable', () => {
      testItem.links = [
        {
          url: 'download-url',
          media_type: 'application/pdf',
          content: null,
          thumbnail: null,
          local: false,
          download: true,
          images: true,
          ebook: true,
        },
        {
          url: 'read-online-url',
          media_type: 'text/html',
          content: null,
          thumbnail: null,
          local: false,
          download: false,
          images: true,
          ebook: true,
        }];
      expect(EditionCard.getDownloadLink(testItem)).to.equal('http://download-url');
    });
    it('should return the first link if multiple are downloadable', () => {
      testItem.links = [
        {
          url: 'download-url-1',
          media_type: 'application/pdf',
          content: null,
          thumbnail: null,
          local: false,
          download: true,
          images: true,
          ebook: true,
        },
        {
          url: 'download-url-2',
          media_type: 'text/html',
          content: null,
          thumbnail: null,
          local: false,
          download: true,
          images: true,
          ebook: true,
        }];
      expect(EditionCard.getDownloadLink(testItem)).to.equal('http://download-url-1');
    });
    it('should return undefined if links are null', () => {
      testItem.links = null;
      expect(EditionCard.getDownloadLink(testItem)).to.equal(undefined);
    });
    it('should return undefined if unsuitable links exist', () => {
      testItem.links = [
        {
          url: 'read-online-url-1',
          media_type: 'application/pdf',
          content: null,
          thumbnail: null,
          local: false,
          download: false,
          images: true,
          ebook: true,
        },
        {
          url: 'read-online-url-2',
          media_type: 'text/html',
          content: null,
          thumbnail: null,
          local: false,
          download: false,
          images: true,
          ebook: true,
        }];
    });
    expect(EditionCard.getDownloadLink(testItem)).to.equal(undefined);
  });

  // Note:  generateStreamedReaderUrl(Webpub Viewer) links don't have specific tests.
  // The code is very brittle and will change whenever webpub-viewer changes its link generation methods.

  // due to an error in link.download entries, we are using download=true links when local=true
  describe('get read online url', () => {
    const origin = 'origin';
    const eReaderUrl = 'eReaderUrl';
    const referrer = 'referrer';
    it('should return appropriately formatted webpub-viewer link', () => {
      testItem.links = [
        {
          url: 'read-online-url-1',
          media_type: 'application/pdf',
          content: null,
          thumbnail: null,
          local: true,
          download: true,
          images: true,
          ebook: true,
        }];
      expect(EditionCard.getReadOnlineLink(origin, testItem, eReaderUrl, referrer))
        .to.equal('origin/read-online?url=eReaderUrl/readerNYPL/?url=eReaderUrl'
        + '/pub/aHR0cDovL3JlYWQtb25saW5lLXVybC0x/manifest.json#referrer');
    });

    it('should return appropriately formatted non-webpub-viewer link', () => {
      testItem.links = [
        {
          url: 'read-online-url-1',
          media_type: 'application/pdf',
          content: null,
          thumbnail: null,
          local: false,
          download: false,
          images: true,
          ebook: true,
        }];
      expect(EditionCard.getReadOnlineLink(origin, testItem, eReaderUrl, referrer))
        .to.equal('origin/read-online?url=http://read-online-url-1');
    });

    it('should select the first read-online link', () => {
      testItem.links = [
        {
          url: 'read-online-url-1',
          media_type: 'application/pdf',
          content: null,
          thumbnail: null,
          local: false,
          download: false,
          images: true,
          ebook: true,
        },
        {
          url: 'read-online-url-2',
          media_type: 'application/pdf',
          content: null,
          thumbnail: null,
          local: true,
          download: true,
          images: true,
          ebook: true,
        }];
      expect(EditionCard.getReadOnlineLink(origin, testItem, eReaderUrl, referrer))
        .to.equal('origin/read-online?url=http://read-online-url-1');
    });
    it('returns undefined when no links are passed', () => {
      testItem.links = null;
      expect(EditionCard.getReadOnlineLink(origin, testItem, eReaderUrl, referrer)).to.equal(undefined);
    });
  });

  describe('get author identifier', () => {
    let testAuthor;
    before(() => {
      testAuthor = {
        name: 'Tester, Test',
        viaf: 'n123456',
        lcnaf: '098765x',
      };
    });

    it('should return a tuple of viaf for viaf queries', () => {
      expect(EditionCard.getAuthorIdentifier(testAuthor)).to.deep.equal(['viaf', 'viaf']);
    });

    it('should return lcnaf if viaf is not set', () => {
      testAuthor.viaf = null;
      expect(EditionCard.getAuthorIdentifier(testAuthor)).to.deep.equal(['lcnaf', 'lcnaf']);
    });

    it('should return name/author if viaf and lcnaf are not set', () => {
      testAuthor.lcnaf = null;
      expect(EditionCard.getAuthorIdentifier(testAuthor)).to.deep.equal(['name', 'author']);
    });
  });
});
