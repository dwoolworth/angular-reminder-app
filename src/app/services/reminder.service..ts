
import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reminder, ReminderAction, ReminderServiceResponse } from '../models/reminder';

@Injectable({providedIn: 'root'})
export class ReminderService {

    reminders = signal (<ReminderServiceResponse>{});

    hasReminders = computed(() => this.reminders().total > 0);

    isOverdue = (reminder: Reminder) => new Date(reminder.dueDate) < new Date() && reminder.status === 'PENDING'; 

    formatDate = (dateString: string) => new Intl.DateTimeFormat("en-US").format(new Date(dateString))

    constructor(private httpClient: HttpClient) { }

    findAll(queryString: string = 'status=PENDING') {
        return this.httpClient.get<ReminderServiceResponse>(`reminder?${queryString}`).subscribe(response => {
            if(queryString === 'status=COMPLETED') {
                this.reminders.set({ reminders: [...this.reminders().reminders, ...response.reminders], total: this.reminders().total + response.total })
            } else {
                this.reminders.set(response)
            }
        });
    }

    findById(id: string) {
        return this.httpClient.get<Reminder>(`reminders/${id}`);
    }

    create(reminder: Reminder) {
        return this.httpClient.post<Reminder>(`reminders`, reminder);
    }

    update(reminder: Omit<Reminder, 'notes' | 'user'>, action: keyof typeof ReminderAction) {

        return this.httpClient.put<Reminder>(`reminder/${reminder._id}`, reminder)
        .subscribe(() => {
            const previousReminders = this.reminders()
            if(action === 'MARK_COMPLETE'){
                this.reminders.set({ reminders: previousReminders.reminders.filter(item => item._id != reminder._id), total: previousReminders.total - 1 })
            } else {
               const reminderToUpdate = previousReminders.reminders.find(item => item._id === reminder._id) 
               if(reminderToUpdate) reminderToUpdate.priority = reminder.priority 
               this.reminders.set({ ...previousReminders, reminders: previousReminders.reminders.sort((a, b) => Number(b.priority) - Number(a.priority))})
            } 
        })
    }

    delete(id: string) {
        return this.httpClient.delete<void>(`reminder/${id}`).subscribe(() => {
            let previousReminders = this.reminders().reminders
            previousReminders = previousReminders.filter(reminder => reminder._id != id)
            this.reminders.set({ reminders: previousReminders, total: previousReminders.length})

        });
    }
}