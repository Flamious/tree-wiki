import { Component, Input } from '@angular/core';
import { Connection } from './connection';

@Component({
  selector: 'character-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent {
  get xStart() {
    return Math.min(this.connection.xfrom, this.connection.xto) + 'px';
  }

  get yStart() {
    return Math.min(this.connection.yfrom, this.connection.yto) + 'px';
  }

  get width() {
    const width = Math.abs(this.connection.xfrom - this.connection.xto);
    return (width === 0 ? 10 : width) + 'px';
  }
  
  get height() {
    const height = Math.abs(this.connection.yfrom - this.connection.yto);
    return (height === 0 ? 10 : height) + 'px';
  }

  @Input() connection: Connection = null;
}
