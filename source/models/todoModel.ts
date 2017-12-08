import { observable } from "mobx";

export class TodoModel {
  public id: string;
  @observable public projectId: string;
  @observable public targetDate: number;
  @observable public text: string;
}
