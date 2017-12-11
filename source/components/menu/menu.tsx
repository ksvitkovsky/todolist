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
              <svg
                className="menu__link-icon"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z" />
                <path d="M0 0h24v24H0V0z" fill="none" />
              </svg>
              Unsorted
            </a>
          </li>
          <li className="menu__link">
            <a
              className="menu__anchor menu__anchor--active"
              href="#/today"
              data-items="3"
            >
              <svg
                className="menu__link-icon"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
              </svg>
              Today
            </a>
          </li>
          <li className="menu__link">
            <a className="menu__anchor" href="#/week" data-items="4">
              <svg
                className="menu__link-icon"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
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
