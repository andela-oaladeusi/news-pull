import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import Home from './components/Home';
import NotFound from './components/NotFound';
import SingleNew from './components/SingleNew';
import SearchPage from './components/SearchPage';

const ProjectRoutes = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <App>
          <Route exact path='/' component={Home}/>
          <Route exact path='/category/:category' component={Home}/>
          <Route exact path='/search' component={SearchPage}/>
          <Route path="/news/:url" component={SingleNew}/>
          <Route path="/notfound" component={NotFound}/>
        </App>
      </Switch>
    </ BrowserRouter>
  </Provider>
)
export default ProjectRoutes;
