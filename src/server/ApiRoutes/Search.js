import { serverPost, serverFetchWork } from '../../app/actions/SearchActions';
import { getRequestParams } from '../../app/search/query';

export const searchServer = (req, res, next) => {
  const { q, field, workId } = getRequestParams(req.query);
  if (q && q === '') {
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
    serverPost(q, field)
      .then((data) => {
        res.data = data;
        next();
      })
      .catch(err => console.log('serverPost failed', err.message));
  }
};

export default { searchServer };
