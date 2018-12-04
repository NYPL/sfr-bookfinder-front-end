import express from 'express';

import { searchServer } from './Search';
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
  .get(searchServer);

router
  .route(appConfig.baseUrl)
  .get(MainApp);

router
  .route('/')
  .get(MainApp);

export default router;
