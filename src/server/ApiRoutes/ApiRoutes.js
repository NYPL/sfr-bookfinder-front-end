import express from 'express';

import Search from './Search';
import appConfig from '../../../appConfig';

const router = express.Router();

function MainApp(req, res, next) {
  res.locals.data = {
    searchResults: {},
  };

  next();
}

router
  .route(`${appConfig.baseUrl}/search`)
  .get(Search.searchServer);

router
  .route(appConfig.baseUrl)
  .get(MainApp);

router
  .route('/')
  .get(MainApp);

export default router;
