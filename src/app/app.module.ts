import { CommonModule, NgIf } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { EntryComponent } from "./components/entry/entry.component";
import { CheckboxComponent } from "./components/checkbox/checkbox.component";
import { AlertComponent } from "./components/alert/alert.component";
import { DialogComponent } from "./components/dialog/dialog.component";
import { WeatherComponent } from "./components/weather/weather.component";
import { DialogServiceComponent } from "./components/services/dialog-service.component";
import { RemindersComponent } from "./components/reminder/reminder.component";
import { ReminderItemComponent } from "./components/reminder-item/reminder-item.component";
import { InspirationComponent } from "./components/inspiration/inspiration.component";
import { provideHttpClientTesting } from "@angular/common/http/testing";

const Components = [
  EntryComponent,
  CheckboxComponent,
  AlertComponent,
  DialogComponent,
  WeatherComponent,
  DialogServiceComponent,
  RemindersComponent,
  ReminderItemComponent,
  InspirationComponent,
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ...Components],
  exports: [CommonModule, ReactiveFormsModule, ...Components],
  providers: [provideHttpClientTesting()],
})
export class AppModule {}
