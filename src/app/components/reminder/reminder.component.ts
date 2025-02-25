import { Component, inject, OnInit, signal } from "@angular/core";
import { ReminderService } from "../../services/reminder.service.";
import { ReminderItemComponent } from "../reminder-item/reminder-item.component";
import { ReminderItemEditComponent } from "../reminder-item/reminder-item-edit.component";
import { ReminderType, Reminder } from "../../models/reminder";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: "app-reminder",
  providers: [ReminderService],
  imports: [ReminderItemComponent, ReminderItemEditComponent, DialogComponent],
  templateUrl: "./reminder.component.html",
})
export class RemindersComponent implements OnInit {
  show = signal(<keyof typeof ReminderType>"PENDING");

  isDialogOpen = signal(false);
  selectedReminder = signal<Reminder | null>(null);
  reminderService = inject(ReminderService);

  newReminder: Reminder = {
    _id: '',
    description: '',
    dueDate: '',
    priority: false,
    status: 'PENDING',
    user: '',
    notes: []
  };

  saveNewReminder(reminder: Reminder) {

    console.log(reminder);
    this.reminderService.create(reminder).subscribe(response => {
      this.reminderService.findAllReminders();
    });
  }

  showCompleted() {
    this.show() === "PENDING"
      ? this.show.set("COMPLETED")
      : this.show.set("PENDING");
  }

  markCompleted(reminder: Reminder) {
    this.reminderService.update({
      _id: reminder._id,
      description: reminder.description,
      status: "COMPLETED",
      priority: reminder.priority,
      dueDate: reminder.dueDate,
    });
  }

  togglePinReminder(reminder: Reminder) {
    this.reminderService.update({
      _id: reminder._id,
      description: reminder.description,
      status: "COMPLETED",
      priority: reminder.priority,
      dueDate: reminder.dueDate,
    })
  }

  handleDelete(reminder: Reminder) {
    this.selectedReminder.set(reminder);
    this.isDialogOpen.set(true);
  }

  handleSave() {
    const id = this.selectedReminder()?._id;
    if (id) {
      this.reminderService.delete(id);
      this.closeDialog();
    }
  }

  closeDialog() {
    this.selectedReminder.set(null);
    this.isDialogOpen.set(false);
  }

  ngOnInit(): void {
    this.reminderService.findAllReminders();
  }
}
