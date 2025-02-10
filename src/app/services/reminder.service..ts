
import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ReminderService {

    reminders = signal([
        {id: 1, title: 'Reminder 1'},
        {id: 2, title: 'Reminder 2'},
        {id: 3, title: 'Reminder 3'},
        {id: 4, title: 'Reminder 4'},
        {id: 5, title: 'Reminder 5'}
    ]);

    hasReminders = computed(() => this.reminders().length > 0);

    constructor(private httpClient: HttpClient) { }
}