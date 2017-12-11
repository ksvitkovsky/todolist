import * as React from "react";

import "./menu.scss";

interface MenuProps {
  className: string;
}

export class Menu extends React.Component<MenuProps> {
  render() {
    return (
      <div className={`${this.props.className} menu`}>
        <ul className="menu__links">
          <li className="menu__link">
            <a className="menu__anchor" href="#/unsorted" data-items="0">
              Unsorted
            </a>
          </li>
          <li className="menu__link">
            <a
              className="menu__anchor menu__anchor--active"
              href="#/today"
              data-items="3"
            >
              Today
            </a>
          </li>
          <li className="menu__link">
            <a className="menu__anchor" href="#/week" data-items="4">
              Week
            </a>
          </li>
        </ul>
        <h4 className="menu__header">Projects</h4>
        <ul className="menu__links">
          <li className="menu__link">
            <a
              className="menu__anchor"
              href="#/project/Portfolio"
              data-items="2"
            >
              Portfolio
            </a>
          </li>
          <li className="menu__link">
            <a className="menu__anchor" href="#/project/Sport" data-items="3">
              Sport
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
