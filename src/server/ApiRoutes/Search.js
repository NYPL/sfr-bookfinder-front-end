import { serverPost, serverFetchWork } from '../../app/actions/SearchActions';
import { getRequestParams } from '../../app/search/query';

export const searchServer = (req, res, next) => {
  const { query, field, workId } = getRequestParams(req.query);
  if (query && query === '') {
    next();
  }

  if (workId) {
    serverFetchWork(workId)
      .then((data) => {
        res.data = data;
        next();
      })
      .catch(err => console.log('serverFetchWork failed', err.message));
  } else {
    serverPost(Object.assign({}, res.query, { query, field }))
      .then((data) => {
        res.data = data;
        next();
      })
      .catch(err => console.log('serverPost failed', err.message));
  }
};

export default { searchServer };
