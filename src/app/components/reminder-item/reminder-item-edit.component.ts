
import { Component, EventEmitter, inject, Input, NgModule, Output } from '@angular/core';
import { Reminder} from '../../models/reminder';
import { ReminderService } from '../../services/reminder.service.';
import { AppModule } from "../../app.module";
import { EntryComponent } from '../entry/entry.component';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'reminder-item-edit',
  templateUrl: './reminder-item-edit.component.html',
  imports: [EntryComponent, FormsModule],

})
export class ReminderItemEditComponent {

    reminderService = inject(ReminderService);

    @Input() item!: Reminder
    @Output() saveReminder = new EventEmitter<Reminder>();
    @Output() deleteReminder = new EventEmitter<Reminder>()


    isOverDue() {
      return false;// this.reminderService.isOverdue(this.item)
    }

    isCompleted() {
      return this.item.status === 'COMPLETED'
    }

    status(){
      if (this.isCompleted()) {
        return "Completed";
      }
      return  this.isOverDue() ? 'Over Due' : 'To Do'
    }
}
