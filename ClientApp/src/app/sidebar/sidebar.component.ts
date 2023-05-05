import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isWorkSelected: boolean = false
  @Input() isCharacterSelected: boolean = false
  @Input() isNextAvailable: boolean = false
  @Input() isPreviousAvailable: boolean = false
  @Input() treeName: string = ''
  @Output() openCharacterInfo = new EventEmitter();
  @Output() openAddConnection = new EventEmitter();
  @Output() openAddCharacter = new EventEmitter();
  @Output() openNextWork = new EventEmitter();
  @Output() openPreviousWork = new EventEmitter();
  @Output() openAddWork = new EventEmitter();
  @Output() openDeleteWork = new EventEmitter();

  openInfo() {
    this.openCharacterInfo.emit();
  }

  addConnection() {
    this.openAddConnection.emit();
  }

  addCharacter() {
    this.openAddCharacter.emit();
  }

  addWork() {
    this.openAddWork.emit();
  }

  deleteWork() {
    this.openDeleteWork.emit();
  }

  openNextWorkClick() {
    this.openNextWork.emit();
  }

  openPreviousWorkClick() {
    this.openPreviousWork.emit();
  }
}
