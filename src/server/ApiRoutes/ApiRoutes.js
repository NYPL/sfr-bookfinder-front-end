import express from 'express';
import axios from 'axios';

const router = express.Router();

function fetchApiData(url) {
  return axios.get(url);
}

function MainApp(req, res, next) {
  // Example of how to use the fetchApiData function:
  // const apiUrl = '';
  // fetchApiData(url)
  //   .then(data => {
  //     // Do something with the data
  //     res.locals.data = {
  //       Store: data,
  //     };
  //
  //     next();
  //   })
  //   .catch(error => {
  //     // Do something with the error
  //     res.locals.data = {
  //       Store: {},
  //     };
  //
  //     next();
  //   });

  res.locals.data = {
    Store: {},
  };

  next();
}

router
  .route('/')
  .get(MainApp);

export default router;
