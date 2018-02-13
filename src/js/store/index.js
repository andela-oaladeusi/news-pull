import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers/root';

const loggerMiddleware = createLogger();
const storeConfig = () =>
 createStore(
    rootReducer,
    compose(
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

export default storeConfig;
