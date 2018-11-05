import React from 'react';
import ReactDOM from 'react-dom';

import alt from '../app/alt.js';
import Iso from 'iso';

import './styles/main.scss';

import App from '../app/components/Application/Application.jsx';


window.onload = () => {
  // Render Isomorphically
  Iso.bootstrap((state, container) => {
    console.log('Application rendered Isomorphically.');

    alt.bootstrap(state);
    ReactDOM.render(<App />, container);
  });
};
