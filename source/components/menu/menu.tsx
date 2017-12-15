import * as React from "react";
import { action, observable } from "mobx";
import { observer } from "mobx-react";

import "./menu.scss";
import { Icon } from "..";
import { Project, Todo } from "../../types";

interface MenuProps {
  className: string;
  projects: Project[];
  onAddProject: (name: string) => void;
}

@observer
export class Menu extends React.Component<MenuProps> {
  @observable isAddingProject: boolean = false;

  @action.bound
  addProject() {
    this.isAddingProject = true;
  }

  @action.bound
  handleKeyPress(ev: React.KeyboardEvent<HTMLInputElement>) {
    if (ev.key === "Escape") {
      this.isAddingProject = false;
    }
    if (ev.key === "Enter" && ev.currentTarget.value) {
      this.isAddingProject = false;
      this.props.onAddProject(ev.currentTarget.value);
    }
  }

  render() {
    return (
      <div className={`${this.props.className} menu`}>
        <ul className="menu__links">
          {this.renderTopLink("All", "#/all", "unsorted")}
          {this.renderTopLink("Today", "#/today", "today")}
          {this.renderTopLink("Week", "#/week", "week")}
        </ul>
        <h4 className="menu__header">Projects</h4>
        <ul className="menu__links">
          {this.renderProjectLinks()}
          {this.renderAddBlock()}
        </ul>
      </div>
    );
  }

  renderAddBlock() {
    return (
      <li className="menu__link">
        {this.isAddingProject ? (
          <input
            className="menu__add-input"
            autoFocus
            placeholder="Project"
            onKeyDown={this.handleKeyPress}
          />
        ) : (
          <button className="menu__add-button" onClick={this.addProject}>
            Add project
          </button>
        )}
      </li>
    );
  }

  renderProjectLinks() {
    return this.props.projects.map(project => (
      <li className="menu__link" key={project.id}>
        <a className="menu__anchor" href={`#/project/${project.id}`}>
          {project.name}
        </a>
      </li>
    ));
  }

  renderTopLink(name: string, href: string, icon: string) {
    return (
      <li className="menu__link">
        <a className="menu__anchor" href={href}>
          <Icon className="menu__link-icon" type={icon} />
          {name}
        </a>
      </li>
    );
  }
}
