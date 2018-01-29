import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import registerServiceWorker from './registerServiceWorker';
import ProjectRoutes from './js/ProjectRoutes';
import storeConfig from './js/store';

const store = storeConfig();

ReactDOM.render((
    <ProjectRoutes store={store}/>
  ), document.getElementById('root'));
registerServiceWorker();
