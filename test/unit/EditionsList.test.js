//* TODO: Revisit after EditionsList updates
// /* eslint-disable no-underscore-dangle */
// /* eslint-disable react/jsx-filename-extension */
// /* eslint-disable prefer-destructuring */
// /* eslint-env mocha */
// import React from 'react';
// import { expect } from 'chai';
// import { shallow, configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import EditionsList from '../../src/app/components/List/EditionsList';
// import results from '../fixtures/results-list.json';
// import EBookList from '../../src/app/components/List/EBookList';

// configure({ adapter: new Adapter() });

// describe('EditionsList', () => {
//   let component;
//   const work = results.data.works[0];

//   describe('Rows with full item detail', () => {
//     before(() => {
//       component = shallow(<EditionsList work={work} />);
//     });

//     it('should return row or rows of items', () => {
//       expect(component.find('table')).to.have.length(1);
//     });

//     // Publication date check
//     it('should contain a publication date', () => {
//       expect(component.find('table tr td').getElements()[2].props.children).to.equal('1922.');
//     });

//     // Publication place check
//     it('should contain a publication place', () => {
//       expect(component.find('table tr td').getElements()[1].props.children).to.equal('Chicago :');
//     });

//     // Rights check
//     it('should contain a rights statement', () => {
//       expect(component.find('table tr td span').getElements()[1].props.children).to.equal('Public Domain');
//     });

//     // Language check
//     it('should contain a language', () => {
//       expect(component.find('table tr td span').getElements()[2].props.children).to.equal('English');
//     });

//     // Publisher check
//     it('should contain a publisher', () => {
//       expect(
//         component
//           .find('table tr td')
//           .first()
//           .text(),
//       ).to.equal('The Drake Hotel Company');
//     });
//   });

//   describe('Rows with partial item should render', () => {
//     before(() => {
//       component = shallow(<EditionsList work={work} />);
//     });

//     it('should return row or rows of items', () => {
//       expect(component.find('table')).to.have.length(1);
//     });

//     // Publication date check
//     it('should contain a publication date', () => {
//       expect(component.find('table tr td').getElements()[2].props.children).to.equal('1922.');
//     });

//     // Publication place check
//     it('should contain a publication place', () => {
//       expect(component.find('table tr td').getElements()[1].props.children).to.equal('Chicago :');
//     });

//     // Publisher check
//     it('should contain markup only when not provided', () => {
//       expect(
//         component
//           .find('table tr td')
//           .first()
//           .text(),
//       ).to.equal('The Drake Hotel Company');
//     });
//   });

//   describe('EBookList', () => {
//     before(() => {
//       const ebooks = work.instances[0].items;
//       component = shallow(<EBookList ebooks={ebooks} />);
//     });
//     it('should have a list of anchor tags', () => {
//       expect(component.find('ul')).to.have.length(3);
//       expect(component.find('ul li')).to.have.length(2);
//     });
//   });
// });
