import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [NgClass],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @Input() title: string = '';

  @Input() open: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() saveAction = new EventEmitter<void>();


  close() {
    this.open = false
    this.openChange.emit(this.open);
  }

  save() {
    this.saveAction.emit();
  }
}
