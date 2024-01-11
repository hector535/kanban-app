export interface Board {
  id: string;
  name: string;
  columnIds: string[];
}

export interface Column {
  id: string;
  name: string;
  taskIds: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  statusId: string;
  subtaskIds: string[];
}

export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}
