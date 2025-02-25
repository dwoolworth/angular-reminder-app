
import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reminder, ReminderAction, ReminderServiceResponse } from '../models/reminder';

@Injectable({providedIn: 'root'})
export class ReminderService {


    reminders = signal(<ReminderServiceResponse>{
        reminders: [
            {
                _id: "1",
                description: "Reminder"
            },
            {
                _id: "2",
                description: "Reminder"
            },
            {
                _id: "3",
                description: "Reminder"
            },
        ],
        total: 1
    });

    hasReminders = computed(() => this.reminders().total > 0);

    isOverdue = (reminder: Reminder) => new Date(reminder.dueDate) < new Date() && reminder.status === 'PENDING';

    formatDate = (dateString: string) => new Intl.DateTimeFormat("en-US").format(new Date(dateString))

    constructor(private httpClient: HttpClient) { }

    findAll(params : Record<string, any> = {}) {
        return this.httpClient.get<ReminderServiceResponse>(`reminder`, {params: params} );
    }

    findById(id: string) {
        return this.httpClient.get<Reminder>(`reminder/${id}`);
    }

    create(reminder: Reminder) {
        return this.httpClient.post<Reminder>(`reminder`, reminder);
    }

    update(reminder: Reminder) {
        return this.httpClient.put<Reminder>(`reminder/${reminder._id}`, reminder);
    }

    delete(id: string) {
        return this.httpClient.delete<void>(`reminder/${id}`).subscribe(() => {
            this.findAllReminders();
        });
    }

    findAllReminders() {
        this.findAll().subscribe(response => {
            //this.reminders.set(response)
        })
    }
}