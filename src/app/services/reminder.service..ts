
import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reminder, ReminderServiceResponse } from '../models/reminder';

export interface ReminderQueryParams {

}

@Injectable({providedIn: 'root'})
export class ReminderService {

    reminders = signal(<ReminderServiceResponse>{
        reminders: [],
        total: 0
    });

    hasReminders = computed(() => this.reminders().total > 0);

    constructor(private httpClient: HttpClient) { }

    isOverdue (reminder: Reminder) {
        return new Date(reminder.dueDate) < new Date() && reminder.status === 'PENDING';
    }

    findAll(params : Record<string, any> = {}) {
        return this.httpClient.get<ReminderServiceResponse>(`reminder`, {params: params} );
    }

    findById(id: string) {
        return this.httpClient.get<Reminder>(`reminder/${id}`);
    }

    create(reminder: Reminder) {
        return this.httpClient.post<Reminder>(`reminder`, reminder);
    }

    update(reminder: Partial<Reminder>) {
        return this.httpClient.put<Reminder>(`reminder/${reminder._id}`, reminder);
    }

    delete(id: string) {
        return this.httpClient.delete<void>(`reminder/${id}`);
    }

    findAllReminders() {
        this.findAll().subscribe(response => {
            this.reminders.set(response)
        })
    }
}