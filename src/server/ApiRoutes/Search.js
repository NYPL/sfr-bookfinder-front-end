import { serverGet, serverPost, serverFetchWork } from '../../app/actions/SearchActions';
import { getRequestParams } from '../../app/search/query';
// import store from '../../app/stores/ReduxStore';

export const searchServer = (req, res, next) => {
  const { q, field, workId } = getRequestParams(req.query);
  if (q && q === '') {
    next();
  }

  if (field) {
    res.data = serverPost(q, field);
    next();
  } else if (workId) {
    serverFetchWork(workId)
      .then((data) => {
        res.data = data;
        next();
      })
      .catch(() => console.log('nah'));
  } else {
    res.data = serverGet(q);
    next();
  }
};

export default { searchServer };
