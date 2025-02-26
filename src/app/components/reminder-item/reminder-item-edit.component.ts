
import { Component, EventEmitter, inject, Input, NgModule, Output } from '@angular/core';
import { Note, Reminder} from '../../models/reminder';
import { ReminderService } from '../../services/reminder.service.';
import { AppModule } from "../../app.module";
import { EntryComponent } from '../entry/entry.component';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotesService } from '../../services/notes.service.';

@Component({
  selector: 'reminder-item-edit',
  templateUrl: './reminder-item-edit.component.html',
  imports: [EntryComponent, FormsModule, CommonModule],
})
export class ReminderItemEditComponent {

    reminderService = inject(ReminderService);
    noteService = inject(NotesService);
    note: string = '';

    @Input() editNotes = false
    @Input() item!: Reminder
    @Output() saveReminder = new EventEmitter<Reminder>();
    @Output() deleteReminder = new EventEmitter<Reminder>()


    isOverDue() {
      return this.reminderService.isOverdue(this.item)
    }

    isCompleted() {
      return this.item.status === 'COMPLETED'
    }

    addNote() {
      const note: Note = {
        reminder: this.item._id ?? "",
        title: this.note,
      }

      this.noteService.create(note).subscribe((note) => {
        this.item.notes.push(note);
      });
      this.note = '';

    }

    removeNote(note: Note) {
      this.noteService.delete(note.reminder, note._id ?? "").subscribe(() => {
        this.item.notes = this.item.notes.filter((n) => n._id !== note._id);
      })
    }

    get dueDate() {
      if (!this.item.dueDate) {
        return '';
      }
      return this.item.dueDate.split('T')[0];
    }
    set dueDate(value: string) {
      this.item.dueDate = value;
    }

    status(){
      if (this.isCompleted()) {
        return "Completed";
      }
      return  this.isOverDue() ? 'Over Due' : 'To Do'
    }
}
