import * as moment from "moment";
import * as React from "react";
import { action, computed, observable, transaction } from "mobx";
import { observer } from "mobx-react";

import "./main.scss";
import { Icon, Menu, Todos } from "..";
import { Project, Todo } from "../../types";

const defaultProjects = [observable({ id: "project1", name: "Project1" })];
const defaultTodos = [
  observable({
    id: "todo0",
    isCompleted: false,
    projectId: null,
    targetDate: null,
    text: "Todo 0"
  }),
  observable({
    id: "todo1",
    isCompleted: false,
    projectId: "project1",
    targetDate: null,
    text: "Todo 1"
  }),
  observable({
    id: "todo2",
    isCompleted: true,
    projectId: "project1",
    targetDate: null,
    text: "Todo 2"
  })
];

@observer
export class Main extends React.Component {
  @observable activeProjectId: string;
  @observable filterMode: string = "all";
  @observable isMenuOpen: boolean = false;
  @observable projects: Project[] = defaultProjects;
  @observable todos: Todo[] = defaultTodos;

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
  addTodo(text: string, targetDate?: number) {
    this.todos.push(
      observable({
        id: text
          .toLowerCase()
          .split(" ")
          .join("_"),
        isCompleted: false,
        projectId: this.activeProjectId,
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

  @action.bound
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  componentDidMount() {
    window.addEventListener("hashchange", this.handleHashChange());
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
