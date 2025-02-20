
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note, Reminder} from '../../models/reminder';

@Component({
  selector: 'reminder-item',
  templateUrl: './reminder-item.component.html',
})

export class ReminderItemComponent {
    @Input() overDue: boolean = false
    @Input() dueDate = ""
    @Input() item: Reminder = {} as Reminder
    @Input() description = ""
    @Input() priority = false
    @Input() notes: Note[] = []
    @Input() markCompleted = (reminder: Reminder) => {}
    @Input() togglePinReminder = (reminder: Reminder) => {}

    @Output() deleteAction = new EventEmitter<void>()

    triggerAction(reminder: Reminder){
      if(this.markCompleted) {
        this.markCompleted(reminder)
      }

      if(this.togglePinReminder) {
        this.togglePinReminder(reminder)
      }
    }

    deleteReminder(){
      this.deleteAction.emit()
    }

    label(){
      return this.overDue ? 'Over Due' : this.item.status === 'COMPLETED' ? 'Completed' : 'To Do'
    }
}
