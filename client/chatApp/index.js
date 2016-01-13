import React, { Component } from "react";
import { createStore,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import Chat from './containers/Chat';
import Group from './containers/Group';
import DevTools from '../DevTools';
import configureStore from './configureChatStore.dev';
import { createHistory } from 'history';
import { Router, Route } from 'react-router';
import { syncReduxAndRouter } from 'redux-simple-router';

const store = configureStore({
  messages:[{
    avatar:"http://7xjz3m.com1.z0.glb.clouddn.com/avatar%2Fgaogao.jpg",
    name:"gaogao",
    content:"hello redux and react"
  }]
})

const history = createHistory()

syncReduxAndRouter(history,store)

render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/chat" component ={Group} >
          <Route path="/:id" component ={Chat} />
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
