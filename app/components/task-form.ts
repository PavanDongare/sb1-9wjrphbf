import { Observable, EventData, Page, Slider } from '@nativescript/core';
import { Task } from '../models/task.model';

export class TaskFormViewModel extends Observable {
    private _taskName: string = '';
    private _duration: number = 30;
    private _page: Page;

    constructor(page: Page) {
        super();
        this._page = page;
        // Initialize the observable properties
        this.notifyPropertyChange('taskName', this._taskName);
        this.notifyPropertyChange('duration', this._duration);
    }

    get taskName(): string {
        return this._taskName;
    }

    set taskName(value: string) {
        if (this._taskName !== value) {
            this._taskName = value;
            this.notifyPropertyChange('taskName', value);
        }
    }

    get duration(): number {
        return this._duration;
    }

    set duration(value: number) {
        if (this._duration !== value) {
            this._duration = Math.round(value); // Round to nearest integer
            this.notifyPropertyChange('duration', this._duration);
        }
    }

    onSliderLoaded(args: EventData) {
        const slider = <Slider>args.object;
        slider.on('valueChange', (sliderArgs: any) => {
            this.duration = sliderArgs.value;
        });
    }

    onStartTask() {
        if (!this.taskName.trim()) {
            // Show error if task name is empty
            alert('Please enter a task name');
            return;
        }

        const task: Task = {
            name: this.taskName.trim(),
            duration: this.duration,
            timeSpent: 0,
            timestamp: new Date()
        };
        this._page.closeModal(task);
    }

    onCancel() {
        this._page.closeModal(null);
    }
}

export function onShownModally(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new TaskFormViewModel(page);
}