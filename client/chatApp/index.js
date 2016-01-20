import React, { Component } from "react";
import { createStore,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import App from './containers/App';
import Chat from './containers/Chat';
import Group from './containers/Group';
import MemberList from './containers/MemberList';
import MemberInfo from './containers/MemberInfo';
import DevTools from '../DevTools';
import configureStore from './configureChatStore.dev';
import { createHistory } from 'history';
import { Router, Route, IndexRoute } from 'react-router';
import { syncReduxAndRouter } from 'redux-simple-router';
import { ADD_RECEIVE_MESSAGE } from "./constants.js";

const store = configureStore({
  messages:[{
    avatar:"https://s-media-cache-ak0.pinimg.com/avatars/KittenMonster44_1444512332_30.jpg",
    name:"System",
    content:"お帰りなさいませ、ご主人様",
    action_type: ADD_RECEIVE_MESSAGE
  }]
})

const history = createHistory()

syncReduxAndRouter(history,store)

render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/chat" component={App} >
          <IndexRoute component={Group} />
          <Route path=":group_id" component={Chat} />
          <Route path=":group_id/members" component={MemberList}/>
          <Route path=":group_id/members/:member_id" component={MemberInfo}/>
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
