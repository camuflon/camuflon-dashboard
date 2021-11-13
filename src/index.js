import React from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Camuflon from "./camuflon";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Camuflon />
  </BrowserRouter>,
  rootElement
);
