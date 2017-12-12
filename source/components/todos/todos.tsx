import * as React from "react";

import "./todos.scss";
import { Icon } from "..";

interface TodosProps {
  className: string;
}

export class Todos extends React.Component<TodosProps> {
  render() {
    return (
      <div className={`${this.props.className} todos`}>
        <h1 className="todos__header">Today</h1>
        <ul className="todos__items">
          <li className="todos__item">
            <Icon className="todos__todo-status" type="completed" />
            <span className="todos__todo-text todos__todo-text--value">
              Write an article on MobX
            </span>
            <span className="todos__todo-date todos__todo-date--value">
              Dec, 6
            </span>
          </li>
          <li className="todos__item">
            <Icon className="todos__todo-status" type="incompleted" />
            <input className="todos__todo-text" type="text" />
            <input className="todos__todo-date" type="date" />
            <button className="todos__todo-save">Save</button>
            <button className="todos__todo-cancel">Cancel</button>
          </li>
        </ul>
      </div>
    );
  }
}
