import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import Home from './components/Home';
import NotFound from './components/NotFound';

const ProjectRoutes = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <App>
          <Route exact path='/' component={Home}/>
          <Route path="/new" component={NotFound}/>
        </App>
      </Switch>
    </ BrowserRouter>
  </Provider>
)
export default ProjectRoutes;
