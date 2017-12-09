import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "mobx-react";

import "./app.scss";
import { Main } from "./components";

function App() {
  return <Main />;
}

ReactDOM.render(<App />, document.getElementById("root"));
