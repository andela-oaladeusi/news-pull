import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import {
  App,
  Home,
  NotFound,
  SingleNewPage,
  SearchPage,
  SourcePage
} from '../components';

const ProjectRoutes = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <App>
          <Route exact path='/' component={Home}/>
          <Route exact path='/search' component={SourcePage}/>
          <Route exact path='/category/:category' component={Home}/>
          <Route exact path='/sources' component={SourcePage}/>
          <Route path="/news/:url" component={SingleNewPage}/>
          <Route path="/notfound" component={NotFound}/>
        </App>
      </Switch>
    </ BrowserRouter>
  </Provider>
)
export default ProjectRoutes;
