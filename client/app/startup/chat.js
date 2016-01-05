import React, { Component } from "react";
import { createStore,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import ChatReducer from "../reducers/Chat";
import Chat from '../containers/Chat';
import DevTools from '../containers/DevTools';
import configureStore from '../stores/configureChatStore.dev';


//const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
//const store = createStoreWithMiddleware(ChatReducer,{
//  messages:[{
//    avatar:"http://7xjz3m.com1.z0.glb.clouddn.com/avatar%2Fgaogao.jpg",
//    name:"gaogao",
//    content:"hello redux and react"
//  }]
//});
const store = configureStore({
  messages:[{
    avatar:"http://7xjz3m.com1.z0.glb.clouddn.com/avatar%2Fgaogao.jpg",
    name:"gaogao",
    content:"hello redux and react"
  }]
})

render(
  <Provider store={store}>
    <div>
      <Chat />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById("root")
);


//if(process.env.NODE_ENV !== 'production') {
//  const showDevTools = require('../showDevTools').default;
//  showDevTools(store);
//}
