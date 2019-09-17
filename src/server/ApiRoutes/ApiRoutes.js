import express from 'express';

import { searchServer } from './Search';
import NotFound404 from '../../app/components/Error/NotFound404';

const router = express.Router();

function MainApp(req, res, next) {
  res.locals.data = {
    searchResults: {},
  };

  next();
}

const ReadOnline = (req, res, next) => {
  next();
};

router
  .route('/search')
  .get(searchServer);

router
  .route('/work')
  .get(searchServer);

router
  .route('/read-online')
  .get(ReadOnline);

router
  .route('/404')
  .get(NotFound404);

router
  .route('/')
  .get(MainApp);

export default router;
