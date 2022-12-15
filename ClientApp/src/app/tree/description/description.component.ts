import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../character/character';


@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {
    @Input() character: Character;
    @Output() close = new EventEmitter();
  
    onClose() {
      this.close.emit();
    }
}
