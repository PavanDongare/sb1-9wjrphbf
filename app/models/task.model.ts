export interface Task {
    name: string;
    duration: number;
    timeSpent?: number;
    completed?: boolean;
    timestamp?: Date;
}