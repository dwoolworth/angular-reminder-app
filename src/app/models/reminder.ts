export interface Reminder {
  _id: string;
  description: string;
  dueDate: string;
  priority: boolean,
  status: boolean,
  user: string;
  notes: Note[]
}

export type Note = {
  reminder: string,
  title: string,
  _id: string
}

export type ReminderServiceResponse = {
  reminders: Reminder[],
  total: number
}
