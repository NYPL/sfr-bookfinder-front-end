import { searchGet, fetchWork } from '../../app/actions/SearchActions';
import { getRequestParams } from '../../app/search/query';

export const searchServer = (req, res, next) => {
  const { q } = getRequestParams(req.query);

  res.data = searchGet(q);

  next();
};

export const getWorkById = (req, res, next) => {
  const { workId } = req.query.workId;

  console.log('Get this work', workId);
  res.data = fetchWork(workId);

  next();
};

export default { searchServer };
