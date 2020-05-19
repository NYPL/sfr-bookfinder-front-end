import React from 'react';
import PropTypes from 'prop-types';


class APACitation extends React.Component {
  static getInitials(name) {
    return name.trim().split(/\s+/).map(i => `${i.substr(0, 1).toUpperCase()}.`).join(' ');
  }

  componentWillMount() {
    this.formatCitationData();
  }

  formatCitationData() {
    this.title = this.props.subTitle ? `${this.props.title}: ${this.props.subTitle}` : this.props.title;

    this.authors = this.formatAgentNames('authors');
    const rawEditors = this.formatAgentNames('editors', this.props.agents.authors.length > 0);
    this.editors = `${rawEditors}, (Ed${this.props.agents.editors.length === 1 ? '.' : 's.'})`;
    this.translators = `${this.formatAgentNames('translators', true)}, Trans.`;
    this.illustrators = `${this.formatAgentNames('illustrators', true)}, Illus.`;

    this.pubYear = this.props.publicationYear ? ` (${this.props.publicationYear})` : '';
    this.publishers = this.props.agents.publishers.join(', ');

    this.edition = this.props.edition ? ` (${this.props.edition})` : '';
    this.volume = this.props.volume ? ` (${this.props.volume})` : '';

    this.link = this.props.sourceLink ? <a href={`https://${this.props.sourceLink}`}>{this.props.sourceLink}</a> : '';

    this.govReportStatus = this.props.isGovernmentDoc;
  }


  formatAgentNames(agentType, nameFirst = false) {
    return this.props.agents[agentType].map((a) => {
      let firstNames;
      let lastName;
      const cleanName = a.replace(/\(.+\)/, '');
      if (a.indexOf(',') > -1) {
        [lastName, firstNames] = cleanName.split(',');
      } else {
        firstNames = cleanName.split(/\s+/);
        lastName = firstNames.pop();
        firstNames = firstNames.join(' ');
      }
      firstNames = firstNames || '';
      if (nameFirst) {
        return `${APACitation.getInitials(firstNames)} ${lastName}`;
      }

      return `${lastName}, ${APACitation.getInitials(firstNames)}`;
    }).join(', ');
  }

  returnGovernmentReport() {
    let responsibilityStatement = '';
    if (this.props.agents.authors.length > 0) {
      responsibilityStatement = this.authors;
    } else if (this.props.agents.editors.length > 0) {
      responsibilityStatement = this.editors;
    }

    return (
      <>
        {`${responsibilityStatement}${this.pubYear}. `}
        <em>{`${this.title} `}</em>
        {`${this.publishers}. `}
        {this.link}
      </>
    );
  }

  returnMonographCitation(addVolume = false) {
    let responsibilityStatement = '';
    if (this.props.agents.authors.length > 0) {
      responsibilityStatement = this.authors;
      if (this.props.agents.editors.length > 0) {
        this.formattedEdition = `${this.edition} (${this.editors}).`;
      }
    } else if (this.props.agents.editors.length > 0) {
      responsibilityStatement = this.editors;
    }

    if (this.props.agents.illustrators.length > 0 && this.props.agents.translators.length > 0) {
      this.title = `${this.title} (${this.illustrators}, ${this.translators})`;
    } else if (this.props.agents.illustrators.length > 0) {
      this.title = `${this.title} (${this.illustators})`;
    } else if (this.props.agents.translators.length > 0) {
      this.title = `${this.title} (${this.translators})`;
    }

    return (
      <>
        {`${responsibilityStatement}${this.pubYear}. `}
        <em>{`${this.title} `}</em>
        {`${addVolume ? this.volume : ''}`}
        {this.edition}
        {`${this.publishers}. `}
        {this.link}
      </>
    );
  }

  render() {
    const volumeData = this.volume !== '';
    return (
      <div className="apa-citation body-small">
        <strong>APA</strong>
        <br />
        {this.govReportStatus && this.returnGovernmentReport()}
        {!this.govReportStatus && this.returnMonographCitation(volumeData)}
      </div>
    );
  }
}

APACitation.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  agents: PropTypes.shape({
    authors: PropTypes.arrayOf(PropTypes.string),
    editors: PropTypes.arrayOf(PropTypes.string),
    translators: PropTypes.arrayOf(PropTypes.string),
    illustrators: PropTypes.arrayOf(PropTypes.string),
    publishers: PropTypes.arrayOf(PropTypes.string),
    contributors: PropTypes.arrayOf(PropTypes.string),
  }),
  publicationYear: PropTypes.string,
  edition: PropTypes.string,
  volume: PropTypes.string,
  sourceLink: PropTypes.string,
  isGovernmentDoc: PropTypes.bool,
};

APACitation.defaultProps = {
  title: '',
  subTitle: '',
  agents: {
    authors: [], editors: [], translators: [], contributors: [], publishers: [], illustrators: [],
  },
  publicationYear: null,
  edition: '',
  volume: '',
  sourceLink: '',
  isGovernmentDoc: false,
};

export default APACitation;
