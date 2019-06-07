import { serverPost, serverFetchWork } from '../../app/actions/SearchActions';
import { getRequestParams } from '../../app/search/query';

export const searchServer = (req, res, next) => {
  const searchQuery = getRequestParams(req.query);
  // const { query, field, workId } = getRequestParams(req.query);
  if (searchQuery.query && searchQuery.query === '') {
    next();
  }

  if (searchQuery.workId) {
    serverFetchWork(searchQuery.workId)
      .then((data) => {
        res.data = data;
        next();
      })
      .catch(err => console.log('serverFetchWork failed', err.message));
  } else {
    serverPost(searchQuery)
      .then((data) => {
        res.data = data;
        next();
      })
      .catch(err => console.log('serverPost failed', err.message));
  }
};

export default { searchServer };
