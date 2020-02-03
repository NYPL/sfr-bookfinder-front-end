import React from 'react';
import FeatureFlags from 'dgx-feature-flags';

// polyfill for Object.entries
const entriesPolyFill = obj => Object.keys(obj).map(key => [key, obj[key]]);
if (!Object.entries) Object.entries = entriesPolyFill;

// Given a link, return the link with 'http' if on development, 'https' if on production.

export const formatUrl = (link, env) => {
  const devPrefix = 'http://';
  const securePrefix = 'https://';
  if (link.substr(0, 4) !== 'http') {
    return env === 'production' ? securePrefix + link : devPrefix + link;
  }
  if (env === 'development' && link.substr(0, securePrefix.length) === securePrefix) {
    return devPrefix + link.substr(securePrefix.length);
  }
  return link;
};

// Given an array of JSX elements, return JSX that joins them with the Joiner.
export const joinArrayOfElements = (array, joiner) => {
  if (!array || !array.length) {
    return undefined;
  }
  return array.map((item, idx) => {
    if (!item) return undefined;
    return ((idx < array.length - 1) ? (
      <>
        {item}
        {joiner}
      </>
    ) : <>{item}</>);
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

export default {
  formatUrl,
  unique,
  flattenDeep,
  isEmpty,
  deepEqual,
  uniqueAndSortByFrequency,
};
