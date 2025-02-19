import { Injectable, signal } from '@angular/core';
import { Observable, Subject, Subscriber } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DialogService {

    isOpen = false
    message = "";

    private subject?: Subject<boolean>;

    close(value: any) {
        this.isOpen = false;
        if (this.subject) {
            this.subject.next(value);
            this.subject.complete()
        }
    }

    confirm(message: string): Observable<boolean> {
        this.message = message;
        this.isOpen = true;
        this.subject = new Subject<boolean>();
        return this.subject.asObservable();
    }
}