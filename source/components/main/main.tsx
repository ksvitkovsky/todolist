import * as moment from "moment";
import * as React from "react";
import { action, computed, observable, reaction, transaction } from "mobx";
import { observer } from "mobx-react";

import "./main.scss";
import { Icon, Menu, Todos } from "..";
import { Project, Todo } from "../../types";

@observer
export class Main extends React.Component {
  @observable activeProjectId: string;
  @observable filterMode: string = "all";
  @observable isMenuOpen: boolean = false;
  @observable projects: Project[] = [];
  @observable todos: Todo[] = [];

  @computed
  get activeProject() {
    return this.projects.find(project => project.id === this.activeProjectId);
  }

  @computed
  get filteredTodos() {
    return this.todos.filter(todo => {
      switch (this.filterMode) {
        case "today":
          return moment(todo.targetDate).diff(moment(), "days") <= 0;
        case "week":
          return moment(todo.targetDate).diff(moment(), "days") <= 6;
        case "project":
          return todo.projectId === this.activeProjectId;
        default:
          return true;
      }
    });
  }

  @computed
  get storeDataString() {
    return JSON.stringify({
      projects: this.projects,
      todos: this.todos
    });
  }

  @computed
  get todosHeader() {
    if (this.filterMode === "project") {
      return this.activeProject.name;
    } else {
      return this.filterMode[0].toUpperCase() + this.filterMode.slice(1);
    }
  }

  @action.bound
  addProject(name: string) {
    this.projects.push(
      observable({
        id: name
          .toLowerCase()
          .split(" ")
          .join("_"),
        name
      })
    );
  }

  @action.bound
  addTodo(
    text: string,
    targetDate?: number,
    isCompleted: boolean = false,
    projectId: string = this.activeProjectId
  ) {
    this.todos.push(
      observable({
        id: text
          .toLowerCase()
          .split(" ")
          .join("_"),
        isCompleted,
        projectId,
        targetDate,
        text
      })
    );
  }

  @action.bound
  handleHashChange() {
    const { 1: mode = "all", 2: id } = location.hash.split("/");

    transaction(() => {
      this.activeProjectId = id;
      this.filterMode = mode;
    });

    return this.handleHashChange;
  }

  readFromStorage() {
    const {
      projects = [],
      todos = []
    }: { projects: Project[]; todos: Todo[] } =
      JSON.parse(localStorage.getItem("todolist")) || {};

    projects.forEach(project => this.addProject(project.name));
    todos.forEach(todo =>
      this.addTodo(todo.text, todo.targetDate, todo.isCompleted, todo.projectId)
    );
  }

  @action.bound
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  writeToStorage() {
    localStorage.setItem("todolist", this.storeDataString);
  }

  componentDidMount() {
    window.addEventListener("hashchange", this.handleHashChange());
    this.readFromStorage();
    reaction(() => this.storeDataString, () => this.writeToStorage());
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.handleHashChange);
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
          projects={this.projects}
          onAddProject={this.addProject}
        />
        <div className="main__menu-overlay" onClick={this.toggleMenu} />
        <Todos
          className="main__todos"
          header={this.todosHeader}
          todos={this.filteredTodos}
          onAddTodo={this.addTodo}
        />
      </div>
    );
  }
}
