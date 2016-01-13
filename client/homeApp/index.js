import React, { Component } from "react";
import { createStore,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import Reducer from "./reducers";
import SignInOrUpPage from './containers/SignInOrUpPage';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = createStoreWithMiddleware(Reducer);

render(
  <Provider store={store}>
    <SignInOrUpPage />
  </Provider>,
  document.getElementById("root")
)
