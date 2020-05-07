import React from 'react';
import FeatureFlags from 'dgx-feature-flags';

// polyfill for Object.entries
const entriesPolyFill = obj => Object.keys(obj).map(key => [key, obj[key]]);
if (!Object.entries) Object.entries = entriesPolyFill;

// Given a link ensure that it has an attached protocol and add https if none is found
export const formatUrl = link => (link.startsWith('http') ? link : `https://${link}`);

export const getNumberOfPages = (totalItems, perPage) => Math.floor((Number(totalItems || 0) - 1) / Number(perPage || 10)) + 1 || 1;

// Given an array of JSX elements, return JSX that joins them with the Joiner.
export const joinArrayOfElements = (array, joiner) => {
  if (!array || !array.length) {
    return undefined;
  }
  return array.map((item, idx) => {
    if (!item) return undefined;
    return ((idx < array.length - 1) ? (
      <React.Fragment key={`join-${item.key}`}>
        {item}
        {joiner}
      </React.Fragment>
    ) : <React.Fragment key={`join-${item.key}`}>{item}</React.Fragment>);
  });
};

// return unique elements of array
export const unique = (array, propertyName) => array //
  .filter(
    (e, i) => array //
      .findIndex(a => (propertyName ? a[propertyName] === e[propertyName] : a === e)) === i,
  );

export const flattenDeep = arr => (Array.isArray(arr) ? arr.reduce((a, b) => a.concat(flattenDeep(b)), []) : [arr]);

export const isEmpty = obj => (typeof obj === 'object' && !Object.entries(obj || {}).length) || !obj;

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

/**
 * checkFeatureFlagActivated(featureFlagList, componentStateObject)
 * Check if the feature flags have been set. If they have not, activate the function to check
 * if the related cookies are set.
 * @param {string[]} featureFlagList - The list of the feature flags we want to set.
 * @param {object} componentStateObject - The object that points to the state object of
 * the component. The feature flag will change the state of the component through it.
 */
export const checkFeatureFlagActivated = (featureFlagList, componentStateObject) => {
  featureFlagList.forEach((item) => {
    if (!componentStateObject[item]) {
      FeatureFlags.utils.activateFeature(item);
    }
  });
};

/**
 * truncateStringOnWhitespace(str, maxLength)
 * Return a version of the string shortened to the provided maxLength param. This includes
 * the three characters for the ellipsis that is appended. If the string is shorter than the
 * max length it is returned as is.
 * @param {string} str - The string to be shortened (or returned without change)
 * @param {int} maxLength - The maximum length of the returned string to be applied
 */
export const truncateStringOnWhitespace = (str, maxLength) => {
  if (str.length < maxLength) { return str; }
  const truncArray = str.substr(0, maxLength - 3).split(/\s+/).slice(0, -1);
  return `${truncArray.join(' ')}...`;
};

export default {
  formatUrl,
  getNumberOfPages,
  unique,
  flattenDeep,
  isEmpty,
  deepEqual,
  uniqueAndSortByFrequency,
  truncateStringOnWhitespace,
};
