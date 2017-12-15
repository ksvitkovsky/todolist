import * as moment from "moment";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { action, observable, transaction } from "mobx";
import { observer } from "mobx-react";
import { SingleDatePicker } from "react-dates";

import "./todos.scss";
import { Icon } from "..";
import { Todo } from "../../types";

interface TodosProps {
  className: string;
  header: string;
  todos: Todo[];
  onAddTodo: (text: string, targetDate?: number) => void;
}

@observer
export class Todos extends React.Component<TodosProps> {
  @observable
  editModel: Todo = {
    id: null,
    isCompleted: false,
    projectId: null,
    targetDate: null,
    text: null
  };
  @observable.ref editedTodo: Todo;
  @observable isDatepickerOpen: boolean = false;
  @observable isEditingTodo: boolean = false;

  @action.bound
  addTodo() {
    transaction(() => {
      this.editModel.id = null;
      this.editModel.targetDate = null;
      this.editModel.text = null;

      this.editedTodo = null;
      this.isEditingTodo = true;
    });
  }

  @action.bound
  cancelEdit(ev: React.SyntheticEvent<HTMLButtonElement>) {
    ev.stopPropagation();

    transaction(() => {
      this.editModel.id = null;
      this.isEditingTodo = false;
    });
  }

  @action.bound
  changeDate(date: moment.Moment) {
    this.editModel.targetDate = date.valueOf();
  }

  @action.bound
  changeText(ev: React.SyntheticEvent<HTMLInputElement>) {
    this.editModel.text = ev.currentTarget.value;
  }

  @action
  editTodo(todo: Todo) {
    if (this.isEditingTodo) return;

    transaction(() => {
      this.editModel.id = todo.id;
      this.editModel.targetDate = todo.targetDate;
      this.editModel.text = todo.text;

      this.editedTodo = todo;
      this.isEditingTodo = true;
    });
  }

  @action.bound
  saveEdit(ev: React.SyntheticEvent<HTMLButtonElement>) {
    ev.stopPropagation();

    transaction(() => {
      if (this.editModel.id) {
        this.editedTodo.targetDate = this.editModel.targetDate;
        this.editedTodo.text = this.editModel.text;
      } else {
        this.props.onAddTodo(this.editModel.text, this.editModel.targetDate);
      }

      this.editModel.id = null;
      this.isEditingTodo = false;
    });
  }

  @action
  toggleComplete(ev: React.SyntheticEvent<HTMLElement>, todo: Todo) {
    ev.stopPropagation();
    todo.isCompleted = !todo.isCompleted;
  }

  @action.bound
  toggleDatepicker() {
    this.isDatepickerOpen = !this.isDatepickerOpen;
  }

  render() {
    return (
      <div className={`${this.props.className} todos`}>
        <h1 className="todos__header">{this.props.header}</h1>
        <ul className="todos__items">
          {this.renderTodos()}
          {this.renderAddBlock()}
        </ul>
      </div>
    );
  }

  renderAddBlock() {
    return (
      <li className="todos__item">
        {this.isEditingTodo && !this.editModel.id ? (
          this.renderForm()
        ) : (
          <button className="todos__add-button" onClick={this.addTodo}>
            Add todo
          </button>
        )}
      </li>
    );
  }

  renderForm() {
    return (
      <React.Fragment>
        <Icon className="todos__todo-status" type="" />
        <input
          className="todos__todo-text"
          autoFocus
          type="text"
          value={this.editModel.text || ""}
          onChange={this.changeText}
        />
        <SingleDatePicker
          date={
            this.editModel.targetDate ? moment(this.editModel.targetDate) : null
          }
          displayFormat="MMM, D"
          focused={this.isDatepickerOpen}
          id="date"
          numberOfMonths={1}
          onDateChange={this.changeDate}
          onFocusChange={this.toggleDatepicker}
        />
        <button className="todos__todo-save" onClick={this.saveEdit}>
          Save
        </button>
        <button className="todos__todo-cancel" onClick={this.cancelEdit}>
          Cancel
        </button>
      </React.Fragment>
    );
  }

  renderTodos() {
    return this.props.todos.map(todo => (
      <li
        className="todos__item"
        key={todo.id}
        onClick={() => this.editTodo(todo)}
      >
        {this.isEditingTodo && todo.id === this.editModel.id ? (
          this.renderForm()
        ) : (
          <React.Fragment>
            <Icon
              className="todos__todo-status"
              type={todo.isCompleted ? "completed" : "incompleted"}
              onClick={ev => this.toggleComplete(ev, todo)}
            />
            <span className="todos__todo-text todos__todo-text--value">
              {todo.text}
            </span>
            <span className="todos__todo-date todos__todo-date--value">
              {todo.targetDate ? moment(todo.targetDate).format("MMM, D") : ""}
            </span>
          </React.Fragment>
        )}
      </li>
    ));
  }
}
