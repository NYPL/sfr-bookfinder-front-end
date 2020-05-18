

export default class CitationFormatter {
  // Retrieve all relevant citation Data
  static getCitationData(work, edition) {
    const contributorExclusions = ['author', 'editor', 'translator', 'illustrator', 'publisher'];
    const workAgents = work.agents || [];
    const editionAgents = edition.agents || [];
    return {
      title: edition.title ? edition.title : work.title,
      sub_title: edition.sub_title,
      agents: {
        authors: CitationFormatter.getAgentsOfType(workAgents, 'author'),
        editors: CitationFormatter.getAgentsOfType(workAgents, 'editor', ['author']),
        illustrators: CitationFormatter.getAgentsOfType(workAgents, 'illustrator', ['author']),
        translators: CitationFormatter.getAgentsOfType(workAgents, 'translator', ['author']),
        publishers: CitationFormatter.getAgentsOfType(editionAgents, 'publisher'),
        contributors: CitationFormatter.getAgentsOfType([...workAgents, ...editionAgents], false, contributorExclusions),
      },
      publication_year: edition.publication_date,
      publication_place: edition.publication_place,
      edition: edition.edition_statement,
      volume: edition.volume,
      series: work.series,
      sourceLink: CitationFormatter.setLinkFields(edition.items),
      isGovermentDoc: CitationFormatter.isGovernmentReport(work.measurements),
    };
  }

  // Extract Agents with a specific role
  static getAgentsOfType(agents, includeType, excludeTypes = []) {
    if (!agents) { return []; }
    const typeAgents = agents.filter(a => (
      (!includeType || a.roles.indexOf(includeType) > -1)
      && (excludeTypes.length === 0 || a.roles.filter(r => !excludeTypes.includes(r)).length === 0)
    ));
    return typeAgents.map(a => a.name);
  }

  // Digital Resource Fields
  static setLinkFields(items) {
    const linkFields = { link: null, link_date: null };

    if (items) {
      linkFields.link = items[0].links[0].url;
      linkFields.link_date = items[0].modified;
    }

    return linkFields;
  }

  // Report Fields
  static isGovernmentReport(measurements) {
    let govReport = measurements
      ? measurements.filter(m => m.quantity === 'government_document')[0] : { value: 0 };
    if (!govReport) { govReport = { value: 0 }; }

    return !!govReport.value;
  }
}
