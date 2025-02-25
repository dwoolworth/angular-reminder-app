import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { ReminderService } from "../../services/reminder.service.";
import { ReminderItemComponent } from "../reminder-item/reminder-item.component";
import { ReminderItemEditComponent } from "../reminder-item/reminder-item-edit.component";
import { ReminderType, Reminder } from "../../models/reminder";
import { DialogComponent } from "../dialog/dialog.component";
import { NotificationService } from "../services/notification.service";

@Component({
  selector: "app-reminder",
  providers: [ReminderService],
  imports: [ReminderItemComponent, ReminderItemEditComponent, DialogComponent],
  templateUrl: "./reminder.component.html",
})
export class RemindersComponent implements OnInit {
  show = signal(<keyof typeof ReminderType>"PENDING");

  showCreateReminder = false;
  showCompletedReminders = signal(true);

  isDialogOpen = signal(false);
  selectedReminder = signal<Reminder | null>(null);
  reminderService = inject(ReminderService);
  notificationService = inject(NotificationService);

  editReminderRef: Reminder | null = null;

  filteredReminders = computed(() => {
    const result = this.reminderService.reminders();
    const viewCompleted = this.showCompletedReminders();

    if (viewCompleted) {
      return result.reminders;
    }

    return result.reminders.filter((reminder) => {
      return reminder.status !== "COMPLETED";
    });
  });

  hasReminders = computed(() => {
    return this.filteredReminders().length > 0;
  });

  defaultReminder: Reminder = {
    description: "",
    dueDate: "",
    priority: false,
    status: "PENDING",
    user: "",
    notes: [],
  };

  newReminder: Reminder = {
    ...this.defaultReminder,
  };
  showEditReminderForm(reminder: Reminder) {
    this.editReminderRef = reminder;
  }

  showCreateReminderForm() {
    this.newReminder = { ...this.defaultReminder };
    this.showCreateReminder = true;
  }

  saveNewReminder(reminder: Reminder) {
    this.reminderService.create(reminder).subscribe((response) => {
      this.reminderService.findAllReminders();
      this.notificationService.show(
        `Reminder <span class="fw-bold px-1">${reminder.description}</span> has been created.`,
        { type: "success" }
      );
      this.showCreateReminder = false;
    });
  }

  showCompleted() {
    this.showCompletedReminders.set(!this.showCompletedReminders());
  }

  markCompleted(reminder: Reminder) {

    const status = reminder.status === "PENDING" ? "COMPLETED" : "PENDING"

    this.reminderService
      .update({
        _id: reminder._id,
        description: reminder.description,
        status: status,
        priority: reminder.priority,
        dueDate: reminder.dueDate,
      })
      .subscribe(() => {
        this.reminderService.findAllReminders();

        if (status == "COMPLETED") {
          this.notificationService.show(
            `Reminder <span class="fw-bold px-1">${reminder.description}</span> has been completed.`,
            { type: "success" }
          );
        } else {
          this.notificationService.show(
            `Reminder <span class="fw-bold px-1">${reminder.description}</span> has been marked as pending.`,
            { type: "info" }
          );
        }
      });
  }

  updateReminder(reminder: Reminder) {
    this.reminderService.update(reminder).subscribe(() => {
      this.editReminderRef = null;
      this.notificationService.show(
        `Reminder <span class="fw-bold px-1">${reminder.description}</span> has been updated.`,
        { type: "success" }
      );
    });


  }

  togglePinReminder(reminder: Reminder) {
    this.reminderService
      .update({
        _id: reminder._id,
        description: reminder.description,
        status: reminder.status,
        priority: !reminder.priority,
        dueDate: reminder.dueDate,
      })
      .subscribe(() => {
        this.reminderService.findAllReminders();
      });
  }

  showDeleteReminderConfirmation(reminder: Reminder) {
    this.selectedReminder.set(reminder);
    this.isDialogOpen.set(true);
  }

  deleteReminder() {
    const reminder = this.selectedReminder();
    if (reminder?._id) {
      this.reminderService.delete(reminder._id).subscribe(() => {
        this.reminderService.findAllReminders();

        this.notificationService.show(
          `Reminder <span class="fw-bold px-1">${reminder.description}</span> has been deleted.`,
          { type: "success" }
        );
      });
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
