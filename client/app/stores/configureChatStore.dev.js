import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import ChatReducer from "../reducers/Chat";
import DevTools from '../containers/DevTools';
import thunk from 'redux-thunk';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  DevTools.instrument(),
  persistState(getDebugSessionKey())
)(createStore);

function getDebugSessionKey(){
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

export default function configureStore(initialState) {
  const store = finalCreateStore(ChatReducer, initialState);
    if (module.hot) {
      module.hot.accept('../reducers/Chat', () =>
        store.replaceReducer(require('../reducers/Chat'))
      );
    }
  return store;
}
