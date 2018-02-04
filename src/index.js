import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import registerServiceWorker from './registerServiceWorker';
import ProjectRoutes from './js/ProjectRoutes';
import storeConfig from './js/store';
import setDefaultAxios from './js/utils/setAxiosDefault';

const store = storeConfig();
setDefaultAxios("28f4078c0b944c5c8947a58651df6f1d");

ReactDOM.render((
    <ProjectRoutes store={store}/>
  ), document.getElementById('root'));
registerServiceWorker();
