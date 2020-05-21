/* eslint-env mocha */
import { expect } from 'chai';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { stub } from 'sinon';
import results from '../fixtures/results-list.json';
import CitationFormatter from '../../src/app/components/Citations/formatCitation';

configure({ adapter: new Adapter() });

describe('Formatted Citation', () => {
  describe('getCitationData()', () => {
    let work;
    let agentStub;
    let linkStub;
    let govReportStub;
    before(() => {
      agentStub = stub(CitationFormatter, 'getAgentsOfType').returns(['agent1', 'agent2']);
      linkStub = stub(CitationFormatter, 'setLinkFields').returns('test_link');
      govReportStub = stub(CitationFormatter, 'isGovernmentReport').returns(false);
    });

    after(() => {
      agentStub.restore();
      linkStub.restore();
      govReportStub.restore();
    });

    beforeEach(() => {
      work = JSON.parse(JSON.stringify(results.data.works[0]));
    });

    it('should set title to work title if edition title not available', () => {
      const citationData = CitationFormatter.getCitationData(work, work.editions[0]);
      expect(citationData.title).to.equal('The Blithedale romance, by Nathaniel Hawthorne.');
    });

    it('should prefer title from edition', () => {
      work.editions[0].title = 'The Blithedale Romance (from edition)';
      const citationData = CitationFormatter.getCitationData(work, work.editions[0]);
      expect(citationData.title).to.equal('The Blithedale Romance (from edition)');
    });

    it('should accept subtitle from edition', () => {
      work.editions[0].sub_title = 'edition subtitle';
      const citationData = CitationFormatter.getCitationData(work, work.editions[0]);
      expect(citationData.sub_title).to.equal('edition subtitle');
    });

    it('should set arrays of agents types', () => {
      const citationData = CitationFormatter.getCitationData(work, work.editions[0]);
      expect(citationData.agents.authors.length).to.equal(2);
      expect(citationData.agents.authors).to.deep.equal(['agent1', 'agent2']);
      expect(citationData.agents.editors.length).to.equal(2);
      expect(citationData.agents.editors).to.deep.equal(['agent1', 'agent2']);
      expect(citationData.agents.illustrators.length).to.equal(2);
      expect(citationData.agents.illustrators).to.deep.equal(['agent1', 'agent2']);
      expect(citationData.agents.translators.length).to.equal(2);
      expect(citationData.agents.translators).to.deep.equal(['agent1', 'agent2']);
      expect(citationData.agents.publishers.length).to.equal(2);
      expect(citationData.agents.publishers).to.deep.equal(['agent1', 'agent2']);
      expect(citationData.agents.contributors.length).to.equal(2);
      expect(citationData.agents.contributors).to.deep.equal(['agent1', 'agent2']);
    });

    it('should set publication year from edition', () => {
      const citationData = CitationFormatter.getCitationData(work, work.editions[0]);
      expect(citationData.publication_year).to.equal('1852');
    });

    it('should set publication place from edition', () => {
      const citationData = CitationFormatter.getCitationData(work, work.editions[0]);
      expect(citationData.publication_place).to.equal('London');
    });

    it('should set edition_statement from edition', () => {
      const citationData = CitationFormatter.getCitationData(work, work.editions[0]);
      expect(citationData.edition).to.equal('[Another ed.].');
    });

    it('should set volume from edition', () => {
      work.editions[0].volume = 'Test Volume';
      const citationData = CitationFormatter.getCitationData(work, work.editions[0]);
      expect(citationData.volume).to.equal('Test Volume');
    });

    it('should set series from work', () => {
      const citationData = CitationFormatter.getCitationData(work, work.editions[0]);
      expect(citationData.series).to.equal('The modern library classics');
    });

    it('should set a source link from the edition', () => {
      const citationData = CitationFormatter.getCitationData(work, work.editions[0]);
      expect(citationData.sourceLink).to.equal('test_link');
    });

    it('should set government document status', () => {
      const citationData = CitationFormatter.getCitationData(work, work.editions[0]);
      expect(citationData.isGovernmentDoc).to.equal(false);
    });
  });

  describe('getAgentsOfType()', () => {
    const testAgents = [
      { name: 'test1', roles: ['author', 'editor'] },
      { name: 'test2', roles: ['editor'] },
      { name: 'test3', roles: ['author'] },
      { name: 'test4', roles: ['translator'] },
    ];

    it('should extract agents of type without exclude list', () => {
      const testArray = CitationFormatter.getAgentsOfType(testAgents, 'author');
      expect(testArray.length).to.equal(2);
      expect(testArray).to.deep.equal(['test1', 'test3']);
    });

    it('should extract agents matching role, but without matching exclude roles', () => {
      const testArray = CitationFormatter.getAgentsOfType(testAgents, 'editor', ['author']);
      expect(testArray.length).to.equal(1);
      expect(testArray).to.deep.equal(['test2']);
    });

    it('should return agents with roles only not matching the exclude list', () => {
      const testArray = CitationFormatter.getAgentsOfType(testAgents, null, ['author', 'editor']);
      expect(testArray.length).to.equal(1);
      expect(testArray).to.deep.equal(['test4']);
    });

    it('should return an empty list if no agents are provided', () => {
      expect(CitationFormatter.getAgentsOfType(null, 'test').length).to.equal(0);
    });
  });

  describe('setLinkFields', () => {
    it('should return a link and date from suplied items', () => {
      const testItems = [
        { links: [{ url: 'url1', modified: 'today' }] },
        { links: [{ url: 'url2', modified: 'yesterday' }] },
      ];
      const testLink = CitationFormatter.setLinkFields(testItems);
      expect(testLink.link).to.equal('url1');
      expect(testLink.link_date).to.equal('today');
    });

    it('should return null for link attribute if no items are present', () => {
      const testLink = CitationFormatter.setLinkFields(null);
      expect(testLink.link).to.equal(null);
      expect(testLink.link_date).to.equal(null);
    });
  });

  describe('isGovernmentReport()', () => {
    it('should return true if government_report measurement is 1', () => {
      const testMeasures = [
        { quantity: 'testing', value: 0 },
        { quantity: 'government_document', value: 1 },
      ];
      expect(CitationFormatter.isGovernmentReport(testMeasures)).to.equal(true);
    });

    it('should return false if government_report measurement is 0', () => {
      const testMeasures = [
        { quantity: 'testing', value: 1 },
        { quantity: 'government_document', value: 0 },
      ];
      expect(CitationFormatter.isGovernmentReport(testMeasures)).to.equal(false);
    });

    it('should return false if no government_report measurement', () => {
      const testMeasures = [
        { quantity: 'testing', value: 0 },
      ];
      expect(CitationFormatter.isGovernmentReport(testMeasures)).to.equal(false);
    });
  });
});
