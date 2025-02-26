
import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note, Reminder, ReminderServiceResponse } from '../models/reminder';

@Injectable({providedIn: 'root'})
export class NotesService {


    constructor(private httpClient: HttpClient) { }

    findAll(reminderId: string) {
        return this.httpClient.get<ReminderServiceResponse>(`note/${reminderId}/notes`);
    }

    findById(reminderId: string, id: string) {
        return this.httpClient.get<Note>(`note/${reminderId}/note/${id}`);
    }

    create(note: Note) {
        return this.httpClient.post<Note>(`note/${note.reminder}/notes`, note);
    }

    update(note: Partial<Note>) {
        return this.httpClient.put<Note>(`note/${note.reminder}/notes/${note._id}`, note);
    }

    delete(reminderId: string, id: string) {
        return this.httpClient.delete<void>(`note/${reminderId}/notes/${id}`);
    }
}