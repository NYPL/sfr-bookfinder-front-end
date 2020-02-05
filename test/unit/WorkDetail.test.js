/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prefer-destructuring */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from '../../src/app/stores/configureStore';
import workDetail from '../fixtures/work-detail.json';
import initialState from '../../src/app/stores/InitialState';

import WorkDetail, { getFeaturedEditionData } from '../../src/app/components/WorkDetail/WorkDetail';

configure({ adapter: new Adapter() });
describe('Work Detail Page Test', () => {
  describe('getFeaturedEditionData', () => {
    describe('Get Featured Edition with Complete Data', () => {
      const edition = workDetail.editions[1];
      const featuredEditionData = getFeaturedEditionData(edition, 'origin', 'eReaderUrl', 'referrer');
      it('Edition has Year Heading Element', () => {
        expect(mount(<span>{featuredEditionData.editionYearHeading}</span>).text()).to.equal('1852 Edition');
      });
      it('Edition has publisher and location', () => {
        expect(featuredEditionData.publisherAndLocation).to.equal(
          'Published in London by Chapman & Hall British publishing house + 4 more',
        );
      });
      it('Edition has cover URL', () => {
        expect(featuredEditionData.coverUrl).to.equal(
          'http://test-sfr-covers.s3.amazonaws.com/hathitrust/077371092d774fb3b23e7991339216fb_nyp.33433076087844.jpg',
        );
      });
      it('Edition has list of languages', () => {
        expect(featuredEditionData.language).to.equal('Languages: English, German, Undetermined');
      });
      it('Edition has license', () => {
        expect(featuredEditionData.license).to.equal('License: Unknown');
      });
      it('Edition has Read Online Link', () => {
        expect(featuredEditionData.readOnlineLink).to.equal(
          'origin/read-online?url=http://archive.org/details/blithedaleromanc00hawtrich',
        );
      });
      it('Edition has Download link', () => {
        expect(featuredEditionData.downloadLink).to.equal('http://catalog.hathitrust.org/api/volumes/oclc/39113388.html');
      });
    });

    describe('Get Featured Edition with Missing Data', () => {
      const featuredEditionData = getFeaturedEditionData([{}], 'origin', 'eReaderUrl', 'referrer');
      it('Edition has Year Heading Element', () => {
        expect(mount(<span>{featuredEditionData.editionYearHeading}</span>).text()).to.equal('Edition Year Unknown');
      });
      it('Edition has publisher and location', () => {
        expect(featuredEditionData.publisherAndLocation).to.equal(undefined);
      });
      it('Edition has cover URL', () => {
        expect(featuredEditionData.coverUrl).to.equal(
          'https://test-sfr-covers.s3.amazonaws.com/default/defaultCover.png',
        );
      });
      it('Edition has list of languages', () => {
        expect(featuredEditionData.language).to.equal('Languages: Undetermined');
      });
      it('Edition has license', () => {
        expect(featuredEditionData.license).to.equal('License: Unknown');
      });
      it('Edition has Read Online Link', () => {
        expect(featuredEditionData.readOnlineLink).to.equal(undefined);
      });
      it('Edition has Download link', () => {
        expect(featuredEditionData.downloadLink).to.equal(undefined);
      });
    });
  });

  describe('WorkDetail Rendering with empty work', () => {
    let container;

    before(() => {
      const store = configureStore(initialState);
      container = mount(<WorkDetail
        store={store}
        location={{ query: { workId: 'invalid' } }}
      />);
    });

    it('should show breadcrumb', () => {
      expect(container.find('Breadcrumbs').exists()).to.equal(true);
    });

    it('should show searchHeader', () => {
      expect(container.find('SearchHeader').exists()).to.equal(true);
    });
  });
});
