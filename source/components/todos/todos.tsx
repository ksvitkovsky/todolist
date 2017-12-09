import * as React from "react";

import "./todos.scss";

interface TodosProps {
  className: string;
}

export class Todos extends React.Component<TodosProps> {
  render() {
    return <div className={`${this.props.className} todos`} />;
  }
}
