import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import './main.css';

import AppContainer from "../imports/ui/App.jsx";

Meteor.startup(() => {
  render(<AppContainer />, document.getElementById("render-target"));
});
