import React from 'react';
import PropTypes from 'prop-types';


// This provides an APA citation as a formatted component for a specific edition of a work.
class APACitation extends React.Component {
  /** Transforms first names into capitalized initials
   * @param {string} name First name(s) of an agent to be transformed
   *
   * @returns {string} Initials for the supplied names
   */
  static getInitials(name) {
    return name.trim().split(/\s+/).map(i => `${i.substr(0, 1).toUpperCase()}.`).join(' ');
  }

  // Invokes methods to format data received from props
  componentWillMount() {
    this.formatCitationData();
  }

  // Set formatted string components to be combined into the full APA citation element
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

  /** Transform array of agents into a comma-delimited string
   * @param {string} agentType Agent role (e.g. author) to format for display
   * @param {boolean} nameFirst Sets to display names as Last, Initials or Initials Last. Defaults to false
   *
   * @returns {string} Comma delimited string of transformed agent names
   */
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

  /**
   * Return a government report citation when govReportStatus is true
   * Citations for these documents are somewhat simpler than for monographs
   *
   * Standard format
   * Authors OR Editors (Ed.) (Publication Year) <em>Title: Subtitle</em> Publishers. Link
   *
   * @returns {object} Element to be displayed
   */
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

  /**
   * Returns a formatted citation for a monograph, including the volume if present
   * Monograph citations can include all metadata passed into this component. Importantly
   * the editors block can change position depending on the presence of authors
   *
   * Authors Format
   * Authors (Publication Year) <em>Title: SubTitle</em> (Volume) (Illustrators OR Translators) (Edition) (Editors) Publishers. Link
   * No Authors Format
   * Editors (Ed.) (Publication Year) <em>Title: SubTitle</em> (Volume) (Illustrators OR Translators) (Edition) Publishers. Link
   *
   * @param {boolean} addVolume Set if volume data is present to return in citation
   *
   * @returns {object} Formatted element to be displayed
   */
  returnMonographCitation(addVolume = false) {
    let responsibilityStatement = '';
    if (this.props.agents.authors.length > 0) {
      responsibilityStatement = this.authors;
      if (this.props.agents.editors.length > 0) {
        this.edition = `${this.edition} (${this.editors}).`;
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
        <em>{`${this.title}`}</em>
        {`${addVolume ? this.volume : ''}`}
        {`${this.edition} `}
        {`${this.publishers}. `}
        {this.link}
      </>
    );
  }

  // Returns appropriate APA citation version
  render() {
    const volumeData = this.volume !== '';
    return (
      <div className="apa-citation">
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
