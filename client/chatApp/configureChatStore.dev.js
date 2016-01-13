import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import { middleware as awaitMiddleware } from 'redux-await';
import Reducer from "./reducers";
import DevTools from '../DevTools';
import thunk from 'redux-thunk';

const finalCreateStore = compose(
  applyMiddleware(thunk,awaitMiddleware),
  DevTools.instrument(),
  persistState(getDebugSessionKey())
)(createStore);

function getDebugSessionKey(){
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

export default function configureStore(initialState) {
  const store = finalCreateStore(Reducer, initialState);
    if (module.hot) {
      module.hot.accept('./reducers', () =>
        store.replaceReducer(require('./reducers'))
      );
    }
  return store;
}
