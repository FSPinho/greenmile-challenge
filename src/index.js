import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './css/App.css'

import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.js'

import Leaflet from 'leaflet'

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/'

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
