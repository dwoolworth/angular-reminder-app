
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Note, Reminder} from '../../models/reminder';
import { ReminderService } from '../../services/reminder.service.';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'reminder-item',
  imports: [ CommonModule ],
  templateUrl: './reminder-item.component.html',
})
export class ReminderItemComponent {

    reminderService = inject(ReminderService);

    @Input() item!: Reminder
    @Output() markCompleted = new EventEmitter<Reminder>();
    @Output() togglePinReminder = new EventEmitter<Reminder>();
    @Output() deleteReminder = new EventEmitter<Reminder>()


    isOverDue() {
      return this.reminderService.isOverdue(this.item)
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
