
import { Component, inject, OnInit, signal } from '@angular/core';
import { ReminderService } from '../../services/reminder.service.';
import { ReminderItemComponent } from '../reminder-item/reminder-item.component';
import { ReminderType, Reminder } from '../../models/reminder';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-reminder',
  providers: [
    ReminderService
  ],
  imports: [ReminderItemComponent, DialogComponent],
  templateUrl: './reminder.component.html',
})
export class RemindersComponent implements OnInit {

  show =  signal(<keyof typeof ReminderType>'PENDING')

  isDialogOpen = signal(false)

  selectedReminder = signal<Reminder | null>(null)

  reminderService = inject(ReminderService);

  showCompleted(){
    this.show() === 'PENDING' ? this.show.set('COMPLETED') : this.show.set('PENDING')
    //this.reminderService.findAll(`status=${this.show()}`)
  }

  markCompleted() { }
  togglePinReminder() { }

  // markCompleted = (reminder: Reminder) => this.reminderService.update({
  //   _id: reminder._id,
  //   description: reminder.description,
  //   status: 'COMPLETED',
  //   priority: reminder.priority,
  //   dueDate: reminder.dueDate
  // }, 'MARK_COMPLETE')

  // togglePinReminder = (reminder: Reminder) => this.reminderService.update({
  //   _id: reminder._id,
  //   description: reminder.description,
  //   status: reminder.status,
  //   priority: !reminder.priority,
  //   dueDate: reminder.dueDate
  // }, 'PIN')

  handleDelete (reminder: Reminder){
    this.selectedReminder.set(reminder)
    this.isDialogOpen.set(true)
  }

  handleSave() {
    const id = this.selectedReminder()?._id
    if(id) {
      this.reminderService.delete(id)
      this.closeDialog()
    }
  }

  closeDialog(){
    this.selectedReminder.set(null)
    this.isDialogOpen.set(false)
  }

  ngOnInit(): void {
    this.reminderService.findAllReminders();
  }

}