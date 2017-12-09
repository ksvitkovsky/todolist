import * as React from "react";

import "./menu.scss";

interface MenuProps {
  className: string;
}

export class Menu extends React.Component<MenuProps> {
  render() {
    return <div className={`${this.props.className} menu`} />;
  }
}
