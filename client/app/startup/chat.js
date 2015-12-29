import React, { Component } from "react";
import { createStore,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import ChatReducer from "../reducers/Chat";
import Chat from '../containers/Chat';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = createStoreWithMiddleware(ChatReducer);

render(
  <Provider store={store}>
    <Chat/>
  </Provider>,
  document.getElementById("root")
)
