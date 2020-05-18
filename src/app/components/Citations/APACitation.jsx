import React from 'react';
import PropTypes from 'prop-types';

import withCitationFields from './formatCitation';


class APACitation extends React.Component {
  componentDidMount() {
    this.getComponentStrs();
  }

  getComponentStrs() {
    this.authorsStr = this.formatAgentNames('authors');
    // eslint-disable-next-line max-len
    this.editorStr = `${this.formatAgentNames('editors', this.props.agents.authors.length > 0)}, (Ed${this.props.agents.editors.length === 1 ? '.' : 's.'})`;
    this.translatorStr = `${this.formatAgentNames('translators', true)}, Trans.`;
    this.illustatorStr = `${this.formatAgentNames('illustrators', true)}, Illus.`;
    this.pubYearStr = this.props.publication_data.publication_year ? ` (${this.props.publication_data.publication_year})` : '';
    this.publisherStr = this.props.agents.publishers.map(a => a.name).join(', ');
    this.titleStr = this.props.title;
    this.editionStr = this.props.version_data.edition ? ` (${this.props.version_data.edition})` : '';
    this.linkStr = this.props.link_data.link ? <a href={`https://${this.props.link_data.link}`}>{this.props.link_data.link}</a> : '';
    this.volumeStr = ` (${this.props.version_data.volume})`;
  }

  returnFormattedCitation() {
    this.getComponentStrs();
    if (this.props.government_report === 1) {
      return this.returnGovernmentReport();
    }

    if (this.props.version_data.volume) {
      return this.returnMonographCitation(true);
    }

    return this.returnMonographCitation();
  }

  returnGovernmentReport() {
    let responsibilityStr = '';
    if (this.props.agents.authors.length > 0) {
      responsibilityStr = this.authorsStr;
    } else if (this.props.agents.editors.length > 0) {
      responsibilityStr = this.editorStr;
    }

    return (
      <>
        {`${responsibilityStr}${this.pubYearStr}. `}
        <em>{`${this.titleStr} `}</em>
        {`${this.publisherStr}. `}
        {this.linkStr}
      </>
    );
  }

  returnMonographCitation(addVolume = false) {
    let responsibilityStr = '';
    if (this.props.agents.authors.length > 0) {
      responsibilityStr = this.authorsStr;
      if (this.props.agents.editors.length > 0) {
        this.editionStr = `${this.editionStr} (${this.editorStr}).`;
      }
    } else if (this.props.agents.editors.length > 0) {
      responsibilityStr = this.editorStr;
    }

    if (this.props.agents.illustrators.length > 0 && this.props.agents.translators.length > 0) {
      this.titleStr = `${this.titleStr} (${this.illustatorStr}, ${this.translatorStr})`;
    } else if (this.props.agents.illustrators.length > 0) {
      this.titleStr = `${this.titleStr} (${this.illustatorStr})`;
    } else if (this.props.agents.translators.length > 0) {
      this.titleStr = `${this.titleStr} (${this.translatorStr})`;
    }

    return (
      <>
        {`${responsibilityStr}${this.pubYearStr}. `}
        <em>{`${this.titleStr} `}</em>
        {`${addVolume ? this.volumeStr : ''}`}
        {this.editionStr}
        {`${this.publisherStr}. `}
        {this.linkStr}
      </>
    );
  }

  formatAgentNames(agentType, initFirst = false) {
    const getInitials = name => name.trim().split(/\s+/).map(i => `${i.substr(0, 1).toUpperCase()}.`).join(' ');
    return this.props.agents[agentType].map((a) => {
      let initialArray;
      let lastName;
      let initials;
      const cleanName = a.name.replace(/\(.+\)/, '');
      if (a.name.indexOf(',') > -1) {
        [lastName, initialArray] = cleanName.split(',');
        initials = getInitials(initialArray);
      } else {
        initialArray = cleanName.split(/\s+/);
        lastName = initialArray.pop();
        initials = getInitials(initialArray);
      }
      if (initFirst) {
        return `${initials} ${lastName}`;
      }
      return `${lastName}, ${initials}`;
    }).join(', ');
  }

  render() {
    return (
      <div className="apa-citation body-small">
        <strong>APA</strong>
        <br />
        {this.returnFormattedCitation()}
      </div>
    );
  }
}

const agentArrayElement = PropTypes.shape({
  name: PropTypes.string,
  viaf: PropTypes.string,
  lcnaf: PropTypes.string,
  roles: PropTypes.arrayOf(PropTypes.string),
});

APACitation.propTypes = {
  title: PropTypes.string,
  agents: PropTypes.shape({
    authors: PropTypes.arrayOf(agentArrayElement),
    editors: PropTypes.arrayOf(agentArrayElement),
    translators: PropTypes.arrayOf(agentArrayElement),
    illustrators: PropTypes.arrayOf(agentArrayElement),
    contributors: PropTypes.arrayOf(agentArrayElement),
    publishers: PropTypes.arrayOf(agentArrayElement),
  }),
  publication_data: PropTypes.shape({
    publication_place: PropTypes.string,
    publication_year: PropTypes.string,
  }),
  version_data: PropTypes.shape({
    series: PropTypes.string,
    series_position: PropTypes.string,
    volume: PropTypes.string,
    edition: PropTypes.string,
  }),
  link_data: PropTypes.shape({
    link: PropTypes.string,
    link_date: PropTypes.string,
  }),
  government_report: PropTypes.number,
};

APACitation.defaultProps = {
  title: '',
  agents: {
    authors: [], editors: [], translators: [], contributors: [], publishers: [], illustrators: [],
  },
  publication_data: { publication_place: '', publication_year: null },
  version_data: {
    series: '', series_position: '', volume: '', edition: '',
  },
  link_data: { link: '', link_date: null },
  government_report: 0,
};

const FormattedAPACitation = withCitationFields(APACitation);

export default FormattedAPACitation;
