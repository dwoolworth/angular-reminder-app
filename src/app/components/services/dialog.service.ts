import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface DialogServiceOptions {
    cancelTitle?: string;
    acceptTitle?: string;
    title?: string
}

const defaultOptions: Required<DialogServiceOptions> = {
    cancelTitle: "Cancel",
    acceptTitle: "Delete",
    title: "Confirmation"
}

@Injectable({providedIn: 'root'})
export class DialogService {

    isOpen = false
    message = "";
    title = defaultOptions.title;
    cancelTitle = defaultOptions.cancelTitle;
    acceptTitle = defaultOptions.acceptTitle;

    private subject?: Subject<boolean>;

    close(value: any) {
        this.isOpen = false;
        if (this.subject) {
            this.subject.next(value);
            this.subject.complete()
        }
    }

    confirm(message: string, options: DialogServiceOptions =  {}): Observable<boolean> {

        const optionsWithDefaults = {
            ...defaultOptions,
            ...options
        }

        this.title = optionsWithDefaults.title;
        this.cancelTitle = optionsWithDefaults.cancelTitle;
        this.acceptTitle = optionsWithDefaults.acceptTitle;

        this.message = message;
        this.isOpen = true;
        this.subject = new Subject<boolean>();
        return this.subject.asObservable();
    }
}