import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isCharacterSelected: boolean = false
  @Output() openCharacterInfo = new EventEmitter();
  @Output() openAddConnection = new EventEmitter();

  openInfo() {
    this.openCharacterInfo.emit();
  }

  addConnection() {
    this.openAddConnection.emit();
  }
}
