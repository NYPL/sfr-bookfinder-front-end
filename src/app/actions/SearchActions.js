import performSearch from '../components/Search/SearchQuery';

export default (query, filter) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: 'search' })
      performSearch(query, filter)
        .then((results) => {
          dispatch({ type: 'search_load', data: results });
          resolve(query);
        })
        .catch(error => reject(error));
    });
  };
};
