import React from 'react';
import PropTypes from 'prop-types';


function withCitationFields(WrappedComponent) {
  class BaseCitation extends React.Component {
    constructor(props) {
      super(props);

      this.setTitleFields = this.setTitleFields.bind(this);
      this.setAgentFields = this.setAgentFields.bind(this);
      this.setPublicationFields = this.setPublicationFields.bind(this);
      this.setVersionFields = this.setVersionFields.bind(this);
      this.setLinkFields = this.setLinkFields.bind(this);
      this.setGovernmentReport = this.setGovernmentReport.bind(this);
    }

    // Title Fields
    setTitleFields() {
      let title = this.props.edition.title;
      if (!title) { title = this.props.work.title; }
      if (this.props.edition.sub_title) { title = `${title}: ${this.props.edition.sub_title}`; }
      return title;
    }

    // Agent Fields
    setAgentFields() {
      const authors = this.props.work.agents.filter(a => a.roles.indexOf('author') > -1);
      const editors = this.props.work.agents.filter(a => a.roles.indexOf('editor') > -1 && a.roles.indexOf('author') < 0);
      const translators = this.props.work.agents.filter(a => a.roles.indexOf('translator') > -1);
      const illustrators = this.props.work.agents.filter(a => a.roles.indexOf('illustrator') > -1);
      const contributors = this.props.work.agents
        .filter(a => a.roles.indexOf('translator') < 0 && a.roles.indexOf('editor') < 0 && a.roles.indexOf('author') < 0);
      const publishers = this.props.edition.agents.filter(a => a.roles.indexOf('publisher') > -1);

      return {
        authors, editors, translators, illustrators, contributors, publishers,
      };
    }

    // Publication Fields
    setPublicationFields() {
      return {
        publication_place: this.props.edition.publication_place,
        publication_year: this.props.edition.publication_date,
      };
    }

    // Series, Volume, Edition Fields
    setVersionFields() {
      return {
        series: this.props.work.series,
        series_position: this.props.work.series_position,
        volume: this.props.work.volume,
        edition: this.props.edition.edition_statement,
      };
    }

    // Digital Resource Fields
    setLinkFields() {
      const linkFields = { link: null, link_date: null };

      if (this.props.edition.items) {
        linkFields.link = this.props.edition.items[0].links[0].url;
        linkFields.link_date = this.props.edition.items[0].modified;
      }

      return linkFields;
    }

    // Report Fields
    setGovernmentReport() {
      let govReport = this.props.work.measurements
        ? this.props.work.measurements.filter(m => m.quantity === 'government_document')[0] : { value: 0 };
      if (!govReport) { govReport = { value: 0 }; }

      return govReport.value;
    }

    render() {
      return (
        <WrappedComponent
          title={this.setTitleFields()}
          agents={this.setAgentFields()}
          publication_data={this.setPublicationFields()}
          version_data={this.setVersionFields()}
          link_data={this.setLinkFields()}
          government_report={this.setGovernmentReport()}
        />
      );
    }
  }

  BaseCitation.propTypes = {
    work: PropTypes.objectOf(PropTypes.any),
    edition: PropTypes.objectOf(PropTypes.any),
  };

  BaseCitation.defaultProps = { work: {}, edition: {} };

  return BaseCitation;
}

export default withCitationFields;
