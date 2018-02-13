import React from 'react';
import ReactDOM from 'react-dom';

import './css/index.css';
import registerServiceWorker from './registerServiceWorker';
import ProjectRoutes from './js/routes';
import storeConfig from './js/store';
import { setAxiosDefault } from './js/utils';

const store = storeConfig();
setAxiosDefault("28f4078c0b944c5c8947a58651df6f1d");

ReactDOM.render((
    <ProjectRoutes store={store}/>
  ), document.getElementById('root'));
registerServiceWorker();
