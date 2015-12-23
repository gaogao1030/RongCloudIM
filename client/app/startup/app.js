import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from 'react-dom';
import SignInOrUpPageReducer from "../reducers/SignInOrUpPage";
import SignInOrUpPage from '../containers/SignInOrUpPage';

let store = createStore(SignInOrUpPageReducer);

render(
  <Provider store={store}>
    <SignInOrUpPage />
  </Provider>,
  document.getElementById("root")
)
