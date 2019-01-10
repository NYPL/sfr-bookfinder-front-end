import { search, fetchWork } from '../../app/actions/SearchActions';
import { getRequestParams } from '../../app/search/query';

export const searchServer = (req, res, next) => {
  const { q, filters } = getRequestParams(req.query);

  res.data = search(q, filters);

  next();
};

export const getWorkById = (req, res, next) => {
  const { workId } = req.query.workId;

  console.log('Get this work', req.query.workId);
  res.data = fetchWork(req.query.workId);

  next();
};

export default { searchServer };
