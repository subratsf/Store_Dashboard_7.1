import { Injectable, Output, EventEmitter } from '@angular/core';

export class OverlayTogglerService {

  isOpen = false;

  @Output() show: EventEmitter<boolean> = new EventEmitter();

  toggle() {
    this.isOpen = !this.isOpen;
    this.show.emit(this.isOpen);
  }

}
