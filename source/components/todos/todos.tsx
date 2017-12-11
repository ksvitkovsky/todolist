import * as React from "react";

import "./todos.scss";

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
            <svg
              className="todos__todo-status"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
            <input
              className="todos__todo-text todos__todo-text--value"
              disabled
              type="text"
            />
            <input
              className="todos__todo-date todos__todo-date--value"
              disabled
              type="date"
            />
          </li>
          <li className="todos__item">
            <svg
              className="todos__todo-status"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
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
