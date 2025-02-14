
import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../config';
import { Reminder } from '../models/reminder';

@Injectable({providedIn: 'root'})
export class ReminderService {

    reminders = signal ([
        {id: 1, title: 'Reminder 1'},
        {id: 2, title: 'Reminder 2'},
        {id: 3, title: 'Reminder 3'},
        {id: 4, title: 'Reminder 4'},
        {id: 5, title: 'Reminder 5'}
    ]);

    hasReminders = computed(() => this.reminders().length > 0);

    constructor(private httpClient: HttpClient) { }

    findAll() {
        return this.httpClient.get<Reminder[]>(`reminders`);
    }

    findById(id: string) {
        return this.httpClient.get<Reminder>(`reminders/${id}`);
    }

    create(reminder: Reminder) {
        return this.httpClient.post<Reminder>(`reminders`, reminder);
    }

    update(reminder: Reminder) {
        return this.httpClient.put<Reminder>(`reminders/${reminder._id}`, reminder);
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`reminders/${id}`);
    }
}