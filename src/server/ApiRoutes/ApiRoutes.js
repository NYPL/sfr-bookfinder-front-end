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
    Store: {
      angularApps: [
        { id: 'Locations', link: 'https://nypl.org/locations' },
        { id: 'Divisions', link: 'https://nypl.org/research-divisions' },
        { id: 'Profiles', link: 'https://nypl.org/staff-profiles' },
      ],
      reactApps: [
        { id: 'Staff Picks', link: 'https://nypl.org/staffpicks' },
        {
          id: 'Book Lists',
          link: 'https://nypl.org/browse/recommendations/lists/nypl_mid_manhattan',
        },
        { id: 'Header', link: 'https://nypl.org' },
        { id: 'Homepage', link: 'https://nypl.org' },
        { id: 'New Arrivals', link: 'https://nypl.org/newarrivals' },
        { id: 'Search Beta', link: 'https://nypl.org/searchbeta' },
        { id: 'Blogs Beta', link: 'https://nypl.org/blog/beta' },
      ],
    },
  };

  next();
}

router
  .route('/')
  .get(MainApp);

export default router;
