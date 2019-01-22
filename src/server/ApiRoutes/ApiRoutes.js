import express from 'express';

import { searchServer, getWorkById } from './Search';
import NotFound404 from '../../app/components/Error/NotFound404';

const router = express.Router();

function MainApp(req, res, next) {
  res.locals.data = {
    searchResults: {},
  };

  next();
}

router
  .route('/search')
  .get(searchServer);

router
  .route('/work')
  .get(getWorkById);

router
  .route('/404')
  .get(NotFound404);

router
  .route('/')
  .get(MainApp);

export default router;
