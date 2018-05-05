import React from 'react';
import ReactDOM from 'react-dom';

import './css/index.css';
import registerServiceWorker from './registerServiceWorker';
import ProjectRoutes from './js/routes';
import storeConfig from './js/store';
import { setAxiosDefault } from './js/utils';

const store = storeConfig();
setAxiosDefault("");

ReactDOM.render((
    <ProjectRoutes store={store}/>
  ), document.getElementById('root'));
registerServiceWorker();
