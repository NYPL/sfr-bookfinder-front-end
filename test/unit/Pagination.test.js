// TODO: Move to Pagination test
// it('should contain a SearchHeader Component', () => {
//   expect(component.find('SearchHeader').exists()).to.equal(true);
// });
// it('should not contain a SearchFooter Component', () => {
//   expect(component.find('SearchFooter').exists()).to.equal(false);
// });
// it('should contain link to First Page', () => {
//   expect(
//     component
//       .find('a')
//       .first()
//       .text(),
//   ).to.equal('First');
// });
// it('should contain link to Previous Page', () => {
//   expect(
//     component
//       .find('a')
//       .at(1)
//       .text(),
//   ).to.equal('Previous');
// });
// it('should contain link to Next Page', () => {
//   expect(
//     component
//       .find('a')
//       .at(2)
//       .text(),
//   ).to.equal('Next');
// });
// it('should contain link to Last Page', () => {
//   expect(
//     component
//       .find('a')
//       .at(3)
//       .text(),
//   ).to.equal('Last');
// });

// describe('Search Footer behavior', () => {
//   const query = { query: 'Chicago', field: 'keyword' };
//   const component = mount(<SearchNavigation
//     metadata={results.hits}
//     searchQuery={query}
//     isFooter
//   />);

//   it('should contain a SearchFooter Component', () => {
//     expect(component.find('SearchFooter').exists()).to.equal(true);
//   });

//   it('should not contain a SearchHeader Component', () => {
//     expect(component.find('SearchHeader').exists()).to.equal(false);
//   });

//   it('should contain link to First Page', () => {
//     expect(
//       component
//         .find('a')
//         .first()
//         .text(),
//     ).to.equal('First');
//   });
//   it('should contain link to Previous Page', () => {
//     expect(
//       component
//         .find('a')
//         .at(1)
//         .text(),
//     ).to.equal('Previous');
//   });
//   it('should contain link to Next Page', () => {
//     expect(
//       component
//         .find('a')
//         .at(2)
//         .text(),
//     ).to.equal('Next');
//   });
//   it('should contain link to Last Page', () => {
//     expect(
//       component
//         .find('a')
//         .at(3)
//         .text(),
//     ).to.equal('Last');
//   });
//   it('should not contain a select with list of numbers per page', () => {
//     expect(component.find('#items-by-page')).to.have.length(0);
//   });
//   it('should contain a select with list of pages', () => {
//     expect(component.find('#page-select-footer').find('option')).to.have.length(219);
//   });
//   it('should not contain a select with sort selections', () => {
//     expect(component.find('#sort-by')).to.have.length(0);
//   });
// });
