
import { Component, Input } from '@angular/core';
import { Note } from '../../models/reminder';

@Component({
  selector: 'reminder-item',
  templateUrl: './reminder-item.component.html',
})

export class ReminderItemComponent {
    @Input() overDue: boolean = false
    @Input() dueDate = ""
    @Input() description = ""
    @Input() priority = false
    @Input() notes: Note[] = []
}
