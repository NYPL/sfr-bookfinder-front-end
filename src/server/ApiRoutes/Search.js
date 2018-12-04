import { search } from '../../app/actions/SearchActions';
import { getRequestParams } from '../../app/search/query';

export const searchServer = (req, res, next) => {
  const { q, filters } = getRequestParams(req.query);

  res.data = search(q, filters);

  next();
};

export default { searchServer };
