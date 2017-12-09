import * as React from "react";

import "./main.scss";
import { Menu, Todos } from "..";

export class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="main__top-bar" />
        <Menu className="main__menu" />
        <div className="main__menu-overlay" />
        <Todos className="main__todos" />
      </div>
    );
  }
}
