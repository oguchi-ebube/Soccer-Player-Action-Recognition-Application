import React, { Component } from "react";

import "./App.css";

import openSocket from "socket.io-client";

import Router from "./components/Router";
import Stores from "./stores/storeIdentifier";
import AppConsts from "./lib/appconst";
import { inject } from "mobx-react";

let socket = null;

@inject(Stores.metricsStore)
class App extends Component {
  componentDidMount() {
    // socket = openSocket(AppConsts.remoteServiceBaseUrl, {
    //   transports: ["polling"],
    // });
    // const _global = this;
    // socket.on("dribbling", (data) => {
    //   _global.props.metricsStore.setDribbling(data);
    // });
    // socket.on("kicking", (data) => {
    //   _global.props.metricsStore.setKickingg(data);
    // });
    // socket.on("running", (data) => {
    //   _global.props.metricsStore.setRunning(data);
    // });
    // socket.on("passing", (data) => {
    //   _global.props.metricsStore.setPassing(data);
    // });
    // socket.on("image_frame", (data) => {
    //   _global.props.metricsStore.setImageFrame(data);
    // });
  }
  render() {
    return <Router />;
  }
}

export default App;
