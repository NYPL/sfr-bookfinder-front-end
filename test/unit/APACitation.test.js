/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { stub } from 'sinon';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import APACitation from '../../src/app/components/Citations/APACitation';

configure({ adapter: new Adapter() });

describe('APA Citation', () => {
  describe('getInitials', () => {
    it('should transform names into initials', () => {
      expect(APACitation.getInitials('Test name')).to.equal('T. N.');
    });
  });

  describe('formatCitationData()', () => {
    let component;
    let instance;
    let stubFormatNames;
    before(() => {
      stubFormatNames = stub(APACitation.prototype, 'formatAgentNames').returns('Agent, T.');
      component = mount(<APACitation
        title="Testing"
        subTitle="subTest"
        agents={{
          authors: ['author1', 'author2'],
          editors: ['editor1'],
          translators: ['trans1'],
          illustrators: ['illus1'],
          publishers: ['publisher1', 'publisher2'],
        }}
        publicationYear="2020"
        edition="Test Edition"
        volume="Test Volume"
        sourceLink="test_link"
        isGovernmentDoc={false}
      />);
      instance = component.instance();
    });

    after(() => {
      stubFormatNames.restore();
    });

    it('should assign title and subtitle to title', () => {
      instance.formatCitationData();
      expect(instance.title).to.equal('Testing: subTest');
    });

    it('should set output from formatAgentNames to all agent names', () => {
      instance.formatCitationData();
      expect(instance.authors).to.equal('Agent, T.');
      expect(instance.editors).to.equal('Agent, T., (Ed.)');
      expect(instance.translators).to.equal('Agent, T., Trans.');
      expect(instance.illustrators).to.equal('Agent, T., Illus.');
    });

    it('should set publication/publisher fields', () => {
      instance.formatCitationData();
      expect(instance.pubYear).to.equal(' (2020)');
      expect(instance.publishers).to.equal('publisher1, publisher2');
    });

    it('should set edition/volume fields', () => {
      instance.formatCitationData();
      expect(instance.volume).to.equal(' (Test Volume)');
      expect(instance.edition).to.equal(' (Test Edition)');
    });

    it('should set link as an <a> element', () => {
      instance.formatCitationData();
      const linkElem = mount(<span>{instance.link}</span>);
      expect(linkElem.find('a').text()).to.equal('test_link');
      expect(linkElem.find('a').prop('href')).to.equal('https://test_link');
    });
  });

  describe('formatAgentNames()', () => {
    let component;
    let instance;
    const testAgents = {
      testing: ['Test, Agent', 'Other Test', 'Test, Some Names', 'S. A. Test'],
    };
    let stubFormatData;
    let stubReturnMonograph;

    before(() => {
      stubFormatData = stub(APACitation.prototype, 'formatCitationData');
      stubReturnMonograph = stub(APACitation.prototype, 'returnMonographCitation').returns('Testing');
      component = mount(<APACitation
        agents={testAgents}
      />);
      instance = component.instance();
    });

    after(() => {
      stubFormatData.restore();
      stubReturnMonograph.restore();
    });

    it('should turn names into a comma-delimited list of initialized names', () => {
      const agentNames = instance.formatAgentNames('testing');
      expect(agentNames).to.equal('Test, A., Test, O., Test, S. N., Test, S. A.');
    });

    it('should turn names into a comma-delimited list of initialized names, with initial first', () => {
      const agentNames = instance.formatAgentNames('testing', true);
      expect(agentNames).to.equal('A. Test, O. Test, S. N. Test, S. A. Test');
    });
  });

  describe('returnMonographCitation()', () => {
    let component;
    it('should return formatted monograph citation', () => {
      component = mount(<APACitation
        title="Testing"
        subTitle="subTest"
        agents={{
          authors: ['Author, Test'],
          editors: ['Editor, Test'],
          translators: ['Translator, Test'],
          illustrators: ['Illustrator, Test'],
          publishers: ['Test Publisher'],
        }}
        publicationYear="2020"
        edition="Test Edition"
        volume={null}
        sourceLink="test_link"
        isGovernmentDoc={false}
      />);
      const citationText = component.find('.apa-citation').text();
      const outText = 'APAAuthor, T. (2020). Testing: subTest (T. Illustrator, Illus., T. Translator, Trans.) '
        + '(Test Edition) (T. Editor, (Ed.)). Test Publisher. test_link';
      expect(citationText).to.equal(outText);
    });

    it('should return formatted monograph citation with editors if no authors', () => {
      component = mount(<APACitation
        title="Testing"
        subTitle="subTest"
        agents={{
          authors: [],
          editors: ['Editor, Test'],
          translators: ['Translator, Test'],
          illustrators: [],
          publishers: ['Test Publisher'],
        }}
        publicationYear="2020"
        edition="Test Edition"
        sourceLink="test_link"
        isGovernmentDoc={false}
      />);
      const citationText = component.find('.apa-citation').text();
      const outText = 'APAEditor, T., (Ed.) (2020). Testing: subTest (T. Translator, Trans.) (Test Edition) Test Publisher. test_link';
      expect(citationText).to.equal(outText);
    });

    it('should return formatted monograph citation with volume if included', () => {
      component = mount(<APACitation
        title="Testing"
        subTitle="subTest"
        agents={{
          authors: ['Author, Test'],
          editors: [],
          translators: [],
          illustrators: [],
          publishers: ['Test Publisher'],
        }}
        publicationYear="2020"
        volume="Vol. 2"
        sourceLink="test_link"
        isGovernmentDoc={false}
      />);
      const citationText = component.find('.apa-citation').text();
      const outText = 'APAAuthor, T. (2020). Testing: subTest (Vol. 2) Test Publisher. test_link';
      expect(citationText).to.equal(outText);
    });

    describe('returnGovernmentReport()', () => {
      it('should return formattedw report citation', () => {
        component = mount(<APACitation
          title="Testing"
          subTitle="subTest"
          agents={{
            authors: ['Author, Test'],
            editors: ['Editor, Test'],
            translators: ['Translator, Test'],
            illustrators: ['Illustrator, Test'],
            publishers: ['Test Publisher'],
          }}
          publicationYear="2020"
          edition="Test Edition"
          sourceLink="test_link"
          isGovernmentDoc
        />);
        const citationText = component.find('.apa-citation').text();
        const outText = 'APAAuthor, T. (2020). Testing: subTest Test Publisher. test_link';
        expect(citationText).to.equal(outText);
      });

      it('should return formatted report citation with editors if no authors', () => {
        component = mount(<APACitation
          title="Testing"
          subTitle="subTest"
          agents={{
            authors: [],
            editors: ['Editor, Test'],
            translators: ['Translator, Test'],
            illustrators: [],
            publishers: ['Test Publisher'],
          }}
          publicationYear="2020"
          edition="Test Edition"
          sourceLink="test_link"
          isGovernmentDoc
        />);
        const citationText = component.find('.apa-citation').text();
        const outText = 'APAEditor, T., (Ed.) (2020). Testing: subTest Test Publisher. test_link';
        expect(citationText).to.equal(outText);
      });
    });
  });
});
