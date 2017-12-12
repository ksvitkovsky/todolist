import * as React from "react";
import { action, observable } from "mobx";
import { observer } from "mobx-react";

import "./main.scss";
import { Icon, Menu, Todos } from "..";

@observer
export class Main extends React.Component {
  @observable isMenuOpen: boolean = false;

  @action.bound
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  render() {
    return (
      <div className="main">
        <div className="main__top-bar">
          <button className="main__menu-button" onClick={this.toggleMenu}>
            <Icon type={this.isMenuOpen ? "close" : "menu"} />
          </button>
        </div>
        <Menu
          className={`main__menu ${this.isMenuOpen ? "main__menu--open" : ""}`}
        />
        <div className="main__menu-overlay" />
        <Todos className="main__todos" />
      </div>
    );
  }
}
