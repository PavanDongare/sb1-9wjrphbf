export interface Task {
  id: string;
  name: string;
  duration: number;
  timeSpent: number;
  timestamp: Date;
  completed?: boolean;
}