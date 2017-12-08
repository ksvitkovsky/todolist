import { observable } from "mobx";

export class ProjectModel {
  public id: string;
  @observable public name: string;
}
