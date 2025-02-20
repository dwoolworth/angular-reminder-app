
import { Component, inject, OnInit } from '@angular/core';
import { ReminderService } from '../../services/reminder.service.';
import { ReminderItemComponent } from '../reminder-item/reminder-item.component';

@Component({
  selector: 'app-reminder',
  providers: [
    ReminderService
  ],
  imports: [ReminderItemComponent],
  templateUrl: './reminder.component.html',
})
export class RemindersComponent implements OnInit {

  reminderService = inject(ReminderService);

  showCompleted(){
    this.reminderService.findAll('showCompleted=true')
  }

  ngOnInit(): void {
    this.reminderService.findAll();
  }

}