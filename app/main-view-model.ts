import { Observable, View, Frame } from '@nativescript/core';
import { Task } from './models/task.model';
import { TaskFormViewModel } from './components/task-form';
import { TimerPopupViewModel } from './components/timer-popup';

export class MainViewModel extends Observable {
    private _completedTasks: Task[] = [];
    private _totalTimeSpent: number = 0;

    constructor() {
        super();
        this._completedTasks = [];
        this.notifyPropertyChange('completedTasks', this._completedTasks);
        this.notifyPropertyChange('totalTimeSpent', this.totalTimeSpent);
    }

    get completedTasks(): Task[] {
        return this._completedTasks;
    }

    get totalTimeSpent(): string {
        return `${this._totalTimeSpent} minutes`;
    }

    showTaskForm() {
        const page = Frame.topmost().currentPage;
        const context = { closeCallback: (task: Task) => {
            if (task) {
                this.startTaskTimer(task);
            }
        }};
        
        page.showModal("./components/task-form", {
            context,
            fullscreen: true,
            animated: true,
            stretched: false
        });
    }

    private startTaskTimer(task: Task) {
        const page = Frame.topmost().currentPage;
        const context = { 
            task,
            closeCallback: (result: { completed: boolean; task: Task }) => {
                if (result && result.completed) {
                    this.addCompletedTask(result.task);
                }
            }
        };
        
        page.showModal("./components/timer-popup", {
            context,
            fullscreen: true,
            animated: true,
            stretched: false
        });
    }

    private addCompletedTask(task: Task) {
        this._completedTasks.unshift(task);
        this._totalTimeSpent += task.timeSpent;
        
        this.notifyPropertyChange('completedTasks', this._completedTasks);
        this.notifyPropertyChange('totalTimeSpent', this.totalTimeSpent);
    }
}