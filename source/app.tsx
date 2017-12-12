import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "mobx-react";

import "./app.scss";
import "./react-dates.scss";
import { Main } from "./components";

function App() {
  return <Main />;
}

ReactDOM.render(<App />, document.getElementById("root"));
