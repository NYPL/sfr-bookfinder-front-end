// return unique elements of array
export const unique = (array, propertyName) => array //
  .filter(
    (e, i) => array //
      .findIndex(a => (propertyName ? a[propertyName] === e[propertyName] : a === e)) === i,
  );

export const flattenDeep = arr => (Array.isArray(arr) ? arr.reduce((a, b) => a.concat(flattenDeep(b)), []) : [arr]);

export const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;

// compare two objects
export const deepEqual = (x, y) => (x && y && typeof x === 'object' && typeof x === typeof y
  ? Object.keys(x).length === Object.keys(y).length && Object.keys(x).every(key => deepEqual(x[key], y[key]))
  : x === y);

// return unique elements (not undefined) of array sorted by frequency of repetition
export const uniqueAndSortByFrequency = (array) => {
  const frequency = {};

  // compute frequencies of each value
  array.forEach((value) => {
    // remove undefined values
    if (value) {
      frequency[value] = frequency[value] ? frequency[value] + 1 : 1;
    }
  });

  // make array from the frequency object to de-duplicate
  const uniques = Object.keys(frequency);

  // sort the uniques array in descending order by frequency
  const compareFrequency = (a, b) => frequency[b] - frequency[a];

  return uniques.sort(compareFrequency);
};

export default {
  unique,
  flattenDeep,
  isEmpty,
  deepEqual,
  uniqueAndSortByFrequency,
};
