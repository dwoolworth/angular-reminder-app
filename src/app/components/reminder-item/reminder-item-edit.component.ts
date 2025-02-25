
import { Component, EventEmitter, inject, Input, NgModule, Output } from '@angular/core';
import { Reminder} from '../../models/reminder';
import { ReminderService } from '../../services/reminder.service.';
import { AppModule } from "../../app.module";
import { EntryComponent } from '../entry/entry.component';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'reminder-item-edit',
  templateUrl: './reminder-item-edit.component.html',
  imports: [EntryComponent, FormsModule, CommonModule],
})
export class ReminderItemEditComponent {

    reminderService = inject(ReminderService);
    note: string = '';

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
      // this.item.notes.push({});
      this.note = '';
    }

    status(){
      if (this.isCompleted()) {
        return "Completed";
      }
      return  this.isOverDue() ? 'Over Due' : 'To Do'
    }
}
