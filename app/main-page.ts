import { EventData, Page } from '@nativescript/core';
import { MainViewModel } from './main-view-model';

let mainViewModel: MainViewModel;

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    
    if (!mainViewModel) {
        mainViewModel = new MainViewModel();
    }
    
    page.bindingContext = mainViewModel;
}