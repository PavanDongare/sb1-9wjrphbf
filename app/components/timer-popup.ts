import { Observable, EventData, Page } from '@nativescript/core';
import { Task } from '../models/task.model';

export class TimerPopupViewModel extends Observable {
    private _currentTask: Task;
    private _remainingTime: number;
    private _timer: any;
    private _page: Page;

    constructor(page: Page, task: Task) {
        super();
        this._page = page;
        this._currentTask = task;
        this._remainingTime = task.duration;
        this.startTimer();
    }

    get currentTask(): Task {
        return this._currentTask;
    }

    get remainingTime(): number {
        return this._remainingTime;
    }

    private startTimer() {
        this._timer = setInterval(() => {
            this._remainingTime--;
            this._currentTask.timeSpent = this._currentTask.duration - this._remainingTime;
            this.notifyPropertyChange('remainingTime', this._remainingTime);
            
            if (this._remainingTime <= 0) {
                this.onComplete();
            }
        }, 60000); // Update every minute
    }

    onAbort() {
        clearInterval(this._timer);
        this._page.closeModal({ completed: false, task: this._currentTask });
    }

    onComplete() {
        clearInterval(this._timer);
        this._currentTask.completed = true;
        this._page.closeModal({ completed: true, task: this._currentTask });
    }
}

export function onShownModally(args: EventData) {
    const page = <Page>args.object;
    const context = page.modal.context;
    page.bindingContext = new TimerPopupViewModel(page, context.task);
}