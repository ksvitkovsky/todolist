import * as React from "react";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { SingleDatePicker } from "react-dates";

import "./todos.scss";
import { Icon } from "..";

interface TodosProps {
  className: string;
}

@observer
export class Todos extends React.Component<TodosProps> {
  @observable isDatepickerOpen: boolean = false;

  @action.bound
  toggleDatepicker() {
    this.isDatepickerOpen = !this.isDatepickerOpen;
  }

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
            <SingleDatePicker
              date={null}
              focused={this.isDatepickerOpen}
              id="date"
              numberOfMonths={1}
              onDateChange={() => {}}
              onFocusChange={this.toggleDatepicker}
            />
            <button className="todos__todo-save">Save</button>
            <button className="todos__todo-cancel">Cancel</button>
          </li>
        </ul>
      </div>
    );
  }
}
