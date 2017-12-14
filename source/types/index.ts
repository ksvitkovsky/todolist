export interface Project {
  id: string;
  name: string;
}

export interface Todo {
  id: string;
  isCompleted: boolean;
  projectId: string;
  targetDate: number;
  text: string;
}
