import { serverGet, serverPost, serverFetchWork } from '../../app/actions/SearchActions';
import { getRequestParams } from '../../app/search/query';

export const searchServer = (req, res, next) => {
  const { q, field, workId } = getRequestParams(req.query);
  if (q && q === '') {
    next();
  }

  if (field) {
    res.data = serverPost(q, field);
  } else if (workId) {
    res.data = serverFetchWork(workId);
  } else {
    res.data = serverGet(q);
  }

  next();
};

export default { searchServer };
