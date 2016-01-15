import React, { Component } from "react";
import { createStore,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import App from './containers/app';
import Chat from './containers/Chat';
import Group from './containers/Group';
import DevTools from '../DevTools';
import configureStore from './configureChatStore.dev';
import { createHistory } from 'history';
import { Router, Route, IndexRoute } from 'react-router';
import { syncReduxAndRouter } from 'redux-simple-router';
import { ADD_RECEIVE_MESSAGE } from "./constants.js";

const store = configureStore({
  messages:[{
    avatar:"http://7xjz3m.com1.z0.glb.clouddn.com/avatar%2Fgaogao.jpg",
    name:"System",
    content:"欢迎来到聊天室",
    action_type: ADD_RECEIVE_MESSAGE
  }]
})

const history = createHistory()

syncReduxAndRouter(history,store)

render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/chat" component ={App} >
          <IndexRoute component ={Group} />
          <Route path=":id" component ={Chat} />
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById("root")
);


//if(process.env.NODE_ENV !== 'production') {
//  const showDevTools = require('../showDevTools').default;
//  showDevTools(store);
//}
