
import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reminder, ReminderServiceResponse } from '../models/reminder';

@Injectable({providedIn: 'root'})
export class ReminderService {

    reminders = signal (<ReminderServiceResponse>{});

    hasReminders = computed(() => this.reminders().total > 0);

    isOverdue = (reminder: Reminder) => new Date(reminder.dueDate) < new Date() && !reminder.status; 

    formatDate = (dateString: string) => new Intl.DateTimeFormat("en-US").format(new Date(dateString))

    constructor(private httpClient: HttpClient) { }

    findAll(queryString: string = 'status=PENDING') {
        return this.httpClient.get<ReminderServiceResponse>(`reminder?${queryString}`).subscribe(response => {
            this.reminders.set(response)
        });
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